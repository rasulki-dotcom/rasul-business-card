"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { SectionHeading } from "@/components/site/section-heading";
import {
  B2B,
  BASE_THICKNESS_CM,
  EXTRA_CM_RATE,
  DELIVERY_RATE_PER_KM,
  FREE_DELIVERY_KM,
  SMALL_AREA_INDIVIDUAL_M2,
  FLOOR_SURCHARGE_ABOVE,
  HOUSE_FULL_RATE_FROM_M2,
  HOUSE_SMALL_RATE_RANGE,
  MIN_ORDER,
  MIN_ORDER_EQUIV_M2,
  PAYMENT_PROFILES,
  formatRub,
} from "@/data/pricing";

const p = PAYMENT_PROFILES[0].rates;
const base = `${BASE_THICKNESS_CM} см`;

const CARDS = [
  {
    title: "Квартира",
    price: `${p.apartment} ₽/м²`,
    cond: `при слое ${base}`,
    body: "Подъём до пятого этажа включён. Тёплый пол, звукоизоляция - по проекту.",
  },
  {
    title: "Дом",
    price: `${p.house} ₽/м²`,
    cond: `при слое ${base}, от ${HOUSE_FULL_RATE_FROM_M2} м²`,
    body: `Меньше ${HOUSE_FULL_RATE_FROM_M2} м² - договорная, ${HOUSE_SMALL_RATE_RANGE.from}-${HOUSE_SMALL_RATE_RANGE.to} ₽/м².`,
  },
  {
    title: `Объекты от ${B2B.fromArea} м²`,
    price: `${B2B.withMaterials.rate} ₽/м²`,
    cond: `с материалом, слой до ${B2B.withMaterials.upToCm} см, с НДС`,
    body: `Без материала исполнителя - ${B2B.withoutMaterials.rateUpTo10cm} ₽/м². Оплата участками по ${B2B.paymentTrancheM2} м².`,
  },
] as const;

const CONDITIONS = [
  `Минимальный заказ ${formatRub(MIN_ORDER)} - это ~${MIN_ORDER_EQUIV_M2.apartment} м² квартиры или ~${MIN_ORDER_EQUIV_M2.house} м² дома`,
  `+${EXTRA_CM_RATE} ₽/м² за каждый см сверх ${BASE_THICKNESS_CM}`,
  `Подъём выше ${FLOOR_SURCHARGE_ABOVE} этажа - отдельно`,
  `Выезд: первые ${FREE_DELIVERY_KM} км включены, дальше ${DELIVERY_RATE_PER_KM} ₽/км`,
  `Площадь до ${SMALL_AREA_INDIVIDUAL_M2} м² - считаем индивидуально`,
] as const;

export function PricesSummary() {
  return (
    <section id="ceny-kratko" className="border-b border-line-soft py-24 lg:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <BlurFade inView direction="up" offset={10}>
          <SectionHeading
            eyebrow="Цены"
            title="Ставка и толщина - рядом"
            lead="Ставка за м² названа для конкретной толщины. Это единственный способ сравнить предложения честно."
          />
        </BlurFade>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {CARDS.map((c, i) => (
            <BlurFade key={c.title} inView direction="up" delay={i * 0.08}>
              <MagicCard
                gradientSize={260}
                gradientFrom="#ef7f1a"
                gradientTo="#b85f0e"
                gradientColor="#3a2a17"
                gradientOpacity={0.65}
                className="h-full rounded-lg"
              >
                <div className="relative z-40 flex h-full flex-col p-7">
                  <p className="stamp text-muted-ink">{c.title}</p>
                  <p className="mt-4 font-mono text-[2rem] leading-none text-cream">
                    {c.price}
                  </p>
                  <p className="mt-2 text-[15px] text-orange">{c.cond}</p>
                  <p className="mt-5 text-[16px] leading-relaxed text-foreground/80">
                    {c.body}
                  </p>
                </div>
              </MagicCard>
            </BlurFade>
          ))}
        </div>

        <BlurFade inView direction="up">
          <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-2 border-l-2 border-line pl-5 text-[16px] leading-relaxed text-muted-ink sm:grid-cols-2">
            {CONDITIONS.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <Link
            href="/ceny"
            className="mt-10 inline-flex h-14 items-center gap-3 rounded-md border border-orange/60 px-7 text-base font-semibold text-cream transition-colors hover:bg-orange hover:text-ink"
          >
            Полный прайс и калькулятор ориентира
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </BlurFade>
      </div>
    </section>
  );
}
