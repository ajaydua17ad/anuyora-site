import { useRef, useState } from "react";
import { CLIENT_TYPES, emptyEnquiry } from "@/constants/enquiry";

const NETWORK_RETRY_DELAY_MS = 1000;
const REQUEST_TIMEOUT_MS = 45000;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isNetworkError = (error) =>
  error instanceof TypeError ||
  /failed to fetch|networkerror|network request failed|load failed/i.test(error?.message || "");

const sendEnquiry = async (payload) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify(payload),
    });
  } finally {
    clearTimeout(timeout);
  }
};

export const useEnquiry = (clientType) => {
  const [form, setForm] = useState({ ...emptyEnquiry, client_type: CLIENT_TYPES.includes(clientType) ? clientType : "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverError, setServerError] = useState("");
  const [receipt, setReceipt] = useState(null);
  const sending = useRef(false);

  const set = (key, value) => {
    setForm((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => ({ ...previous, [key]: undefined }));
  };

  const toggleService = (value) =>
    setForm((previous) => ({
      ...previous,
      services: previous.services.includes(value)
        ? previous.services.filter((item) => item !== value)
        : [...previous.services, value],
    }));

  const onSubmit = async (event) => {
    event.preventDefault();
    if (sending.current) return;

    const invalid = {};
    if (!form.name.trim()) invalid.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) invalid.email = "Please enter a valid work email.";
    if (!form.company.trim()) invalid.company = "Please enter your company.";
    if (!form.client_type) invalid.client_type = "Please select your business type.";
    if (!form.message.trim()) invalid.message = "Please tell us briefly what you need.";

    setErrors(invalid);
    if (Object.keys(invalid).length) {
      requestAnimationFrame(() => document.getElementById(`cf-${Object.keys(invalid)[0]}`)?.focus());
      return;
    }

    sending.current = true;
    setStatus("sending");
    setServerError("");

    const requestId = crypto.randomUUID();
    const payload = { ...form, email: form.email.trim(), request_id: requestId };

    try {
      let response;
      try {
        response = await sendEnquiry(payload);
      } catch (error) {
        if (!isNetworkError(error)) throw error;
        await wait(NETWORK_RETRY_DELAY_MS);
        response = await sendEnquiry(payload);
      }

      if (!response.ok) {
        throw new Error(
          response.status === 429
            ? "Please wait a few minutes before sending another enquiry, or email us directly."
            : "We couldn’t send your enquiry. Your answers are still here—please try again or email us directly."
        );
      }

      setReceipt(await response.json());
      setStatus("success");
    } catch (error) {
      setServerError(
        error.name === "AbortError"
          ? "The request is taking longer than expected. Please contact us directly if you’re unsure whether your enquiry reached us."
          : isNetworkError(error)
            ? "We couldn’t connect. Your answers are still here—please try again or email us directly."
            : error.message
      );
      setStatus("idle");
    } finally {
      sending.current = false;
    }
  };

  const reset = () => {
    setForm({ ...emptyEnquiry });
    setErrors({});
    setStatus("idle");
    setServerError("");
    setReceipt(null);
  };

  return { form, errors, status, serverError, receipt, set, toggleService, onSubmit, reset };
};
