"use client";

import Image from "next/image";
import { ArrowUpRight, MapPin, Phone, Send } from "lucide-react";

import { BlurFade } from "@/components/ui/blur-fade";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { SectionHeading } from "@/components/site/section-heading";
import { COMPANY, MAX_NOTE, MESSENGERS, messengerLink } from "@/data/company";

/** Порядок связи по воле владельца: сначала звонок на рабочий, потом текст, потом руководитель. */
export function Contacts() {
  return (
    <section id="contacts" className="py-24 lg:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <BlurFade inView direction="up" className="lg:col-span-5">
            <SectionHeading
              eyebrow="Связь"
              title="Проще позвонить"
              lead="Рабочий номер отвечает на заявки, замер и вопросы по объектам. Не дозвонились - напишите, ответим текстом."
            />
            <a
              href={COMPANY.phoneHref}
              className="mt-8 inline-flex h-16 items-center gap-3 rounded-md bg-orange px-7 font-mono text-2xl text-ink transition-colors hover:bg-orange-dim"
            >
              <Phone className="size-5" aria-hidden />
              {COMPANY.phoneDisplay}
            </a>
            <ul className="mt-8 space-y-4 text-[16px]">
              <li className="flex items-start gap-3">
                <Send className="mt-0.5 size-5 shrink-0 text-orange" aria-hidden />
                <span>
                  Не получается позвонить - напишите на этот же номер:{" "}
                  {MESSENGERS.map((m, i) => (
                    <span key={m.key}>
                      <a href={messengerLink(m.key)} target="_blank" rel="noreferrer" className="text-cream underline decoration-line underline-offset-4 hover:text-orange">
                        {m.name}
                      </a>
                      {i < MESSENGERS.length - 1 ? ", " : ""}
                    </span>
                  ))}
                  {" "}или{" "}
                  <a href="#zayavka" className="text-cream underline decoration-line underline-offset-4 hover:text-orange">
                    заявка
                  </a>
                  <span className="block text-[14px] text-muted-ink">{MAX_NOTE}</span>
                </span>
              </li>
              <li className="flex items-start gap-3 text-foreground/80">
                <MapPin className="mt-0.5 size-5 shrink-0 text-orange" aria-hidden />
                <span>
                  База: {COMPANY.baseAddress}
                  <span className="block text-[14px] text-muted-ink">
                    первые 20 км выезда включены, дальше - по километражу
                  </span>
                </span>
              </li>
            </ul>
          </BlurFade>

          <div className="grid grid-cols-1 gap-6 lg:col-span-7">
            {/* Визитка 1: рабочий номер, первый контакт. */}
            <CardContainer containerClassName="py-0" className="w-full">
              <CardBody className="group/card relative h-auto w-full rounded-lg border border-orange/40 bg-gradient-to-br from-graphite to-ink p-8 sm:p-10">
                <CardItem translateZ={30} className="stamp pr-24 text-orange sm:pr-32">
                  Первый контакт · замерщик
                </CardItem>
                <CardItem translateZ={70} className="stencil mt-6 text-cream text-[clamp(2.25rem,7vw,3.75rem)] leading-[0.9]">
                  {COMPANY.firstContactName}
                </CardItem>
                <CardItem translateZ={40} className="mt-5 max-w-[34ch] text-[16px] leading-relaxed text-foreground/80">
                  {COMPANY.firstContactRole[0].toUpperCase() + COMPANY.firstContactRole.slice(1)}:
                  принимает заявки, выезжает на замер, считает объект и
                  согласует дату выхода бригады. Звоните сюда в первую очередь.
                </CardItem>
                <CardItem translateZ={90} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
                  <a
                    href={COMPANY.phoneHref}
                    className="inline-flex items-center gap-2 border-b border-orange/50 pb-1.5 font-mono text-2xl text-orange transition-colors hover:border-orange"
                  >
                    {COMPANY.phoneDisplay}
                    <Phone className="size-5" aria-hidden />
                  </a>
                  {MESSENGERS.map((m) => (
                    <a
                      key={m.key}
                      href={messengerLink(m.key)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 border-b border-line pb-1.5 text-lg text-cream transition-colors hover:border-orange hover:text-orange"
                    >
                      {m.name}
                      <ArrowUpRight className="size-4" aria-hidden />
                    </a>
                  ))}
                </CardItem>
                <CardItem translateZ={50} className="absolute top-8 right-8 sm:top-10 sm:right-10">
                  <Image src="/logo-square.png" alt="" width={900} height={652} className="h-auto w-20 sm:w-28" />
                </CardItem>
              </CardBody>
            </CardContainer>

            {/* Визитка 2: руководитель - если по рабочему не дозвонились. */}
            <CardContainer containerClassName="py-0" className="w-full">
              <CardBody className="group/card relative h-auto w-full rounded-lg border border-line bg-gradient-to-br from-graphite to-ink p-8 sm:p-10">
                <CardItem translateZ={50} className="absolute top-8 right-8 sm:top-10 sm:right-10">
                  <Image src="/logo-square.png" alt="" width={900} height={652} className="h-auto w-20 opacity-80 sm:w-28" />
                </CardItem>
                <CardItem translateZ={30} className="stamp pr-24 text-muted-ink sm:pr-32">
                  {COMPANY.ownerRole} · если по рабочему не дозвонились
                </CardItem>
                <CardItem translateZ={70} className="stencil mt-6 text-cream text-[clamp(2.25rem,7vw,3.75rem)] leading-[0.9]">
                  {COMPANY.ownerFirstName}
                </CardItem>
                <CardItem translateZ={40} className="mt-5 max-w-[34ch] text-[16px] leading-relaxed text-foreground/80">
                  Отвечаю за объект целиком: технология, бригады, спорные
                  вопросы и всё, что не решилось на первом контакте.
                </CardItem>
                <CardItem translateZ={90} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
                  <a
                    href={COMPANY.ownerPhoneHref}
                    className="inline-flex items-center gap-2 border-b border-line pb-1.5 font-mono text-xl text-cream transition-colors hover:border-orange hover:text-orange"
                  >
                    {COMPANY.ownerPhoneDisplay}
                    <Phone className="size-4" aria-hidden />
                  </a>
                  <a
                    href={COMPANY.telegramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border-b border-orange/50 pb-1.5 font-mono text-xl text-orange transition-colors hover:border-orange"
                  >
                    @{COMPANY.telegramHandle}
                    <ArrowUpRight className="size-4" aria-hidden />
                  </a>
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
