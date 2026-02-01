/**
 * Componente Button modernizado com gradientes, animações e acessibilidade
 * Design inspirado em interfaces modernas com tema roxo/magenta
 */

import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  icon,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed btn-press btn-glow transition-smooth";

  const variants = {
    primary:
      "bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 focus:ring-purple-400 dark:focus:ring-purple-500 shadow-purple-500/30 hover:shadow-purple-500/40",
    secondary:
      "bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 border-2 border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-slate-800 focus:ring-purple-400 transition-colors duration-300",
    outline:
      "border-2 border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 focus:ring-purple-400 transition-all duration-300",
    ghost:
      "text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/20 focus:ring-purple-400 transition-colors duration-300",
    accent:
      "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 focus:ring-pink-400 shadow-pink-500/30 hover:shadow-pink-500/40",
  };

  const sizes = {
    sm: "px-3 py-2 text-xs",
    md: "px-4 py-3 text-sm",
    lg: "px-6 py-4 text-base",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Carregando...</span>
        </>
      ) : (
        <>
          {icon && icon}
          {children}
        </>
      )}
    </button>
  );
};
