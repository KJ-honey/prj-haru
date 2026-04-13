"use client";

import { useState, useRef, useEffect, ReactNode } from 'react';
import { useDictionary } from '../i18n/I18nProvider';

export interface Tool {
  id: string;
  label: string;
  icon: ReactNode;
}

interface ToolSelectorProps {
  activeTab: string;
  onSelectTab: (id: any) => void;
  tools: Tool[];
}

export default function ToolSelector({ activeTab, onSelectTab, tools }: ToolSelectorProps) {
  const [isToolMenuOpen, setIsToolMenuOpen] = useState(false);
  const toolMenuRef = useRef<HTMLDivElement>(null);
  const dict = useDictionary();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toolMenuRef.current && !toolMenuRef.current.contains(event.target as Node)) {
        setIsToolMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentTool = tools.find(t => t.id === activeTab);

  return (
    <div className="relative" ref={toolMenuRef}>
      <button
        onClick={() => setIsToolMenuOpen(!isToolMenuOpen)}
        className={`flex items-center gap-2.5 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 border shadow-sm
          ${isToolMenuOpen 
            ? "bg-indigo-600 text-white border-indigo-600 shadow-indigo-200 dark:shadow-indigo-900" 
            : "bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800"
          }`}
      >
        {currentTool?.icon}
        <span>{currentTool?.label}</span>
        <svg 
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          className={`ml-1 transition-transform duration-300 ${isToolMenuOpen ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {isToolMenuOpen && (
        <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 p-2 z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
          <div className="px-3 py-2 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
            {dict.dashboard.settings?.tools || 'Select Tool'}
          </div>
          <div className="space-y-1 mt-1">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => {
                  onSelectTab(tool.id);
                  setIsToolMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm transition-all duration-200 group
                  ${activeTab === tool.id 
                    ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 font-bold' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:translate-x-1'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg transition-colors ${activeTab === tool.id ? 'bg-indigo-100 dark:bg-indigo-800/50' : 'bg-gray-100 dark:bg-gray-800 group-hover:bg-white dark:group-hover:bg-gray-700'}`}>
                    {tool.icon}
                  </div>
                  <span>{tool.label}</span>
                </div>
                {activeTab === tool.id && (
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-sm shadow-indigo-500/50" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
