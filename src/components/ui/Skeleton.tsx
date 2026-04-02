"use client";

import React from "react";

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ width = "100%", height = "1rem", className = "", style }: SkeletonProps) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{ width, height, ...style }}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="card" style={{ overflow: "hidden" }}>
      <Skeleton height="220px" style={{ borderRadius: 0 }} />
      <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
        <Skeleton height="0.875rem" width="60%" />
        <Skeleton height="1.25rem" width="85%" />
        <Skeleton height="0.875rem" width="70%" />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
          <Skeleton height="1.5rem" width="40%" />
          <Skeleton height="1.5rem" width="30%" />
        </div>
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
      <Skeleton height="480px" />
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Skeleton height="2rem" width="80%" />
        <Skeleton height="1rem" width="40%" />
        <Skeleton height="6rem" />
        <Skeleton height="4rem" />
        <Skeleton height="3rem" />
      </div>
    </div>
  );
}

export default Skeleton;
