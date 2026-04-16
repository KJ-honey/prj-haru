"use client";

import React from "react";

export interface InputGroupProps {
  children: React.ReactNode;
  className?: string;
}

export default function InputGroup({ children, className = "" }: InputGroupProps) {
  return (
    <div className={`flex-1 flex gap-2 ${className}`}>
      {children}
    </div>
  );
}
