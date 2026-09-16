import Image from "next/image";
import Link from "next/link";

import { COMPANY, LEGAL, MESSENGERS, messengerLink } from "@/data/company";
import { GEO_WITH_DATA } from "@/data/geo";
import { PRICING_SYNCED_AT_HUMAN } from "@/data/pricing";

const SECTIONS = [
  { href: "/ceny", label: "Цены" },
  { href: "/#process", label: "Как проходит работа" },
  { href: "/#objects", label: "Объекты" },
  { href: "/#b2b", label: "Юрлицам" },
  { href: "/#faq", label: "Вопросы и ответы" },
  { href: "/politika", label: "Политика обработки персональных данных" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-line-soft bg-ink-raise/40">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5">
          <Image
            src="/logo-horizontal.png"
            alt={COMPANY.brand}
            width={1200}
            height={231}
            className="h-9 w-auto"
          />
          <p className="mt-5 max-w-[40ch] text-[16px] leading-relaxed text-foreground/75">
            {COMPANY.tagline}. {COMPANY.city} и {COMPANY.region}: квартиры,
            дома, коммерческие объекты и площади от 1000 м².
          </p>
          <p className="mt-6 max-w-[44ch] text-[15px] leading-relaxed text-muted-ink">
            Цены на сайте - ориентир, не публичная оферта. Точная стоимость
            определяется после бесплатного замера и фиксируется в договоре.
            Прайс актуален на {PRICING_SYNCED_AT_HUMAN}.
          </p>
        </div>

        <div className="lg:col-span-3">
          <p className="stamp text-muted-ink">Разделы</p>
          <ul className="mt-4 space-y-3">
            {SECTIONS.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="text-[16px] text-foreground/85 transition-colors hover:text-orange"
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <p className="stamp text-muted-ink">Связь</p>
          <ul className="mt-4 space-y-3 text-[16px]">
            <li>
              <a
                href={COMPANY.phoneHref}
                className="font-mono text-lg text-cream transition-colors hover:text-orange"
              >
                {COMPANY.phoneDisplay}
              </a>
              <span className="block text-[14px] text-muted-ink">рабочий · {COMPANY.firstContactName}, замерщик</span>
              <span className="mt-1 flex flex-wrap gap-x-3 text-[14px]">
                {MESSENGERS.map((m) => (
                  <a key={m.key} href={messengerLink(m.key)} target="_blank" rel="noreferrer" className="text-foreground/80 transition-colors hover:text-orange">
                    {m.name}
                  </a>
                ))}
                <span className="text-muted-ink">Max</span>
              </span>
            </li>
            <li>
              <a
                href={COMPANY.ownerPhoneHref}
                className="font-mono text-lg text-foreground/85 transition-colors hover:text-orange"
              >
                {COMPANY.ownerPhoneDisplay}
              </a>
              <span className="block text-[14px] text-muted-ink">{COMPANY.ownerRole}, {COMPANY.ownerFirstName}</span>
            </li>
            <li>
              <a
                href={COMPANY.telegramUrl}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-lg text-orange"
              >
                @{COMPANY.telegramHandle}
              </a>
            </li>
            {GEO_WITH_DATA.length > 0 && (
              <li className="flex flex-wrap items-center gap-x-3 gap-y-1 text-foreground/75">
                <span className="text-[14px] text-muted-ink">Мы на картах:</span>
                {GEO_WITH_DATA.map((g) => (
                  <a key={g.key} href={g.url} target="_blank" rel="noreferrer" className="transition-colors hover:text-orange">
                    {g.name}
                  </a>
                ))}
              </li>
            )}
            <li className="text-foreground/75">
              База: {COMPANY.baseAddress}
              <span className="block text-[14px] text-muted-ink">
                отсюда считаем выезд: первые 20 км включены
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line-soft">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-6 text-[14px] leading-relaxed text-muted-ink sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>
            {LEGAL.secondEntity}, ИНН {LEGAL.oooInn}, ОГРН {LEGAL.oooOgrn} ·{" "}
            {LEGAL.operatorName}, ОГРНИП {LEGAL.ogrnip}, ИНН {LEGAL.inn}
          </p>
          <p>{COMPANY.city} · {COMPANY.region}</p>
        </div>
      </div>
    </footer>
  );
}
