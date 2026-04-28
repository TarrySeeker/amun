import type { Product } from "@/types";

/** Отображение цены в интерфейсе */
export function formatProductPrice(product: Product): string {
  if (product.priceNotSpecified) return "не указано";
  return `${product.price.toLocaleString("ru-RU")} ₽`;
}

/** Сумма по строке заказа: позиции без указанной цены не включаются в сумму */
export function effectiveLineTotal(product: Product, quantity: number): number {
  if (product.priceNotSpecified) return 0;
  return product.price * quantity;
}
