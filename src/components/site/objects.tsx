"use client";

import { Building2, Home, Ruler, Warehouse } from "lucide-react";

import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { SectionHeading } from "@/components/site/section-heading";
import { OBJECTS, OBJECTS_FOOTNOTE } from "@/data/content";

const ICONS = [Home, Warehouse, Building2, Ruler] as const;

export function Objects() {
  return (
    <section id="objects" className="border-b border-line-soft bg-ink-raise/40 py-24 lg:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <BlurFade inView direction="up" offset={10}>
          <SectionHeading
            eyebrow="Объекты"
            title="Что берём в работу"
            lead="От бани на 20 квадратов до этажей от тысячи. Разная логистика, одна технология и одна формула цены."
          />
        </BlurFade>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {OBJECTS.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <BlurFade key={item.title} inView direction="up" delay={i * 0.06}>
                <MagicCard
                  gradientSize={280}
                  gradientFrom="#ef7f1a"
                  gradientTo="#b85f0e"
                  gradientColor="#3a2a17"
                  gradientOpacity={0.65}
                  className="h-full rounded-lg"
                >
                  <div className="relative z-40 flex h-full flex-col p-7 sm:p-8">
                    <Icon className="size-6 text-orange" strokeWidth={1.5} aria-hidden />
                    <h3 className="mt-6 text-2xl font-semibold text-cream">{item.title}</h3>
                    <p className="mt-3.5 text-[16px] leading-relaxed text-foreground/80">
                      {item.body}
                    </p>
                    <ul className="mt-auto flex flex-wrap gap-2 pt-7">
                      {item.tags.map((tag) => (
                        <li key={tag} className="stamp rounded-sm border border-line px-3 py-2 text-muted-ink">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </MagicCard>
              </BlurFade>
            );
          })}
        </div>

        <BlurFade inView direction="up">
          <p className="mt-8 max-w-[90ch] border-l-2 border-line pl-5 text-[15px] leading-relaxed text-muted-ink">
            {OBJECTS_FOOTNOTE}
          </p>
        </BlurFade>
      </div>
    </section>
  );
}
