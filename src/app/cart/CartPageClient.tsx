"use client";

import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CartPageItem from "@/components/cart/CartPageItem";
import CartSummary from "@/components/cart/CartSummary";
import EmptyCart from "@/components/cart/EmptyCart";
import { useCart } from "@/context/CartContext";

export default function CartPageClient() {
  const { items, totalPrice, clearCart } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 page-content-top pb-10 md:pb-14">
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Корзина" },
        ]}
      />

      <h1
        className="text-3xl md:text-4xl font-bold text-[#f0ece4] mb-8 md:mb-10"
        style={{ fontFamily: "var(--font-oswald)" }}
      >
        Корзина
      </h1>

      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-4">
            {items.map((item) => (
              <CartPageItem key={item.product.id} item={item} />
            ))}
          </div>
          <div>
            <CartSummary
              items={items}
              totalPrice={totalPrice}
              showCheckoutButton
              showClearButton
              onClear={clearCart}
            />
          </div>
        </div>
      )}
    </div>
  );
}
