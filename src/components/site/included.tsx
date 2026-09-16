"use client";

import { Check, Minus } from "lucide-react";

import { BlurFade } from "@/components/ui/blur-fade";
import { SectionHeading } from "@/components/site/section-heading";
import { INCLUDED, NOT_INCLUDED, STANDARD } from "@/data/content";

export function Included({ compact = false }: { compact?: boolean }) {
  return (
    <section
      id="sostav"
      className="border-b border-line-soft bg-ink-raise/40 py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <BlurFade inView direction="up" offset={10}>
          <SectionHeading
            eyebrow="Спецификация"
            title="Что входит в цену"
            lead="Построчно - как в смете. Всё, чего здесь нет, обсуждаем до выезда и вносим в договор отдельной строкой."
          />
        </BlurFade>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <BlurFade inView direction="up" className="lg:col-span-7">
            <ul className="divide-y divide-line-soft border-y border-line-soft">
              {INCLUDED.map((item) => (
                <li key={item} className="flex gap-4 py-4 text-[16px] leading-relaxed text-foreground/85">
                  <Check className="mt-1 size-5 shrink-0 text-orange" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </BlurFade>

          <BlurFade inView direction="up" delay={0.1} className="lg:col-span-5">
            <p className="stamp text-muted-ink">Не входит</p>
            <ul className="mt-4 divide-y divide-line-soft border-y border-line-soft">
              {NOT_INCLUDED.map((item) => (
                <li key={item} className="flex gap-4 py-4 text-[16px] leading-relaxed text-muted-ink">
                  <Minus className="mt-1 size-5 shrink-0 text-line" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </BlurFade>
        </div>

        {!compact && (
          <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line-soft sm:grid-cols-2 lg:grid-cols-4">
            {STANDARD.map((s, i) => (
              <BlurFade key={s.title} inView direction="up" delay={i * 0.06}>
                <div className="h-full bg-ink p-6">
                  <h3 className="text-lg font-semibold text-cream">{s.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-foreground/75">
                    {s.body}
                  </p>
                </div>
              </BlurFade>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
