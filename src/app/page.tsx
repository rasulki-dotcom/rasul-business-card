import { B2BSection } from "@/components/site/b2b";
import { CareSection } from "@/components/site/care-section";
import { Contacts } from "@/components/site/contacts";
import { Faq } from "@/components/site/faq";
import { GeoRatings } from "@/components/site/geo-ratings";
import { Hero } from "@/components/site/hero";
import { Included } from "@/components/site/included";
import { Objects } from "@/components/site/objects";
import { PriceFactors } from "@/components/site/price-factors";
import { PricesSummary } from "@/components/site/prices-summary";
import { Process } from "@/components/site/process";
import { RequestForm } from "@/components/site/request-form";
import { ScreedSection } from "@/components/site/screed-section";

export default function Page() {
  return (
    <>
      <Hero />
      <PriceFactors />
      <ScreedSection />
      <PricesSummary />
      <Included />
      <Process />
      <CareSection />
      <Objects />
      <B2BSection />
      <Faq />
      <RequestForm />
      <GeoRatings />
      <Contacts />
    </>
  );
}
