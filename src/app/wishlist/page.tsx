import type { Metadata } from "next";
import WishlistClient from "./WishlistClient";

export const metadata: Metadata = {
  title: "Избранное — Статус",
};

export default function WishlistPage() {
  return <WishlistClient />;
}
