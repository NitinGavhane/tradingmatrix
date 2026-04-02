// src/lib/china-api.ts
import { chinaApiConfig } from "@/config/china-api.config";
import { Product } from "@/types/product";

// Adapter: Fetch from China supplier API and map to Product schema
export async function fetchProductsFromSupplier(): Promise<Omit<Product, "id" | "createdAt" | "updatedAt">[]> {
  if (!chinaApiConfig.baseUrl || !chinaApiConfig.apiKey) {
    throw new Error("China API credentials are not configured.");
  }

  const res = await fetch(`${chinaApiConfig.baseUrl}/products`, {
    headers: {
      Authorization: `Bearer ${chinaApiConfig.apiKey}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`China API error: ${res.status} ${res.statusText}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const raw: any[] = await res.json();

  // Map supplier fields to our Product schema
  return raw.map((item) => ({
    name: item.product_name || item.name,
    slug: (item.product_name || item.name).toLowerCase().replace(/\s+/g, "-"),
    category: item.category || "Uncategorized",
    description: item.description || "",
    images: Array.isArray(item.images) ? item.images : [item.image_url].filter(Boolean),
    videoUrl: item.video_url || undefined,
    frames360: Array.isArray(item.frames_360) ? item.frames_360 : [],
    wholesaleTier: {
      moq: item.wholesale_moq || 100,
      pricePerUnit: item.wholesale_price || 0,
    },
    retailerTier: {
      moq: item.retailer_moq || 6,
      pricePerUnit: item.retailer_price || 0,
    },
    consumerTier: {
      moq: 1,
      pricePerUnit: item.consumer_price || item.retail_price || 0,
    },
    nasioUrl: item.nasio_url || "https://nas.io/",
    marketPrice: item.market_price || undefined,
    retailStorePrice: item.retail_store_price || undefined,
    inStock: item.in_stock !== false,
    tags: Array.isArray(item.tags) ? item.tags : [],
  }));
}
