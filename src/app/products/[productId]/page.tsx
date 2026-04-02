import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import ProductImages from "@/components/products/ProductImages";
import BookingToggle from "@/components/products/BookingToggle";
import Badge from "@/components/ui/Badge";

interface Props {
  params: Promise<{ productId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productId } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.id === productId);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} — TradingMatrix`,
    description: product.description.slice(0, 160),
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { productId } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.id === productId);
  if (!product) notFound();

  return (
    <div className="container" style={{ paddingTop: "2.5rem", paddingBottom: "5rem" }}>
      {/* Breadcrumb */}
      <nav style={{ marginBottom: "2rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
        <a href="/" style={{ color: "var(--text-muted)" }}>Home</a>
        <span style={{ margin: "0 0.5rem" }}>→</span>
        <a href="/products" style={{ color: "var(--text-muted)" }}>Products</a>
        <span style={{ margin: "0 0.5rem" }}>→</span>
        <span style={{ color: "var(--text-secondary)" }}>{product.name}</span>
      </nav>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
        {/* Left: Images */}
        <ProductImages images={product.images} productName={product.name} />

        {/* Right: Info and booking */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Badges */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <Badge variant="category">{product.category}</Badge>
            <Badge variant={product.inStock ? "in-stock" : "out-of-stock"}>
              {product.inStock ? "✓ In Stock" : "Out of Stock"}
            </Badge>
            {product.frames360.length > 0 && (
              <Badge variant="default">360° View</Badge>
            )}
          </div>

          {/* Title */}
          <div>
            <h1
              style={{
                fontSize: "1.75rem",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
                color: "var(--text-primary)",
                marginBottom: "0.75rem",
              }}
            >
              {product.name}
            </h1>
            <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.8 }}>
              {product.description}
            </p>
          </div>

          {/* Booking toggle (client component) */}
          <BookingToggle product={product} />
        </div>
      </div>
    </div>
  );
}
