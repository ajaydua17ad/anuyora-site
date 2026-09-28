import { useEffect, useRef } from "react";
import { Check } from "lucide-react";
import { CONTACT } from "@/constants/site";

export const EnquirySuccess = ({ receipt, reset }) => {
  const ref = useRef(null);
  useEffect(() => { ref.current?.focus(); }, []);
  return (
    <div data-testid="form-success" role="status" tabIndex={-1} ref={ref} className="scroll-mt-32 border-t-2 border-navy-mid bg-[#f3f6f9] px-6 py-10 focus:outline-none md:px-10">
      <Check size={30} strokeWidth={1.5} className="text-navy-mid" aria-hidden="true" />
      <p className="eyebrow mt-6">Enquiry Received</p>
      <h2 data-testid="form-success-heading" className="section-title mt-4">Thank you for reaching out.</h2>
      <p className="body-copy mt-5">Your enquiry has been saved. We’ll review your requirements and get in touch to continue the conversation.</p>
      {receipt?.email_notification !== "sent" && <p data-testid="form-notification-notice" className="mt-5 text-sm leading-7 text-inksoft">Our email notification couldn’t be sent. For a time-sensitive enquiry, please contact us at <a data-testid="form-success-email" href={`mailto:${CONTACT.email}`} className="underline underline-offset-4">{CONTACT.email}</a>.</p>}
      {receipt?.enquiry_id && <p data-testid="form-reference" className="mt-6 text-xs text-slate-500">Reference: {receipt.enquiry_id.slice(0, 8).toUpperCase()}</p>}
      <button type="button" data-testid="form-success-reset" onClick={reset} className="btn-outline mt-8">Send Another Enquiry</button>
    </div>
  );
};