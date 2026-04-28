# Этапы разработки — интернет-магазин «Статус»

## Описание проекта

**«Статус»** — интернет-магазин охотничьей амуниции: снаряжение, шапки/кепки, чехлы и рюкзаки/сумки, блокноты/шпаргалки, аксессуары. Производство на Урале.

**Стек:** Next.js 16.2.4 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Oswald + Inter (шрифты)

**Дизайн:** тёмная тема — фон `#0a0a0a`, акцент военный зелёный `#5c7a3e` / `#7a9e52`, текст `#f0ece4`.

---

## Текущее состояние кода

```
src/
  app/
    layout.tsx        — корневой layout (Header + Footer + шрифты)
    page.tsx          — главная страница
    globals.css       — глобальные стили + Tailwind
  components/
    home/
      HeroSection.tsx
      CategoriesSection.tsx
      ProductsSection.tsx
      FeaturesSection.tsx
    layout/
      Header.tsx
      Footer.tsx
    ui/
      ProductCard.tsx  — карточка товара, экспортирует интерфейс Product
```

---

## Список этапов

| № | Файл инструкции | Что делает агент |
|---|----------------|-----------------|
| 1 | [STAGE-1-data-layer.md](./STAGE-1-data-layer.md) | Типы TypeScript, mock-данные, вспомогательные утилиты |
| 2 | [STAGE-2-catalog.md](./STAGE-2-catalog.md) | Страница каталога `/catalog` с фильтрами и сортировкой |
| 3 | [STAGE-3-product-page.md](./STAGE-3-product-page.md) | Страница товара `/product/[id]` с галереей и характеристиками |
| 4 | [STAGE-4-cart.md](./STAGE-4-cart.md) | Корзина: React Context + страница `/cart` + drawer |
| 5 | [STAGE-5-checkout.md](./STAGE-5-checkout.md) | Оформление заказа `/checkout` |
| 6 | [STAGE-6-search.md](./STAGE-6-search.md) | Поиск: модальное окно + страница `/search` |
| 7 | [STAGE-7-wishlist.md](./STAGE-7-wishlist.md) | Избранное: Wishlist Context + страница `/wishlist` |
| 8 | [STAGE-8-seo.md](./STAGE-8-seo.md) | SEO: динамические метаданные, sitemap, structured data |
| 9 | [STAGE-9-polish.md](./STAGE-9-polish.md) | Финальная полировка: loading states, анимации, 404, адаптив |

---

## Важные правила для каждого агента

1. **Перед написанием кода** — прочитать `node_modules/next/dist/docs/` (особенно App Router).
2. Использовать только **App Router** (`src/app/`), Pages Router не используется.
3. Серверные компоненты по умолчанию. `"use client"` — только там, где нужен state/effect.
4. Импорты через алиас `@/` (настроен в `tsconfig.json`).
5. Стили только через **Tailwind CSS v4** классы, не писать inline CSS кроме случаев с CSS-переменными шрифтов.
6. Шрифты: заголовки — `style={{ fontFamily: "var(--font-oswald)" }}`, тело — Inter (по умолчанию).
7. Все тексты на **русском языке**.
8. TypeScript — обязательные типы везде, `any` запрещён.
