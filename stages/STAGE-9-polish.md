# Этап 9 — Финальная полировка UI

## Контекст проекта

Проект: **«Статус»** — интернет-магазин охотничьей амуниции.  
Стек: **Next.js 16.2.4** (App Router) · React 19 · TypeScript · Tailwind CSS v4.  
Рабочая директория: `src/`  
Алиас: `@/` = `src/`

---

## Предусловие (Этапы 1–8 уже выполнены)

Все страницы и функции реализованы. Этот этап — финальная доработка качества.

---

## Задача

Улучшить UX и качество проекта:
1. Глобальный `not-found.tsx`
2. `error.tsx` для обработки ошибок
3. Toast-уведомления
4. Улучшение адаптивности (мобильное меню)
5. Анимации и микроинтеракции
6. Skeleton-состояния
7. Доступность (a11y)
8. Оптимизация изображений

---

## Шаг 1 — Глобальный not-found.tsx

Создать **`src/app/not-found.tsx`**:

```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-32 text-center">
      {/* Большая цифра 404 в стиле проекта */}
      <div
        className="text-[160px] font-black leading-none text-[#1a1a1a] select-none"
        style={{ fontFamily: "var(--font-oswald)" }}
        aria-hidden="true"
      >
        404
      </div>
      <h1
        className="text-3xl font-bold text-[#f0ece4] mt-4 mb-4"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        Страница не найдена
      </h1>
      <p className="text-[#6b6055] mb-8 max-w-md mx-auto">
        Возможно, страница была удалена или вы перешли по неверной ссылке
      </p>
      <div className="flex gap-4 justify-center">
        <Link
          href="/"
          className="px-6 py-3 bg-[#5c7a3e] hover:bg-[#6b8f47] text-white transition-colors"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          На главную
        </Link>
        <Link
          href="/catalog"
          className="px-6 py-3 border border-[#2a2a2a] hover:border-[#5c7a3e] text-[#f0ece4] transition-colors"
          style={{ fontFamily: "var(--font-oswald)" }}
        >
          В каталог
        </Link>
      </div>
    </div>
  );
}
```

---

## Шаг 2 — error.tsx

Создать **`src/app/error.tsx`** (`"use client"`):

```tsx
"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-32 text-center">
      <h1 className="text-3xl font-bold text-[#f0ece4] mb-4">
        Что-то пошло не так
      </h1>
      <p className="text-[#6b6055] mb-8">
        Произошла ошибка. Попробуйте обновить страницу.
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-[#5c7a3e] hover:bg-[#6b8f47] text-white transition-colors"
      >
        Попробовать снова
      </button>
    </div>
  );
}
```

---

## Шаг 3 — Toast-уведомления

Создать **`src/context/ToastContext.tsx`** (`"use client"`):

```tsx
interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

interface ToastContextValue {
  toasts: Toast[];
  showToast: (message: string, type?: Toast["type"]) => void;
  removeToast: (id: string) => void;
}
```

- `showToast` добавляет toast, автоматически удаляет через 3 секунды
- ID генерировать через `Date.now().toString()`

Создать **`src/components/ui/ToastContainer.tsx`** (`"use client"`):

- Фиксированное положение: `fixed bottom-6 right-6 z-50`
- Каждый toast: `bg-[#111] border-l-4 border-[#5c7a3e] px-4 py-3`
- Анимация появления: `translate-y-0 opacity-100` из `translate-y-4 opacity-0`
- Добавить `<ToastContainer />` в `layout.tsx`

Обновить:
- `CartContext.tsx` → после `addItem` вызывать `showToast("Товар добавлен в корзину")`
- `WishlistContext.tsx` → после `toggleItem` вызывать `showToast("Добавлено в избранное")` / `showToast("Удалено из избранного", "info")`

---

## Шаг 4 — Мобильное меню

Обновить **`src/components/layout/Header.tsx`**:

Добавить бургер-меню для мобильных (`md:hidden`):
- Кнопка ☰ открывает fullscreen drawer
- Drawer содержит: навигацию, поиск, иконки корзины и избранного
- Анимация: slide-in справа или сверху
- При открытии меню — заблокировать scroll (`document.body.style.overflow = "hidden"`)

Структура мобильного drawer:
```
[×] Закрыть
--
Каталог
Жилеты
Подсумки
...
--
[Поиск]
--
♥ Избранное (N)
🛒 Корзина (N)
```

---

## Шаг 5 — Анимации и микроинтеракции

Добавить в **`src/app/globals.css`** кастомные анимации:

```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

.animate-scale-in {
  animation: scaleIn 0.2s ease-out forwards;
}
```

Применить `animate-fade-in` к:
- Сетке товаров в каталоге при первой загрузке
- Результатам поиска
- Карточкам на странице wishlist

---

## Шаг 6 — Scroll to top

Создать **`src/components/ui/ScrollToTop.tsx`** (`"use client"`):

- Кнопка «↑» появляется при скролле ниже 400px (`useEffect` + `scroll` event)
- Позиция: `fixed bottom-6 left-6 z-40`
- Стиль: квадрат 44px, фон `bg-[#111]`, граница `border border-[#2a2a2a]`
- Клик: `window.scrollTo({ top: 0, behavior: "smooth" })`
- Добавить в `layout.tsx`

---

## Шаг 7 — Доступность (a11y)

Проверить и исправить:
- Все кнопки без текста имеют `aria-label`
- Все интерактивные элементы доступны с клавиатуры (`focus-visible` стили)
- Модальные окна (SearchModal, CartDrawer) используют `role="dialog"` и `aria-modal="true"`
- Добавить `aria-live="polite"` для количества товаров в корзине
- Все изображения имеют `alt`

Добавить в `globals.css` стиль фокуса:
```css
:focus-visible {
  outline: 2px solid #5c7a3e;
  outline-offset: 2px;
}
```

---

## Шаг 8 — Оптимизация изображений

Обновить все места, где используется тег `<img>` или `background-image`:

- Там, где возможно, заменить на компонент `<Image>` из `next/image`
- В `ProductCard.tsx`: заменить `div` с `backgroundImage` на `<Image>` с `fill` и `object-cover`
- В `ProductGallery.tsx`: использовать `<Image>` с `priority` для первого изображения

Обновить **`next.config.ts`** — добавить разрешённые домены (если изображения будут с внешних источников).

---

## Шаг 9 — Финальная проверка Header и Footer

Обновить **`src/components/layout/Footer.tsx`**:
- Добавить реальные разделы:
  - **Магазин**: Каталог, Новинки, Хиты продаж
  - **Информация**: О компании, Доставка и оплата, Возврат товара
  - **Контакты**: телефон, email, адрес (г. Екатеринбург)
  - **Соцсети**: иконки VK, Telegram
- Копирайт: «© 2024 Статус. Производство на Урале»

---

## Шаг 10 — Финальный README

Обновить **`README.md`** в корне проекта:

```markdown
# Статус — Интернет-магазин охотничьей амуниции

## Стек
- Next.js 16.2.4 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Шрифты: Oswald + Inter

## Запуск
npm install
npm run dev

## Структура
src/app/         — страницы (App Router)
src/components/  — компоненты
src/context/     — провайдеры состояния
src/data/        — mock-данные
src/lib/         — утилиты
src/types/       — TypeScript типы

## Страницы
/              — Главная
/catalog       — Каталог с фильтрами
/product/[slug] — Страница товара
/cart          — Корзина
/checkout      — Оформление заказа
/search        — Поиск
/wishlist      — Избранное
```

---

## Результат этапа

- Страница 404 в стиле проекта
- Обработчик ошибок
- Toast-уведомления при добавлении в корзину/избранное
- Мобильное меню
- Анимации
- Кнопка прокрутки наверх
- Улучшена доступность
- Использован `<Image>` из next/image
- Обновлён Footer и README

**Финальная проверка:** `npm run build` без ошибок. `npm run lint` без ошибок.
