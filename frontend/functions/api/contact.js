const CLIENT_TYPES = new Set(["CPA / Accounting Firm", "Bookkeeping Firm", "Business", "Other"]);
const SUPPORT_AREAS = new Set([
  "Monthly Bookkeeping",
  "Reconciliations",
  "AP",
  "AR",
  "Cleanup / Catch-Up",
  "Month-End",
  "Financial Reporting",
  "Dedicated Bookkeeping Capacity",
  "Other",
]);

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });

const clean = (value, max = 5000) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const validEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export async function onRequestPost(context) {
  const { request, env } = context;

  let input;
  try {
    input = await request.json();
  } catch {
    return json({ status: "error", message: "Invalid request." }, 400);
  }

  // Honeypot: silently accept obvious bot submissions.
  if (clean(input.company_url, 300)) {
    return json({ status: "success" });
  }

  const name = clean(input.name, 200);
  const email = clean(input.email, 254);
  const company = clean(input.company, 200);
  const website = clean(input.website, 300);
  const clientType = clean(input.client_type, 100);
  const message = clean(input.message, 5000);
  const services = Array.isArray(input.services)
    ? input.services.filter((item) => SUPPORT_AREAS.has(item)).slice(0, SUPPORT_AREAS.size)
    : [];

  if (!name || !validEmail(email) || !company || !CLIENT_TYPES.has(clientType) || !message) {
    return json({ status: "error", message: "Please complete all required fields." }, 400);
  }

  if (!env.RESEND_API_KEY || !env.OWNER_EMAIL) {
    console.error("Missing RESEND_API_KEY or OWNER_EMAIL");
    return json({ status: "error", message: "Enquiry service is not configured yet." }, 503);
  }

  const suppliedRequestId = clean(input.request_id, 100);
  const enquiryId = /^[a-zA-Z0-9_-]{8,100}$/.test(suppliedRequestId) ? suppliedRequestId : crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const rows = [
    ["Name", name],
    ["Work Email", email],
    ["Company", company],
    ["Website", website || "—"],
    ["I am a", clientType],
    ["Support areas", services.length ? services.join(", ") : "—"],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 16px 6px 0;font-weight:700;vertical-align:top">${escapeHtml(label)}</td><td style="padding:6px 0;vertical-align:top">${escapeHtml(value)}</td></tr>`
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;color:#0F172A;line-height:1.5">
      <h2 style="margin:0 0 16px">New enquiry from the ANUYORA website</h2>
      <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:14px">${rows}</table>
      <p style="margin:18px 0 6px;font-weight:700">Message</p>
      <p style="margin:0;white-space:pre-line">${escapeHtml(message)}</p>
      <p style="margin-top:24px;font-size:12px;color:#64748B">Enquiry ID: ${escapeHtml(enquiryId)}</p>
    </div>
  `;

  const fromEmail = env.FROM_EMAIL || "onboarding@resend.dev";
  const fromName = env.FROM_NAME || "ANUYORA Website";

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `website-enquiry/${enquiryId}`,
    },
    body: JSON.stringify({
      from: `${fromName} <${fromEmail}>`,
      to: [env.OWNER_EMAIL],
      subject: `New enquiry — ${name} (${company})`,
      html,
      reply_to: email,
    }),
  });

  if (!resendResponse.ok) {
    const detail = await resendResponse.text();
    console.error("Resend error:", resendResponse.status, detail);
    return json({ status: "error", message: "We couldn’t send your enquiry. Please email us directly." }, 502);
  }

  const resendResult = await resendResponse.json();

  // Optional D1 persistence. If no ENQUIRIES_DB binding exists, email delivery still works.
  if (env.ENQUIRIES_DB) {
    try {
      await env.ENQUIRIES_DB.prepare(
        `INSERT INTO enquiries
          (enquiry_id, name, email, company, website, client_type, services, message, created_at, email_id)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
        .bind(
          enquiryId,
          name,
          email,
          company,
          website || null,
          clientType,
          JSON.stringify(services),
          message,
          createdAt,
          resendResult.id || null
        )
        .run();
    } catch (error) {
      console.error("D1 storage error:", error);
      // Do not fail the enquiry after the email has already been sent.
    }
  }

  return json({
    status: "success",
    enquiry_id: enquiryId,
    email_notification: "sent",
  });
}

export function onRequest() {
  return new Response("Method Not Allowed", {
    status: 405,
    headers: { Allow: "POST" },
  });
}
