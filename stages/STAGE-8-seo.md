# Этап 8 — SEO: метаданные, sitemap, structured data

## Контекст проекта

Проект: **«Статус»** — интернет-магазин охотничьей амуниции.  
Стек: **Next.js 16.2.4** (App Router) · React 19 · TypeScript · Tailwind CSS v4.  
Рабочая директория: `src/`  
Алиас: `@/` = `src/`

**Перед работой** прочитай:
- `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md`
- `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/` (все файлы)

---

## Предусловие (Этапы 1–7 уже выполнены)

Должны существовать:
- `src/types/index.ts` — все типы проекта
- `src/data/products.ts` — 18+ товаров с полными данными
- `src/data/categories.ts` — 6 категорий
- Все страницы: `/`, `/catalog`, `/product/[slug]`, `/cart`, `/checkout`, `/search`, `/wishlist`

---

## Задача

Добавить полноценное SEO:
1. Динамические `Metadata` для всех страниц
2. `sitemap.xml`
3. `robots.txt`
4. JSON-LD structured data (Product, BreadcrumbList)
5. Open Graph теги

---

## Шаг 1 — Обновить корневой layout metadata

Обновить **`src/app/layout.tsx`**:

```tsx
export const metadata: Metadata = {
  title: {
    default: "Статус — Амуниция для охотников",
    template: "%s | Статус",
  },
  description: "Интернет-магазин охотничьего снаряжения: жилеты, подсумки, тактические ремни. Производство на Урале. Доставка по России.",
  keywords: ["охотничье снаряжение", "тактические жилеты", "подсумки", "амуниция для охоты", "Урал"],
  authors: [{ name: "Статус" }],
  creator: "Статус",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://status-hunt.ru",
    siteName: "Статус",
    title: "Статус — Амуниция для охотников",
    description: "Охотничье снаряжение производства Урала",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Статус — Амуниция для охотников",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Статус — Амуниция для охотников",
    description: "Охотничье снаряжение производства Урала",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  metadataBase: new URL("https://status-hunt.ru"),
};
```

---

## Шаг 2 — Metadata для страницы каталога

В **`src/app/catalog/page.tsx`** обновить `generateMetadata`:

```tsx
export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const category = params.category;
  
  if (category) {
    return {
      title: `${category} — каталог`,
      description: `Купить ${category.toLowerCase()} для охоты в магазине Статус. Производство Урала, доставка по России.`,
      openGraph: {
        title: `${category} — Статус`,
        description: `Каталог ${category.toLowerCase()} с фильтрами и сортировкой`,
      },
    };
  }
  
  return {
    title: "Каталог",
    description: "Весь ассортимент охотничьей амуниции: жилеты, подсумки, снаряжение, ремни, аксессуары, рюкзаки.",
  };
}
```

---

## Шаг 3 — Metadata для страницы товара

В **`src/app/product/[slug]/page.tsx`** обновить `generateMetadata`:

```tsx
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  
  if (!product) {
    return { title: "Товар не найден" };
  }
  
  const price = product.price.toLocaleString("ru-RU");
  
  return {
    title: product.name,
    description: `${product.shortDescription}. Цена: ${price} ₽. Купить в магазине Статус.`,
    keywords: [product.name, product.category, ...product.tags],
    openGraph: {
      type: "website",
      title: `${product.name} — Статус`,
      description: product.shortDescription,
      images: product.images.length > 0
        ? [{ url: product.images[0].src, alt: product.images[0].alt }]
        : undefined,
    },
  };
}
```

---

## Шаг 4 — JSON-LD для страницы товара

Добавить в **`src/app/product/[slug]/page.tsx`** компонент structured data:

```tsx
function ProductJsonLd({ product }: { product: Product }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.images.map((img) => img.src),
    brand: {
      "@type": "Brand",
      name: "Статус",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "RUB",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Статус",
      },
    },
    aggregateRating: product.reviews > 0
      ? {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.reviews,
        }
      : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

Вставить `<ProductJsonLd product={product} />` в JSX серверного компонента страницы товара.

---

## Шаг 5 — JSON-LD BreadcrumbList

Создать утилиту **`src/lib/jsonld.ts`**:

```ts
export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://status-hunt.ru${item.url}`,
    })),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Статус",
    url: "https://status-hunt.ru",
    logo: "https://status-hunt.ru/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+7-800-000-00-00",
      contactType: "customer service",
      areaServed: "RU",
      availableLanguage: "Russian",
    },
  };
}
```

Добавить `<script type="application/ld+json">` с `organizationJsonLd()` в `layout.tsx`.

---

## Шаг 6 — sitemap.xml

Создать **`src/app/sitemap.ts`**:

```ts
import { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/products";
import { categories } from "@/data/categories";

const BASE_URL = "https://status-hunt.ru";

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getAllProducts();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/catalog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/catalog?category=${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${BASE_URL}/product/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
```

---

## Шаг 7 — robots.txt

Создать **`src/app/robots.ts`**:

```ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/checkout", "/cart", "/api/"],
    },
    sitemap: "https://status-hunt.ru/sitemap.xml",
  };
}
```

---

## Шаг 8 — Canonical URLs

В каждой серверной странице добавить canonical URL через metadata:

```tsx
// Пример для /catalog
return {
  // ...
  alternates: {
    canonical: category
      ? `https://status-hunt.ru/catalog?category=${category}`
      : "https://status-hunt.ru/catalog",
  },
};
```

---

## Шаг 9 — Иконки и manifest

Создать **`src/app/icon.tsx`** (или использовать `src/app/favicon.ico`):

Проверить что favicon.ico уже есть в `src/app/`. Если нет — добавить хотя бы placeholder.

Создать **`src/app/manifest.ts`**:
```ts
import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Статус — Амуниция для охотников",
    short_name: "Статус",
    description: "Интернет-магазин охотничьей амуниции",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#5c7a3e",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
```

---

## Результат этапа

- `metadata` настроен для всех страниц с OG-тегами
- `sitemap.xml` доступен на `/sitemap.xml`
- `robots.txt` доступен на `/robots.txt`
- JSON-LD structured data для товаров и организации
- Canonical URLs

**Проверка:** `npm run build` без ошибок TypeScript. Открыть `/.next/server/app/sitemap.xml/route.js` — должен существовать.
