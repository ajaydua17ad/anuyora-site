export default function Wordmark({ tone = "dark", className = "", id = "header" }) {
  const light = tone === "light";
  return (
    <span className={`brand-mark ${light ? "text-white" : "text-navy"} ${className}`}>
      <img
      src={light ? "/anuyora-logo-white.png" : "/anuyora-logo.png"}
      alt="ANUYORA"
        width={1508}
        height={317}
        data-testid={`${id}-wordmark`}
        className="block h-auto w-full"
      />
      <span data-testid={`${id}-trademark`} aria-label="trademark" className="brand-trademark">™</span>
    </span>
  );
}
