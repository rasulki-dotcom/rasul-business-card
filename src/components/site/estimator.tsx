"use client";

import { useId, useState } from "react";
import { ArrowDown } from "lucide-react";

import { BorderBeam } from "@/components/ui/border-beam";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionHeading } from "@/components/site/section-heading";
import {
  BASE_THICKNESS_CM,
  HOUSE_FULL_RATE_FROM_M2,
  MIN_ORDER,
  OBJECT_KINDS,
  SMALL_AREA_INDIVIDUAL_M2,
  PAYMENT_PROFILES,
  type ObjectKind,
  type PaymentProfileKey,
  estimate,
  formatRub,
} from "@/data/pricing";
import { cn } from "@/lib/utils";

const THICKNESS_OPTIONS = [7, 8, 9, 10, 11, 12] as const;

export function Estimator() {
  const id = useId();
  const [kind, setKind] = useState<ObjectKind>("apartment");
  const [profile, setProfile] = useState<PaymentProfileKey>("private");
  const [area, setArea] = useState("60");
  const [thickness, setThickness] = useState<number>(BASE_THICKNESS_CM);

  const areaNum = Number(area.replace(",", "."));
  const valid = Number.isFinite(areaNum) && areaNum > 0;
  const result = valid ? estimate(kind, areaNum, thickness, profile) : null;

  return (
    <section id="orientir" className="border-b border-line-soft py-24 lg:py-32">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Калькулятор ориентира"
            title="Прикиньте сумму сами"
            lead="Считает по той же публичной формуле, что и таблица выше. Это ориентир для бюджета, не смета: точную толщину покажет замер."
          />
          <p className="mt-6 max-w-[44ch] text-[15px] leading-relaxed text-muted-ink">
            Подъём выше пятого этажа, выезд дальше 20 км (250 ₽ за каждый
            километр сверх) и допработы - утеплитель, звукоизоляция, тёплый пол,
            разуклонка - сюда не входят, их называем после замера.
          </p>
        </div>

        <div className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-lg border border-line bg-ink p-7 sm:p-9">
            <div className="motion-reduce:hidden">
              <BorderBeam size={110} duration={9} borderWidth={1.5} colorFrom="#ef7f1a" colorTo="#fffbdb" />
            </div>

            <div className="space-y-7">
              <fieldset>
                <legend className="stamp text-muted-ink">Объект</legend>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {(Object.keys(OBJECT_KINDS) as ObjectKind[]).map((k) => (
                    <label
                      key={k}
                      className={cn(
                        "flex h-13 cursor-pointer items-center justify-center rounded-md border text-base transition-colors",
                        kind === k
                          ? "border-orange/70 bg-orange/10 text-cream"
                          : "border-line text-muted-ink hover:text-foreground",
                      )}
                    >
                      <input
                        type="radio"
                        name={`${id}-kind`}
                        value={k}
                        checked={kind === k}
                        onChange={() => setKind(k)}
                        className="sr-only"
                      />
                      {OBJECT_KINDS[k].title}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`${id}-area`} className="text-base">Площадь, м²</Label>
                  <Input
                    id={`${id}-area`}
                    type="number"
                    inputMode="decimal"
                    min={1}
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="h-14 md:text-[17px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${id}-cm`} className="text-base">Толщина слоя, см</Label>
                  <select
                    id={`${id}-cm`}
                    value={thickness}
                    onChange={(e) => setThickness(Number(e.target.value))}
                    className="h-14 w-full rounded-lg border border-input bg-ink px-3 text-[17px] text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    {THICKNESS_OPTIONS.map((cm) => (
                      <option key={cm} value={cm}>
                        {cm === BASE_THICKNESS_CM ? `${cm} см (базовая)` : `${cm} см`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <fieldset>
                <legend className="stamp text-muted-ink">Кто платит</legend>
                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {PAYMENT_PROFILES.map((p) => (
                    <label
                      key={p.key}
                      className={cn(
                        "flex h-13 cursor-pointer items-center justify-center rounded-md border px-3 text-center text-[15px] transition-colors",
                        profile === p.key
                          ? "border-orange/70 bg-orange/10 text-cream"
                          : "border-line text-muted-ink hover:text-foreground",
                      )}
                    >
                      <input
                        type="radio"
                        name={`${id}-profile`}
                        value={p.key}
                        checked={profile === p.key}
                        onChange={() => setProfile(p.key)}
                        className="sr-only"
                      />
                      {p.title}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="rounded-md border border-line-soft bg-ink-raise p-6" aria-live="polite">
                <p className="stamp text-muted-ink">Ориентир</p>
                {result?.kind === "individual" ? (
                  <>
                    <p data-testid="estimate-total" className="mt-3 font-mono text-[1.6rem] leading-tight text-cream sm:text-[2rem]">
                      считаем индивидуально
                    </p>
                    <p className="mt-3 text-[15px] leading-relaxed text-foreground/75">
                      До {SMALL_AREA_INDIVIDUAL_M2} м² ставка за квадрат не работает: выезд техники и бригады стоит одинаково на любой площади. Позвоните - назовём сумму под объект.
                    </p>
                  </>
                ) : result ? (
                  <>
                    <p data-testid="estimate-total" className="mt-3 font-mono text-[2rem] leading-none text-cream sm:text-[2.5rem]">
                      {result.kind === "exact"
                        ? formatRub(result.total)
                        : `${formatRub(result.from)} - ${formatRub(result.to)}`}
                    </p>
                    <p className="mt-3 text-[15px] leading-relaxed text-foreground/75">
                      {result.kind === "exact"
                        ? `${result.ratePerM2} ₽/м² × ${areaNum} м²`
                        : `${result.rateFrom}-${result.rateTo} ₽/м² × ${areaNum} м² - дом меньше ${HOUSE_FULL_RATE_FROM_M2} м² считается договорно`}
                      {result.minApplied && ` · применён минимальный заказ ${formatRub(MIN_ORDER)}`}
                    </p>
                  </>
                ) : (
                  <p className="mt-3 text-[16px] text-muted-ink">Введите площадь - покажем порядок цифр.</p>
                )}
              </div>

              <a
                href="#zayavka"
                className="inline-flex h-14 items-center gap-3 rounded-md bg-orange px-7 text-base font-semibold text-ink transition-colors hover:bg-orange-dim"
              >
                Уточнить после замера
                <ArrowDown className="size-4" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
