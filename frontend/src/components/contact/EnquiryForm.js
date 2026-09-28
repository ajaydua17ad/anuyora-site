import { ArrowRight, Loader2 } from "lucide-react";
import { EnquiryField } from "@/components/contact/EnquiryField";
import { EnquiryChoices } from "@/components/contact/EnquiryChoices";
import { CONTACT } from "@/constants/site";

export const EnquiryForm = ({ enquiry }) => {
  const { form, errors, status, serverError, set, toggleService, onSubmit } = enquiry;
  const field = (name) => ({ name, value: form[name], error: errors[name], onChange: set });
  return (
    <form onSubmit={onSubmit} noValidate data-testid="contact-form" aria-busy={status === "sending"}>
      <div className="mb-7 flex flex-wrap items-baseline justify-between gap-3 border-t border-hairline pt-6">
        <h2 className="font-sans text-base font-semibold md:text-lg">Tell us about your requirements</h2>
        <p className="text-xs text-slate-500">* Required fields</p>
      </div>
      {serverError && <div data-testid="form-error" role="alert" className="mb-6 border-l-2 border-red-700 bg-red-50 p-4 text-sm leading-6 text-red-800">
        {serverError} <a data-testid="form-error-email" href={`mailto:${CONTACT.email}`} className="underline underline-offset-4">{CONTACT.email}</a>
      </div>}
      <fieldset disabled={status === "sending"}>
        <legend className="sr-only">Your enquiry</legend>
        <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
          <EnquiryField {...field("name")} label="Full name" type="text" autoComplete="name" maxLength={200} />
          <EnquiryField {...field("email")} label="Work email" type="email" autoComplete="email" maxLength={254} />
          <EnquiryField {...field("company")} label="Company" type="text" autoComplete="organization" maxLength={200} />
          <EnquiryField {...field("website")} label="Company website" type="url" autoComplete="url" maxLength={300} placeholder="https://" optional />
        </div>
        <EnquiryChoices form={form} set={set} toggleService={toggleService} error={errors.client_type} />
        <div className="mt-9"><EnquiryField {...field("message")} label="What would you like us to help with?" multiline rows={5} maxLength={5000} /></div>
        <div hidden aria-hidden="true"><label htmlFor="cf-company-url">Company URL</label><input id="cf-company-url" data-testid="contact-honeypot" type="text" tabIndex={-1} autoComplete="off" value={form.company_url} onChange={(event) => set("company_url", event.target.value)} /></div>
        <p data-testid="contact-sensitive-info-note" className="mt-4 text-xs leading-6 text-slate-500">Please don’t include passwords, account numbers or sensitive client information.</p>
        <button type="submit" data-testid="contact-submit" disabled={status === "sending"} className="btn-primary mt-7 w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto">
          {status === "sending" ? <><Loader2 size={17} className="animate-spin" aria-hidden="true" />Sending enquiry…</> : <>Send Enquiry<ArrowRight size={16} aria-hidden="true" /></>}
        </button>
      </fieldset>
    </form>
  );
};