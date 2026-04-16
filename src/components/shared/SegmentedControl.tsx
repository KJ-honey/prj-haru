"use client";

import React from "react";

export interface SegmentedControlItem {
  id: string;
  label: string;
  icon: string;
}

export interface SegmentedControlProps {
  items: readonly SegmentedControlItem[];
  value: string;
  onChange: (value: string) => void;
  accentColor?: "sky" | "emerald" | "indigo";
  columns?: number;
}

const colorMap = {
  sky: {
    active: "bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-600/30 ring-2 ring-sky-600/20 ring-offset-2 ring-offset-white/50 dark:ring-offset-black/50",
  },
  emerald: {
    active: "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/30 ring-2 ring-emerald-600/20 ring-offset-2 ring-offset-white/50 dark:ring-offset-black/50",
  },
  indigo: {
    active: "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/30 ring-2 ring-indigo-600/20 ring-offset-2 ring-offset-white/50 dark:ring-offset-black/50",
  },
};

const inactive = "bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700";

export default function SegmentedControl({
  items,
  value,
  onChange,
  accentColor = "sky",
  columns = 3,
}: SegmentedControlProps) {
  const colsClass =
    columns === 2 ? "grid-cols-2" :
    columns === 4 ? "grid-cols-4" :
    "grid-cols-3";

  return (
    <div className={`grid ${colsClass} gap-2`}>
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onChange(item.id)}
          className={`py-3 px-1 rounded-[14px] border text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 flex flex-col items-center justify-center gap-1.5
            ${value === item.id ? colorMap[accentColor].active : inactive}`}
        >
          <span className="text-xl">{item.icon}</span>
          <span className="truncate w-full text-center px-1">{item.label}</span>
        </button>
      ))}
    </div>
  );
}
