# Этап 1 — Data Layer: типы, mock-данные, утилиты

## Контекст проекта

Проект: **«Статус»** — интернет-магазин охотничьей амуниции (жилеты, подсумки, снаряжение). Производство на Урале.  
Стек: **Next.js 16.2.4** (App Router) · React 19 · TypeScript · Tailwind CSS v4.  
Рабочая директория: `src/`  
Алиас импортов: `@/` = `src/`

**Перед работой** прочитай `node_modules/next/dist/docs/01-app/index.md` — это обязательно.

---

## Текущее состояние

Файл `src/components/ui/ProductCard.tsx` уже содержит базовый интерфейс:

```ts
export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  category: string;
  image: string;
  badge?: string;
  rating: number;
  reviews: number;
}
```

Этот интерфейс нужно **расширить** и вынести в отдельный файл типов.

---

## Задача

Создать data-слой: централизованные типы + полный mock-каталог товаров + утилиты.

---

## Шаг 1 — Расширенные типы

Создать файл **`src/types/index.ts`**:

```ts
export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;           // URL-slug, напр. "razgruzochnyy-zhilet-berkut"
  name: string;
  shortDescription: string;
  description: string;    // полное описание (2–4 абзаца)
  price: number;
  oldPrice?: number;
  category: Category;     // строгий тип категории
  images: ProductImage[]; // массив изображений (хотя бы 1)
  badge?: "Новинка" | "Хит продаж" | "Распродажа" | "Эксклюзив";
  rating: number;         // 0–5
  reviews: number;
  specs: ProductSpec[];   // характеристики товара
  inStock: boolean;
  stockCount?: number;
  tags: string[];
  relatedIds: string[];   // id связанных товаров
}

export type Category =
  | "Снаряжение"
  | "Шапки/Кепки"
  | "Чехлы и рюкзаки/Сумки"
  | "Блокноты/Шпаргалки"
  | "Аксессуары";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: string; // ISO date string
}

export interface Order {
  id: string;
  items: CartItem[];
  totalPrice: number;
  createdAt: string;
  status: "pending" | "processing" | "shipped" | "delivered";
  delivery: DeliveryInfo;
  payment: PaymentMethod;
}

export interface DeliveryInfo {
  method: "courier" | "pickup" | "post";
  address?: string;
  city: string;
  postalCode?: string;
  comment?: string;
}

export type PaymentMethod = "card" | "cash" | "sbp";

export interface FilterState {
  categories: Category[];
  priceMin: number;
  priceMax: number;
  inStockOnly: boolean;
  sortBy: SortOption;
}

export type SortOption =
  | "default"
  | "price-asc"
  | "price-desc"
  | "rating-desc"
  | "new";
```

---

## Шаг 2 — Mock-данные

Создать файл **`src/data/products.ts`** с не менее **15 товарами** (по 3 из каждой категории). Для каждого товара заполнить все поля типа `Product`.

### Категории и примеры товаров:

**Снаряжение** (3 шт.):
- Набор охотника «Тайга» — комплект снаряжения для длительных выходов
- Камуфляжный костюм «Лесник» — летний, тихая ткань
- Накидка от дождя «Ливень» — компактная, водонепроницаемая

**Шапки/Кепки** (3 шт.):
- Шапка тактическая «Арктик» — флис двойной, цвет хаки
- Бейсболка «Страж» — камуфляж, козырёк с сеткой
- Балаклава «Вьюга» — флис, 3 отверстия, зимняя

**Чехлы и рюкзаки/Сумки** (3 шт.):
- Рюкзак «Медведь 45» — 45L, MOLLE, водостойкий
- Чехол для ружья «Кабан» — 90 см, с ремнём
- Сумка поясная «Лиса» — быстросъёмная, 3 кармана

**Блокноты/Шпаргалки** (3 шт.):
- Полевой блокнот «Разведчик» — водостойкая бумага, 80 стр.
- Шпаргалка охотника «Следопыт» — ламинированная карта-складень
- Записная книжка «Егерь» — твёрдая обложка, резинка, формат A6

**Аксессуары** (3 шт.):
- Перчатки тактические «Зубр» — без пальцев, усиленная ладонь
- Фонарь налобный «Сыч» — 350 лм, водозащита IPX4
- Нож складной «Кречет» — сталь AUS-8, рукоять G10

### Требования к данным:
- `id` — уникальная строка типа `"vest-001"`, `"pouch-002"` и т.д.
- `slug` — транслит имени для URL, например `"razgruzochnyy-zhilet-berkut"`
- `images` — использовать `/images/placeholder.jpg` (изображения будут добавлены позже)
- Реалистичные цены в рублях (1 500 — 25 000 ₽)
- `specs` — 4–6 характеристик (материал, размер, вес, совместимость и т.д.)
- `relatedIds` — 2–3 id других товаров из того же или смежного раздела

Создать файл **`src/data/categories.ts`**:

```ts
import { Category } from "@/types";

export interface CategoryMeta {
  slug: string;
  label: Category;
  description: string;
  count: number;    // вычислить по products
  image: string;
}

export const categories: CategoryMeta[] = [
  {
    slug: "snaryazhenie",
    label: "Снаряжение",
    description: "Комплекты и костюмы для охоты и активного отдыха на природе",
    count: 3,
    image: "/images/cat-gear.jpg",
  },
  {
    slug: "shapki-kepki",
    label: "Шапки/Кепки",
    description: "Тактические шапки, балаклавы и кепки для любой погоды",
    count: 3,
    image: "/images/cat-hats.jpg",
  },
  {
    slug: "chekhly-ryukzaki-sumki",
    label: "Чехлы и рюкзаки/Сумки",
    description: "Рюкзаки, чехлы для оружия и поясные сумки для охоты",
    count: 3,
    image: "/images/cat-bags.jpg",
  },
  {
    slug: "bloknoty-shpargalki",
    label: "Блокноты/Шпаргалки",
    description: "Полевые блокноты на водостойкой бумаге и карты-шпаргалки охотника",
    count: 3,
    image: "/images/cat-notebooks.jpg",
  },
  {
    slug: "aksessuary",
    label: "Аксессуары",
    description: "Перчатки, фонари, ножи и прочее снаряжение",
    count: 3,
    image: "/images/cat-accessories.jpg",
  },
];
```

---

## Шаг 3 — Утилиты

Создать файл **`src/lib/products.ts`** с функциями:

```ts
import { products } from "@/data/products";
import { Product, Category, FilterState } from "@/types";

/** Получить все товары */
export function getAllProducts(): Product[] { ... }

/** Получить товар по slug */
export function getProductBySlug(slug: string): Product | undefined { ... }

/** Получить товар по id */
export function getProductById(id: string): Product | undefined { ... }

/** Получить товары по категории */
export function getProductsByCategory(category: Category): Product[] { ... }

/** Применить фильтры и сортировку */
export function filterAndSort(products: Product[], filter: FilterState): Product[] { ... }

/** Получить связанные товары */
export function getRelatedProducts(product: Product): Product[] { ... }

/** Получить все уникальные категории с количеством */
export function getCategoryStats(): Record<Category, number> { ... }

/** Получить диапазон цен */
export function getPriceRange(): { min: number; max: number } { ... }
```

---

## Шаг 4 — Обновить ProductCard

Обновить `src/components/ui/ProductCard.tsx`:
- Убрать локальный интерфейс `Product`
- Импортировать тип из `@/types`
- Поменять `product.image` → `product.images[0]?.src` (теперь массив)
- Поменять `product.category` → отображать как строку (тип `Category` — строка)

---

## Шаг 5 — Обновить существующие компоненты

Файл `src/components/home/ProductsSection.tsx`:
- Импортировать `getAllProducts` из `@/lib/products`
- Использовать реальные данные вместо hardcoded
- Показывать первые 8 товаров (`slice(0, 8)`)

Файл `src/components/home/CategoriesSection.tsx`:
- Импортировать `categories` из `@/data/categories`
- Использовать реальные данные категорий

---

## Результат этапа

После выполнения этапа должны существовать:
- `src/types/index.ts` — все типы проекта
- `src/data/products.ts` — 15+ товаров (по 3 из каждой категории)
- `src/data/categories.ts` — 5 категорий с мета-данными
- `src/lib/products.ts` — утилиты для работы с товарами
- Обновлённые `ProductCard.tsx`, `ProductsSection.tsx`, `CategoriesSection.tsx`

**Проверка:** `npm run build` должен завершаться без ошибок TypeScript.
