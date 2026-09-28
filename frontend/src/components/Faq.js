import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function Faq({ items }) {
  return (
    <Accordion type="single" collapsible data-testid="faq-list" className="border-t border-hairline">
      {items.map((item, i) => (
        <AccordionItem key={item.q} value={`question-${i}`} data-testid={`faq-item-${i + 1}`} className="border-hairline">
          <AccordionTrigger data-testid={`faq-trigger-${i + 1}`} className="gap-6 py-6 text-base font-medium text-ink hover:text-navy-mid hover:no-underline md:py-7 md:text-lg">
            {item.q}
          </AccordionTrigger>
          <AccordionContent data-testid={`faq-answer-${i + 1}`} className="max-w-2xl pb-7 text-sm leading-7 text-inksoft md:text-base">{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}