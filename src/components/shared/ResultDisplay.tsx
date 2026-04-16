"use client";

import React from "react";

export interface ResultDisplayProps {
  children: React.ReactNode;
  accentColor?: "sky" | "emerald" | "indigo";
  className?: string;
}

const gradientMap = {
  sky: "from-sky-50 to-indigo-50 dark:from-sky-900/20 dark:to-indigo-900/20 border-sky-100 dark:border-sky-800/30",
  emerald: "from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-100 dark:border-emerald-800/30",
  indigo: "from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-100 dark:border-indigo-800/30",
};

export default function ResultDisplay({
  children,
  accentColor = "sky",
  className = "",
}: ResultDisplayProps) {
  return (
    <div
      className={`w-full p-8 rounded-2xl bg-gradient-to-br ${gradientMap[accentColor]} border flex flex-col items-center justify-center min-h-[200px] shadow-sm transform transition-all duration-500 hover:shadow-md ${className}`}
    >
      {children}
    </div>
  );
}
