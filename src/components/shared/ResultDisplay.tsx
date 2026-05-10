"use client";

import React from "react";

export interface ResultDisplayProps {
  children?: React.ReactNode;
  title?: React.ReactNode;
  value?: React.ReactNode;
  description?: React.ReactNode;
  accentColor?: "sky" | "emerald" | "indigo";
  className?: string;
}

const gradientMap = {
  sky: "from-sky-50 to-indigo-50 dark:from-sky-900/20 dark:to-indigo-900/20 border-sky-100 dark:border-sky-800/30",
  emerald: "from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-100 dark:border-emerald-800/30",
  indigo: "from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-100 dark:border-indigo-800/30",
};

const valueGradientMap = {
  sky: "from-sky-600 to-indigo-600 dark:from-sky-400 dark:to-indigo-400",
  emerald: "from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400",
  indigo: "from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400",
};

export default function ResultDisplay({
  children,
  title,
  value,
  description,
  accentColor = "sky",
  className = "",
}: ResultDisplayProps) {
  return (
    <div
      className={`w-full p-8 rounded-2xl bg-gradient-to-br ${gradientMap[accentColor]} border flex flex-col items-center justify-center min-h-[200px] shadow-sm transform transition-all duration-500 hover:shadow-md ${className}`}
    >
      {children ?? (
        <>
          {title && (
            <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400 mb-4 text-center">
              {title}
            </h3>
          )}
          <div className={`text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${valueGradientMap[accentColor]} pb-2 text-center break-words`}>
            {value}
          </div>
          {description && (
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 text-center">
              {description}
            </p>
          )}
        </>
      )}
    </div>
  );
}
