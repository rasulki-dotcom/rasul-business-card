"use client";

import { ArrowUpRight, MessageSquarePlus, Star } from "lucide-react";

import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { SectionHeading } from "@/components/site/section-heading";
import {
  GEO_SYNCED_AT_HUMAN,
  GEO_WITH_DATA,
  formatRating,
  pluralReviews,
} from "@/data/geo";

/** Пять звёзд с частичной заливкой последней - без округления рейтинга. */
function Stars({ value }: { value: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <span key={i} className="relative size-5">
            <Star className="absolute inset-0 size-5 text-line" strokeWidth={1.5} />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className="size-5 fill-orange text-orange" strokeWidth={1.5} />
            </span>
          </span>
        );
      })}
    </span>
  );
}

/** Блок рендерится только когда есть хотя бы одна настоящая карточка - см. data/geo.ts. */
export function GeoRatings() {
  if (GEO_WITH_DATA.length === 0) return null;

  return (
    <section id="geo" className="border-b border-line-soft bg-ink-raise/40 py-24 lg:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <BlurFade inView direction="up" offset={10}>
          <SectionHeading
            eyebrow="Мы на картах"
            title="Отзывы там, где их не подправить"
            lead="Рейтинг и отзывы живут на сторонних сервисах - мы их не редактируем. Откройте карточку, почитайте, оставьте свой после сдачи объекта."
          />
        </BlurFade>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {GEO_WITH_DATA.map((g, i) => (
            <BlurFade key={g.key} inView direction="up" delay={i * 0.08}>
              <MagicCard
                gradientSize={260}
                gradientFrom="#ef7f1a"
                gradientTo="#b85f0e"
                gradientColor="#3a2a17"
                gradientOpacity={0.65}
                className="h-full rounded-lg"
              >
                <div className="relative z-40 flex h-full flex-col p-7">
                  <p className="stamp text-muted-ink">{g.name}</p>
                  {g.rating !== null ? (
                    <>
                      <p className="mt-4 font-mono text-[2.5rem] leading-none text-cream" aria-label={`Рейтинг ${formatRating(g.rating)} из 5`}>
                        {formatRating(g.rating)}
                        <span className="text-xl text-muted-ink"> / 5</span>
                      </p>
                      <div className="mt-3">
                        <Stars value={g.rating} />
                      </div>
                    </>
                  ) : (
                    <p className="mt-4 text-lg text-foreground/80">Карточка открыта, рейтинг копится</p>
                  )}
                  {g.reviews !== null && (
                    <p className="mt-2 text-[15px] text-foreground/75">{pluralReviews(g.reviews)}</p>
                  )}
                  <div className="mt-auto flex flex-wrap gap-3 pt-7">
                    <a
                      href={g.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-12 items-center gap-2 rounded-md border border-orange/60 px-5 text-[15px] font-semibold text-cream transition-colors hover:bg-orange hover:text-ink"
                    >
                      Открыть карточку
                      <ArrowUpRight className="size-4" aria-hidden />
                    </a>
                    {g.reviewsUrl && (
                      <a
                        href={g.reviewsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-12 items-center gap-2 rounded-md border border-line px-5 text-[15px] text-foreground/85 transition-colors hover:border-orange/60 hover:text-cream"
                      >
                        <MessageSquarePlus className="size-4 text-orange" aria-hidden />
                        Оставить отзыв
                      </a>
                    )}
                  </div>
                </div>
              </MagicCard>
            </BlurFade>
          ))}
        </div>

        {GEO_SYNCED_AT_HUMAN && (
          <p className="mt-6 text-[14px] text-muted-ink">
            Рейтинг снят {GEO_SYNCED_AT_HUMAN}; актуальное значение - в самой карточке.
          </p>
        )}
      </div>
    </section>
  );
}
