"use client";

import React from "react";

export interface ToolSelectOption {
  value: string;
  label: string;
}

export interface ToolSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: ToolSelectOption[];
  accentColor?: "sky" | "emerald" | "indigo";
  className?: string;
}

const focusColorMap = {
  sky: "focus:border-sky-500 dark:focus:border-sky-500",
  emerald: "focus:border-emerald-500 dark:focus:border-emerald-500",
  indigo: "focus:border-indigo-500 dark:focus:border-indigo-500",
};

const arrowColorMap = {
  sky: "text-sky-500 group-hover:text-sky-600",
  emerald: "text-emerald-500 group-hover:text-emerald-600",
  indigo: "text-indigo-500 group-hover:text-indigo-600",
};

export default function ToolSelect({
  value,
  onChange,
  options,
  accentColor = "sky",
  className = "",
}: ToolSelectProps) {
  return (
    <div className={`relative group ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full h-full min-h-[56px] bg-white/70 dark:bg-gray-900/50 text-gray-900 dark:text-white border-2 border-transparent ${focusColorMap[accentColor]} rounded-xl px-4 py-3 text-lg outline-none transition-all shadow-sm focus:shadow-md cursor-pointer appearance-none`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div
        className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${arrowColorMap[accentColor]} transition-colors`}
      >
        ▼
      </div>
    </div>
  );
}
