import ProductCard from "@/components/ui/ProductCard";
import type { ProductCardVariant, ProductCardSize } from "@/components/ui/ProductCard";
import { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
  /** Светлые карточки на тёмном фоне каталога / поиска */
  variant?: ProductCardVariant;
  /** comfortable — крупные карточки, меньше колонок (каталог) */
  density?: "default" | "comfortable";
}

export default function ProductGrid({
  products,
  variant = "light",
  density = "default",
}: ProductGridProps) {
  const comfortable = density === "comfortable";
  const gridClass = comfortable
    ? "grid grid-cols-1 min-[460px]:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 xl:gap-10"
    : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4";

  const cardSize: ProductCardSize = comfortable ? "large" : "default";

  return (
    <div className={gridClass}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          variant={variant}
          size={cardSize}
        />
      ))}
    </div>
  );
}
