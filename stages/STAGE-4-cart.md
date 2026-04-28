# Этап 4 — Корзина: Context + страница `/cart` + Drawer

## Контекст проекта

Проект: **«Статус»** — интернет-магазин охотничьей амуниции.  
Стек: **Next.js 16.2.4** (App Router) · React 19 · TypeScript · Tailwind CSS v4.  
Рабочая директория: `src/`  
Алиас: `@/` = `src/`

**Перед работой** прочитай:
- `node_modules/next/dist/docs/01-app/index.md`

---

## Предусловие (Этапы 1–3 уже выполнены)

Должны существовать:
- `src/types/index.ts` — типы `Product`, `CartItem`
- `src/components/ui/ProductCard.tsx` — кнопка «В корзину» (сейчас заглушка)
- `src/components/product/ProductInfo.tsx` — кнопка «В корзину» (сейчас заглушка)
- `src/components/layout/Header.tsx` — иконка корзины (нужно подключить)

---

## Задача

Реализовать полноценную корзину:
1. **CartContext** — глобальное состояние
2. **CartDrawer** — выдвигающаяся панель справа
3. **Страница `/cart`** — полная страница корзины

---

## Архитектура

```
src/context/
  CartContext.tsx        — провайдер + хук useCart
src/components/cart/
  CartDrawer.tsx         — drawer ("use client")
  CartDrawerItem.tsx     — элемент в drawer
  CartSummary.tsx        — итого (переиспользуется в drawer и /cart)
src/app/cart/
  page.tsx               — страница корзины
  CartPageClient.tsx     — "use client"
```

---

## Шаг 1 — CartContext

Создать **`src/context/CartContext.tsx`** (`"use client"`):

```tsx
"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Product, CartItem } from "@/types";

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsOpen(true); // открыть drawer при добавлении
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.product.id !== productId));
    } else {
      setItems((prev) =>
        prev.map((i) =>
          i.product.id === productId ? { ...i, quantity } : i
        )
      );
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const isInCart = useCallback(
    (productId: string) => items.some((i) => i.product.id === productId),
    [items]
  );

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{
      items, totalItems, totalPrice,
      addItem, removeItem, updateQuantity, clearCart, isInCart,
      isOpen, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false),
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
```

---

## Шаг 2 — Подключить провайдер в layout

Обновить **`src/app/layout.tsx`**:
- Обернуть `{children}` в `<CartProvider>`
- Добавить `<CartDrawer />` внутри `<body>` (вне `<main>`)

```tsx
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";

// В body:
<CartProvider>
  <Header />
  <CartDrawer />
  <main className="flex-1">{children}</main>
  <Footer />
</CartProvider>
```

---

## Шаг 3 — CartDrawer

Создать **`src/components/cart/CartDrawer.tsx`** (`"use client"`):

- Использует `useCart()` для получения `items`, `isOpen`, `closeCart`
- **Overlay**: тёмный полупрозрачный фон при открытии, клик закрывает
- **Панель**: справа, ширина `w-80 md:w-96`, высота 100vh, фон `#111`
- Анимация: `translate-x-full` → `translate-x-0` через `transition-transform duration-300`
- Заголовок «Корзина» + иконка × для закрытия
- Список `CartDrawerItem` с вертикальным скроллом
- Если корзина пуста: сообщение «Корзина пуста» + кнопка «Перейти в каталог»
- Внизу: `CartSummary` с кнопкой «Оформить заказ» → `/checkout`

---

## Шаг 4 — CartDrawerItem

Создать **`src/components/cart/CartDrawerItem.tsx`** (`"use client"`):

```tsx
interface CartDrawerItemProps {
  item: CartItem;
}
```

- Миниатюра товара (квадрат 64px)
- Название (2 строки max)
- Цена за единицу
- Кнопки `−` `[N]` `+` (вызывают `updateQuantity`)
- Кнопка × (удалить товар — `removeItem`)

---

## Шаг 5 — CartSummary

Создать **`src/components/cart/CartSummary.tsx`**:

```tsx
interface CartSummaryProps {
  items: CartItem[];
  totalPrice: number;
  showCheckoutButton?: boolean;
  showClearButton?: boolean;
}
```

Отображает:
- Количество позиций: `«3 позиции»`
- Промежуточный итог
- Доставка: «Бесплатно при заказе от 5 000 ₽» / «Рассчитывается при оформлении»
- **Итого** — жирный крупный
- Кнопка «Оформить заказ» → `/checkout` (если `showCheckoutButton`)
- Кнопка «Очистить корзину» (если `showClearButton`)

---

## Шаг 6 — Страница `/cart`

Создать **`src/app/cart/page.tsx`** (серверный):
```tsx
import { Metadata } from "next";
import CartPageClient from "./CartPageClient";

export const metadata: Metadata = {
  title: "Корзина — Статус",
};

export default function CartPage() {
  return <CartPageClient />;
}
```

Создать **`src/app/cart/CartPageClient.tsx`** (`"use client"`):

Структура страницы:
```
Хлебные крошки: Главная / Корзина

<h1>Корзина</h1>

Если пусто → EmptyCart (кнопка «В каталог»)

Если есть товары:
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div className="lg:col-span-2">
      // список CartPageItem (расширенный вид)
    </div>
    <div>
      // CartSummary с обеими кнопками
    </div>
  </div>
```

Создать **`src/components/cart/CartPageItem.tsx`** (`"use client"`):
- Расширенная версия CartDrawerItem
- Большая миниатюра (96px)
- Полное название, категория
- Цена × количество = сумма строки
- Управление количеством + удаление

---

## Шаг 7 — Обновить Header

Обновить **`src/components/layout/Header.tsx`**:
- Подключить `useCart()` (`"use client"`)
- Иконка корзины показывает badge с количеством товаров (`totalItems`)
- Клик на иконку открывает drawer (`openCart()`)

---

## Шаг 8 — Подключить «В корзину» в ProductCard и ProductInfo

Обновить **`src/components/ui/ProductCard.tsx`**:
- Кнопка «В корзину» вызывает `addItem(product, 1)` из `useCart()`
- Если товар уже в корзине: текст «Уже в корзине» + другой стиль

Обновить **`src/components/product/ProductInfo.tsx`**:
- Кнопка «В корзину» вызывает `addItem(product, quantity)` из `useCart()`
- После добавления: анимация/feedback (кратко показать «Добавлено ✓»)

---

## Результат этапа

- Глобальное состояние корзины через Context
- Drawer открывается при добавлении товара
- Страница `/cart` с полным управлением
- Счётчик в Header
- Кнопки «В корзину» работают на всех страницах

**Проверка:** `npm run build` без ошибок TypeScript.
