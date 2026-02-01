import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "default" | "gradient" | "glass";
}

export const Card = ({
  children,
  className = "",
  onClick,
  variant = "default",
}: CardProps) => {
  const baseStyles =
    "rounded-2xl p-6 transition-all duration-300 hover:shadow-lg";

  const variantStyles = {
    default:
      "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md",
    gradient:
      "bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl",
    glass:
      "bg-white/10 dark:bg-white/5 backdrop-blur-lg border border-white/20 shadow-xl",
  };

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      {...(onClick && { role: "button" })}
    >
      {children}
    </div>
  );
};
