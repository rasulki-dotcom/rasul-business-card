import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";

export default function NotFound() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow="Ошибка 404"
          title="Такой страницы нет"
          lead="Адрес набран с ошибкой или страница переехала. Цены, порядок работ и контакты - на главной."
        />
        <Link
          href="/"
          className="mt-10 inline-flex h-14 items-center gap-3 rounded-md border border-orange/60 px-7 text-base font-semibold text-cream transition-colors hover:bg-orange hover:text-ink"
        >
          <ArrowLeft className="size-4" aria-hidden />
          На главную
        </Link>
      </div>
    </section>
  );
}
