// src/lib/webhook-validator.ts
import { createHmac } from "crypto";

/**
 * Validates Shopify webhook HMAC signature.
 * Must be called before processing any order data.
 */
export function validateShopifyWebhook(
  rawBody: string,
  shopifyHmacHeader: string,
  secret: string
): boolean {
  if (!shopifyHmacHeader || !secret) return false;

  const digest = createHmac("sha256", secret)
    .update(rawBody)
    .digest("base64");

  // Constant-time comparison to avoid timing attacks
  return timingSafeEqual(digest, shopifyHmacHeader);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}
