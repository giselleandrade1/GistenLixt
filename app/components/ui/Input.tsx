/**
 * Componente Input modernizado com validação, ícones e design roxo/magenta
 * Suporta tema claro e escuro com transições suaves
 */

import React, { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, icon, id, className = "", ...props }, ref) => {
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, "-")}`;
    const errorId = error ? `${inputId}-error` : undefined;
    const helperId = helperText ? `${inputId}-helper` : undefined;

    return (
      <div className="space-y-2">
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
        >
          {label}
        </label>
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-500 dark:text-purple-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`w-full rounded-xl border-2 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-all duration-200 dark:bg-slate-900 dark:text-slate-100 ${
              icon ? "pl-10" : ""
            } ${
              error
                ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200 dark:border-red-500 dark:focus:ring-red-900"
                : "border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:border-slate-700 dark:focus:border-purple-400 dark:focus:ring-purple-900"
            } ${className}`}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            {...(error && { "aria-invalid": true })}
            {...props}
          />
        </div>
        {error && (
          <p
            id={errorId}
            className="text-sm font-medium text-red-600 dark:text-red-400"
          >
            ✕ {error}
          </p>
        )}
        {!error && helperText && (
          <p
            id={helperId}
            className="text-sm text-slate-500 dark:text-slate-400"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
