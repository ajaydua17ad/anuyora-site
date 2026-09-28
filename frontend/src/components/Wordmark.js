export default function Wordmark({ tone = "dark", className = "" }) {
  const light = tone === "light";
  return (
    <img
      src={light ? "/anuyora-logo-white.png" : "/anuyora-logo.png"}
      alt="ANUYORA"
      width={160}
      height={33}
      data-testid="anuyora-wordmark"
      className={`${light ? "h-8" : "h-10 md:h-11"} w-auto ${className}`}
    />
  );
}
