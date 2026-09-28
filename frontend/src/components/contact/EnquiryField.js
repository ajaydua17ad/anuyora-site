export const EnquiryField = ({ name, label, value, onChange, error, optional = false, multiline = false, ...props }) => {
  const Control = multiline ? "textarea" : "input";
  return (
    <div>
      <label htmlFor={`cf-${name}`} className="field-label">{label} {optional ? <span className="font-normal text-slate-500">(optional)</span> : <span aria-hidden="true" className="text-slate-500">*</span>}</label>
      <Control id={`cf-${name}`} name={name} data-testid={`contact-input-${name}`} value={value}
        onChange={(event) => onChange(name, event.target.value)} className={`field-input ${multiline ? "min-h-[140px] resize-y" : ""}`}
        required={!optional} aria-invalid={!!error} aria-describedby={error ? `cf-${name}-error` : undefined} {...props} />
      {error && <p id={`cf-${name}-error`} data-testid={`contact-error-${name}`} className="field-error" role="alert">{error}</p>}
    </div>
  );
};