# Этап 3 — Страница товара `/product/[slug]`

## Контекст проекта

Проект: **«Статус»** — интернет-магазин охотничьей амуниции.  
Стек: **Next.js 16.2.4** (App Router) · React 19 · TypeScript · Tailwind CSS v4.  
Рабочая директория: `src/`  
Алиас: `@/` = `src/`

**Перед работой** прочитай:
- `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/dynamic-routes.md`
- `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-static-params.md`

---

## Предусловие (Этапы 1–2 уже выполнены)

Должны существовать:
- `src/types/index.ts` — типы `Product`, `ProductImage`, `ProductSpec`
- `src/data/products.ts` — 18+ товаров со slug, images[], specs[]
- `src/lib/products.ts` — функции `getProductBySlug`, `getAllProducts`, `getRelatedProducts`
- `src/components/ui/ProductCard.tsx` — карточка товара
- `src/components/ui/Breadcrumbs.tsx` — хлебные крошки

---

## Задача

Создать динамическую страницу товара `/product/[slug]` с:
- Галереей изображений (главное фото + миниатюры)
- Полным описанием
- Таблицей характеристик
- Кнопками «В корзину» и «В избранное»
- Блоком «Похожие товары»
- Вкладками: Описание / Характеристики / Отзывы

---

## Архитектура

```
src/app/product/[slug]/
  page.tsx              — серверный компонент
  not-found.tsx         — страница 404 для товара
  loading.tsx           — skeleton
src/components/product/
  ProductGallery.tsx    — галерея с миниатюрами ("use client")
  ProductInfo.tsx       — цена, кнопки, количество ("use client")
  ProductTabs.tsx       — вкладки описание/хар-ки/отзывы ("use client")
  ProductSpecs.tsx      — таблица характеристик
  RelatedProducts.tsx   — блок «Похожие товары»
  ReviewsStub.tsx       — заглушка секции отзывов
```

---

## Шаг 1 — Серверная страница

Создать **`src/app/product/[slug]/page.tsx`**:

```tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProductBySlug, getAllProducts, getRelatedProducts } from "@/lib/products";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductTabs from "@/components/product/ProductTabs";
import RelatedProducts from "@/components/product/RelatedProducts";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Статус`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={[
        { label: "Главная", href: "/" },
        { label: "Каталог", href: "/catalog" },
        { label: product.category, href: `/catalog?category=${product.category}` },
        { label: product.name },
      ]} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
        <ProductGallery images={product.images} />
        <ProductInfo product={product} />
      </div>

      <ProductTabs product={product} />
      <RelatedProducts products={related} />
    </div>
  );
}
```

> **Важно:** в Next.js 16 `params` — это `Promise`, его нужно `await`.

---

## Шаг 2 — ProductGallery

Создать **`src/components/product/ProductGallery.tsx`** (`"use client"`):

```tsx
interface ProductGalleryProps {
  images: ProductImage[];
}
```

Функциональность:
- `useState` для текущего индекса изображения
- Главное изображение: большой квадратный блок с `object-cover`
- Миниатюры снизу: горизонтальный скролл, клик меняет главное изображение
- Активная миниатюра: граница `border-[#5c7a3e]`
- Кнопки «←» «→» для переключения (только если больше 1 фото)
- Анимация смены фото: `transition-opacity`

---

## Шаг 3 — ProductInfo

Создать **`src/components/product/ProductInfo.tsx`** (`"use client"`):

```tsx
interface ProductInfoProps {
  product: Product;
}
```

Блоки сверху вниз:
1. **Бейдж** (если есть) — цветной тег (`badge`)
2. **Категория** — мелкий текст зелёный
3. **Название** — `<h1>` через Oswald, крупный
4. **Рейтинг** — звёзды + количество отзывов
5. **Наличие** — `«В наличии (N шт.)»` зелёным / «Нет в наличии» красным
6. **Цена** — крупная + старая перечёркнутая + процент скидки
7. **Количество** — кнопки `−` `[число]` `+` (`useState`, min=1, max=stockCount)
8. **Кнопка «В корзину»** — зелёная, полная ширина  
   *(На этом этапе onClick делает `console.log` или toast — полноценная корзина будет в Этапе 4)*
9. **Кнопка «В избранное»** — outline, рядом с корзиной  
   *(На этом этапе onClick тоже заглушка)*
10. **Краткое описание** — `shortDescription`
11. **Быстрые характеристики** — 2–3 ключевые спецификации из `specs`

---

## Шаг 4 — ProductTabs

Создать **`src/components/product/ProductTabs.tsx`** (`"use client"`):

Вкладки:
- **Описание** — полный текст `product.description` (поддерживает переносы абзацев)
- **Характеристики** — компонент `ProductSpecs`
- **Отзывы** — компонент `ReviewsStub`

Стиль вкладок: линия снизу, активная — цвет `#5c7a3e`, неактивная — `text-[#6b6055]`.

---

## Шаг 5 — ProductSpecs

Создать **`src/components/product/ProductSpecs.tsx`**:

- Таблица `<dl>` с `dt` (метка) и `dd` (значение)
- Чередующиеся строки: чётные `bg-[#111]`, нечётные прозрачные
- Граница `border-b border-[#1e1e1e]`

---

## Шаг 6 — RelatedProducts

Создать **`src/components/product/RelatedProducts.tsx`**:

- Заголовок «Похожие товары»
- Горизонтальный ряд карточек `ProductCard` (3–4 штуки)
- Если товаров меньше 3 — не показывать блок совсем
- На мобильном: горизонтальный скролл

---

## Шаг 7 — ReviewsStub

Создать **`src/components/product/ReviewsStub.tsx`**:

- Показывает текущий рейтинг крупно (4.8 ★)
- Распределение по звёздам (прогресс-бары, заглушка с рандомными %)
- 2–3 мок-отзыва (имя, дата, текст, звёзды)
- Кнопка «Написать отзыв» (неактивна, только UI)

---

## Шаг 8 — not-found.tsx

Создать **`src/app/product/[slug]/not-found.tsx`**:

- Заголовок «Товар не найден»
- Текст «Возможно, товар был снят с продажи или перемещён»
- Кнопка «Вернуться в каталог» → `/catalog`

---

## Шаг 9 — loading.tsx

Создать **`src/app/product/[slug]/loading.tsx`**:

- Skeleton: два блока рядом (галерея слева, инфо справа)
- `animate-pulse` на всех заглушках

---

## Результат этапа

- Страница `/product/vest-001` (пример slug) открывается
- `generateStaticParams` генерирует маршруты для всех 18+ товаров
- Галерея с переключением фото работает
- Вкладки переключаются
- Страница 404 для несуществующего товара
- Skeleton при загрузке

**Проверка:** `npm run build` без ошибок TypeScript.
