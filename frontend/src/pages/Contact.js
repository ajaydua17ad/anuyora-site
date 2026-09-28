import { useState } from "react";
import Seo from "@/components/Seo";
import { Eyebrow } from "@/components/Elements";
import { FadeUp, MaskLines } from "@/components/Reveal";

const CLIENT_TYPES = ["CPA / Accounting Firm", "Bookkeeping Firm", "Business", "Other"];

const SUPPORT_AREAS = [
  "Monthly Bookkeeping",
  "Reconciliations",
  "AP",
  "AR",
  "Cleanup / Catch-Up",
  "Month-End",
  "Financial Reporting",
  "Dedicated Bookkeeping Capacity",
  "Other",
];

const NEXT_STEPS = [
  "We review what you’ve shared.",
  "We set up a short conversation.",
  "We define a scope around your requirements.",
];

const initialForm = {
  name: "",
  email: "",
  company: "",
  website: "",
  client_type: "",
  services: [],
  message: "",
  company_url: "",
};

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Please enter your name.";
  if (!form.email.trim()) errors.email = "Please enter your work email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
    errors.email = "Please enter a valid email address.";
  if (!form.company.trim()) errors.company = "Please enter your company.";
  if (!form.client_type) errors.client_type = "Please select an option.";
  if (!form.message.trim()) errors.message = "Please tell us briefly what you’re looking for.";
  return errors;
}

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverError, setServerError] = useState(false);

  const set = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleService = (service) => {
    setForm((f) => ({
      ...f,
      services: f.services.includes(service)
        ? f.services.filter((s) => s !== service)
        : [...f.services, service],
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setStatus("sending");
    setServerError(false);
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
    } catch {
      setServerError(true);
      setStatus("idle");
    }
  };

  const reset = () => {
    setForm(initialForm);
    setErrors({});
    setStatus("idle");
  };

  return (
    <div data-testid="page-contact">
      <Seo
        title="Contact ANUYORA | Bookkeeping Outsourcing"
        description="Tell ANUYORA about your business, current setup and the bookkeeping work you're considering outsourcing. We'll start there."
        path="/contact"
      />

      <section data-testid="contact-hero" className="wrap pt-20 pb-14 md:pt-28 md:pb-16">
        <Eyebrow>Contact</Eyebrow>
        <h1 className="mt-8 max-w-3xl font-serif text-4xl leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
          <MaskLines lines={["Let’s start with", { text: "what you need.", em: true }]} />
        </h1>
        <FadeUp delay={0.5} y={16}>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-inksoft md:text-lg">
            Looking for additional bookkeeping capacity?
          </p>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-inksoft md:text-lg">
            Tell us about your business, current setup and the work you’re considering outsourcing.
            We’ll use that to understand your requirements and discuss the right way to work
            together.
          </p>
        </FadeUp>
      </section>

      <section data-testid="contact-form-section" className="wrap pb-24 md:pb-32">
        <div className="grid gap-16 lg:grid-cols-12">
          {status === "success" ? (
            <div data-testid="form-success" className="lg:col-span-8">
              <div className="border border-hairline bg-white px-8 py-14 md:px-14">
                <p className="eyebrow">Message Received</p>
                <h2 className="mt-6 font-serif text-4xl tracking-tight text-ink">Thank you.</h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-inksoft">
                  Your message has been received. We’ll be in touch to continue the conversation.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  data-testid="form-success-reset"
                  className="btn-outline mt-10"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              noValidate
              data-testid="contact-form"
              className="lg:col-span-8"
            >
              {serverError && (
                <div
                  data-testid="form-error"
                  role="alert"
                  className="mb-8 border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-800"
                >
                  Something went wrong while sending your message. Please try again.
                </div>
              )}

              <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
                <div>
                  <label htmlFor="cf-name" className="field-label">
                    Name
                  </label>
                  <input
                    id="cf-name"
                    data-testid="contact-input-name"
                    type="text"
                    autoComplete="name"
                    className="field-input"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p data-testid="contact-error-name" className="field-error">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="cf-email" className="field-label">
                    Work Email
                  </label>
                  <input
                    id="cf-email"
                    data-testid="contact-input-email"
                    type="email"
                    autoComplete="email"
                    className="field-input"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p data-testid="contact-error-email" className="field-error">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="cf-company" className="field-label">
                    Company
                  </label>
                  <input
                    id="cf-company"
                    data-testid="contact-input-company"
                    type="text"
                    autoComplete="organization"
                    className="field-input"
                    value={form.company}
                    onChange={(e) => set("company", e.target.value)}
                    aria-invalid={!!errors.company}
                  />
                  {errors.company && (
                    <p data-testid="contact-error-company" className="field-error">
                      {errors.company}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="cf-website" className="field-label">
                    Website — optional
                  </label>
                  <input
                    id="cf-website"
                    data-testid="contact-input-website"
                    type="url"
                    autoComplete="url"
                    placeholder="https://"
                    className="field-input"
                    value={form.website}
                    onChange={(e) => set("website", e.target.value)}
                  />
                </div>
              </div>

              <fieldset className="mt-12">
                <legend className="field-label">I am a:</legend>
                <div data-testid="contact-client-type" className="mt-3 flex flex-wrap gap-3">
                  {CLIENT_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      role="radio"
                      aria-checked={form.client_type === type}
                      data-testid={`contact-client-type-${type.split(/[\s/]+/)[0].toLowerCase()}`}
                      onClick={() => set("client_type", type)}
                      className={`pill ${form.client_type === type ? "pill-active" : ""}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                {errors.client_type && (
                  <p data-testid="contact-error-client-type" className="field-error">
                    {errors.client_type}
                  </p>
                )}
              </fieldset>

              <fieldset className="mt-12">
                <legend className="field-label">
                  What support are you looking for? — select all that apply
                </legend>
                <div data-testid="contact-support-areas" className="mt-3 flex flex-wrap gap-3">
                  {SUPPORT_AREAS.map((area) => (
                    <button
                      key={area}
                      type="button"
                      role="checkbox"
                      aria-checked={form.services.includes(area)}
                      data-testid={`contact-support-${area.split(/[\s/]+/)[0].toLowerCase()}`}
                      onClick={() => toggleService(area)}
                      className={`pill ${form.services.includes(area) ? "pill-active" : ""}`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="mt-12">
                <label htmlFor="cf-message" className="field-label">
                  Message
                </label>
                <textarea
                  id="cf-message"
                  data-testid="contact-input-message"
                  rows={5}
                  className="field-input resize-y"
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <p data-testid="contact-error-message" className="field-error">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Honeypot — spam protection, hidden from real users */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="cf-company-url">Company URL</label>
                <input
                  id="cf-company-url"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.company_url}
                  onChange={(e) => set("company_url", e.target.value)}
                />
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-8">
                <button
                  type="submit"
                  data-testid="contact-submit"
                  disabled={status === "sending"}
                  className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Start a Conversation"}
                </button>
                <p className="max-w-sm text-xs leading-relaxed text-slate-400">
                  Please do not submit sensitive client or financial information through this form.
                </p>
              </div>
            </form>
          )}

          <aside data-testid="contact-aside" className="lg:col-span-4">
            <div className="border-t border-hairline pt-8 lg:sticky lg:top-32">
              <p className="eyebrow">What Happens Next</p>
              <ol className="mt-6 space-y-6">
                {NEXT_STEPS.map((step, i) => (
                  <li key={i} className="flex gap-5">
                    <span className="font-serif text-sm italic text-slate-400">0{i + 1}</span>
                    <span className="text-[15px] leading-relaxed text-inksoft">{step}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-10 border-t border-hairline pt-6 font-serif text-lg italic text-inksoft">
                We’ll start there.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
