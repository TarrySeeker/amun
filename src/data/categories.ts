import { Category } from "@/types";
import { products } from "@/data/products";

export interface CategoryMeta {
  slug: string;
  label: Category;
  description: string;
  count: number;
  image: string;
}

function countByCategory(category: Category): number {
  return products.filter((p) => p.category === category).length;
}

export const categories: CategoryMeta[] = [
  {
    slug: "odezhda",
    label: "Одежда",
    description: "Жилеты, костюмы и накидки для охоты и активного отдыха",
    count: countByCategory("Одежда"),
    image: "/images/cat-okhota.png",
  },
  {
    slug: "chekhly-ryukzaki-sumki",
    label: "Чехлы, рюкзаки и сумки",
    description: "Подсумки, чехлы для оружия и рюкзаки",
    count: countByCategory("Чехлы, рюкзаки и сумки"),
    image: "/images/cat-aktivnyy-otdykh.png",
  },
  {
    slug: "snaryazhenie",
    label: "Снаряжение",
    description: "Ремни, наборы и тактические аксессуары",
    count: countByCategory("Снаряжение"),
    image: "https://images.unsplash.com/photo-1580752300992-559f8e0734e0?fit=crop&w=800&h=500&q=80",
  },
  {
    slug: "golovnye-ubory",
    label: "Головные уборы",
    description: "Балаклавы, шапки и маски для любой погоды",
    count: countByCategory("Головные уборы"),
    image: "/images/cat-golovnye-ubory.png",
  },
  {
    slug: "kovry-i-maty",
    label: "Ковры и маты",
    description: "Тактические коврики, утеплённые маты для палатки и засидки",
    count: countByCategory("Ковры и маты"),
    image: "/images/cat-kovry-i-maty.png",
  },
  {
    slug: "bloknoty-i-shpargalki",
    label: "Блокноты и шпаргалки",
    description: "Полевые блокноты и ламинированные шпаргалки охотника",
    count: countByCategory("Блокноты и шпаргалки"),
    image: "/images/cat-bloknoty-i-shpargalki.png",
  },
];

/** Блок «Категории» на главной — без отдельной плашки «Снаряжение». */
export const categoriesHome: CategoryMeta[] = categories.filter(
  (c) => c.slug !== "snaryazhenie",
);

export function getCategorySlug(label: Category): string {
  return categories.find((c) => c.label === label)?.slug ?? "";
}
