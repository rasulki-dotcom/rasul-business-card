"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { SectionHeading } from "@/components/site/section-heading";
import { PROCESS } from "@/data/content";

export function Process() {
  return (
    <section id="process" className="border-b border-line-soft py-24 lg:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <BlurFade inView direction="up" offset={10}>
          <SectionHeading
            eyebrow="Порядок работ"
            title="Как проходит заказ"
            lead="Семь шагов от первого сообщения до памятки по уходу. Порядок настоящий: так проходит каждый объект, а не «примерно так»."
          />
        </BlurFade>

        <ol className="mt-14 grid grid-cols-1 gap-x-10 md:grid-cols-2 lg:grid-cols-3">
          {PROCESS.map((s, i) => (
            <BlurFade key={s.step} inView direction="up" delay={i * 0.05}>
              <li className="grid grid-cols-[3.5rem_1fr] gap-4 border-t border-line-soft py-6">
                <span className="stamp pt-1.5 text-orange">{s.step}</span>
                <div>
                  <h3 className="text-xl font-semibold text-cream">{s.title}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-foreground/80">
                    {s.body}
                  </p>
                </div>
              </li>
            </BlurFade>
          ))}
        </ol>
      </div>
    </section>
  );
}
