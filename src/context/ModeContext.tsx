"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Mode } from "@/types/product";

interface ModeContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
  isInitialized: boolean;
}

const ModeContext = createContext<ModeContextType | null>(null);

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>("consumer");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("showget-mode") as Mode | null;
    if (stored === "wholesale" || stored === "retailer" || stored === "consumer") {
      setModeState(stored);
    }
    setIsInitialized(true);
  }, []);

  const setMode = (newMode: Mode) => {
    setModeState(newMode);
    localStorage.setItem("showget-mode", newMode);
  };

  return (
    <ModeContext.Provider value={{ mode, setMode, isInitialized }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode(): ModeContextType {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error("useMode must be used within a ModeProvider");
  }
  return context;
}
