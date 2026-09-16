import { SectionHeading } from "@/components/site/section-heading";
import {
  B2B,
  BASE_THICKNESS_CM,
  EXTRA_CM_RATE,
  DELIVERY_RATE_PER_KM,
  FREE_DELIVERY_KM,
  SMALL_AREA_INDIVIDUAL_M2,
  WARRANTY_HUMAN,
  FLOOR_SURCHARGE_ABOVE,
  GRID_THICKNESSES_CM,
  HOUSE_FULL_RATE_FROM_M2,
  HOUSE_SMALL_RATE_RANGE,
  MIN_ORDER,
  MIN_ORDER_EQUIV_M2,
  PAYMENT_PROFILES,
  PRICING_SYNCED_AT_HUMAN,
  estimate,
  formatRub,
  rateForThickness,
  thicknessLabel,
} from "@/data/pricing";

const privateRates = PAYMENT_PROFILES[0].rates;

/** Три примера, посчитанные той же формулой, что и калькулятор. */
const EXAMPLES = [
  { kind: "apartment", area: 45, cm: 7, title: "Квартира 45 м², слой 7 см" },
  { kind: "apartment", area: 62, cm: 9, title: "Квартира 62 м², слой 9 см" },
  { kind: "house", area: 120, cm: 8, title: "Дом 120 м², слой 8 см" },
] as const;

const KEY_CONDITIONS = [
  { k: "Базовая толщина", v: `${BASE_THICKNESS_CM} см` },
  { k: "Следующий сантиметр", v: `+${EXTRA_CM_RATE} ₽/м²` },
  { k: "Минимальный заказ", v: formatRub(MIN_ORDER) },
  { k: `До ${SMALL_AREA_INDIVIDUAL_M2} м²`, v: "индивидуально" },
  { k: `Подъём выше ${FLOOR_SURCHARGE_ABOVE} этажа`, v: "отдельно" },
  { k: `Выезд дальше ${FREE_DELIVERY_KM} км`, v: `${DELIVERY_RATE_PER_KM} ₽/км` },
  { k: "Замер", v: "бесплатно" },
  { k: "Гарантия", v: WARRANTY_HUMAN },
] as const;

const cell = "px-4 py-4 text-[16px] sm:px-5";
const head = "stamp px-4 py-3 text-left text-muted-ink sm:px-5";

export function KeyConditions() {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line-soft sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8">
      {KEY_CONDITIONS.map((c) => (
        <div key={c.k} className="bg-ink p-5">
          <dt className="text-[14px] leading-snug text-muted-ink">{c.k}</dt>
          <dd className="mt-2 font-mono text-lg text-cream">{c.v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function RetailGrid() {
  return (
    <section id="roznica" className="border-b border-line-soft py-24 lg:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Частным лицам"
          title="Квартиры и дома"
          lead={`Ставка за м² по толщине слоя. Строка «${BASE_THICKNESS_CM} см» - базовая, ниже - с доплатой за каждый сантиметр. Подъём до пятого этажа включён.`}
        />

        <p className="stamp mt-12 text-muted-ink lg:hidden">Таблица листается вбок →</p>
        <div className="mt-3 overflow-x-auto rounded-lg border border-line lg:mt-12">
          <table className="w-full min-w-[640px] border-collapse">
            <thead className="bg-ink-raise">
              <tr className="border-b border-line">
                <th scope="col" className={head}>Толщина слоя</th>
                <th scope="col" className={head}>Квартира</th>
                <th scope="col" className={head}>Дом от {HOUSE_FULL_RATE_FROM_M2} м²</th>
                <th scope="col" className={head}>Дом до {HOUSE_FULL_RATE_FROM_M2} м²</th>
              </tr>
            </thead>
            <tbody>
              {GRID_THICKNESSES_CM.map((cm, i) => (
                <tr key={cm} className={i === 0 ? "bg-orange/5" : "border-t border-line-soft"}>
                  <th scope="row" className={`${cell} text-left font-medium text-cream`}>
                    {thicknessLabel(cm)}
                    {i === 0 && <span className="ml-2 text-[13px] text-orange">базовая</span>}
                  </th>
                  <td className={`${cell} font-mono text-cream`}>{rateForThickness(privateRates.apartment, cm)} ₽/м²</td>
                  <td className={`${cell} font-mono text-cream`}>{rateForThickness(privateRates.house, cm)} ₽/м²</td>
                  <td className={`${cell} font-mono text-foreground/80`}>
                    {rateForThickness(HOUSE_SMALL_RATE_RANGE.from, cm)}-{rateForThickness(HOUSE_SMALL_RATE_RANGE.to, cm)} ₽/м²
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[15px] leading-relaxed text-muted-ink">
          Дом до {HOUSE_FULL_RATE_FROM_M2} м² - цена договорная в указанном диапазоне. Минимальный заказ {formatRub(MIN_ORDER)} действует для квартиры и дома - при слое {BASE_THICKNESS_CM} см это ~{MIN_ORDER_EQUIV_M2.apartment} м² квартиры или ~{MIN_ORDER_EQUIV_M2.house} м² дома; площади до {SMALL_AREA_INDIVIDUAL_M2} м² считаем индивидуально. Выезд: первые {FREE_DELIVERY_KM} км от базы включены, дальше {DELIVERY_RATE_PER_KM} ₽ за каждый километр сверх {FREE_DELIVERY_KM}. Прайс актуален на {PRICING_SYNCED_AT_HUMAN}.
        </p>

        <h3 className="mt-14 text-2xl font-semibold text-cream">Примеры расчёта</h3>
        <p className="mt-2 text-[16px] text-foreground/75">Считаем той же формулой. Где сработал минимальный заказ - говорим прямо.</p>
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
          {EXAMPLES.map((ex) => {
            const r = estimate(ex.kind, ex.area, ex.cm);
            return (
              <div key={ex.title} className="rounded-lg border border-line bg-ink-raise p-6">
                <p className="text-[16px] text-foreground/85">{ex.title}</p>
                {r.kind === "individual" ? (
                  <p className="mt-3 font-mono text-[1.75rem] leading-none text-cream">индивидуально</p>
                ) : (
                  <>
                    <p className="mt-3 font-mono text-[1.75rem] leading-none text-cream">
                      {r.kind === "exact" ? formatRub(r.total) : `${formatRub(r.from)} - ${formatRub(r.to)}`}
                    </p>
                    <p className="mt-3 text-[14px] leading-relaxed text-muted-ink">
                      {r.kind === "exact" ? `${r.ratePerM2} ₽/м² × ${ex.area} м²` : `${r.rateFrom}-${r.rateTo} ₽/м² × ${ex.area} м²`}
                      {r.minApplied && ` = ${formatRub(r.kind === "exact" ? r.ratePerM2 * ex.area : r.rateFrom * ex.area)}, сработал минимальный заказ`}
                    </p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function PaymentProfiles() {
  return (
    <section id="profili" className="border-b border-line-soft bg-ink-raise/40 py-24 lg:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Кто платит"
          title="Ставка зависит от документов"
          lead="Частному заказчику - чек и договор бытового подряда. Юрлицу - договор и счёт на полную сумму, с НДС или без. Ставки за базовую толщину."
        />
        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {PAYMENT_PROFILES.map((p) => (
            <div key={p.key} className="flex flex-col rounded-lg border border-line bg-ink p-7">
              <h3 className="text-2xl font-semibold text-cream">{p.title}</h3>
              <p className="mt-1.5 text-[15px] text-muted-ink">{p.entity}</p>
              <dl className="mt-6 divide-y divide-line-soft border-y border-line-soft">
                <div className="flex items-baseline justify-between py-3.5">
                  <dt className="text-[16px] text-foreground/80">Квартира</dt>
                  <dd className="font-mono text-xl text-cream">{p.rates.apartment} ₽/м²</dd>
                </div>
                <div className="flex items-baseline justify-between py-3.5">
                  <dt className="text-[16px] text-foreground/80">Дом</dt>
                  <dd className="font-mono text-xl text-cream">{p.rates.house} ₽/м²</dd>
                </div>
              </dl>
              <p className="mt-5 text-[15px] leading-relaxed text-foreground/75">{p.advance}</p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted-ink">{p.documents}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function B2BPrice() {
  const wm = B2B.withMaterials;
  const nm = B2B.withoutMaterials;
  return (
    <section id="b2b-price" className="border-b border-line-soft py-24 lg:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow={`Объекты от ${B2B.fromArea} м²`}
          title="Крупные площади"
          lead={`Отдельная формула для застройщиков и генподрядчиков. Все суммы с НДС, оплата авансовыми участками по ${B2B.paymentTrancheM2} м², выход на объект через ${B2B.startDays.from}-${B2B.startDays.to} дней после заявки.`}
        />
        <p className="stamp mt-12 text-muted-ink lg:hidden">Таблица листается вбок →</p>
        <div className="mt-3 overflow-x-auto rounded-lg border border-line lg:mt-12">
          <table className="w-full min-w-[560px] border-collapse">
            <thead className="bg-ink-raise">
              <tr className="border-b border-line">
                <th scope="col" className={head}>Вариант</th>
                <th scope="col" className={head}>Слой</th>
                <th scope="col" className={head}>Ставка</th>
              </tr>
            </thead>
            <tbody className="[&_tr+tr]:border-t [&_tr+tr]:border-line-soft">
              <tr>
                <th scope="row" className={`${cell} text-left font-medium text-cream`}>С материалами исполнителя</th>
                <td className={`${cell} text-foreground/80`}>до {wm.upToCm} см</td>
                <td className={`${cell} font-mono text-cream`}>{wm.rate} ₽/м²</td>
              </tr>
              <tr>
                <th scope="row" className={`${cell} text-left font-medium text-cream`}>С материалами, толще {wm.upToCm} см</th>
                <td className={`${cell} text-foreground/80`}>каждый следующий см</td>
                <td className={`${cell} font-mono text-cream`}>+{wm.extraCmRate} ₽/м²</td>
              </tr>
              <tr>
                <th scope="row" className={`${cell} text-left font-medium text-cream`}>Без материалов исполнителя</th>
                <td className={`${cell} text-foreground/80`}>до 10 см</td>
                <td className={`${cell} font-mono text-cream`}>{nm.rateUpTo10cm} ₽/м²</td>
              </tr>
              <tr>
                <th scope="row" className={`${cell} text-left font-medium text-cream`}>Без материалов исполнителя</th>
                <td className={`${cell} text-foreground/80`}>свыше 10 см</td>
                <td className={`${cell} font-mono text-cream`}>{nm.rateAbove10cm} ₽/м²</td>
              </tr>
              <tr>
                <th scope="row" className={`${cell} text-left font-medium text-cream`}>Марка М200</th>
                <td className={`${cell} text-foreground/80`}>к выбранному варианту</td>
                <td className={`${cell} font-mono text-cream`}>+{B2B.m200Surcharge} ₽/м²</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-[15px] leading-relaxed text-muted-ink">
          КП считаем по проектным данным, актуализируем после обследования объекта и лазерного замера. Демонтаж, вывоз мусора, гидроизоляция, нижний слой и лабораторные испытания - вне объёма, если не согласовано отдельно.
        </p>
      </div>
    </section>
  );
}

export function ExtraWorks() {
  const items = [
    "Утеплитель под стяжку",
    "Изолон и звукоизоляционная подложка",
    "Стяжка по тёплому полу",
    "Разуклонка, разные горизонты в одном помещении, отбортовки на кровлях",
    "Финишное нивелирование под покрытия с допуском 2 мм (наливной пол)",
    "Подъём выше пятого этажа",
    `Выезд дальше ${FREE_DELIVERY_KM} км от базы - ${DELIVERY_RATE_PER_KM} ₽ за каждый километр сверх`,
    "Коммерческие расчёты и замеры для юрлиц",
  ];
  return (
    <section id="doprabot" className="border-b border-line-soft bg-ink-raise/40 py-24 lg:py-32">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Дополнительно"
            title="Считаем под объект"
            lead="Фиксированного прайса на эти позиции нет намеренно: расход материала и трудоёмкость зависят от объекта. Называем цифру после замера, до начала работ, отдельной строкой сметы."
          />
        </div>
        <ul className="divide-y divide-line-soft border-y border-line-soft lg:col-span-7">
          {items.map((it) => (
            <li key={it} className="flex items-center justify-between gap-6 py-4 text-[16px] text-foreground/85">
              {it}
              <span className="stamp shrink-0 text-muted-ink">по объекту</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function CompareOffers() {
  return (
    <section id="sravnenie" className="border-b border-line-soft py-24 lg:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Как сравнивать"
          title="Два вопроса любому подрядчику"
          lead="Витрины конкурентов не сходятся между собой: у одних цена без материала, у других не названа толщина. Разница обычно прячется в двух местах."
        />
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          {[
            { q: "Для какой толщины названа эта цена?", a: "Если толщина не названа, доплата за каждый сантиметр всплывёт на объекте. На реальной квартире слой редко бывает меньше 7 см." },
            { q: "Что в цену не входит?", a: "Плёнка, демпферная лента, фибра, швы, подъём, уборка - у кого-то это отдельные строки. У нас они внутри ставки, а список исключений короткий и опубликован." },
          ].map((c) => (
            <div key={c.q} className="rounded-lg border border-line bg-ink p-7">
              <p className="text-xl font-semibold text-cream">«{c.q}»</p>
              <p className="mt-3 text-[16px] leading-relaxed text-foreground/80">{c.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
