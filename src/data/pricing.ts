/**
 * Единственное место с ценами на сайте. В JSX цифр нет.
 *
 * Источник: business/products/pricing.md в базе знаний «Уян проект 1».
 * Подтверждено владельцем: розница и минималка 2026-08-28, дом до 90 м² 2026-09-03,
 * профили оплаты 2026-08-28, B2B 2026-08-19. Базовая толщина ровно 7 см, формула выезда
 * (от 20 км по 250 ₽/км), площади до 25 м² индивидуально - 2026-09-07.
 * Дом от 75 м² (не от 90), минималка = ~50 м² квартиры / ~75 м² дома - 2026-09-08.
 *
 * Меняется прайс - меняем здесь и дату ниже. Больше нигде.
 */
export const PRICING_SYNCED_AT = "2026-09-08";
/** Та же дата для вывода на страницу: ДД.ММ.ГГГГ. */
export const PRICING_SYNCED_AT_HUMAN = PRICING_SYNCED_AT.split("-").reverse().join(".");

/** Базовая толщина, для которой названы ставки: ровно 7 см (владелец, 2026-09-07). */
export const BASE_THICKNESS_CM = 7;

/** Доплата за каждый сантиметр сверх базовой толщины, ₽/м² (ориентировочно). */
export const EXTRA_CM_RATE = 50;

/** Минимальный заказ, ₽ - для квартиры и дома одинаково. */
export const MIN_ORDER = 65_000;

/**
 * Чему минималка равна в квадратах при базовой толщине - цифры владельца
 * (2026-09-08), чтобы клиент сразу понимал, с какой площади ставка «работает».
 */
export const MIN_ORDER_EQUIV_M2 = { apartment: 50, house: 75 } as const;

/** Подъём выше этого этажа считается отдельно. */
export const FLOOR_SURCHARGE_ABOVE = 5;

/**
 * Выезд: первые 20 км от базы включены, дальше - по 250 ₽ за каждый километр
 * сверх двадцати: (км − 20) × 250. Владелец, 2026-09-07.
 */
export const FREE_DELIVERY_KM = 20;
export const DELIVERY_RATE_PER_KM = 250;

/** Гарантия на прочность, целостность и ровность стяжки, месяцев (владелец, 2026-09-07). */
export const WARRANTY_MONTHS = 24;
export const WARRANTY_HUMAN = "2 года";

/** Площади меньше этой - стоимость работ обсуждается индивидуально (владелец, 2026-09-07). */
export const SMALL_AREA_INDIVIDUAL_M2 = 25;

/** Доплата за выезд, ₽, по расстоянию от базы в км. */
export function deliverySurcharge(distanceKm: number) {
  return Math.max(0, distanceKm - FREE_DELIVERY_KM) * DELIVERY_RATE_PER_KM;
}

/** Дом: ставка действует от этой площади (владелец, 2026-09-08); меньше - договорная в диапазоне. */
export const HOUSE_FULL_RATE_FROM_M2 = 75;
export const HOUSE_SMALL_RATE_RANGE = { from: 950, to: 1000 } as const;

export type ObjectKind = "apartment" | "house";

export const OBJECT_KINDS: Record<ObjectKind, { title: string; short: string }> =
  {
    apartment: { title: "Квартира", short: "квартира" },
    house: { title: "Дом", short: "дом" },
  };

/** Профили оплаты: ставка зависит от того, кто платит и какой документ нужен. */
export const PAYMENT_PROFILES = [
  {
    key: "private",
    title: "Частным лицам",
    entity: "оплата наличными или по чеку",
    rates: { apartment: 1300, house: 850 },
    advance:
      "Обычно без предоплаты. Аванс - только чтобы забронировать дату или под нестандартный объект.",
    documents: "Договор бытового подряда, смета, акт, кассовый чек.",
  },
  {
    key: "no-vat",
    title: "Юрлицам без НДС",
    entity: "ООО «Скай Групп», УСН",
    rates: { apartment: 1350, house: 900 },
    advance: "Аванс 30% либо поэтапная оплата.",
    documents: "Договор и счёт на полную сумму, акты выполненных работ.",
  },
  {
    key: "vat",
    title: "Юрлицам с НДС 22%",
    entity: "ИП Афанасьев А. В., ОСНО",
    rates: { apartment: 1500, house: 1000 },
    advance: "Аванс 30% либо поэтапная оплата.",
    documents: "Договор и счёт на полную сумму, акты, счёт-фактура.",
  },
] as const;

export type PaymentProfileKey = (typeof PAYMENT_PROFILES)[number]["key"];

/** Крупные объекты: отдельная формула, все суммы с НДС. */
export const B2B = {
  fromArea: 1000,
  withMaterials: { rate: 1200, upToCm: 8, extraCmRate: 50 },
  withoutMaterials: { rateUpTo10cm: 650, rateAbove10cm: 750 },
  m200Surcharge: 200,
  paymentTrancheM2: 1000,
  startDays: { from: 5, to: 7 },
} as const;

/** Толщины для сетки ориентиров на странице цен. */
export const GRID_THICKNESSES_CM = [7, 8, 9, 10, 11, 12] as const;

/** Ставка за м² при заданной толщине (сверх базовой - доплата за см). */
export function rateForThickness(baseRate: number, thicknessCm: number) {
  const extra = Math.max(0, thicknessCm - BASE_THICKNESS_CM);
  return baseRate + extra * EXTRA_CM_RATE;
}

/** «7 см» для базовой строки, «9 см» для остальных. */
export const thicknessLabel = (cm: number) => `${cm} см`;

export type Estimate =
  | { kind: "individual"; area: number }
  | { kind: "exact"; total: number; ratePerM2: number; minApplied: boolean }
  | {
      kind: "range";
      from: number;
      to: number;
      rateFrom: number;
      rateTo: number;
      minApplied: boolean;
    };

/**
 * Ориентир по публичной формуле. Не смета: точная цена - после замера,
 * и после замера она не меняется.
 */
export function estimate(
  kindOfObject: ObjectKind,
  areaM2: number,
  thicknessCm: number,
  profile: PaymentProfileKey = "private",
): Estimate {
  const p = PAYMENT_PROFILES.find((x) => x.key === profile) ?? PAYMENT_PROFILES[0];
  const area = Math.max(0, areaM2);

  if (area > 0 && area < SMALL_AREA_INDIVIDUAL_M2) {
    return { kind: "individual", area };
  }

  if (kindOfObject === "house" && area >= SMALL_AREA_INDIVIDUAL_M2 && area < HOUSE_FULL_RATE_FROM_M2) {
    const rateFrom = rateForThickness(HOUSE_SMALL_RATE_RANGE.from, thicknessCm);
    const rateTo = rateForThickness(HOUSE_SMALL_RATE_RANGE.to, thicknessCm);
    const rawFrom = rateFrom * area;
    const rawTo = rateTo * area;
    return {
      kind: "range",
      from: Math.max(MIN_ORDER, rawFrom),
      to: Math.max(MIN_ORDER, rawTo),
      rateFrom,
      rateTo,
      minApplied: rawFrom < MIN_ORDER,
    };
  }

  const ratePerM2 = rateForThickness(p.rates[kindOfObject], thicknessCm);
  const raw = ratePerM2 * area;
  return {
    kind: "exact",
    total: Math.max(MIN_ORDER, raw),
    ratePerM2,
    minApplied: raw < MIN_ORDER,
  };
}

export const formatRub = (n: number) =>
  new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(n) + " ₽";
