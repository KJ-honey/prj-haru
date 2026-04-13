"use client";

import { useState } from 'react';
import UnitConverter from '../tools/UnitConverter';
import CurrencyConverter from '../tools/CurrencyConverter';
import ThemeToggle from './ThemeToggle';
import { useDictionary } from '../i18n/I18nProvider';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'home' | 'unit' | 'currency'>('home');
  const dict = useDictionary();

  return (
    <div className="w-full flex-1 flex flex-col">
      {/* Navbar / Tab List (Hidden on Home Screen) */}
      {activeTab !== 'home' && (
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 pb-4 border-b border-gray-200/50 dark:border-gray-800/50 animate-in fade-in slide-in-from-top-4 duration-500">
          <button 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 text-xl font-extrabold text-gray-900 dark:text-white mb-4 md:mb-0 hover:opacity-80 transition-opacity"
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
            <div className="inline-flex bg-white/50 dark:bg-gray-900/50 backdrop-blur-md p-1.5 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50">
              <button
                onClick={() => setActiveTab('unit')}
                className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                  activeTab === 'unit' 
                    ? 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-md transform scale-[1.02]' 
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-800/50'
                }`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/>
                  <path d="m14.5 12.5 2-2"/>
                  <path d="m11.5 9.5 2-2"/>
                  <path d="m8.5 6.5 2-2"/>
                  <path d="m17.5 15.5 2-2"/>
                </svg>
                <span className="hidden sm:inline">{dict.dashboard.unitConverter.title}</span>
              </button>

              <button
                onClick={() => setActiveTab('currency')}
                className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                  activeTab === 'currency' 
                    ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-md transform scale-[1.02]' 
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-800/50'
                }`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/>
                  <path d="M12 18V6"/>
                </svg>
                <span className="hidden sm:inline">{dict.dashboard.currencyConverter.title}</span>
              </button>
            </div>
            <ThemeToggle />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="relative flex-1 flex flex-col justify-center">
        {activeTab === 'home' ? (
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
                <ThemeToggle />
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
                {dict.dashboard.title.replace('Hub', '')}<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">Hub</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium">
                {dict.dashboard.subtitle}
              </p>
            </header>

            <div className="grid sm:grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto px-4">
              <button 
                onClick={() => setActiveTab('unit')} 
                className="flex flex-col items-center p-8 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 dark:border-white/5 hover:border-indigo-300 dark:hover:border-indigo-700 group hover:-translate-y-2"
              >
                <div className="p-5 bg-indigo-100 dark:bg-indigo-900/40 rounded-3xl text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-300 mb-6 shadow-sm">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/>
                    <path d="m14.5 12.5 2-2"/>
                    <path d="m11.5 9.5 2-2"/>
                    <path d="m8.5 6.5 2-2"/>
                    <path d="m17.5 15.5 2-2"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{dict.dashboard.unitConverter.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed">
                  {dict.dashboard.unitConverter.description}
                </p>
              </button>

              <button 
                onClick={() => setActiveTab('currency')} 
                className="flex flex-col items-center p-8 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 dark:border-white/5 hover:border-blue-300 dark:hover:border-blue-700 group hover:-translate-y-2"
              >
                <div className="p-5 bg-blue-100 dark:bg-blue-900/40 rounded-3xl text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300 mb-6 shadow-sm">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/>
                    <path d="M12 18V6"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{dict.dashboard.currencyConverter.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed">
                  {dict.dashboard.currencyConverter.description}
                </p>
              </button>
            </div>
          </div>
        ) : activeTab === 'unit' ? (
          <UnitConverter />
        ) : (
          <CurrencyConverter />
        )}
      </div>
    </div>
  );
}
