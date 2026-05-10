import React from 'react';
import ToolHeader from './ToolHeader';

interface ToolLayoutProps {
  title: string;
  subtitle: React.ReactNode;
  children: React.ReactNode;
}

export default function ToolLayout({ title, subtitle, children }: ToolLayoutProps) {
  return (
    <div className="flex flex-col gap-7 md:gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <ToolHeader title={title} subtitle={subtitle} />

      <div className="bg-white/40 dark:bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-white/10 shadow-xl">
        {children}
      </div>
    </div>
  );
}
