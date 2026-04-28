import { Product } from "@/types";
import ProductCard from "@/components/ui/ProductCard";

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length < 3) return null;

  return (
    <section className="mt-16 border-t border-[#1e1e1e] pt-12">
      <h2
        className="text-2xl font-bold text-[#f0ece4] mb-8"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        Похожие товары
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-x-auto">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} variant="light" />
        ))}
      </div>
    </section>
  );
}
