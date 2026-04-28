import type { Metadata } from "next";
import SuccessClient from "./SuccessClient";

export const metadata: Metadata = {
  title: "Заказ оформлен — Статус",
};

export default function CheckoutSuccessPage() {
  return <SuccessClient />;
}
