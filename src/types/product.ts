// src/types/product.ts

export type Mode = "consumer" | "retailer" | "wholesale";

export interface PriceTier {
  moq: number;           // Minimum Order Quantity
  pricePerUnit: number;  // In INR (₹)
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  images: string[];         // Array of image URLs
  videoUrl?: string;        // Optional product video
  frames360: string[];      // Ordered frames for 360° view
  wholesaleTier: PriceTier;
  retailerTier: PriceTier;
  consumerTier: PriceTier;
  nasioUrl: string;         // Links to Nas.io checkout
  marketPrice?: number;     // e.g. general market or wholesaler pricing
  retailStorePrice?: number; // e.g. typical brick and mortar retail price
  inStock: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PrebookRequest {
  id: string;
  productId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  mode: Mode;
  quantity: number;
  message?: string;
  status: "pending" | "contacted" | "confirmed";
  createdAt: Date;
}
