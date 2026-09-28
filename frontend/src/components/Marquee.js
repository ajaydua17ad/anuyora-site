const ITEMS = [
  "Monthly Bookkeeping",
  "Bank & Credit-Card Reconciliations",
  "Accounts Payable",
  "Accounts Receivable",
  "Month-End Close",
  "Financial Reporting",
  "Cleanup & Catch-Up",
  "Transaction Categorization",
  "Journal Entries",
];

function Row({ hidden }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {ITEMS.map((item) => (
        <li key={item} className="flex items-center whitespace-nowrap">
          <span className="font-serif text-xl italic text-slate-400 md:text-2xl">{item}</span>
          <span className="mx-10 inline-block h-[5px] w-[5px] bg-slate-300 md:mx-14" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
}

export default function Marquee() {
  return (
    <section
      data-testid="services-marquee"
      aria-label="ANUYORA bookkeeping services"
      className="overflow-hidden border-y border-hairline bg-white/60 py-6 md:py-8"
    >
      <div className="marquee-track flex w-max">
        <Row />
        <Row hidden />
      </div>
    </section>
  );
}
