/**
 * ThemeToggle - Botão para alternar entre tema claro e escuro
 */

"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/app/providers/ThemeProvider";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Evita renderizar até estar montado para prevenir mismatch de hidratação
  if (!mounted) {
    return (
      <div className="rounded-lg p-2 w-9 h-9" aria-label="Carregando tema...">
        {/* Placeholder vazio */}
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      title={`Mudar para tema ${theme === "light" ? "escuro" : "claro"}`}
      aria-label={`Mudar para tema ${theme === "light" ? "escuro" : "claro"}`}
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
      ) : (
        <Sun className="h-5 w-5 text-slate-600 dark:text-slate-400" />
      )}
    </button>
  );
};
