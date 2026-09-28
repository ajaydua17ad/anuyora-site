export default function Wordmark({ tone = "dark", className = "" }) {
  if (tone === "light") {
    return (
      <span className={`inline-flex items-center bg-white px-4 py-3 ${className}`}>
        <img src="/anuyora-logo.png" alt="ANUYORA" width={160} height={53} className="h-8 w-auto" />
      </span>
    );
  }
  return (
    <img
      src="/anuyora-logo.png"
      alt="ANUYORA"
      width={160}
      height={53}
      data-testid="anuyora-wordmark"
      className={`h-9 w-auto md:h-10 ${className}`}
    />
  );
}
