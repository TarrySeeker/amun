import type { Metadata } from "next";
import CheckoutClient from "./CheckoutClient";

export const metadata: Metadata = {
  title: "Оформление заказа — Статус",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
