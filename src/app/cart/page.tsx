import type { Metadata } from "next";
import CartPageClient from "./CartPageClient";

export const metadata: Metadata = {
  title: "Корзина — Статус",
};

export default function CartPage() {
  return <CartPageClient />;
}
