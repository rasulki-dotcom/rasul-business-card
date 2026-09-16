"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BlurFade } from "@/components/ui/blur-fade";
import { SectionHeading } from "@/components/site/section-heading";
import { FAQ } from "@/data/content";

export function Faq() {
  return (
    <section id="faq" className="border-b border-line-soft bg-ink-raise/40 py-24 lg:py-32">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <BlurFade inView direction="up" className="lg:col-span-4">
          <SectionHeading
            eyebrow="Вопросы"
            title="Что спрашивают до замера"
            lead="Собрано из реальных переписок. Если вашего вопроса нет - напишите, ответим так же прямо."
          />
        </BlurFade>

        <BlurFade inView direction="up" delay={0.08} className="lg:col-span-8">
          <Accordion type="single" collapsible className="border-t border-line-soft">
            {FAQ.map((item, i) => (
              <AccordionItem key={item.q} value={`q${i}`} className="border-b border-line-soft">
                <AccordionTrigger className="py-5 text-left text-lg font-semibold text-cream hover:no-underline [&>svg]:size-5 [&>svg]:text-orange">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-[16px] leading-relaxed text-foreground/80">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </BlurFade>
      </div>
    </section>
  );
}
