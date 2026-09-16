/**
 * Геосервисы и рейтинги. Единственное место - в JSX нет ни ссылок, ни цифр.
 *
 * Пока карточек нет (business/marketing/channels.md: Яндекс Карты, 2ГИС не настроены),
 * поля url/rating/reviews - null, и блок на сайте не рендерится вовсе.
 * Появилась карточка - вписать ссылку, рейтинг, число отзывов и дату снятия.
 * Рейтинг протухает так же, как прайс, поэтому дата обязательна.
 */
export const GEO_SYNCED_AT = null as string | null;

export type GeoKey = "yandex" | "2gis" | "avito";

export type GeoService = {
  key: GeoKey;
  name: string;
  /** Карточка организации. null - карточки ещё нет. */
  url: string | null;
  /** Прямая ссылка «оставить отзыв», если сервис такую даёт. */
  reviewsUrl: string | null;
  /** Рейтинг 0-5 с одной десятой. */
  rating: number | null;
  /** Число отзывов. */
  reviews: number | null;
};

export const GEO_SERVICES: readonly GeoService[] = [
  { key: "yandex", name: "Яндекс Карты", url: null, reviewsUrl: null, rating: null, reviews: null },
  { key: "2gis", name: "2ГИС", url: null, reviewsUrl: null, rating: null, reviews: null },
  { key: "avito", name: "Авито", url: null, reviewsUrl: null, rating: null, reviews: null },
];

/** Только сервисы, где карточка реально существует. */
export const GEO_WITH_DATA = GEO_SERVICES.filter(
  (g): g is GeoService & { url: string } => Boolean(g.url),
);

export const GEO_SYNCED_AT_HUMAN = GEO_SYNCED_AT
  ? GEO_SYNCED_AT.split("-").reverse().join(".")
  : null;

/** «1 отзыв», «3 отзыва», «12 отзывов». */
export function pluralReviews(n: number) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} отзыв`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${n} отзыва`;
  return `${n} отзывов`;
}

export const formatRating = (r: number) => r.toFixed(1).replace(".", ",");
