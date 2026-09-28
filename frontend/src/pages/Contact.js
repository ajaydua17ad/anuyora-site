import { useSearchParams } from "react-router-dom";
import Seo from "@/components/Seo";
import { PageIntro } from "@/components/PageIntro";
import { ContactDetails } from "@/components/ContactDetails";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { EnquirySuccess } from "@/components/contact/EnquirySuccess";
import { useEnquiry } from "@/hooks/useEnquiry";

const NEXT_STEPS = ["We review your requirements.", "We arrange a conversation.", "We agree on a scope and next steps."];

export default function Contact() {
  const [params] = useSearchParams();
  const enquiry = useEnquiry(params.get("type"));
  return (
    <div data-testid="page-contact">
      <Seo title="Contact ANUYORA | Bookkeeping Support for US Firms & SMBs" description="Discuss your bookkeeping requirements with ANUYORA. Email contact@anuyora.com or tell us about your business using our enquiry form. Based in Delhi, India." path="/contact" />
      <PageIntro id="contact" label="Contact" title={<>Let’s start with <em>what you need.</em></>}>
        <p>More capacity for your firm. Consistent bookkeeping for your business. Tell us what you’re managing, and we’ll explore the right support.</p>
      </PageIntro>
      <section data-testid="contact-form-section" className="wrap pb-16 md:pb-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            {enquiry.status === "success" ? <EnquirySuccess receipt={enquiry.receipt} reset={enquiry.reset} /> : <EnquiryForm enquiry={enquiry} />}
          </div>
          <aside data-testid="contact-aside" className="lg:col-span-4">
            <div className="border-t border-hairline pt-6 lg:sticky lg:top-32">
              <h2 className="font-sans text-base font-semibold md:text-lg">Prefer a direct conversation?</h2>
              <div className="mt-6"><ContactDetails id="contact" /></div>
              <div className="mt-9 border-t border-hairline pt-7">
                <h2 className="eyebrow">What Happens Next</h2>
                <ol className="mt-5 space-y-5">
                  {NEXT_STEPS.map((step, i) => <li key={step} data-testid={`contact-next-step-${i + 1}`} className="flex gap-4 text-sm leading-6 text-inksoft"><span aria-hidden="true" className="pt-0.5 text-xs text-slate-500">0{i + 1}</span><span>{step}</span></li>)}
                </ol>
              </div>
              <p className="mt-9 border-t border-hairline pt-6 font-serif text-lg italic text-inksoft">Your business. Your requirements.<br />Our starting point.</p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}