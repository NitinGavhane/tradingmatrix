"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { useMode } from "@/context/ModeContext";
import { getPriceTier, formatPrice } from "@/lib/pricing";
import Badge from "@/components/ui/Badge";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { mode } = useMode();
  const tier = getPriceTier(product, mode);

  return (
    <Link href={`/products/${product.id}`} style={{ display: "block" }}>
      <article
        id={`product-card-${product.id}`}
        className="card card-hover"
        style={{ overflow: "hidden", height: "100%" }}
      >
        {/* Image */}
        <div
          style={{
            position: "relative",
            aspectRatio: "4/3",
            background: "var(--bg-elevated)",
            overflow: "hidden",
          }}
        >
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onMouseEnter={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                img.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                img.style.transform = "scale(1)";
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "3rem",
              }}
            >
              📦
            </div>
          )}
          {/* Stock badge */}
          <div style={{ position: "absolute", top: "0.75rem", left: "0.75rem" }}>
            <Badge variant={product.inStock ? "in-stock" : "out-of-stock"}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>
          {/* Mode badge */}
          <div style={{ position: "absolute", top: "0.75rem", right: "0.75rem" }}>
            <Badge variant={mode}>
              {mode === "wholesale" ? "Wholesale" : "Retail"}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "1rem 1.125rem 1.25rem" }}>
          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "0.4rem",
            }}
          >
            {product.category}
          </p>
          <h3
            style={{
              fontSize: "0.95rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "0.625rem",
              lineHeight: 1.4,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.name}
          </h3>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "0.875rem",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  color: mode === "wholesale" ? "var(--gold)" : "var(--accent-secondary)",
                  letterSpacing: "-0.02em",
                }}
              >
                {formatPrice(tier.pricePerUnit)}
              </span>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginLeft: "0.25rem" }}>
                / unit
              </span>
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                background: "rgba(0,0,0,0.05)",
                border: "1px solid var(--border)",
                borderRadius: 6,
                padding: "0.2rem 0.6rem",
                fontWeight: 500,
              }}
            >
              MOQ: {tier.moq}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
