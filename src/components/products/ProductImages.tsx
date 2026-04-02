"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductImagesProps {
  images: string[];
  productName: string;
}

export default function ProductImages({ images, productName }: ProductImagesProps) {
  const [selected, setSelected] = useState(0);

  if (!images.length) {
    return (
      <div
        style={{
          aspectRatio: "1",
          background: "var(--bg-elevated)",
          borderRadius: "var(--radius-lg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "5rem",
        }}
      >
        📦
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      {/* Main image */}
      <div
        style={{
          position: "relative",
          aspectRatio: "4/3",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          background: "var(--bg-elevated)",
          border: "1px solid var(--border)",
        }}
      >
        <Image
          src={images[selected]}
          alt={`${productName} - Image ${selected + 1}`}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div style={{ display: "flex", gap: "0.75rem", overflowX: "auto", paddingBottom: "0.25rem" }}>
          {images.map((img, index) => (
            <button
              key={index}
              id={`product-thumb-${index}`}
              onClick={() => setSelected(index)}
              style={{
                position: "relative",
                width: 72,
                height: 72,
                borderRadius: "var(--radius-sm)",
                overflow: "hidden",
                flexShrink: 0,
                border: `2px solid ${selected === index ? "var(--accent-primary)" : "var(--border)"}`,
                cursor: "pointer",
                background: "var(--bg-elevated)",
                padding: 0,
                transition: "border-color 0.2s",
              }}
            >
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                fill
                style={{ objectFit: "cover" }}
                sizes="72px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
