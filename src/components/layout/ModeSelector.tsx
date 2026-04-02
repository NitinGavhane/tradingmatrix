"use client";

import { useMode } from "@/context/ModeContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Mode } from "@/types/product";

export default function ModeSelector() {
  const { setMode } = useMode();
  const router = useRouter();
  const [hoveredMode, setHoveredMode] = useState<Mode | null>(null);

  const handleSelect = (mode: Mode) => {
    setMode(mode);
    router.push("/products");
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background blobs (Lightened) */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "15%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.05), transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          right: "10%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.05), transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: "3.5rem", animation: "fadeInUp 0.6s ease forwards" }}>
        <h1
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            marginBottom: "1.5rem",
            color: "var(--text-primary)"
          }}
        >
          Select Your Path
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            color: "var(--text-secondary)",
            maxWidth: 480,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Choose your purchasing segment to unlock the right pricing and quantities.
        </p>
      </div>

      {/* Mode cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.5rem",
          maxWidth: 1000,
          width: "100%",
          animation: "fadeInUp 0.7s ease 0.1s both",
        }}
      >
        {/* Consumer */}
        <button
          onClick={() => handleSelect("consumer")}
          onMouseEnter={() => setHoveredMode("consumer")}
          onMouseLeave={() => setHoveredMode(null)}
          className="card card-hover"
          style={{
            padding: "2.5rem 2rem",
            cursor: "pointer",
            textAlign: "left",
            borderWidth: 2,
            borderColor: hoveredMode === "consumer" ? "var(--accent-primary)" : "var(--border)",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🛍️</div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>Consumer</h2>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
            1–5 units. Convenience purchase at retail market rates.
          </p>
          <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--accent-primary)" }}>
            Select Consumer →
          </div>
        </button>

        {/* Retailer */}
        <button
          onClick={() => handleSelect("retailer")}
          onMouseEnter={() => setHoveredMode("retailer")}
          onMouseLeave={() => setHoveredMode(null)}
          className="card card-hover"
          style={{
            padding: "2.5rem 2rem",
            cursor: "pointer",
            textAlign: "left",
            borderWidth: 2,
            borderColor: hoveredMode === "retailer" ? "var(--accent-primary)" : "var(--border)",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🏪</div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>Retailer</h2>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
            6–100 units. Medium tier with 10% advance prebook options.
          </p>
          <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--accent-primary)" }}>
            Select Retailer →
          </div>
        </button>

        {/* Wholesale */}
        <button
          onClick={() => handleSelect("wholesale")}
          onMouseEnter={() => setHoveredMode("wholesale")}
          onMouseLeave={() => setHoveredMode(null)}
          className="card card-hover"
          style={{
            padding: "2.5rem 2rem",
            cursor: "pointer",
            textAlign: "left",
            borderWidth: 2,
            borderColor: hoveredMode === "wholesale" ? "var(--accent-primary)" : "var(--border)",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>🚚</div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>Wholesale</h2>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
            100+ units. Bulk quantities at the lowest price per unit.
          </p>
          <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--accent-primary)" }}>
            Select Wholesale →
          </div>
        </button>
      </div>

      <button
        onClick={() => router.push("/products")}
        style={{
          marginTop: "2.5rem",
          background: "transparent",
          border: "none",
          color: "var(--text-muted)",
          fontSize: "0.875rem",
          cursor: "pointer",
          transition: "color 0.2s",
        }}
      >
        Skip — browse all products →
      </button>
    </div>
  );
}
