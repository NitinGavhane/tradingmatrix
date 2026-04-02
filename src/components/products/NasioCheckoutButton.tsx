"use client";

import { Product } from "@/types/product";
import { useMode } from "@/context/ModeContext";
import Button from "@/components/ui/Button";

interface NasioCheckoutButtonProps {
  product: Product;
  quantity: number;
  advance?: number; // Prebook amount
  disabled?: boolean;
}

export default function NasioCheckoutButton({
  product,
  quantity,
  advance,
  disabled = false,
}: NasioCheckoutButtonProps) {
  const { mode } = useMode();

  const handleClick = () => {
    // Attempt to append quantity & advance params to the Nas.io URL based on our requirements
    const url = new URL(product.nasioUrl);
    url.searchParams.set("quantity", quantity.toString());
    if (advance) {
      url.searchParams.set("advance", advance.toString());
    }
    
    // For local dev debugging
    console.log("Redirecting to:", url.toString());
    
    window.open(url.toString(), "_blank", "noopener,noreferrer");
  };

  const isWholesale = mode === "wholesale";

  return (
    <Button
      id={`nasio-buy-btn-${product.id}`}
      onClick={handleClick}
      disabled={disabled}
      style={{
        width: "100%",
        padding: "1rem",
        fontSize: "1rem",
        fontWeight: 800,
        background: "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
        color: "white",
        border: "none",
        borderRadius: "var(--radius-sm)",
        cursor: disabled ? "not-allowed" : "pointer",
        letterSpacing: "0.01em",
      }}
    >
      🛒 {advance ? "Pay Advance & Prebook" : (isWholesale ? "Proceed to Wholesale Checkout" : "Buy Now")}
    </Button>
  );
}
