export default function Wordmark({ tone = "dark", className = "" }) {
  const color = tone === "light" ? "text-navy-text" : "text-ink";
  const box = tone === "light" ? "bg-navy-text" : "bg-navy";
  return (
    <span className={`inline-flex items-center gap-3 ${className}`} data-testid="anuyora-wordmark">
      <span className={`inline-block h-[7px] w-[7px] ${box}`} aria-hidden="true" />
      <span className={`font-serif text-[17px] font-semibold tracking-[0.24em] ${color}`}>
        ANUYORA
      </span>
    </span>
  );
}
