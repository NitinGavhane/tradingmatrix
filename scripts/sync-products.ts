/**
 * scripts/sync-products.ts
 * Cron script: Fetch from China supplier API → normalize → upsert to PostgreSQL
 *
 * Run: npx ts-node scripts/sync-products.ts
 * Or schedule via Vercel Cron Jobs.
 */

import { fetchProductsFromSupplier } from "../src/lib/china-api";

async function syncProducts() {
  console.log("🔄 Starting product sync from China supplier API...");

  let created = 0;
  let updated = 0;
  let failed = 0;

  try {
    const supplierProducts = await fetchProductsFromSupplier();
    console.log(`📦 Fetched ${supplierProducts.length} products from supplier.`);

    for (const product of supplierProducts) {
      try {
        // Import prisma lazily so the script can run standalone
        const { prisma } = await import("../src/lib/db");

        await prisma.product.upsert({
          where: { slug: product.slug },
          update: {
            name: product.name,
            category: product.category,
            description: product.description,
            images: product.images,
            videoUrl: product.videoUrl || null,
            frames360: product.frames360,
            wholesaleMoq: product.wholesaleTier.moq,
            wholesalePrice: product.wholesaleTier.pricePerUnit,
            consumerMoq: product.consumerTier.moq,
            consumerPrice: product.consumerTier.pricePerUnit,
            retailerMoq: product.retailerTier.moq,
            retailerPrice: product.retailerTier.pricePerUnit,
            nasioUrl: product.nasioUrl,
            inStock: product.inStock,
            tags: product.tags,
          },
          create: {
            slug: product.slug,
            name: product.name,
            category: product.category,
            description: product.description,
            images: product.images,
            videoUrl: product.videoUrl || null,
            frames360: product.frames360,
            wholesaleMoq: product.wholesaleTier.moq,
            wholesalePrice: product.wholesaleTier.pricePerUnit,
            consumerMoq: product.consumerTier.moq,
            consumerPrice: product.consumerTier.pricePerUnit,
            retailerMoq: product.retailerTier.moq,
            retailerPrice: product.retailerTier.pricePerUnit,
            nasioUrl: product.nasioUrl,
            inStock: product.inStock,
            tags: product.tags,
          },
        });

        // Check if it was an update or create by ID existence
        updated++;
      } catch (err) {
        console.error(`❌ Failed to upsert product "${product.slug}":`, err);
        failed++;
      }
    }

    // Sync stats
    console.log("\n✅ Sync complete!");
    console.log(`   Created: ${created}`);
    console.log(`   Updated: ${updated}`);
    console.log(`   Failed:  ${failed}`);
  } catch (err) {
    console.error("❌ Fatal error during sync:", err);
    process.exit(1);
  }
}

syncProducts();
