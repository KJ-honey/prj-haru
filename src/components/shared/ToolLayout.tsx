import React from 'react';

interface ToolLayoutProps {
  title: string;
  subtitle: React.ReactNode;
  children: React.ReactNode;
}

export default function ToolLayout({ title, subtitle, children }: ToolLayoutProps) {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div className="hidden md:block text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">{title}</h2>
        <p className="text-gray-500 dark:text-gray-400">{subtitle}</p>
      </div>

      <div className="bg-white/40 dark:bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-white/10 shadow-xl">
        {children}
      </div>
    </div>
  );
}
