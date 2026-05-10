"use client";

import React from "react";
import SectionLabel from "./SectionLabel";

type AccentColor = "sky" | "emerald" | "indigo";
type FieldSpan = 1 | 2 | 3;

export interface ToolFormProps {
  children: React.ReactNode;
  className?: string;
}

export interface ToolFieldProps {
  label: React.ReactNode;
  children: React.ReactNode;
  accentColor?: AccentColor;
  span?: FieldSpan;
  className?: string;
}

const spanMap: Record<FieldSpan, string> = {
  1: "md:col-span-1",
  2: "md:col-span-2",
  3: "md:col-span-3",
};

export default function ToolForm({ children, className = "" }: ToolFormProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 items-start ${className}`}>
      {children}
    </div>
  );
}

export function ToolField({
  label,
  children,
  accentColor = "sky",
  span = 1,
  className = "",
}: ToolFieldProps) {
  return (
    <div className={`w-full ${spanMap[span]} ${className}`}>
      <SectionLabel accentColor={accentColor}>{label}</SectionLabel>
      {children}
    </div>
  );
}
