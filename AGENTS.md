<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Правила проекта «СТЯЖКА PROчно»

Сайт компании: полусухая стяжка пола в Уфе. Владелец - Расул. Передан для работы над визуалом 16.09.2026.
Подробная карта файлов и открытые вопросы - в `README.md`, читать перед первой правкой.

## Откуда берутся цифры и тексты

Все факты живут в `src/data/` и больше нигде: `pricing.ts` (цены, толщина, минималка, выезд, гарантия), `company.ts` (телефоны, юрлица, мессенджеры), `content.ts` (состав работ, этапы, объекты, FAQ, уход), `geo.ts` (карточки на картах, пока пустые). В разметке цифр нет и быть не должно - это правило репозитория владельца, а не стиль.

Источник правды для них - база знаний `~/Уян проект 1/business/`: прайс `products/pricing.md`, нормы `products/normy.md`, контакты `assets/contacts.md`. Прайс сверен на 08.09.2026.

**Без владельца не менять:** цены и минимальный заказ, телефоны и порядок контактов, ссылки на СП 71.13330.2017 и СП 29.13330.2011, срок гарантии, тексты про ровность 4 мм и 2 мм. Это не редактура, это обещания клиенту.

## Честность

Выдуманных цифр на сайте нет: ни лет на рынке, ни числа объектов, ни рейтингов. Блок «Мы на картах» скрыт, пока карточек нет - так решил владелец.

Фото в разрезе пола - сгенерированные иллюстрации материалов, на сайте они прямо подписаны как иллюстрации. Генерировать «фото наших объектов» нельзя: это выдуманное доказательство. Объекты - только реальные снимки с согласия заказчика.

## Бренд

Графит `#2E3132`, оранжевый `#EF7F1A`, кремовый `#FFFBDB` - сняты с логотипа, эталон в `business/assets/brand-guidelines.md`. Токены в `src/app/globals.css`. Логотип не перекрашивать, не растягивать, теней не добавлять.

Аудитория 30-35+: основной текст от 16px, подписи от 14px, мелкий разряженный капслок владелец уже забраковал. Тёмная тема одна, светлой версии нет.

## Перед сдачей

```bash
npm run build && npm run lint && npx playwright test
```

48 тестов должны остаться зелёными: они проверяют цены против `data/pricing.ts`, форму заявки, загрузку картинок и отсутствие горизонтальной прокрутки на 360, 390, 768 и 1440.

## Границы

Деплоя нет, домен не куплен - не деплоить. Пока идёт работа над визуалом, Claude в этот репозиторий не заходит; задачи друг другу - через `~/Уян проект 1/INBOX.md`.
