/**
 * Реквизиты и контакты. Единственное место - в JSX не дублировать.
 * Источник: business/economics/costs.md, business/assets/ip-afanasiev/d3-soglasie-pdn.md,
 * business/assets/dogovor-podryada.md.
 */
export const COMPANY = {
  brand: "СТЯЖКА PROчно",
  brandPlain: "Стяжка Прочно",
  tagline: "Механизированная полусухая стяжка пола",
  city: "Уфа",
  region: "Республика Башкортостан",
  /** База, от которой считается выезд: первые 20 км включены (владелец, 2026-09-07). */
  baseAddress: "г. Уфа, ул. Бакалинская, 9",
  /** Telegram руководителя - на его визитке и как запасной канал. */
  telegramHandle: "rasulki",
  telegramUrl: "https://t.me/rasulki",
  /** Рабочий телефон - первый контакт для клиентов (владелец, 2026-09-07). */
  phoneDisplay: "8 (993) 055-35-37",
  phoneHref: "tel:+79930553537",
  /** Тот же номер в международном формате без плюса - для ссылок мессенджеров. */
  phoneDigits: "79930553537",
  /** Руководитель - второй контакт, если по рабочему не дозвонились. */
  ownerFirstName: "Расул",
  ownerRole: "руководитель",
  ownerPhoneDisplay: "8 (917) 355-35-37",
  ownerPhoneHref: "tel:+79173553537",
  /** Первый контакт по заявкам (владелец, 2026-09-07). */
  firstContactName: "Рамиль",
  firstContactRole: "замерщик, специалист по обработке заявок",
} as const;

/**
 * Мессенджеры на рабочем номере (владелец, 2026-09-07): Telegram, WhatsApp, Max.
 * WhatsApp и Telegram умеют открыть чат по номеру с черновиком текста.
 * У Max ссылки «чат по номеру» в документации нет (dev.max.ru/help/deeplinks) -
 * показываем как «есть на этом номере», без ссылки.
 */
export type MessengerKey = "whatsapp" | "telegram";

export const MESSENGERS: readonly { key: MessengerKey; name: string }[] = [
  { key: "whatsapp", name: "WhatsApp" },
  { key: "telegram", name: "Telegram" },
];

export const MAX_NOTE = "Max - на этом же номере";

export function messengerLink(key: MessengerKey, text?: string) {
  const q = text ? `?text=${encodeURIComponent(text)}` : "";
  return key === "whatsapp"
    ? `https://wa.me/${COMPANY.phoneDigits}${q}`
    : `https://t.me/+${COMPANY.phoneDigits}${q}`;
}

/**
 * Юрлица. В подвале первым идёт ООО «Скай Групп», вторым ИП (владелец, 2026-09-07).
 * Оператор ПДн для политики - ИП. Домашний адрес ИП на сайт не выносим.
 */
export const LEGAL = {
  operatorName: "ИП Афанасьев Арсений Владимирович",
  ogrnip: "321028000027410",
  inn: "027816910000",
  city: "г. Уфа",
  /**
   * Почта для запросов по ПДн - действующий корпоративный ящик ООО
   * (подтверждён владельцем 2026-09-07, plans/2026-09-04-domeny-i-tovarnyy-znak.md).
   * Появится info@ на домене - заменить здесь.
   */
  pdnEmail: "sky-grup@yandex.ru",
  /** ООО - целевое юрлицо, в подписи идёт первым. Реквизиты сверены с ЕГРЮЛ 2026-09-07. */
  secondEntity: "ООО «Скай Групп»",
  oooInn: "0276136947",
  oooOgrn: "1120280000752",
} as const;
