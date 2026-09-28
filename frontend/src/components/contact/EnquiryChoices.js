import { CLIENT_TYPES, SUPPORT_AREAS, optionId } from "@/constants/enquiry";

export const EnquiryChoices = ({ form, set, toggleService, error }) => (
  <>
    <fieldset className="mt-9" aria-describedby={error ? "cf-client-type-error" : undefined}>
      <legend className="field-label">Which best describes you? <span aria-hidden="true">*</span></legend>
      <div data-testid="contact-client-type" className="mt-2 grid gap-3 sm:grid-cols-2">
        {CLIENT_TYPES.map((type, i) => <label key={type} className="choice-label">
          <input type="radio" name="client_type" id={i === 0 ? "cf-client_type" : `cf-type-${i}`} required value={type}
            checked={form.client_type === type} onChange={() => set("client_type", type)}
            aria-invalid={!!error} aria-describedby={error ? "cf-client-type-error" : undefined}
            data-testid={`contact-client-type-${optionId(type)}`} className="choice-input" />
          <span>{type === "Business" ? "Small / Mid-sized Business" : type}</span>
        </label>)}
      </div>
      {error && <p id="cf-client-type-error" data-testid="contact-error-client-type" className="field-error" role="alert">{error}</p>}
    </fieldset>
    <fieldset className="mt-9">
      <legend className="field-label">Where do you need support? <span className="font-normal text-slate-500">(optional)</span></legend>
      <div data-testid="contact-support-areas" className="mt-2 grid gap-3 sm:grid-cols-2">
        {SUPPORT_AREAS.map(([value, label]) => <label key={value} className="choice-label">
          <input type="checkbox" name="services" value={value} checked={form.services.includes(value)} onChange={() => toggleService(value)}
            data-testid={`contact-support-${optionId(value)}`} className="choice-input" />
          <span>{label}</span>
        </label>)}
      </div>
    </fieldset>
  </>
);