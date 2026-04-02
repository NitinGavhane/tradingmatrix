// src/lib/pricing.ts
import { Mode, Product, PriceTier } from "@/types/product";

/**
 * Returns the correct price tier based on the current mode.
 */
export function getPriceTier(product: Product, mode: Mode): PriceTier {
  if (mode === "wholesale") return product.wholesaleTier;
  if (mode === "retailer") return product.retailerTier;
  return product.consumerTier;
}

/**
 * Calculates total price for a given quantity.
 * Returns null if quantity is below MOQ.
 */
export function calculateTotal(
  product: Product,
  mode: Mode,
  quantity: number
): number | null {
  const tier = getPriceTier(product, mode);
  if (quantity < tier.moq) return null;
  return quantity * tier.pricePerUnit;
}



/**
 * Format price in Indian Rupees.
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
