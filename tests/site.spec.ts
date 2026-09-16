import { expect, test, type Page } from "@playwright/test";

import { GEO_WITH_DATA, pluralReviews } from "../src/data/geo";
import { MIN_ORDER, estimate } from "../src/data/pricing";

const ROUTES = ["/", "/ceny", "/politika"] as const;

/** Ловим всё, что браузер считает ошибкой: исключения и console.error. */
function collectErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`console: ${m.text()}`);
  });
  return errors;
}

const noHorizontalOverflow = (page: Page) =>
  page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1);

for (const route of ROUTES) {
  test(`${route}: открывается без ошибок и без горизонтальной прокрутки`, async ({ page }) => {
    const errors = collectErrors(page);
    const res = await page.goto(route);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();

    // Прокручиваем до низа, чтобы отрисовались все секции с появлением по скроллу.
    await page.evaluate(async () => {
      // behavior: "instant" - у html стоит scroll-behavior: smooth, плавная прокрутка не успевает.
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo({ top: y, behavior: "instant" });
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo({ top: 0, behavior: "instant" });
    });

    expect(await noHorizontalOverflow(page)).toBe(true);
    expect(errors).toEqual([]);
  });
}

test("главная: все секции и якоря на месте", async ({ page }) => {
  await page.goto("/");
  for (const id of ["price", "razrez", "ceny-kratko", "sostav", "process", "objects", "b2b", "faq", "zayavka", "contacts"]) {
    await expect(page.locator(`#${id}`), `секция #${id}`).toHaveCount(1);
  }
});

test("логотип и картинки загружаются", async ({ page }) => {
  await page.goto("/");
  const imgs = page.locator("img");
  const count = await imgs.count();
  expect(count).toBeGreaterThan(0);
  // Картинки ниже первого экрана грузятся лениво: докручиваем до каждой и ждём загрузки,
  // иначе на телефоне тест проверял бы то, что браузер ещё и не должен был качать.
  for (let i = 0; i < count; i++) {
    const img = imgs.nth(i);
    if (!(await img.evaluate((el) => el.getClientRects().length > 0))) continue; // скрыто display:none
    await img.scrollIntoViewIfNeeded();
    const ok = await img
      .evaluate(
        (el) =>
          new Promise<boolean>((resolve) => {
            const im = el as HTMLImageElement;
            const done = () => resolve(im.complete && im.naturalWidth > 0);
            if (im.complete) return done();
            im.addEventListener("load", done, { once: true });
            im.addEventListener("error", () => resolve(false), { once: true });
            setTimeout(done, 10_000);
          }),
      );
    const src = await img.getAttribute("src");
    expect(ok, `img #${i} ${src}`).toBe(true);
  }
});

test("все внутренние ссылки отвечают 200", async ({ page, request }) => {
  const seen = new Set<string>();
  for (const route of ROUTES) {
    await page.goto(route);
    const hrefs = await page.locator("a[href^='/']").evaluateAll((els) =>
      els.map((a) => (a as HTMLAnchorElement).getAttribute("href") ?? ""),
    );
    for (const h of hrefs) {
      const path = h.split("#")[0] || "/";
      if (seen.has(path)) continue;
      seen.add(path);
      const r = await request.get(path);
      expect(r.status(), `ссылка ${h}`).toBe(200);
    }
  }
  expect(seen.size).toBeGreaterThanOrEqual(3);
});

test("навигация: Цены открываются из шапки, якорь из главной работает", async ({ page }) => {
  await page.goto("/");
  // Десктопная навигация появляется от 1024px (lg); уже - жмём ссылку в открытом меню.
  const narrow = (page.viewportSize()?.width ?? 1440) < 1024;
  let scope = page.locator("header nav").first();
  if (narrow) {
    await page.getByRole("button", { name: "Открыть меню" }).click();
    await expect(page.locator("#mobile-menu")).toBeVisible();
    scope = page.locator("#mobile-menu");
  }
  await scope.getByRole("link", { name: "Цены", exact: true }).click();
  await expect(page).toHaveURL(/\/ceny$/);
  await expect(page.locator("h1")).toContainText("Цены");

  await page.goto("/#faq");
  await expect(page.locator("#faq")).toBeInViewport();
});

test("калькулятор считает по формуле из data/pricing", async ({ page }) => {
  await page.goto("/ceny#orientir");
  // На странице цен два поля «Площадь» (калькулятор и форма) - работаем внутри секции.
  const calc = page.locator("#orientir");
  const total = calc.getByTestId("estimate-total");
  await expect(total).toBeVisible();

  const area = calc.getByLabel("Площадь, м²");
  await area.fill("62");
  await calc.getByLabel("Толщина слоя, см").selectOption("9");
  const expected = estimate("apartment", 62, 9);
  expect(expected.kind).toBe("exact");
  if (expected.kind === "exact") {
    await expect(total).toHaveText(new RegExp(expected.total.toLocaleString("ru-RU").replace(/ /g, "[\\s\\u00a0]")));
  }

  // Небольшая площадь - срабатывает минималка, и об этом сказано вслух.
  await area.fill("30");
  await expect(total).toContainText(MIN_ORDER.toLocaleString("ru-RU").slice(0, 2));
  await expect(calc.getByText("применён минимальный заказ")).toBeVisible();

  // До 25 м² - цифры нет, считаем индивидуально.
  await area.fill("18");
  await expect(total).toContainText("индивидуально");

  // Дом до 90 м² - диапазон.
  // Radio спрятан под sr-only, кликаем по подписи - так же, как это делает человек.
  await calc.locator("label", { hasText: "Дом" }).click();
  await expect(calc.getByRole("radio", { name: "Дом" })).toBeChecked();
  await area.fill("70");
  await expect(total).toContainText(" - ");
});

test("форма: валидация и сборка сообщения в Telegram", async ({ page, context }) => {
  await page.goto("/#zayavka");
  const form = page.locator("#zayavka");
  await form.getByRole("button", { name: "Отправить заявку" }).click();
  await expect(form.getByText("Введите имя")).toBeVisible();
  await expect(form.getByText("Без согласия")).toBeVisible();

  await form.getByLabel("Имя").fill("Проверка");
  await form.getByLabel("Площадь, м²").fill("62");
  await form.getByRole("checkbox").check();

  // По умолчанию - WhatsApp на рабочий номер, с черновиком сообщения.
  const [popup] = await Promise.all([
    context.waitForEvent("page"),
    form.getByRole("button", { name: "Отправить заявку" }).click(),
  ]);
  // wa.me тут же редиректит на api.whatsapp.com/send?phone=... - принимаем оба адреса.
  await popup.waitForLoadState("domcontentloaded").catch(() => {});
  const wa = new URL(popup.url());
  expect(wa.hostname).toMatch(/^(wa\.me|api\.whatsapp\.com)$/);
  expect(`${wa.pathname}${wa.search}`).toContain("79930553537");
  const text = wa.searchParams.get("text") ?? "";
  expect(text).toContain("Имя: Проверка");
  expect(text).toContain("Площадь: 62 м²");
  await popup.close();
  await expect(form.getByText("Сообщение собрано")).toBeVisible();
  await expect(form.getByRole("link", { name: /Открыть WhatsApp/ })).toHaveAttribute("href", /wa\.me\/79930553537/);

  // Тот же текст можно отправить в Telegram на тот же номер.
  await form.getByRole("button", { name: "Изменить заявку" }).click();
  await form.locator("label", { hasText: "Telegram" }).click();
  const [popup2] = await Promise.all([
    context.waitForEvent("page"),
    form.getByRole("button", { name: "Отправить заявку" }).click(),
  ]);
  expect(popup2.url()).toMatch(/^https:\/\/t\.me\/\+79930553537\?text=/);
  await popup2.close();
});

test("FAQ раскрывается", async ({ page }) => {
  await page.goto("/#faq");
  const first = page.locator("#faq button").first();
  await first.click();
  await expect(first).toHaveAttribute("aria-expanded", "true");
});

test("уменьшенное движение: страница цела, луча нет", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  const errors = collectErrors(page);
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();
  expect(errors).toEqual([]);
  await ctx.close();
});

test("геосервисы: блок есть ровно тогда, когда есть карточки", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#geo")).toHaveCount(GEO_WITH_DATA.length > 0 ? 1 : 0);
  const ld = await page.locator('script[type="application/ld+json"]').first().textContent();
  expect(ld).toContain('"LocalBusiness"');
  expect(pluralReviews(1)).toBe("1 отзыв");
  expect(pluralReviews(3)).toBe("3 отзыва");
  expect(pluralReviews(12)).toBe("12 отзывов");
  expect(pluralReviews(21)).toBe("21 отзыв");
});
