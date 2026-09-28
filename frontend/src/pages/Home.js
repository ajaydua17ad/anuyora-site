import Seo from "@/components/Seo";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeServices } from "@/components/home/HomeServices";
import { HomeApproach } from "@/components/home/HomeApproach";
import { HomeProcess } from "@/components/home/HomeProcess";
import { PageCTA } from "@/components/PageCTA";

export default function Home() {
  return (
    <div data-testid="page-home">
      <Seo title="Outsourced Bookkeeping for US Firms & SMBs | ANUYORA"
        description="Dependable bookkeeping support for US accounting firms, CPA practices and growing businesses. Monthly books, reconciliations, AP/AR and month-end reporting." path="/" />
      <HomeHero />
      <HomeServices />
      <HomeApproach />
      <HomeProcess />
      <PageCTA id="home" title="Let’s make room for what’s next." label="Talk to ANUYORA">
        Tell us what you’re managing today and where your team needs additional bookkeeping capacity.
      </PageCTA>
    </div>
  );
}