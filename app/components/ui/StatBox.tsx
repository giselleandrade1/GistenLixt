import React from "react";

interface StatBoxProps {
  label: string;
  value: string | number;
  change?: number;
  icon?: React.ReactNode;
  trend?: "up" | "down";
  variant?: "default" | "accent" | "success";
}

export const StatBox = ({
  label,
  value,
  change,
  icon,
  trend,
  variant = "default",
}: StatBoxProps) => {
  const variantColors = {
    default: "from-purple-500 to-purple-600",
    accent: "from-pink-500 to-pink-600",
    success: "from-emerald-500 to-emerald-600",
  };

  return (
    <div
      className={`rounded-xl bg-gradient-to-br ${variantColors[variant]} p-6 text-white shadow-lg`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium opacity-90">{label}</p>
          <p className="mt-2 text-3xl font-bold">{value}</p>
          {change !== undefined && (
            <p
              className={`mt-2 text-sm font-semibold ${
                trend === "up" ? "text-emerald-300" : "text-red-300"
              }`}
            >
              {trend === "up" ? "↑" : "↓"} {Math.abs(change)}%
            </p>
          )}
        </div>
        {icon && <div className="text-3xl opacity-80">{icon}</div>}
      </div>
    </div>
  );
};
