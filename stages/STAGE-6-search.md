# Этап 6 — Поиск: модальное окно + страница `/search`

## Контекст проекта

Проект: **«Статус»** — интернет-магазин охотничьей амуниции.  
Стек: **Next.js 16.2.4** (App Router) · React 19 · TypeScript · Tailwind CSS v4.  
Рабочая директория: `src/`  
Алиас: `@/` = `src/`

---

## Предусловие (Этапы 1–5 уже выполнены)

Должны существовать:
- `src/types/index.ts` — тип `Product`
- `src/lib/products.ts` — `getAllProducts()`
- `src/components/layout/Header.tsx` — иконка поиска (сейчас без функции)

---

## Задача

Реализовать поиск по товарам:
1. **SearchModal** — быстрый поиск при нажатии иконки в Header
2. **Страница `/search`** — полноценная страница результатов

---

## Архитектура

```
src/context/
  SearchContext.tsx      — состояние открытия/закрытия модала
src/components/search/
  SearchModal.tsx        — модальное окно ("use client")
  SearchInput.tsx        — поле ввода с иконкой
  SearchResults.tsx      — список результатов в модале
  SearchResultItem.tsx   — один результат (миниатюра + название + цена)
src/app/search/
  page.tsx               — серверная страница
  SearchPageClient.tsx   — "use client"
```

---

## Шаг 1 — SearchContext

Создать **`src/context/SearchContext.tsx`** (`"use client"`):

```tsx
interface SearchContextValue {
  isOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  query: string;
  setQuery: (q: string) => void;
}
```

- Подключить провайдер в `src/app/layout.tsx` (обернуть вместе с CartProvider)
- Поддерживать сочетание клавиш `Ctrl+K` / `Cmd+K` для открытия (через `useEffect` + `keydown`)

---

## Шаг 2 — Утилита поиска

Добавить в **`src/lib/products.ts`** функцию:

```ts
export function searchProducts(query: string): Product[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  return getAllProducts().filter((p) =>
    p.name.toLowerCase().includes(q) ||
    p.shortDescription.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.tags.some((t) => t.toLowerCase().includes(q))
  );
}
```

---

## Шаг 3 — SearchModal

Создать **`src/components/search/SearchModal.tsx`** (`"use client"`):

Функциональность:
- Overlay (тёмный фон): клик закрывает
- Закрытие по `Escape`
- Анимация: `opacity-0 scale-95` → `opacity-100 scale-100`, `transition duration-200`
- `autoFocus` на input при открытии
- Поиск по мере ввода (debounce 200ms через `useEffect` + `setTimeout`)
- Если `query` пустой: показывать «популярные категории» (6 ссылок на категории)
- Если `query` заполнен и результатов нет: «Ничего не найдено по запросу "..."»
- Если есть результаты: список `SearchResultItem` (max 6 штук)
- Ссылка «Смотреть все результаты (N)» → `/search?q=...`

Стиль:
- Центрированное окно, ширина `max-w-2xl`
- Фон `bg-[#111]`, граница `border border-[#1e1e1e]`
- Высота результатов: `max-h-96 overflow-y-auto`

---

## Шаг 4 — SearchInput

Создать **`src/components/search/SearchInput.tsx`**:

```tsx
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}
```

- Иконка лупы слева (SVG)
- Кнопка × справа (сброс, появляется если есть текст)
- Граница снизу `border-b border-[#2a2a2a]` (без рамки вокруг)
- Большой шрифт `text-lg`

---

## Шаг 5 — SearchResultItem

Создать **`src/components/search/SearchResultItem.tsx`**:

```tsx
interface SearchResultItemProps {
  product: Product;
  onSelect: () => void; // закрыть модал
}
```

- Строка: миниатюра 48px + название + категория + цена
- Ссылка на `/product/[slug]`
- При клике: вызывать `onSelect()` + переход
- Hover: фон `bg-[#1a1a1a]`

---

## Шаг 6 — Подключить SearchModal в layout

Обновить **`src/app/layout.tsx`**:
- Добавить `<SearchModal />` рядом с `<CartDrawer />`
- Добавить `<SearchProvider>` в провайдеры

---

## Шаг 7 — Подключить кнопку поиска в Header

Обновить **`src/components/layout/Header.tsx`**:
- Иконка поиска вызывает `openSearch()` из `useSearch()`
- Добавить горячую клавишу-подсказку `⌘K` рядом с иконкой (только на десктопе)

---

## Шаг 8 — Страница `/search`

Создать **`src/app/search/page.tsx`** (серверный):

```tsx
import { Metadata } from "next";
import SearchPageClient from "./SearchPageClient";

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `«${q}» — поиск — Статус` : "Поиск — Статус",
  };
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  return <SearchPageClient initialQuery={q ?? ""} />;
}
```

Создать **`src/app/search/SearchPageClient.tsx`** (`"use client"`):

```tsx
interface SearchPageClientProps {
  initialQuery: string;
}
```

- `useState` для query, инициализировать из `initialQuery`
- При изменении запроса: обновлять URL через `router.replace` без перезагрузки
- Показывать результаты через `searchProducts(query)`
- Если результаты есть: сетка `ProductCard` (такая же как в каталоге, 2/3/4 колонки)
- Если пусто: `EmptyState` (переиспользовать из каталога или создать свой)
- Заголовок: `«Результаты поиска по «{query}»: N товаров»`

---

## Шаг 9 — Обновить CategoriesSection на главной

Обновить **`src/components/home/CategoriesSection.tsx`** (или Header):
- Добавить форму поиска в мобильном меню (если Header имеет бургер)

---

## Результат этапа

- Модальный поиск открывается по иконке и `Cmd+K`
- Живой поиск с debounce
- Популярные категории в пустом модале
- Страница `/search?q=жилет` с сеткой результатов
- URL обновляется при изменении запроса

**Проверка:** `npm run build` без ошибок TypeScript.
