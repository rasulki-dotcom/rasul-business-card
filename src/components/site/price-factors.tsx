"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { SectionHeading } from "@/components/site/section-heading";
import { PRICE_FACTORS } from "@/data/content";

export function PriceFactors() {
  return (
    <section id="price" className="border-b border-line-soft py-24 lg:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <BlurFade inView direction="up" offset={10}>
          <SectionHeading
            eyebrow="Честная формула"
            title="Из чего складывается цена"
            lead="Четыре вещи, которые двигают сумму. Все они названы до замера, а не после - чтобы вы могли сверить любого подрядчика, не только нас."
          />
        </BlurFade>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line-soft md:grid-cols-2">
          {PRICE_FACTORS.map((f, i) => (
            <BlurFade key={f.title} inView direction="up" delay={i * 0.06}>
              <div className="h-full bg-ink p-7 sm:p-8">
                <span className="stamp text-orange">0{i + 1}</span>
                <h3 className="mt-4 text-2xl font-semibold text-cream">{f.title}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-foreground/80">
                  {f.body}
                </p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
