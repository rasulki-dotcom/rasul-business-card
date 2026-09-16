"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { SectionHeading } from "@/components/site/section-heading";
import { CARE } from "@/data/content";

export function CareSection() {
  return (
    <section id="uhod" className="border-b border-line-soft py-24 lg:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <BlurFade inView direction="up" offset={10}>
          <SectionHeading
            eyebrow="Сдача и уход"
            title="Первые 28 суток и трещины"
            lead="Стяжка набирает проектную прочность 28 суток. Что за это время нормально, а что - повод позвонить нам, договариваемся до сдачи, а не после."
          />
        </BlurFade>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line-soft lg:grid-cols-3">
          {CARE.map((block, i) => (
            <BlurFade key={block.title} inView direction="up" delay={i * 0.06}>
              <div className="h-full bg-ink p-7 sm:p-8">
                <p className="stamp text-orange">{block.eyebrow}</p>
                <h3 className="mt-3 text-2xl font-semibold text-cream">{block.title}</h3>
                <ul className="mt-5 space-y-3">
                  {block.items.map((it) => (
                    <li key={it} className="flex gap-3 text-[16px] leading-relaxed text-foreground/80">
                      <span aria-hidden className="mt-2.5 size-1.5 shrink-0 bg-orange" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
