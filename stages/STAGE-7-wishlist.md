# Этап 7 — Избранное: Wishlist Context + страница `/wishlist`

## Контекст проекта

Проект: **«Статус»** — интернет-магазин охотничьей амуниции.  
Стек: **Next.js 16.2.4** (App Router) · React 19 · TypeScript · Tailwind CSS v4.  
Рабочая директория: `src/`  
Алиас: `@/` = `src/`

---

## Предусловие (Этапы 1–6 уже выполнены)

Должны существовать:
- `src/types/index.ts` — типы `Product`, `WishlistItem`
- `src/context/CartContext.tsx` — образец для создания нового контекста
- `src/components/ui/ProductCard.tsx` — кнопка «В избранное» (сейчас заглушка)
- `src/components/product/ProductInfo.tsx` — кнопка «В избранное» (сейчас заглушка)

---

## Задача

Реализовать wishlist (избранное):
1. **WishlistContext** — глобальное состояние с сохранением в localStorage
2. **Страница `/wishlist`** — просмотр избранного
3. Подключить кнопки сердечка во всех местах

---

## Архитектура

```
src/context/
  WishlistContext.tsx    — провайдер + хук useWishlist
src/app/wishlist/
  page.tsx               — серверная обёртка
  WishlistClient.tsx     — "use client"
```

---

## Шаг 1 — WishlistContext

Создать **`src/context/WishlistContext.tsx`** (`"use client"`):

```tsx
"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { Product, WishlistItem } from "@/types";

interface WishlistContextValue {
  items: WishlistItem[];
  totalItems: number;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

const STORAGE_KEY = "status-wishlist";

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Загрузить из localStorage после монтирования (только на клиенте)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {
      // localStorage недоступен
    }
    setHydrated(true);
  }, []);

  // Сохранять в localStorage при каждом изменении
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // игнорировать ошибки записи
    }
  }, [items, hydrated]);

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      if (prev.some((i) => i.product.id === product.id)) return prev;
      return [...prev, { product, addedAt: new Date().toISOString() }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const toggleItem = useCallback((product: Product) => {
    setItems((prev) => {
      if (prev.some((i) => i.product.id === product.id)) {
        return prev.filter((i) => i.product.id !== product.id);
      }
      return [...prev, { product, addedAt: new Date().toISOString() }];
    });
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => items.some((i) => i.product.id === productId),
    [items]
  );

  const clearWishlist = useCallback(() => setItems([]), []);

  return (
    <WishlistContext.Provider value={{
      items,
      totalItems: items.length,
      addItem,
      removeItem,
      toggleItem,
      isInWishlist,
      clearWishlist,
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
```

---

## Шаг 2 — Подключить провайдер в layout

Обновить **`src/app/layout.tsx`**:
- Добавить `<WishlistProvider>` в дерево провайдеров

```tsx
<CartProvider>
  <WishlistProvider>
    <SearchProvider>
      ...
    </SearchProvider>
  </WishlistProvider>
</CartProvider>
```

---

## Шаг 3 — Обновить ProductCard

Обновить **`src/components/ui/ProductCard.tsx`**:

Кнопка «В избранное» (сердечко):
- Вызывает `toggleItem(product)` из `useWishlist()`
- Если в избранном: сердце заполненное, цвет `text-[#5c7a3e]`
- Если не в избранном: сердце контурное, `text-[#6b6055]`
- Анимация при клике: `scale-125` на 200ms (через className + timeout)

---

## Шаг 4 — Обновить ProductInfo

Обновить **`src/components/product/ProductInfo.tsx`**:

Кнопка «В избранное»:
- `toggleItem(product)` из `useWishlist()`
- Текст меняется: «В избранное» / «В избранном ♥»
- Стиль: outline-кнопка, при активном состоянии — зелёная обводка

---

## Шаг 5 — Иконка в Header

Обновить **`src/components/layout/Header.tsx`**:
- Добавить иконку сердечка рядом с корзиной
- Badge с количеством (если `totalItems > 0`)
- Ссылка → `/wishlist`

---

## Шаг 6 — Страница `/wishlist`

Создать **`src/app/wishlist/page.tsx`** (серверный):
```tsx
import { Metadata } from "next";
import WishlistClient from "./WishlistClient";

export const metadata: Metadata = {
  title: "Избранное — Статус",
};

export default function WishlistPage() {
  return <WishlistClient />;
}
```

Создать **`src/app/wishlist/WishlistClient.tsx`** (`"use client"`):

Использует `useWishlist()`.

Структура:
```
Хлебные крошки: Главная / Избранное

<h1>Избранное <span>(N товаров)</span></h1>

Если пусто:
  Иконка пустого сердца + «Вы ещё ничего не добавили в избранное»
  Кнопка «Перейти в каталог»

Если есть товары:
  Кнопка «Очистить избранное» (справа)
  Сетка ProductCard (2/3/4 колонки)
  
  // Каждая карточка показывает заполненное сердце (товар уже в избранном)
```

Особенности:
- При удалении из избранного прямо со страницы: товар исчезает с анимацией `opacity-0 scale-95`
- «Очистить избранное» — показывать диалог подтверждения (простой `window.confirm`)

---

## Шаг 7 — Кнопка «Добавить в корзину» на странице wishlist

На странице `/wishlist` под каждой карточкой (или через кнопку на карточке):
- «В корзину» — добавляет в корзину и убирает из избранного (или оставляет — на выбор)
- Использовать `addItem` из `useCart()`

---

## Результат этапа

- Глобальный wishlist с сохранением в localStorage
- Сердечко работает на всех карточках и странице товара
- Страница `/wishlist` с управлением избранным
- Иконка с badge в Header
- Данные сохраняются между сессиями

**Проверка:** `npm run build` без ошибок TypeScript.
