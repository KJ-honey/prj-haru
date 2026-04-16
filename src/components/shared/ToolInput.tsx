"use client";

import React from "react";

export interface ToolInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  accentColor?: "sky" | "emerald" | "indigo";
  type?: "text" | "date";
  suffix?: string;
  filter?: "number" | "decimal" | "none";
  className?: string;
  minHeight?: string;
}

const focusColorMap = {
  sky: "focus:border-sky-500 dark:focus:border-sky-500",
  emerald: "focus:border-emerald-500 dark:focus:border-emerald-500",
  indigo: "focus:border-indigo-500 dark:focus:border-indigo-500",
};

const suffixColorMap = {
  sky: "group-focus-within:text-sky-400",
  emerald: "group-focus-within:text-emerald-400",
  indigo: "group-focus-within:text-indigo-400",
};

function applyFilter(raw: string, filter: "number" | "decimal" | "none"): string {
  if (filter === "number") return raw.replace(/[^0-9]/g, "");
  if (filter === "decimal") return raw.replace(/[^0-9.]/g, "");
  return raw;
}

export default function ToolInput({
  value,
  onChange,
  placeholder,
  accentColor = "sky",
  type = "text",
  suffix,
  filter = "none",
  className = "",
  minHeight = "56px",
}: ToolInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "date") {
      onChange(e.target.value);
    } else {
      onChange(applyFilter(e.target.value, filter));
    }
  };

  return (
    <div className={`relative group ${className}`}>
      <input
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full h-full bg-white/70 dark:bg-gray-900/50 text-gray-900 dark:text-white border-2 border-transparent ${focusColorMap[accentColor]} rounded-xl px-4 py-3 text-xl font-medium outline-none transition-all shadow-sm focus:shadow-md ${suffix ? "pr-10" : ""}`}
        style={{ minHeight }}
      />
      {suffix && (
        <div
          className={`absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 font-bold select-none pointer-events-none transition-colors ${suffixColorMap[accentColor]}`}
        >
          {suffix}
        </div>
      )}
    </div>
  );
}
