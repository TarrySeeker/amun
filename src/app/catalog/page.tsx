import { Metadata } from "next";
import { getAllProducts, getPriceRange } from "@/lib/products";
import { categories } from "@/data/categories";
import {
  FilterState,
  SortOption,
  Category,
  CatalogSpotlight,
} from "@/types";
import CatalogClient from "./CatalogClient";

function parseSpotlight(params: {
  spot?: string;
  hits?: string;
}): CatalogSpotlight {
  if (params.hits === "1") return "hits";
  const s = params.spot;
  if (
    s === "hits" ||
    s === "novinka" ||
    s === "sale" ||
    s === "exclusive"
  ) {
    return s;
  }
  return "all";
}

export const metadata: Metadata = {
  title: "Каталог — Статус",
  description:
    "Весь ассортимент охотничьей амуниции: жилеты, подсумки, снаряжение, ремни.",
};

const slugToCategory: Record<string, Category> = {
  odezhda: "Одежда",
  "chekhly-ryukzaki-sumki": "Чехлы, рюкзаки и сумки",
  snaryazhenie: "Снаряжение",
  "golovnye-ubory": "Головные уборы",
  "kovry-i-maty": "Ковры и маты",
  "bloknoty-i-shpargalki": "Блокноты и шпаргалки",
};

interface PageProps {
  searchParams: Promise<{
    category?: string;
    sort?: string;
    min?: string;
    max?: string;
    stock?: string;
    hits?: string;
    spot?: string;
  }>;
}

export default async function CatalogPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { min: priceMin, max: priceMax } = getPriceRange();

  const categoryFromSlug = params.category
    ? slugToCategory[params.category]
    : undefined;

  const filter: FilterState = {
    categories: categoryFromSlug ? [categoryFromSlug] : [],
    priceMin: params.min ? Number(params.min) : priceMin,
    priceMax: params.max ? Number(params.max) : priceMax,
    inStockOnly: params.stock === "1",
    spotlight: parseSpotlight(params),
    sortBy: (params.sort as SortOption) ?? "default",
  };

  const allProducts = getAllProducts();

  return (
    <CatalogClient
      allProducts={allProducts}
      categories={categories}
      filter={filter}
      priceRange={{ min: priceMin, max: priceMax }}
    />
  );
}
