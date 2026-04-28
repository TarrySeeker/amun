# Этап 2 — Страница каталога `/catalog`

## Контекст проекта

Проект: **«Статус»** — интернет-магазин охотничьей амуниции.  
Стек: **Next.js 16.2.4** (App Router) · React 19 · TypeScript · Tailwind CSS v4.  
Рабочая директория: `src/`  
Алиас: `@/` = `src/`

**Перед работой** прочитай:
- `node_modules/next/dist/docs/01-app/index.md`
- `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/dynamic-routes.md`

---

## Предусловие (Этап 1 уже выполнен)

Должны существовать:
- `src/types/index.ts` — типы `Product`, `Category`, `FilterState`, `SortOption`
- `src/data/products.ts` — 18+ товаров
- `src/data/categories.ts` — 6 категорий
- `src/lib/products.ts` — функции `getAllProducts`, `filterAndSort`, `getProductsByCategory`

---

## Задача

Создать страницу каталога со следующими маршрутами:
- `/catalog` — все товары
- `/catalog?category=zhilety&sort=price-asc&min=1000&max=20000` — с фильтрами через URL

---

## Архитектура

```
src/app/catalog/
  page.tsx              — серверный компонент, читает searchParams
  loading.tsx           — skeleton-заглушка
  CatalogClient.tsx     — "use client", управляет UI фильтров
src/components/catalog/
  FilterSidebar.tsx     — боковая панель фильтров
  SortSelect.tsx        — выпадающий список сортировки
  ProductGrid.tsx       — сетка товаров
  ActiveFilters.tsx     — показывает активные теги фильтров
  EmptyState.tsx        — заглушка «ничего не найдено»
```

---

## Шаг 1 — Серверная страница

Создать **`src/app/catalog/page.tsx`** (серверный компонент, без `"use client"`):

```tsx
import { Metadata } from "next";
import { getAllProducts, filterAndSort, getPriceRange } from "@/lib/products";
import { categories } from "@/data/categories";
import { FilterState, SortOption, Category } from "@/types";
import CatalogClient from "./CatalogClient";

export const metadata: Metadata = {
  title: "Каталог — Статус",
  description: "Весь ассортимент охотничьей амуниции: жилеты, подсумки, снаряжение, ремни.",
};

interface PageProps {
  searchParams: Promise<{
    category?: string;
    sort?: string;
    min?: string;
    max?: string;
    stock?: string;
  }>;
}

export default async function CatalogPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { min: priceMin, max: priceMax } = getPriceRange();

  const filter: FilterState = {
    categories: params.category
      ? [params.category as Category]
      : [],
    priceMin: params.min ? Number(params.min) : priceMin,
    priceMax: params.max ? Number(params.max) : priceMax,
    inStockOnly: params.stock === "1",
    sortBy: (params.sort as SortOption) ?? "default",
  };

  const allProducts = getAllProducts();
  const filtered = filterAndSort(allProducts, filter);

  return (
    <CatalogClient
      initialProducts={filtered}
      allProducts={allProducts}
      categories={categories}
      filter={filter}
      priceRange={{ min: priceMin, max: priceMax }}
    />
  );
}
```

> **Важно:** в Next.js 16 `searchParams` — это `Promise`, его нужно `await`.

---

## Шаг 2 — CatalogClient

Создать **`src/app/catalog/CatalogClient.tsx`** (`"use client"`):

Пропсы:
```ts
interface CatalogClientProps {
  initialProducts: Product[];
  allProducts: Product[];
  categories: CategoryMeta[];
  filter: FilterState;
  priceRange: { min: number; max: number };
}
```

Функциональность:
- Хранить состояние фильтров локально (`useState`)
- При изменении фильтра — обновлять URL через `useRouter` + `useSearchParams` без перезагрузки страницы (`router.push` с новыми params)
- На мобильном — кнопка «Фильтры» открывает sidebar как drawer
- Показывать количество результатов: `«Найдено 12 товаров»`

Структура JSX:
```
<div className="container mx-auto px-4 py-8">
  <h1>Каталог</h1>
  <ActiveFilters />          // теги активных фильтров
  <div className="flex gap-8">
    <FilterSidebar />        // w-64, sticky
    <div className="flex-1">
      <SortSelect />
      <ProductGrid />        // или <EmptyState />
    </div>
  </div>
</div>
```

---

## Шаг 3 — FilterSidebar

Создать **`src/components/catalog/FilterSidebar.tsx`** (`"use client"`):

Секции фильтра:
1. **Категории** — checkbox-список всех 6 категорий с количеством товаров
2. **Цена** — два input `[от] [до]` с кнопкой «Применить»
3. **Наличие** — checkbox «Только в наличии»

Стиль: тёмный фон `bg-[#111]`, граница `border border-[#1e1e1e]`, заголовки секций через Oswald.

---

## Шаг 4 — SortSelect

Создать **`src/components/catalog/SortSelect.tsx`** (`"use client"`):

Опции:
- `default` → «По умолчанию»
- `price-asc` → «Цена: по возрастанию»
- `price-desc` → «Цена: по убыванию»
- `rating-desc` → «По рейтингу»
- `new` → «Новинки»

Кастомный стиль `<select>` в тёмной теме.

---

## Шаг 5 — ProductGrid

Создать **`src/components/catalog/ProductGrid.tsx`**:

- Импортирует `ProductCard` из `@/components/ui/ProductCard`
- Сетка: `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4`
- Принимает `products: Product[]`

---

## Шаг 6 — ActiveFilters

Создать **`src/components/catalog/ActiveFilters.tsx`** (`"use client"`):

- Показывает активные фильтры как теги-пилюли
- Кнопка × на каждом теге убирает этот фильтр
- Кнопка «Сбросить всё» если есть хоть один активный фильтр

---

## Шаг 7 — EmptyState

Создать **`src/components/catalog/EmptyState.tsx`**:

- Большая иконка (SVG охота/прицел)
- Текст «Товары не найдены»
- Кнопка «Сбросить фильтры» (ссылка на `/catalog`)

---

## Шаг 8 — loading.tsx

Создать **`src/app/catalog/loading.tsx`**:

- Skeleton-заглушка: боковая панель-скелетон + сетка из 8 карточек-скелетонов
- Использовать `animate-pulse` классы Tailwind

---

## Шаг 9 — Breadcrumbs

Добавить компонент **`src/components/ui/Breadcrumbs.tsx`**:
```tsx
interface BreadcrumbItem {
  label: string;
  href?: string;
}
```
- Разделитель `/` между элементами
- Последний элемент не кликабелен, цвет `text-[#f0ece4]`
- Остальные — ссылки `text-[#6b6055] hover:text-[#7a9e52]`

Использовать в CatalogClient: `Главная / Каталог`

---

## Шаг 10 — Ссылки из Header

Обновить **`src/components/layout/Header.tsx`**:
- Пункт меню «Каталог» → `href="/catalog"`
- Пункты категорий в выпадающем меню → `/catalog?category=<slug>`

---

## Результат этапа

- Страница `/catalog` работает
- Фильтры по категориям, цене, наличию работают
- Сортировка работает
- Фильтры отражаются в URL (поддержка прямых ссылок)
- Skeleton при загрузке
- Адаптивная сетка (2/3/4 колонки)

**Проверка:** `npm run build` без ошибок TypeScript.
