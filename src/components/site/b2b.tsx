"use client";

import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

import { BlurFade } from "@/components/ui/blur-fade";
import { SectionHeading } from "@/components/site/section-heading";
import { B2B_POINTS } from "@/data/content";
import { B2B } from "@/data/pricing";

export function B2BSection() {
  return (
    <section id="b2b" className="border-b border-line-soft py-24 lg:py-32">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <BlurFade inView direction="up" className="lg:col-span-5">
          <SectionHeading
            eyebrow="Юрлицам и подрядчикам"
            title="Объёмы, документы, сроки"
            lead={`Застройщикам, генподрядчикам и коммерческим заказчикам. Выход на объект - через ${B2B.startDays.from}-${B2B.startDays.to} дней после заявки, все суммы с НДС.`}
          />
          <Link
            href="/ceny#b2b-price"
            className="mt-8 inline-flex h-14 items-center gap-3 rounded-md border border-orange/60 px-7 text-base font-semibold text-cream transition-colors hover:bg-orange hover:text-ink"
          >
            Прайс от {B2B.fromArea} м²
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </BlurFade>

        <div className="lg:col-span-7">
          {B2B_POINTS.map((p, i) => (
            <BlurFade key={p.title} inView direction="up" delay={i * 0.06}>
              <div className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-line-soft py-6 last:border-b">
                <FileText className="mt-1 size-5 text-orange" strokeWidth={1.5} aria-hidden />
                <div>
                  <h3 className="text-xl font-semibold text-cream">{p.title}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-foreground/80">{p.body}</p>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
