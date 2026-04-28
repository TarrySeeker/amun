export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductImage {
  src: string;
  alt: string;
}

export type Category =
  | "Одежда"
  | "Чехлы, рюкзаки и сумки"
  | "Снаряжение"
  | "Головные уборы"
  | "Ковры и маты"
  | "Блокноты и шпаргалки";

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  /** Показывать «не указано» и не брать цену в корзину/итого */
  priceNotSpecified?: boolean;
  oldPrice?: number;
  category: Category;
  images: ProductImage[];
  badge?: "Новинка" | "Хит продаж" | "Распродажа" | "Эксклюзив";
  rating: number;
  reviews: number;
  specs: ProductSpec[];
  inStock: boolean;
  stockCount?: number;
  tags: string[];
  relatedIds: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
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

/** Подборка по бейджу в каталоге (взаимоисключающая) */
export type CatalogSpotlight =
  | "all"
  | "hits"
  | "novinka"
  | "sale"
  | "exclusive";

export const CATALOG_SPOTLIGHT_LABELS: Record<CatalogSpotlight, string> = {
  all: "Все товары",
  hits: "Хиты продаж",
  novinka: "Новинки",
  sale: "Распродажа",
  exclusive: "Эксклюзив",
};

export interface FilterState {
  categories: Category[];
  priceMin: number;
  priceMax: number;
  inStockOnly: boolean;
  /** Хиты, новинки, распродажа или эксклюзив; «все» — без отбора по бейджу */
  spotlight: CatalogSpotlight;
  sortBy: SortOption;
}

export type SortOption =
  | "default"
  | "price-asc"
  | "price-desc"
  | "rating-desc"
  | "new";
