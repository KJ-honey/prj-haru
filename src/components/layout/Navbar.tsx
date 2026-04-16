"use client";

import ToolSelector, { Tool } from './ToolSelector';
import SettingsMenu from './SettingsMenu';

interface NavbarProps {
  activeTab: string;
  onSelectTab: (id: any) => void;
  tools: Tool[];
}

export default function Navbar({ activeTab, onSelectTab, tools }: NavbarProps) {
  if (activeTab === 'home') return null;

  return (
    <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200/50 dark:border-gray-800/50 animate-in fade-in slide-in-from-top-4 duration-500">
      <button 
        onClick={() => onSelectTab('home')}
        className="flex items-center gap-2 md:gap-3 text-lg md:text-xl font-extrabold text-gray-900 dark:text-white hover:opacity-80 transition-opacity"
      >
        <div className="p-1.5 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 text-white shadow-md">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2"/>
            <polyline points="2 17 12 22 22 17"/>
            <polyline points="2 12 12 17 22 12"/>
          </svg>
        </div>
        UtilityHub
      </button>
      
      <div className="flex items-center gap-3">
        <ToolSelector 
          activeTab={activeTab} 
          onSelectTab={onSelectTab} 
          tools={tools} 
        />
        <SettingsMenu />
      </div>
    </div>
  );
}
