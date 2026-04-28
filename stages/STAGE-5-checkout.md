# Этап 5 — Оформление заказа `/checkout`

## Контекст проекта

Проект: **«Статус»** — интернет-магазин охотничьей амуниции.  
Стек: **Next.js 16.2.4** (App Router) · React 19 · TypeScript · Tailwind CSS v4.  
Рабочая директория: `src/`  
Алиас: `@/` = `src/`

---

## Предусловие (Этапы 1–4 уже выполнены)

Должны существовать:
- `src/types/index.ts` — типы `CartItem`, `Order`, `DeliveryInfo`, `PaymentMethod`
- `src/context/CartContext.tsx` — `useCart()` с `items`, `totalPrice`, `clearCart`
- `src/components/cart/CartSummary.tsx` — сводка корзины

---

## Задача

Создать страницу оформления заказа `/checkout` с:
- Формой контактных данных
- Выбором доставки
- Выбором способа оплаты
- Сводкой заказа
- Страницей успешного заказа `/checkout/success`

---

## Архитектура

```
src/app/checkout/
  page.tsx              — серверный (просто рендерит CheckoutClient)
  success/
    page.tsx            — страница успеха
  CheckoutClient.tsx    — "use client", вся логика формы
src/components/checkout/
  ContactForm.tsx       — поля контакта
  DeliveryForm.tsx      — выбор доставки
  PaymentForm.tsx       — выбор оплаты
  OrderReview.tsx       — список товаров в правой колонке
  FormSection.tsx       — обёртка секции формы (заголовок + контент)
```

---

## Шаг 1 — Серверная страница

Создать **`src/app/checkout/page.tsx`**:

```tsx
import { Metadata } from "next";
import CheckoutClient from "./CheckoutClient";

export const metadata: Metadata = {
  title: "Оформление заказа — Статус",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
```

---

## Шаг 2 — CheckoutClient

Создать **`src/app/checkout/CheckoutClient.tsx`** (`"use client"`):

Тип данных формы:
```ts
interface CheckoutFormData {
  // Контакт
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  // Доставка
  deliveryMethod: "courier" | "pickup" | "post";
  city: string;
  address: string;
  postalCode: string;
  comment: string;
  // Оплата
  paymentMethod: "card" | "cash" | "sbp";
}
```

Логика:
- `useState<CheckoutFormData>` для полей формы
- Валидация при сабмите: обязательные поля отмечать красной рамкой
- При сабмите: `clearCart()` + `router.push("/checkout/success")`
- Если корзина пуста (при первом рендере) → автоматически редиректить на `/cart`

Макет:
```
<div className="container mx-auto px-4 py-8">
  <h1>Оформление заказа</h1>
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div className="lg:col-span-2 space-y-6">
      <FormSection title="1. Контактные данные">
        <ContactForm />
      </FormSection>
      <FormSection title="2. Доставка">
        <DeliveryForm />
      </FormSection>
      <FormSection title="3. Оплата">
        <PaymentForm />
      </FormSection>
      <button type="submit">Оформить заказ</button>
    </div>
    <div>
      <OrderReview />
    </div>
  </div>
</div>
```

---

## Шаг 3 — FormSection

Создать **`src/components/checkout/FormSection.tsx`**:

```tsx
interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}
```

- Заголовок через Oswald
- Граница сверху `border-t border-[#1e1e1e]` при не первой секции
- Фон `bg-[#111]`, паддинг, радиус

---

## Шаг 4 — ContactForm

Создать **`src/components/checkout/ContactForm.tsx`**:

Поля:
- Имя (required)
- Фамилия (required)
- Телефон — `type="tel"`, маска `+7 (___) ___-__-__` (простая реализация через `onChange`)
- Email (required)

Стили полей:
- Фон `bg-[#0a0a0a]`, граница `border border-[#2a2a2a]`
- Фокус: `focus:border-[#5c7a3e] focus:outline-none`
- Ошибка: `border-red-700`
- Label сверху, мелкий текст

---

## Шаг 5 — DeliveryForm

Создать **`src/components/checkout/DeliveryForm.tsx`**:

Варианты доставки (radio-карточки):

| Вариант | Описание | Стоимость |
|---------|----------|-----------|
| Курьером | Доставка по городу 1–2 дня | 350 ₽ (или бесплатно от 5 000 ₽) |
| Самовывоз | г. Екатеринбург, ул. Малышева 32 | Бесплатно |
| Почта России | 3–7 рабочих дней | 290 ₽ |

Активная карточка: граница `border-[#5c7a3e]`, фон `bg-[#0f1a0a]`.

Условные поля (показываются при выбранном варианте):
- **Курьером** → поля: Город, Адрес, Комментарий
- **Самовывоз** → блок с адресом пункта выдачи (статичный текст)
- **Почта** → поля: Город, Адрес, Индекс

---

## Шаг 6 — PaymentForm

Создать **`src/components/checkout/PaymentForm.tsx`**:

Варианты оплаты (radio-карточки с иконкой):

| Вариант | Иконка (SVG inline) | Описание |
|---------|---------------------|----------|
| Банковская карта | Карта | Visa / MasterCard / МИР |
| Наличными | Купюра | При получении или самовывозе |
| СБП | QR | Быстрые платежи по QR |

Тот же стиль активной карточки.

---

## Шаг 7 — OrderReview

Создать **`src/components/checkout/OrderReview.tsx`** (`"use client"`):

Использует `useCart()`.

Показывает:
- Список товаров: миниатюра + название + количество + цена
- Разделитель
- Подытог, доставка (зависит от выбранного метода), **Итого**
- Sticky-позиционирование: `sticky top-4` на десктопе

---

## Шаг 8 — Валидация

В `CheckoutClient.tsx` добавить простую валидацию:

```ts
interface FormErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  city?: string;
  address?: string;
}

function validateForm(data: CheckoutFormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.firstName.trim()) errors.firstName = "Введите имя";
  if (!data.lastName.trim()) errors.lastName = "Введите фамилию";
  if (!data.phone.trim()) errors.phone = "Введите телефон";
  if (!data.email.includes("@")) errors.email = "Введите корректный email";
  if (data.deliveryMethod !== "pickup" && !data.city.trim()) errors.city = "Введите город";
  if (data.deliveryMethod === "courier" && !data.address.trim()) errors.address = "Введите адрес";
  return errors;
}
```

Ошибки передавать в компоненты форм через пропсы.

---

## Шаг 9 — Страница успеха

Создать **`src/app/checkout/success/page.tsx`**:

```tsx
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Заказ оформлен — Статус",
};

export default function SuccessPage() {
  // генерировать случайный номер заказа
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      {/* Большая иконка-галочка зелёным */}
      <div>✓ (SVG кружок с галкой, цвет #5c7a3e, размер 80px)</div>
      <h1>Заказ оформлен!</h1>
      <p>Номер заказа: #STAT-XXXXX</p>
      <p>Мы свяжемся с вами в течение 30 минут для подтверждения</p>
      <Link href="/">На главную</Link>
      <Link href="/catalog">Продолжить покупки</Link>
    </div>
  );
}
```

Номер заказа — генерировать на клиенте (`"use client"`) через `Math.random()` или использовать серверную генерацию через timestamp.

---

## Результат этапа

- Форма оформления с 3 секциями
- Валидация обязательных полей
- Выбор доставки с условными полями
- Выбор оплаты
- Сводка заказа справа (sticky)
- Страница успеха
- После заказа корзина очищается

**Проверка:** `npm run build` без ошибок TypeScript.
