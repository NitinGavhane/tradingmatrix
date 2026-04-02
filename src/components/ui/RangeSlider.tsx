"use client";

import React from "react";

interface RangeSliderProps {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
  id: string;
}

export default function RangeSlider({
  label,
  min,
  max,
  value,
  onChange,
  formatValue = (v) => v.toString(),
  id,
}: RangeSliderProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <label
          htmlFor={id}
          style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 500 }}
        >
          {label}
        </label>
        <span
          style={{
            fontSize: "0.8rem",
            color: "var(--accent-secondary)",
            fontWeight: 600,
            background: "rgba(109,89,245,0.1)",
            padding: "0.1rem 0.5rem",
            borderRadius: "4px",
          }}
        >
          {formatValue(value)}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "0.7rem",
          color: "var(--text-muted)",
        }}
      >
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  );
}
