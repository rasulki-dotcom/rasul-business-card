"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, Copy, Loader2, Send } from "lucide-react";

import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { COMPANY, MAX_NOTE, MESSENGERS, messengerLink, type MessengerKey } from "@/data/company";
import { cn } from "@/lib/utils";

const OBJECT_TYPES = ["Квартира", "Дом", "Коммерция"] as const;
type ObjectType = (typeof OBJECT_TYPES)[number];

type Status = "idle" | "sending" | "sent";
type Errors = Partial<Record<"name" | "phone" | "consent", string>>;

export function RequestForm() {
  const formId = useId();
  const [objectType, setObjectType] = useState<ObjectType>("Квартира");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [comment, setComment] = useState("");
  const [consent, setConsent] = useState(false);
  const [messenger, setMessenger] = useState<MessengerKey>("whatsapp");
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const buildMessage = () =>
    [
      "Заявка с сайта",
      `Имя: ${name.trim()}`,
      phone.trim() ? `Телефон: ${phone.trim()}` : null,
      `Объект: ${objectType}`,
      area.trim() ? `Площадь: ${area.trim()} м²` : null,
      comment.trim() ? `Комментарий: ${comment.trim()}` : null,
    ]
      .filter(Boolean)
      .join("\n");

  const validate = () => {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Введите имя - как к вам обращаться";
    const digits = phone.replace(/\D/g, "");
    if (phone.trim() && digits.length < 10)
      next.phone = "Проверьте номер: не хватает цифр";
    if (!consent) next.consent = "Без согласия не смогу принять заявку";
    return next;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    // Окно открываем прямо в обработчике клика, иначе его срежет блокировщик.
    window.open(messengerLink(messenger, buildMessage()), "_blank", "noopener,noreferrer");

    setStatus("sending");
    timer.current = setTimeout(() => setStatus("sent"), 600);
  };

  const messengerName = MESSENGERS.find((m) => m.key === messenger)?.name ?? "";

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(buildMessage());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Буфер недоступен (старый браузер, http) - текст всё равно виден в мессенджере.
    }
  };

  return (
    <section
      id="zayavka"
      className="border-b border-line-soft bg-ink-raise/40 py-24 lg:py-32"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <BlurFade inView direction="up" className="lg:col-span-5">
          <p className="stamp text-orange">Заявка</p>
          <h2 className="stencil mt-4 text-cream text-[clamp(2rem,5vw,3.25rem)] leading-[0.95]">
            Расскажите про объект
          </h2>
          <p className="mt-5 max-w-[44ch] text-[17px] leading-relaxed text-foreground/80">
            Площадь и тип объекта - этого хватает, чтобы назвать порядок цифр.
            Точную сумму считаем после замера.
          </p>
          <p className="mt-6 max-w-[44ch] text-[16px] leading-relaxed text-muted-ink">
            Сайт ничего не хранит и никуда не отправляет сам: по кнопке
            открывается WhatsApp или Telegram на рабочем номере с готовым
            сообщением, отправляете его вы. {MAX_NOTE}.
          </p>
          <p className="mt-6 text-[16px] text-foreground/80">
            Удобнее голосом - позвоните:{" "}
            <a href={COMPANY.phoneHref} className="font-mono text-lg whitespace-nowrap text-cream hover:text-orange">
              {COMPANY.phoneDisplay}
            </a>
          </p>
        </BlurFade>

        <BlurFade inView direction="up" delay={0.1} className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-lg border border-line bg-ink p-7 sm:p-9">
            <div className="motion-reduce:hidden">
              <BorderBeam
                size={110}
                duration={9}
                borderWidth={1.5}
                colorFrom="#ef7f1a"
                colorTo="#fffbdb"
              />
            </div>

            {status === "sent" ? (
              <div className="flex min-h-[420px] flex-col items-start justify-center">
                <span className="flex size-11 items-center justify-center rounded-full border border-orange/50 bg-orange/10">
                  <Check className="size-5 text-orange" aria-hidden />
                </span>
                <h3 className="mt-6 text-3xl font-semibold text-cream">
                  Сообщение собрано
                </h3>
                <p className="mt-3 max-w-[42ch] text-[17px] leading-relaxed text-foreground/80">
                  {messengerName} открылся в соседней вкладке с чатом на рабочий
                  номер {COMPANY.phoneDisplay} - осталось нажать «отправить».
                  Если вкладка не открылась, откройте ещё раз или скопируйте текст
                  и отправьте в любой мессенджер.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild className="h-14 px-7 text-base">
                    <a href={messengerLink(messenger, buildMessage())} target="_blank" rel="noreferrer">
                      <Send className="size-4" aria-hidden />
                      Открыть {messengerName}
                    </a>
                  </Button>
                  <Button variant="outline" className="h-14 px-7 text-base" onClick={copyMessage}>
                    <Copy className="size-4" aria-hidden />
                    {copied ? "Скопировано" : "Скопировать текст"}
                  </Button>
                  <Button
                    variant="outline"
                    className="h-14 px-7 text-base"
                    onClick={() => setStatus("idle")}
                  >
                    Изменить заявку
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-7">
                <fieldset>
                  <legend className="stamp text-muted-ink">Тип объекта</legend>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {OBJECT_TYPES.map((type) => (
                      <label
                        key={type}
                        className={cn(
                          "flex h-13 cursor-pointer items-center justify-center rounded-md border text-base transition-colors",
                          objectType === type
                            ? "border-orange/70 bg-orange/10 text-cream"
                            : "border-line text-muted-ink hover:border-line hover:text-foreground",
                        )}
                      >
                        <input
                          type="radio"
                          name={`${formId}-object`}
                          value={type}
                          checked={objectType === type}
                          onChange={() => setObjectType(type)}
                          className="sr-only"
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor={`${formId}-name`} className="text-base">
                      Имя
                    </Label>
                    <Input
                      id={`${formId}-name`}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Как к вам обращаться"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={
                        errors.name ? `${formId}-name-error` : undefined
                      }
                      className="h-14 md:text-[17px]"
                    />
                    {errors.name && (
                      <p
                        id={`${formId}-name-error`}
                        className="text-[15px] text-destructive"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`${formId}-phone`} className="text-base">
                      Телефон
                      <span className="ml-2 text-sm font-normal text-muted-ink">
                        если удобнее звонком
                      </span>
                    </Label>
                    <Input
                      id={`${formId}-phone`}
                      type="tel"
                      inputMode="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+7"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={
                        errors.phone ? `${formId}-phone-error` : undefined
                      }
                      className="h-14 md:text-[17px]"
                    />
                    {errors.phone && (
                      <p
                        id={`${formId}-phone-error`}
                        className="text-[15px] text-destructive"
                      >
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`${formId}-area`} className="text-base">
                    Площадь, м²
                  </Label>
                  <Input
                    id={`${formId}-area`}
                    type="number"
                    inputMode="numeric"
                    min={1}
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="Например, 62"
                    className="h-14 md:text-[17px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`${formId}-comment`} className="text-base">
                    Что важно знать про объект
                  </Label>
                  <Textarea
                    id={`${formId}-comment`}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Этаж, тёплый пол, сроки, доступ на объект"
                    rows={4}
                    className="resize-none py-3 md:text-[17px]"
                  />
                </div>

                <fieldset>
                  <legend className="stamp text-muted-ink">Куда отправить</legend>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {MESSENGERS.map((m) => (
                      <label
                        key={m.key}
                        className={cn(
                          "flex h-13 cursor-pointer items-center justify-center rounded-md border text-base transition-colors",
                          messenger === m.key
                            ? "border-orange/70 bg-orange/10 text-cream"
                            : "border-line text-muted-ink hover:text-foreground",
                        )}
                      >
                        <input
                          type="radio"
                          name={`${formId}-messenger`}
                          value={m.key}
                          checked={messenger === m.key}
                          onChange={() => setMessenger(m.key)}
                          className="sr-only"
                        />
                        {m.name}
                      </label>
                    ))}
                  </div>
                  <p className="mt-2 text-[14px] text-muted-ink">
                    Чат откроется на рабочем номере {COMPANY.phoneDisplay}. {MAX_NOTE}: скопируйте текст после сборки.
                  </p>
                </fieldset>

                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id={`${formId}-consent`}
                      checked={consent}
                      onCheckedChange={(value) => setConsent(value === true)}
                      aria-describedby={
                        errors.consent ? `${formId}-consent-error` : undefined
                      }
                      className="mt-0.5 size-5"
                    />
                    <Label
                      htmlFor={`${formId}-consent`}
                      className="text-[16px] leading-relaxed font-normal text-muted-ink"
                    >
                      <span>
                        Согласен на обработку указанных данных для ответа на заявку -{" "}
                        <a href="/politika" className="underline decoration-line underline-offset-4 hover:text-cream">
                          политика
                        </a>
                      </span>
                    </Label>
                  </div>
                  {errors.consent && (
                    <p
                      id={`${formId}-consent-error`}
                      className="text-[15px] text-destructive"
                    >
                      {errors.consent}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={status === "sending"}
                  className="h-15 w-full text-lg"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden />
                      Собираю сообщение
                    </>
                  ) : (
                    <>
                      <Send className="size-4" aria-hidden />
                      Отправить заявку
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
