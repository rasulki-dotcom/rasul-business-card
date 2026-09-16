/**
 * Канонический адрес - решение владельца 2026-09-04 (plans/2026-09-04-domeny-i-tovarnyy-znak.md
 * в базе знаний). Домен ещё покупается; локально можно переопределить переменной окружения.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://styazhka-prochno.ru";
