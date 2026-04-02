"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Suggestion {
  id: string;
  name: string;
  category: string;
  image: string;
}

interface SearchBarProps {
  onQueryChange?: (q: string) => void;
  initialQuery?: string;
  id?: string;
}

export default function SearchBar({ onQueryChange, initialQuery = "", id = "search-bar" }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  const fetchSuggestions = useCallback(async (q: string) => {
    if (q.length < 2) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      if (res.ok) {
        const data = await res.json();
        setSuggestions(data.suggestions || []);
        setOpen(true);
      }
    } catch {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    onQueryChange?.(val);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(val), 300);
  };

  const handleSelect = (suggestion: Suggestion) => {
    setQuery(suggestion.name);
    setOpen(false);
    onQueryChange?.(suggestion.name);
    router.push(`/products/${suggestion.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setOpen(false);
      onQueryChange?.(query);
    }
    if (e.key === "Escape") setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = () => setOpen(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%" }} onClick={(e) => e.stopPropagation()}>
      <div style={{ position: "relative" }}>
        <svg
          style={{
            position: "absolute",
            left: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--text-muted)",
            pointerEvents: "none",
          }}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          id={id}
          type="search"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && setOpen(true)}
          className="input"
          placeholder="Search products, categories, tags..."
          style={{ paddingLeft: "2.75rem", paddingRight: loading ? "2.75rem" : "1rem" }}
          autoComplete="off"
        />
        {loading && (
          <div
            style={{
              position: "absolute",
              right: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                border: "2px solid var(--border)",
                borderTopColor: "var(--accent-primary)",
                borderRadius: "50%",
                animation: "spin 0.7s linear infinite",
              }}
            />
          </div>
        )}
      </div>

      {/* Dropdown */}
      {open && suggestions.length > 0 && (
        <div
          className="glass animate-slide-in"
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            right: 0,
            borderRadius: "var(--radius)",
            overflow: "hidden",
            boxShadow: "var(--shadow-lg)",
            zIndex: 50,
          }}
        >
          {suggestions.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSelect(s)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.875rem",
                width: "100%",
                padding: "0.75rem 1rem",
                background: "transparent",
                border: "none",
                borderBottom: "1px solid var(--border)",
                cursor: "pointer",
                textAlign: "left",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.04)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {s.image && (
                <div
                  style={{
                    position: "relative",
                    width: 44,
                    height: 44,
                    borderRadius: "var(--radius-sm)",
                    overflow: "hidden",
                    flexShrink: 0,
                    background: "var(--bg-elevated)",
                  }}
                >
                  <Image src={s.image} alt={s.name} fill style={{ objectFit: "cover" }} sizes="44px" />
                </div>
              )}
              <div>
                <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.15rem" }}>
                  {s.name}
                </p>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{s.category}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
