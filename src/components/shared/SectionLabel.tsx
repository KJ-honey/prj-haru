"use client";

import React from "react";

export interface SectionLabelProps {
  children: React.ReactNode;
  accentColor?: "sky" | "emerald" | "indigo";
  align?: "left" | "center";
  className?: string;
}

const colorMap = {
  sky: "text-sky-600 dark:text-sky-400",
  emerald: "text-emerald-600 dark:text-emerald-400",
  indigo: "text-indigo-600 dark:text-indigo-400",
};

export default function SectionLabel({
  children,
  accentColor = "sky",
  align = "left",
  className = "",
}: SectionLabelProps) {
  const alignClass = align === "center" ? "text-center" : "";

  return (
    <label
      className={`block text-sm font-medium ${colorMap[accentColor]} mb-3 transition-colors ${alignClass} ${className}`}
    >
      {children}
    </label>
  );
}
