import { useRef, useState } from "react";
import { CLIENT_TYPES, emptyEnquiry } from "@/constants/enquiry";

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
  const toggleService = (value) => setForm((previous) => ({ ...previous, services: previous.services.includes(value) ? previous.services.filter((item) => item !== value) : [...previous.services, value] }));
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
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45000);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contact`, {
        method: "POST", headers: { "Content-Type": "application/json" }, signal: controller.signal,
        body: JSON.stringify({ ...form, email: form.email.trim() }),
      });
      if (!response.ok) throw new Error(response.status === 429 ? "Please wait a few minutes before sending another enquiry, or email us directly." : "We couldn’t send your enquiry. Your answers are still here—please try again or email us directly.");
      setReceipt(await response.json());
      setStatus("success");
    } catch (error) {
      setServerError(error.name === "AbortError" ? "The request is taking longer than expected. Please contact us directly if you’re unsure whether your enquiry reached us." : error.message === "Failed to fetch" ? "We couldn’t connect. Your answers are still here—please try again or email us directly." : error.message);
      setStatus("idle");
    } finally {
      clearTimeout(timeout);
      sending.current = false;
    }
  };
  const reset = () => { setForm({ ...emptyEnquiry }); setErrors({}); setStatus("idle"); setServerError(""); setReceipt(null); };
  return { form, errors, status, serverError, receipt, set, toggleService, onSubmit, reset };
};