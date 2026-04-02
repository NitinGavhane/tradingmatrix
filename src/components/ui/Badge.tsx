"use client";

import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "wholesale" | "retailer" | "consumer" | "retail" | "in-stock" | "out-of-stock" | "category" | "default";
  className?: string;
}

export default function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const variantClass = {
    wholesale: "badge-wholesale",
    retailer: "badge-retail",
    consumer: "badge-retail",
    retail: "badge-retail",
    "in-stock": "badge-in-stock",
    "out-of-stock": "badge-out-of-stock",
    category: "badge",
    default: "badge",
  }[variant];

  const extraStyle =
    variant === "category" || variant === "default"
      ? {
          background: "rgba(0,0,0,0.04)",
          color: "var(--text-secondary)",
          border: "1px solid var(--border)",
        }
      : {};

  return (
    <span className={`badge ${variantClass} ${className}`} style={extraStyle}>
      {children}
    </span>
  );
}
