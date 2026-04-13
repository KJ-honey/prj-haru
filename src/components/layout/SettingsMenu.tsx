"use client";

import { useTheme } from 'next-themes';
import { useEffect, useState, useRef } from 'react';
import { useDictionary, useLocale } from '../i18n/I18nProvider';
import { useRouter, usePathname } from 'next/navigation';

export default function SettingsMenu() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dict = useDictionary();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const currentLang = locale || 'en';

  useEffect(() => {
    setMounted(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
    );
  }

  const handleLanguageChange = (newLang: string) => {
    if (newLang === currentLang) return;
    
    const segments = pathname.split('/');
    // segments[0] is ""
    // segments[1] is the current lang
    segments[1] = newLang;
    const newPath = segments.join('/');
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2.5 rounded-xl transition-all duration-300 group shadow-sm flex items-center justify-center border
          ${isOpen 
            ? "bg-indigo-600 text-white shadow-indigo-200 dark:shadow-indigo-900 border-indigo-600" 
            : "bg-white/50 dark:bg-gray-800/50 backdrop-blur-md border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-gray-800"
          }`}
        aria-label="Settings"
      >
        <svg 
          width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className={`transform transition-transform duration-500 ${isOpen ? 'rotate-90' : 'group-hover:rotate-45'}`}
        >
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2 2.22 2.22 0 0 1-2.02 2 2.22 2.22 0 0 1-2.02-2 2 2 0 0 0-2-2h-.44a2 2 0 0 0-2 2v.44a2 2 0 0 0 2 2 2.22 2.22 0 0 1 2 2.02 2.22 2.22 0 0 1-2 2.02 2 2 0 0 0-2 2v.44a2 2 0 0 0 2 2 2.22 2.22 0 0 1 2 2.02 2.22 2.22 0 0 1-2 2.02 2 2 0 0 0-2 2V22a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2 2.22 2.22 0 0 1 2.02-2 2.22 2.22 0 0 1 2.02 2 2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.44a2 2 0 0 0-2-2 2.22 2.22 0 0 1-2-2.02 2.22 2.22 0 0 1 2-2.02 2 2 0 0 0 2-2v-.44a2 2 0 0 0-2-2 2.22 2.22 0 0 1-2-2.02 2.22 2.22 0 0 1 2-2.02 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 p-2 z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="px-3 py-2 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
            {dict.dashboard.settings.theme}
          </div>
          <div className="grid grid-cols-2 gap-1 mb-3">
            <button
              onClick={() => setTheme('light')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${theme === 'light' ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 font-bold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
              {dict.dashboard.settings.light}
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${theme === 'dark' ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 font-bold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
              {dict.dashboard.settings.dark}
            </button>
          </div>

          <div className="h-px bg-gray-100 dark:bg-gray-800 my-1 mx-2" />

          <div className="px-3 py-2 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
            {dict.dashboard.settings.language}
          </div>
          <div className="space-y-1">
            {[
              { id: 'en', label: dict.dashboard.settings.en, icon: '🇺🇸' },
              { id: 'kr', label: dict.dashboard.settings.kr, icon: '🇰🇷' },
              { id: 'jp', label: dict.dashboard.settings.jp, icon: '🇯🇵' },
            ].map((lang) => (
              <button
                key={lang.id}
                onClick={() => handleLanguageChange(lang.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${currentLang === lang.id ? 'bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 font-bold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{lang.icon}</span>
                  <span>{lang.label}</span>
                </div>
                {currentLang === lang.id && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"><polyline points="20 6 9 17 4 12"/></svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
