"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";

import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Spotlight } from "@/components/ui/spotlight-new";
import { COMPANY, MAX_NOTE, MESSENGERS, messengerLink } from "@/data/company";
import {
  BASE_THICKNESS_CM,
  EXTRA_CM_RATE,
  HOUSE_FULL_RATE_FROM_M2,
  MIN_ORDER,
  MIN_ORDER_EQUIV_M2,
  PAYMENT_PROFILES,
  WARRANTY_HUMAN,
  formatRub,
} from "@/data/pricing";

const privateRates = PAYMENT_PROFILES[0].rates;

/** Штамп чертежа: толщина стоит рядом с ценой - это и есть наша позиция. */
const SPEC = [
  {
    key: "Квартира",
    value: `от ${privateRates.apartment} ₽/м²`,
    note: `при слое ${BASE_THICKNESS_CM} см`,
  },
  {
    key: "Дом",
    value: `от ${privateRates.house} ₽/м²`,
    note: `при слое ${BASE_THICKNESS_CM} см, от ${HOUSE_FULL_RATE_FROM_M2} м²`,
  },
  {
    key: "Толще",
    value: `+${EXTRA_CM_RATE} ₽/м²`,
    note: "за каждый следующий сантиметр",
  },
  {
    key: "Минимальный заказ",
    value: formatRub(MIN_ORDER),
    note: `это ~${MIN_ORDER_EQUIV_M2.apartment} м² квартиры или ~${MIN_ORDER_EQUIV_M2.house} м² дома`,
  },
  { key: "Замер", value: "бесплатно", note: "цена после замера не меняется" },
  { key: "Гарантия", value: WARRANTY_HUMAN, note: "прочность, целостность, ровность - в договоре" },
] as const;

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-line-soft">
      <GridPattern
        width={44}
        height={44}
        className="[mask-image:radial-gradient(120%_90%_at_50%_0%,#000_35%,transparent_100%)] stroke-line/70 fill-transparent"
      />
      <div className="pointer-events-none absolute inset-0 motion-reduce:hidden">
        <Spotlight
          gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(30, 87%, 52%, .07) 0, hsla(30, 87%, 52%, .02) 50%, transparent 80%)"
          gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(30, 87%, 52%, .05) 0, hsla(30, 87%, 45%, .015) 80%, transparent 100%)"
          gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(48, 100%, 93%, .03) 0, hsla(30, 87%, 45%, .01) 80%, transparent 100%)"
          duration={9}
          xOffset={70}
        />
      </div>

      <div className="relative z-50 mx-auto w-full max-w-6xl px-6 pt-16 pb-16 lg:px-8 lg:pt-24 lg:pb-24">
        <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="stamp text-muted-ink">
              {COMPANY.city} · {COMPANY.region}
            </p>

            <h1 className="stencil mt-6 text-cream text-[clamp(2.6rem,7.2vw,5.4rem)] leading-[0.9]">
              Полусухая стяжка пола
              <span className="mt-2 block text-orange">в Уфе</span>
            </h1>

            <div className="rule mt-8 max-w-md" />

            <p className="mt-7 max-w-[46ch] text-[17px] leading-relaxed text-foreground/85 sm:text-xl">
              Механизированно, по СНиП, с фиброволокном и пластификатором.
              Толщина слоя стоит рядом с ценой. Замер бесплатный: после него
              называем точную сумму и дату - и держим их.
            </p>

            <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
              <a
                href={COMPANY.phoneHref}
                className="hidden h-16 w-full items-center justify-center gap-3 rounded-[0.6rem] border border-orange/60 bg-ink-raise px-8 font-mono text-lg text-cream transition-colors hover:bg-graphite motion-reduce:flex sm:w-auto"
              >
                <Phone className="size-4 text-orange" aria-hidden />
                {COMPANY.phoneDisplay}
              </a>
              <div className="contents motion-reduce:hidden">
                <MovingBorderButton
                  as="a"
                  href={COMPANY.phoneHref}
                  borderRadius="0.6rem"
                  duration={4200}
                  containerClassName="h-16 w-full sm:w-auto"
                  borderClassName="h-24 w-24 bg-[radial-gradient(#ef7f1a_38%,transparent_62%)] opacity-90"
                  className="gap-3 border-line bg-ink-raise/90 px-8 font-mono text-lg text-cream transition-colors hover:bg-graphite"
                >
                  <Phone className="size-4 text-orange" aria-hidden />
                  {COMPANY.phoneDisplay}
                </MovingBorderButton>
              </div>

              <Link
                href="/ceny#orientir"
                className="flex h-16 w-full items-center justify-center gap-3 rounded-[0.6rem] border border-line bg-surface/60 px-8 text-base font-semibold text-cream transition-colors hover:border-orange/60 hover:bg-graphite sm:w-auto"
              >
                Рассчитать ориентир
                <ArrowRight className="size-4 text-orange" aria-hidden />
              </Link>
            </div>

            <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[16px] text-foreground/80">
              <span className="inline-flex items-center gap-2">
                <MessageCircle className="size-4 text-orange" aria-hidden />
                Написать:
              </span>
              {MESSENGERS.map((m) => (
                <a
                  key={m.key}
                  href={messengerLink(m.key)}
                  target="_blank"
                  rel="noreferrer"
                  className="border-b border-line pb-0.5 text-cream transition-colors hover:border-orange hover:text-orange"
                >
                  {m.name}
                </a>
              ))}
              <span className="text-muted-ink">{MAX_NOTE}</span>
            </p>
          </div>

          <div className="lg:col-span-5 lg:pb-2">
            {/* Знак бренда: затирочная машина - единственная картинка первого экрана. */}
            <Image
              src="/logo-square.png"
              alt={`${COMPANY.brand} - затирочная машина`}
              width={900}
              height={652}
              priority
              className="mb-10 h-auto w-[220px] sm:w-[260px]"
            />
            <dl>
            {SPEC.map((row) => (
              <div
                key={row.key}
                className="grid grid-cols-1 gap-1 border-t border-line-soft py-4 last:border-b sm:grid-cols-[9rem_1fr] sm:gap-5"
              >
                <dt className="stamp pt-1.5 text-muted-ink">{row.key}</dt>
                <dd>
                  <span className="font-mono text-xl text-cream">{row.value}</span>
                  <span className="block text-[15px] text-muted-ink">{row.note}</span>
                </dd>
              </div>
            ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
