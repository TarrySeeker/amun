import { products } from "@/data/products";
import {
  Product,
  Category,
  FilterState,
  CatalogSpotlight,
} from "@/types";

const SPOTLIGHT_TO_BADGE: Record<
  Exclude<CatalogSpotlight, "all">,
  NonNullable<Product["badge"]>
> = {
  hits: "Хит продаж",
  novinka: "Новинка",
  sale: "Распродажа",
  exclusive: "Эксклюзив",
};

export function getAllProducts(): Product[] {
  return products;
}

export function searchProducts(query: string): Product[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  return getAllProducts().filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

/** Товары с бейджем «Новинка» */
export function getNewProducts(): Product[] {
  return products.filter((p) => p.badge === "Новинка");
}

export function filterAndSort(
  items: Product[],
  filter: FilterState
): Product[] {
  let result = [...items];

  if (filter.categories.length > 0) {
    result = result.filter((p) => filter.categories.includes(p.category));
  }

  result = result.filter(
    (p) =>
      p.priceNotSpecified ||
      (p.price >= filter.priceMin && p.price <= filter.priceMax)
  );

  if (filter.inStockOnly) {
    result = result.filter((p) => p.inStock);
  }

  if (filter.spotlight !== "all") {
    const badge = SPOTLIGHT_TO_BADGE[filter.spotlight];
    result = result.filter((p) => p.badge === badge);
  }

  switch (filter.sortBy) {
    case "price-asc":
      result.sort((a, b) => {
        if (a.priceNotSpecified && b.priceNotSpecified) return 0;
        if (a.priceNotSpecified) return 1;
        if (b.priceNotSpecified) return -1;
        return a.price - b.price;
      });
      break;
    case "price-desc":
      result.sort((a, b) => {
        if (a.priceNotSpecified && b.priceNotSpecified) return 0;
        if (a.priceNotSpecified) return -1;
        if (b.priceNotSpecified) return 1;
        return b.price - a.price;
      });
      break;
    case "rating-desc":
      result.sort((a, b) => b.rating - a.rating);
      break;
    case "new":
      result.sort((a, b) => {
        const aIsNew = a.badge === "Новинка" ? 1 : 0;
        const bIsNew = b.badge === "Новинка" ? 1 : 0;
        return bIsNew - aIsNew;
      });
      break;
    default:
      break;
  }

  return result;
}

export function getRelatedProducts(product: Product): Product[] {
  return product.relatedIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => p !== undefined);
}

export function getCategoryStats(): Record<Category, number> {
  const stats: Partial<Record<Category, number>> = {};
  for (const product of products) {
    stats[product.category] = (stats[product.category] ?? 0) + 1;
  }
  return stats as Record<Category, number>;
}

export function getPriceRange(): { min: number; max: number } {
  const prices = products
    .filter((p) => !p.priceNotSpecified)
    .map((p) => p.price);
  if (prices.length === 0) {
    return { min: 0, max: 0 };
  }
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}
