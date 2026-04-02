"use client";

import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
        marginTop: "4rem",
      }}
    >
      <div className="container" style={{ padding: "3rem 1.5rem 2rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "2rem",
            marginBottom: "3rem",
          }}
        >
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
              <img src="/assets/logo.png" alt="TradingMatrix Logo" style={{ height: "110px", width: "auto", objectFit: "contain" }} />
            </Link>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.7, maxWidth: 280 }}>
              A headless product showcase platform connecting buyers directly to
              verified global manufacturers via Nas.io checkout.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontWeight: 600, fontSize: "0.875rem", marginBottom: "1rem", color: "var(--text-primary)" }}>
              Browse
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {[
                { label: "All Products", href: "/products" },
                { label: "Electronics", href: "/products?category=Electronics" },
                { label: "Kitchenware", href: "/products?category=Kitchenware" },
                { label: "Fitness", href: "/products?category=Fitness" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="footer-link"
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "0.875rem",
                      transition: "color 0.2s",
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* B2B */}
          <div>
            <h4 style={{ fontWeight: 600, fontSize: "0.875rem", marginBottom: "1rem", color: "var(--text-primary)" }}>
              Business
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {["Wholesale Pricing", "Bulk Orders", "Prebook Items", "Supplier Info"].map((item) => (
                <li key={item}>
                  <span style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontWeight: 600, fontSize: "0.875rem", marginBottom: "1rem", color: "var(--text-primary)" }}>
              Contact
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              <li style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>hello@tradingmatrix.org</li>
              <li style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>+91 98765 43210</li>
              <li style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>Mon–Sat, 9am–6pm IST</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
            © {year} TradingMatrix. All rights reserved.
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
            Powered by{" "}
            <span style={{ color: "var(--accent-secondary)" }}>Nas.io</span> &{" "}
            <span style={{ color: "var(--accent-secondary)" }}>Supabase</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
