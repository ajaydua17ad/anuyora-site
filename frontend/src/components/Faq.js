export default function Faq({ items }) {
  return (
    <div data-testid="faq-list">
      {items.map((item, i) => (
        <details
          key={i}
          data-testid={`faq-item-${i + 1}`}
          className="group border-t border-hairline last:border-b"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 transition-colors duration-200 hover:text-navy-mid md:py-7">
            <span className="font-serif text-lg md:text-xl">{item.q}</span>
            <span
              aria-hidden="true"
              className="relative inline-block h-4 w-4 shrink-0 text-inksoft transition-transform duration-300 group-open:rotate-45"
            >
              <span className="absolute left-0 top-1/2 h-px w-full bg-current" />
              <span className="absolute left-1/2 top-0 h-full w-px bg-current" />
            </span>
          </summary>
          <p className="max-w-2xl pb-7 text-[15px] leading-relaxed text-inksoft">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
