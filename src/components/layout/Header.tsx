"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useMode } from "@/context/ModeContext";
import { usePathname } from "next/navigation";

export default function Header() {
  const { mode, setMode } = useMode();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: scrolled ? "rgba(255, 255, 255, 0.92)" : "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
        transition: "all 0.3s ease",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: 110,
          padding: "1rem 0",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center" }}>
          <img src="/assets/logo.png" alt="TradingMatrix Logo" style={{ height: "130px", width: "auto", objectFit: "contain", transform: "scale(1.2)" }} />
        </Link>

        {/* Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <Link
            href="/"
            style={{
              padding: "0.4rem 0.875rem",
              borderRadius: 6,
              fontSize: "0.875rem",
              fontWeight: 500,
              color: isHome && pathname === "/" ? "var(--text-primary)" : "var(--text-secondary)",
              background: pathname === "/" ? "rgba(0,0,0,0.04)" : "transparent",
              transition: "all 0.2s ease",
            }}
          >
            Home
          </Link>
          <Link
            href="/products"
            style={{
              padding: "0.4rem 0.875rem",
              borderRadius: 6,
              fontSize: "0.875rem",
              fontWeight: 500,
              color: pathname?.startsWith("/products") ? "var(--text-primary)" : "var(--text-secondary)",
              background: pathname?.startsWith("/products") ? "rgba(0,0,0,0.04)" : "transparent",
              transition: "all 0.2s ease",
            }}
          >
            Products
          </Link>
        </nav>

        {/* Mode Badge / Toggle */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "var(--bg-elevated)",
            border: "1px solid var(--border)",
            borderRadius: 999,
            padding: "0.25rem",
          }}
        >
          <button
            id="mode-consumer-btn"
            onClick={() => setMode("consumer")}
            style={{
              padding: "0.35rem 0.875rem",
              borderRadius: 999,
              border: "none",
              fontSize: "0.8rem",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.25s ease",
              background:
                mode === "consumer"
                  ? "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))"
                  : "transparent",
              color: mode === "consumer" ? "white" : "var(--text-muted)",
              letterSpacing: "0.02em",
            }}
          >
            Consumer
          </button>
          <button
            id="mode-retailer-btn"
            onClick={() => setMode("retailer")}
            style={{
              padding: "0.35rem 0.875rem",
              borderRadius: 999,
              border: "none",
              fontSize: "0.8rem",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.25s ease",
              background:
                mode === "retailer"
                  ? "linear-gradient(135deg, var(--green), #10b981)"
                  : "transparent",
              color: mode === "retailer" ? "white" : "var(--text-muted)",
              letterSpacing: "0.02em",
            }}
          >
            Retailer
          </button>
          <button
            id="mode-wholesale-btn"
            onClick={() => setMode("wholesale")}
            style={{
              padding: "0.35rem 0.875rem",
              borderRadius: 999,
              border: "none",
              fontSize: "0.8rem",
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.25s ease",
              background:
                mode === "wholesale"
                  ? "linear-gradient(135deg, #d97706, var(--gold))"
                  : "transparent",
              color: mode === "wholesale" ? "white" : "var(--text-muted)",
              letterSpacing: "0.02em",
            }}
          >
            Wholesale
          </button>
        </div>
      </div>
    </header>
  );
}
