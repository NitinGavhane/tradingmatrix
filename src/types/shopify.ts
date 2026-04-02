// src/types/shopify.ts
export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  variants: ShopifyVariant[];
}

export interface ShopifyVariant {
  id: string;
  title: string;
  price: string;
  availableForSale: boolean;
}

export interface ShopifyLineItem {
  id: string;
  title: string;
  quantity: number;
  price: string;
  variantId: string;
}

export interface ShopifyOrder {
  id: string;
  order_number: number;
  email: string;
  customer: {
    first_name: string;
    last_name: string;
    email: string;
  };
  total_price: string;
  line_items: ShopifyLineItem[];
  created_at: string;
}
