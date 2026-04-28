import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProductBySlug, getAllProducts, getRelatedProducts } from "@/lib/products";
import { getCategorySlug } from "@/data/categories";
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
    <div className="container mx-auto px-4 page-content-top pb-8">
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Каталог", href: "/catalog" },
          {
            label: product.category,
            href: `/catalog?category=${getCategorySlug(product.category)}`,
          },
          { label: product.name },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-6 sm:mt-8">
        <ProductGallery images={product.images} />
        <ProductInfo product={product} />
      </div>

      <ProductTabs product={product} />
      <RelatedProducts products={related} />
    </div>
  );
}
