import React from "react";

export interface ToolHeaderProps {
  title: string;
  subtitle: React.ReactNode;
  className?: string;
}

export default function ToolHeader({
  title,
  subtitle,
  className = "",
}: ToolHeaderProps) {
  return (
    <header className={`min-h-[76px] text-center flex flex-col items-center justify-start ${className}`}>
      <h2 className="text-2xl font-bold leading-tight text-gray-800 dark:text-gray-100 mb-2 break-keep">
        {title}
      </h2>
      <p className="max-w-2xl text-sm md:text-base leading-relaxed text-gray-500 dark:text-gray-400">
        {subtitle}
      </p>
    </header>
  );
}
