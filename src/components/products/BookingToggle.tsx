"use client";

import { useState, useEffect } from "react";
import { Product, Mode } from "@/types/product";
import { useMode } from "@/context/ModeContext";
import { formatPrice } from "@/lib/pricing";
import NasioCheckoutButton from "./NasioCheckoutButton";

interface BookingToggleProps {
  product: Product;
}

export default function BookingToggle({ product }: BookingToggleProps) {
  const { mode, setMode, isInitialized } = useMode();

  // State
  const [quantity, setQuantity] = useState(1);
  const [isPrebook, setIsPrebook] = useState(true); // Default to true across all segments

  // Define tier limits
  const rules = {
    consumer: { min: 1, max: 5 },
    retailer: { min: 6, max: 100 },
    wholesale: { min: 100, max: 500 },
  };

  const getTier = (m: Mode) => {
    if (m === "wholesale") return product.wholesaleTier;
    if (m === "retailer") return product.retailerTier;
    return product.consumerTier;
  };

  // When mode changes, we auto-update the quantity to the minimum of that tier
  // and keep isPrebook true as default.
  useEffect(() => {
    const minQty = rules[mode].min;
    setQuantity(minQty);
    setIsPrebook(true);
  }, [mode]);

  const currentTier = getTier(mode);
  const minQty = rules[mode].min;
  const maxQty = rules[mode].max;
  const isBelowMOQ = quantity < minQty;
  const isAboveMax = quantity > maxQty;
  const total = quantity >= minQty && quantity <= maxQty ? quantity * currentTier.pricePerUnit : 0;
  
  // Advance payment logic: 10%
  const advancePayment = total * 0.1;
  const remainingPayment = total - advancePayment;

  // Button Labels based on mode
  const btnLabels = {
    consumer: { prebook: "Prebook", buy: "Purchase Now" },
    retailer: { prebook: "Prebook", buy: "Purchase Now" },
    wholesale: { prebook: "Prebooked Stock", buy: "Purchase Now" }
  };

  if (!isInitialized) {
    return <div className="card skeleton" style={{ height: "400px", width: "100%" }}></div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* Responsive Inline Row: Tags + Quantity */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
        
        {/* Tags Block */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {product.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "0.75rem",
                color: "var(--text-secondary)",
                background: "rgba(0,0,0,0.04)",
                border: "1px solid var(--border)",
                borderRadius: 6,
                padding: "0.2rem 0.6rem",
              }}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Quantity Selector Inline Block */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <label htmlFor="quantity-input" style={{ fontSize: "1rem", color: "var(--text-primary)", fontWeight: 700, margin: 0 }}>
            Select Quantity:
          </label>
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              style={{ width: "32px", height: "32px", borderRadius: "6px", border: "1px solid var(--border)", background: "white", fontSize: "1rem", cursor: "pointer", color: "black", display: "flex", alignItems: "center", justifyContent: "center" }}
            >−</button>
            <input
              id="quantity-input"
              type="number"
              value={quantity}
              min={minQty}
              max={maxQty}
              onChange={(e) => setQuantity(parseInt(e.target.value) || minQty)}
              className="input"
              style={{ width: "60px", height: "32px", textAlign: "center", fontWeight: 700, fontSize: "0.9rem", padding: "0 0.25rem" }}
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              style={{ width: "32px", height: "32px", borderRadius: "6px", border: "1px solid var(--border)", background: "white", fontSize: "1rem", cursor: "pointer", color: "black", display: "flex", alignItems: "center", justifyContent: "center" }}
            >+</button>
          </div>
        </div>

      </div>
      
      {/* Constraints Warnings */}
      {(isBelowMOQ || isAboveMax) && (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {isBelowMOQ && <p style={{ color: "var(--red)", fontSize: "0.75rem", margin: 0 }}>⚠️ Min limit: {minQty}</p>}
          {isAboveMax && <p style={{ color: "var(--red)", fontSize: "0.75rem", margin: 0 }}>⚠️ Max limit: {maxQty}</p>}
        </div>
      )}

      <div className="card" style={{ padding: "1.5rem", border: "1px solid var(--border)", borderRadius: "var(--radius)", background: "var(--bg-card)" }}>
        
        {/* 3-Way Segment Quick Switch */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", background: "var(--bg-elevated)", padding: "0.5rem", borderRadius: "10px" }}>
          {(["consumer", "retailer", "wholesale"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                flex: 1,
                padding: "0.75rem",
                borderRadius: "6px",
                border: "none",
                background: mode === m ? "white" : "transparent",
                color: mode === m ? "var(--accent-primary)" : "var(--text-secondary)",
                fontWeight: mode === m ? 700 : 500,
                boxShadow: mode === m ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                cursor: "pointer",
                transition: "all 0.2s",
                textTransform: "capitalize"
              }}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Comparison Table */}
        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--text-primary)" }}>Pricing Tiers Comparison</h3>
          <div style={{ border: "1px solid var(--border)", borderRadius: "8px", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem", textAlign: "left" }}>
              <thead>
                <tr style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)" }}>
                  <th style={{ padding: "0.75rem", borderBottom: "1px solid var(--border)", fontWeight: 600 }}>Segment</th>
                  <th style={{ padding: "0.75rem", borderBottom: "1px solid var(--border)", fontWeight: 600 }}>Price/Unit</th>
                  <th style={{ padding: "0.75rem", borderBottom: "1px solid var(--border)", fontWeight: 600 }}>MOQ</th>
                </tr>
              </thead>
              <tbody>
                {(["consumer", "retailer", "wholesale"] as Mode[]).map((m) => {
                  const tier = getTier(m);
                  const isActive = mode === m;
                  return (
                    <tr key={m} style={{ background: isActive ? "rgba(37,99,235,0.05)" : "white" }}>
                      <td style={{ padding: "0.75rem", borderBottom: "1px solid var(--border)", fontWeight: isActive ? 700 : 500, color: isActive ? "var(--accent-primary)" : "var(--text-primary)", textTransform: "capitalize" }}>
                        {m}
                      </td>
                      <td style={{ padding: "0.75rem", borderBottom: "1px solid var(--border)", color: "var(--text-primary)" }}>
                        {formatPrice(tier.pricePerUnit)}
                      </td>
                      <td style={{ padding: "0.75rem", borderBottom: "1px solid var(--border)", color: "var(--text-secondary)" }}>
                        {rules[m].min} - {rules[m].max}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side-by-Side Area for Desktop, Stacked for Mobile */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", alignItems: "start" }}>
          
          {/* Left Side: Prebook/Buy Toggles and Info */}
          <div>
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
              {/* PRIMARY: Prebook */}
              <button
                onClick={() => setIsPrebook(true)}
                style={{
                  flex: 1, padding: "0.75rem", borderRadius: "6px", fontSize: "0.875rem", fontWeight: 700, cursor: "pointer",
                  border: isPrebook ? "2px solid var(--accent-primary)" : "1px solid var(--border)",
                  background: isPrebook ? "rgba(37,99,235,0.05)" : "white",
                  color: isPrebook ? "var(--accent-primary)" : "var(--text-secondary)",
                }}
              >{btnLabels[mode].prebook}</button>

              {/* SECONDARY: Buy */}
              <button
                onClick={() => setIsPrebook(false)}
                style={{
                  flex: 1, padding: "0.75rem", borderRadius: "6px", fontSize: "0.875rem", fontWeight: 700, cursor: "pointer",
                  border: !isPrebook ? "2px solid var(--accent-primary)" : "1px solid var(--border)",
                  background: !isPrebook ? "rgba(37,99,235,0.05)" : "white",
                  color: !isPrebook ? "var(--accent-primary)" : "var(--text-secondary)",
                }}
              >{btnLabels[mode].buy}</button>
            </div>

            {/* Wholesale Info Block */}
            {mode === "wholesale" && (
              <div style={{ background: "rgba(37,99,235,0.03)", padding: "1rem", borderRadius: "8px", border: "1px solid var(--border)", fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                {isPrebook ? (
                  <>
                    <strong style={{ color: "var(--text-primary)", display: "block", marginBottom: "0.5rem", fontSize: "0.85rem" }}>Prebooked Stock (Internal Supply Model)</strong>
                    <ul style={{ paddingLeft: "1rem", listStyleType: "disc", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                      <li>Retailers place pre-orders (10% advance collected)</li>
                      <li>System aggregates total demand (e.g., 300 units)</li>
                      <li>Wholesaler can purchase 300+ units and fulfill retailer orders</li>
                      <li>Platform earns margin from wholesaler</li>
                    </ul>
                  </>
                ) : (
                  <>
                    <strong style={{ color: "var(--text-primary)", display: "block", marginBottom: "0.5rem", fontSize: "0.85rem" }}>Buy (Independent Wholesale)</strong>
                    <ul style={{ paddingLeft: "1rem", listStyleType: "disc", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                      <li>Wholesaler purchases bulk inventory</li>
                      <li>Sells via their own platform</li>
                      <li>No dependency on retailer network</li>
                    </ul>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Right Side: Totals & Primary CTA */}
          <div style={{ background: "var(--bg-elevated)", padding: "1.5rem", borderRadius: "8px", border: "1px solid var(--border)" }}>
            <div style={{ marginBottom: "1rem" }}>
              <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>Selected Rate:</span>
              <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--text-primary)" }}>{formatPrice(currentTier.pricePerUnit)} <span style={{fontSize: "0.875rem", fontWeight: 500, color: "var(--text-muted)"}}>/unit</span></div>
            </div>
            
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1rem", marginBottom: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)" }}>
                <span>Total cost:</span>
                <span>{formatPrice(total)}</span>
              </div>
              
              {isPrebook && (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "0.25rem" }}>
                    <span>Advance required (10%):</span>
                    <span style={{ fontWeight: 600, color: "var(--accent-primary)" }}>{formatPrice(advancePayment)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", color: "var(--text-muted)" }}>
                    <span>Remaining balance:</span>
                    <span>{formatPrice(remainingPayment)}</span>
                  </div>
                </>
              )}
            </div>

            <NasioCheckoutButton
              product={product}
              quantity={quantity}
              advance={isPrebook ? advancePayment : undefined}
              disabled={isBelowMOQ || isAboveMax || !product.inStock}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
