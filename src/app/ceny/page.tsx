import type { Metadata } from "next";

import { Contacts } from "@/components/site/contacts";
import { Estimator } from "@/components/site/estimator";
import { Included } from "@/components/site/included";
import {
  B2BPrice,
  CompareOffers,
  ExtraWorks,
  KeyConditions,
  PaymentProfiles,
  RetailGrid,
} from "@/components/site/price-tables";
import { RequestForm } from "@/components/site/request-form";
import { SectionHeading } from "@/components/site/section-heading";
import { COMPANY } from "@/data/company";
import { PRICING_SYNCED_AT_HUMAN } from "@/data/pricing";

export const metadata: Metadata = {
  title: `Цены на полусухую стяжку пола в Уфе · ${COMPANY.brand}`,
  description:
    "Ставка за м² с толщиной слоя рядом, минимальный заказ, доплаты, профили оплаты для частных лиц и юрлиц, прайс от 1000 м² и калькулятор ориентира.",
};

export default function PricesPage() {
  return (
    <>
      <section className="border-b border-line-soft bg-ink-raise/40 pt-16 pb-14 lg:pt-24 lg:pb-20">
        <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
          <SectionHeading
            as="h1"
            eyebrow={`Прайс · актуален на ${PRICING_SYNCED_AT_HUMAN}`}
            title="Цены на полусухую стяжку пола в Уфе"
            lead="Все условия названы здесь, до замера: толщина, минимальный заказ, доплаты, кто платит и что не входит. После бесплатного замера цена фиксируется и во время работы не меняется."
          />
          <div className="mt-12">
            <KeyConditions />
          </div>
        </div>
      </section>
      <RetailGrid />
      <Estimator />
      <PaymentProfiles />
      <B2BPrice />
      <ExtraWorks />
      <Included compact />
      <CompareOffers />
      <RequestForm />
      <Contacts />
    </>
  );
}
