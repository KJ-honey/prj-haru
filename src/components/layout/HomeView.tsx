"use client";

import { useDictionary } from '../i18n/I18nProvider';
import SettingsMenu from './SettingsMenu';
import type { ToolTab } from '@/types';

interface HomeViewProps {
  onSelectTool: (toolId: ToolTab) => void;
}

export default function HomeView({ onSelectTool }: HomeViewProps) {
  const dict = useDictionary();

  const toolCards = [
    {
      id: 'unit' as const,
      title: dict.dashboard.unitConverter.title,
      description: dict.dashboard.unitConverter.description,
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/>
          <path d="m14.5 12.5 2-2"/>
          <path d="m11.5 9.5 2-2"/>
          <path d="m8.5 6.5 2-2"/>
          <path d="m17.5 15.5 2-2"/>
        </svg>
      )
    },
    {
      id: 'currency' as const,
      title: dict.dashboard.currencyConverter.title,
      description: dict.dashboard.currencyConverter.description,
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/>
          <path d="M12 18V6"/>
        </svg>
      )
    },
    {
      id: 'era' as const,
      title: dict.dashboard.eraConverter?.title || 'Era Converter',
      description: dict.dashboard.eraConverter?.description || 'Match Japanese eras with Western years',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      )
    },
    {
      id: 'age' as const,
      title: dict.dashboard.ageCalculator?.title || 'Age Calculator',
      description: dict.dashboard.ageCalculator?.description || 'Calculate your age',
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      )
    }
  ];

  return (
    <div className="text-center md:pb-10 pt-4 animate-in fade-in zoom-in-95 duration-700 ease-out">
      <header className="mb-14">
        <div className="inline-flex items-center justify-center p-4 mb-6 rounded-3xl bg-gradient-to-br from-indigo-500 to-pink-500 shadow-xl shadow-indigo-500/20 text-white transform hover:scale-105 transition-transform duration-300">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2"/>
            <polyline points="2 17 12 22 22 17"/>
            <polyline points="2 12 12 17 22 12"/>
          </svg>
        </div>
        <div className="absolute top-0 right-0 p-4">
          <SettingsMenu />
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">
            {dict.dashboard.title}
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium">
          {dict.dashboard.subtitle}
        </p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto px-4">
        {toolCards.map((tool) => (
          <button 
            key={tool.id}
            onClick={() => onSelectTool(tool.id)} 
            className="flex flex-col items-center p-8 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 dark:border-white/5 hover:border-indigo-300 dark:hover:border-indigo-700 group hover:-translate-y-2"
          >
            <div className="p-5 bg-indigo-100 dark:bg-indigo-900/40 rounded-3xl text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300 mb-6 shadow-sm">
              {tool.icon}
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{tool.title}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed">
              {tool.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
