"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, Send, X } from "lucide-react";

import { COMPANY, MESSENGERS, messengerLink } from "@/data/company";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/ceny", label: "Цены" },
  { href: "/#process", label: "Как работаем" },
  { href: "/#objects", label: "Объекты" },
  { href: "/#b2b", label: "Юрлицам" },
  { href: "/#faq", label: "Вопросы" },
  { href: "/#contacts", label: "Контакты" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Пока меню открыто, страница под ним не прокручивается. Закрывается оно
  // кликом по ссылке - см. onClick ниже.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Повернули планшет или растянули окно до десктопа - панель прячется CSS-ом,
  // а запрет прокрутки остался бы. Закрываем меню вместе с ним.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="sticky top-0 z-[60]">
      <div className="border-b border-line-soft bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] w-full max-w-6xl items-center justify-between gap-6 px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center" aria-label="На главную">
          <Image
            src="/logo-horizontal.png"
            alt={COMPANY.brand}
            width={1200}
            height={231}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Разделы сайта">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-[15px] text-foreground/80 transition-colors hover:text-cream",
                pathname === item.href && "text-cream",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center lg:flex">
          <a
            href={COMPANY.phoneHref}
            className="flex h-10 items-center gap-2 rounded-md border border-orange/60 px-4 font-mono text-[15px] whitespace-nowrap text-cream transition-colors hover:bg-orange hover:text-ink"
          >
            <Phone className="size-4" aria-hidden />
            {COMPANY.phoneDisplay}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          className="flex size-11 items-center justify-center rounded-md border border-line text-cream lg:hidden"
        >
          {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
        </button>
      </div>
      </div>

      {/* Мобильное меню: крупные ссылки, телефон и Telegram - для пальца, не для курсора.
          Панель абсолютная относительно липкой шапки, высота - до низа экрана. */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full h-[calc(100dvh-72px)] overflow-y-auto bg-ink lg:hidden"
      >
        <nav className="flex flex-col px-6 py-4" aria-label="Разделы сайта">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-line-soft py-4 text-xl text-cream"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-3 px-6 pt-4 pb-10">
          <a
            href={COMPANY.phoneHref}
            className="flex h-14 items-center justify-center gap-3 rounded-md border border-orange/60 text-lg font-semibold text-cream"
          >
            <Phone className="size-5 text-orange" aria-hidden />
            {COMPANY.phoneDisplay}
          </a>
          <div className="grid grid-cols-2 gap-3">
            {MESSENGERS.map((m) => (
              <a
                key={m.key}
                href={messengerLink(m.key)}
                target="_blank"
                rel="noreferrer"
                className="flex h-14 items-center justify-center gap-2 rounded-md bg-orange text-lg font-semibold text-ink"
              >
                <Send className="size-5" aria-hidden />
                {m.name}
              </a>
            ))}
          </div>
          <p className="text-center text-[14px] text-muted-ink">Max - на этом же номере</p>
        </div>
      </div>
    </header>
  );
}
