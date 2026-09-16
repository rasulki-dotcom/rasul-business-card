"use client";

import Image from "next/image";
import { useState } from "react";

import { BlurFade } from "@/components/ui/blur-fade";
import { BASE_THICKNESS_CM } from "@/data/pricing";
import { cn } from "@/lib/utils";

/**
 * Пирог пола: общий разрез картинкой + макро-фото материала в карточке.
 * Номер слоя - очередь укладки снизу вверх: 01 основание, 05 затирка.
 * Состав слоёв - из business/products/overview.md.
 *
 * Картинки - сгенерированные иллюстрации материалов (2026-09-15), не снимки
 * наших объектов; так и подписано в карточке.
 * `pin` - положение метки на общей картинке в процентах; координаты сняты
 * по пикселям картинки, обрезанной по содержимому (1360×1004),
 * менять только вместе с картинкой.
 */
const LAYERS = [
  {
    n: "05",
    name: "Затирка",
    short: "Затирка",
    note: "Машинная затирка поверхности: матовая, со следами диска. Просвет под двухметровым правилом - до 4 мм. В проёмах и по площади нарезаются швы.",
    img: "/materials/05-zatirka.webp",
    alt: "Затёртая поверхность стяжки со следами затирочной машины и нарезанным швом",
    pin: { x: 51.5, y: 23.9 },
  },
  {
    n: "04",
    name: "Полусухая смесь",
    short: "Полусухая смесь",
    note: `Цементно-песчаный раствор с фиброволокном и пластификатором, слой от ${BASE_THICKNESS_CM} см по маякам. Марка не ниже М150. Смесь почти сухая на ощупь - поэтому быстро набирает прочность и не даёт лишней влаги.`,
    img: "/materials/04-smes.webp",
    alt: "Полусухая цементно-песчаная смесь с белым фиброволокном",
    pin: { x: 34.1, y: 37.5 },
  },
  {
    n: "03",
    name: "Утеплитель или подложка",
    short: "Утеплитель / подложка",
    note: "Изолон, звукоизоляция, утеплитель, трубы тёплого пола - по проекту объекта. Считается отдельно.",
    img: "/materials/03-uteplitel.webp",
    alt: "Плиты утеплителя с уложенной трубой тёплого пола",
    pin: { x: 55.3, y: 49.8 },
  },
  {
    n: "02",
    name: "Плёнка",
    short: "Плёнка",
    note: "Разделительный слой поверх основания: раствор не отдаёт воду в плиту и не сцепляется с ней.",
    img: "/materials/02-plenka.webp",
    alt: "Полиэтиленовая плёнка, уложенная на бетонное основание",
    pin: { x: 81.3, y: 61.4 },
  },
  {
    n: "01",
    name: "Основание",
    short: "Основание",
    note: "Плита перекрытия или грунтовая подготовка. Проверяем прочность, убираем рыхлое, лазерным нивелиром выносим отметку чистового пола и ставим маяки.",
    img: "/materials/01-osnovanie.webp",
    alt: "Бетонное основание с линией лазерного нивелира",
    pin: { x: 58.1, y: 80.1 },
  },
] as const;

type LayerN = (typeof LAYERS)[number]["n"];

/** Снизу вверх - порядок укладки, в таком виде и показываем список под картинкой. */
const BY_ORDER = [...LAYERS].reverse();

export function ScreedSection() {
  const [active, setActive] = useState<LayerN>("04");
  const current = LAYERS.find((l) => l.n === active) ?? LAYERS[1];

  return (
    <section
      id="razrez"
      className="border-b border-line-soft bg-ink-raise/40 py-24 lg:py-32"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <BlurFade inView direction="up" offset={10}>
          <p className="stamp text-orange">Разрез 1-1</p>
          <h2 className="stencil mt-4 max-w-[16ch] text-cream text-[clamp(2rem,5vw,3.25rem)] leading-[0.95]">
            Из чего складывается пол
          </h2>
          <p className="mt-5 max-w-[52ch] text-[17px] leading-relaxed text-foreground/80 sm:text-lg">
            Пять слоёв от плиты перекрытия до готовой поверхности. Нажмите номер
            на разрезе - покажу материал вблизи и что мы с ним делаем.
          </p>
        </BlurFade>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <BlurFade inView direction="up" offset={14} className="lg:col-span-7">
            {/* Фон панели = фон самой картинки (#161819), иначе она читается
                  как вставленный прямоугольник внутри карточки. */}
            <div className="rounded-lg border border-line bg-[#161819] p-4 sm:p-6">
              {/* Общий разрез: слои разнесены, метки стоят на своих материалах. */}
              <div className="relative aspect-[1360/1004] w-full">
                <Image
                  src="/materials/00-pirog-pola.webp"
                  alt="Разрез пола: плита перекрытия, плёнка, утеплитель, слой полусухой стяжки с затёртой поверхностью и демпферная лента у стены"
                  fill
                  sizes="(min-width: 1024px) 640px, 92vw"
                  className="rounded-sm object-contain"
                  priority={false}
                />

                {LAYERS.map((layer) => {
                  const isActive = active === layer.n;
                  return (
                    <button
                      key={layer.n}
                      type="button"
                      aria-pressed={isActive}
                      aria-label={`${layer.n} ${layer.name}`}
                      onClick={() => setActive(layer.n)}
                      onMouseEnter={() => setActive(layer.n)}
                      onFocus={() => setActive(layer.n)}
                      className={cn(
                        "absolute flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border font-mono text-[13px] transition-all duration-200 sm:size-9 sm:text-[14px]",
                        isActive
                          ? "scale-110 border-orange bg-orange text-ink shadow-[0_0_0_6px_rgba(239,127,26,0.25)]"
                          : "border-orange/70 bg-ink/85 text-cream hover:border-orange hover:bg-ink",
                      )}
                      style={{ left: `${layer.pin.x}%`, top: `${layer.pin.y}%` }}
                    >
                      {layer.n}
                    </button>
                  );
                })}
              </div>

              {/* Список снизу вверх - тот же порядок, в каком слои укладывают. */}
              <ol className="mt-5 flex flex-wrap gap-2">
                {BY_ORDER.map((layer) => {
                  const isActive = active === layer.n;
                  return (
                    <li key={layer.n}>
                      <button
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => setActive(layer.n)}
                        onMouseEnter={() => setActive(layer.n)}
                        onFocus={() => setActive(layer.n)}
                        className={cn(
                          "flex items-center gap-2 rounded-md border px-3 py-2 text-[15px] transition-colors",
                          isActive
                            ? "border-orange/70 bg-orange/10 text-cream"
                            : "border-line text-muted-ink hover:border-orange/50 hover:text-foreground",
                        )}
                      >
                        <span className={cn("font-mono", isActive ? "text-orange" : "text-orange/70")}>
                          {layer.n}
                        </span>
                        {layer.short}
                      </button>
                    </li>
                  );
                })}
              </ol>

              <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px] text-muted-ink">
                <span className="flex items-center gap-2">
                  <span aria-hidden className="inline-block size-2.5 bg-orange" />
                  Демпферная лента по периметру
                </span>
                <span>Слой стяжки - {BASE_THICKNESS_CM} см</span>
                <span>Шов нарезан в проёме</span>
              </p>
            </div>
          </BlurFade>

          {/* Карточка выбранного слоя: материал вблизи + что с ним делаем. */}
          <BlurFade inView direction="up" delay={0.08} className="lg:col-span-5">
            <div
              className="overflow-hidden rounded-lg border border-line bg-ink lg:sticky lg:top-24"
              aria-live="polite"
            >
              {/* Все пять фото в стопке: переключение без мигания и догрузки. */}
              <div className="relative aspect-[16/9] w-full bg-graphite lg:aspect-[4/3]">
                {LAYERS.map((layer) => (
                  <Image
                    key={layer.n}
                    src={layer.img}
                    alt={layer.n === active ? layer.alt : ""}
                    aria-hidden={layer.n !== active}
                    fill
                    sizes="(min-width: 1024px) 440px, 90vw"
                    className={cn(
                      "object-cover transition-opacity duration-300",
                      layer.n === active ? "opacity-100" : "opacity-0",
                    )}
                  />
                ))}
              </div>
              <div className="p-7">
                <p className="stamp text-orange">Слой {current.n}</p>
                <h3 className="mt-3 text-2xl font-semibold text-cream">{current.name}</h3>
                <p className="mt-4 text-[16px] leading-relaxed text-foreground/80">{current.note}</p>
                <p className="mt-6 text-[14px] leading-relaxed text-muted-ink">
                  Номер слоя - очередь укладки: 01 кладётся первым, 05 - последним.
                  Фото - иллюстрации материалов, не снимки объектов.
                </p>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
