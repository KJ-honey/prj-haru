"use client";

import { useState } from 'react';
import UnitConverter from '../tools/UnitConverter';
import CurrencyConverter from '../tools/CurrencyConverter';
import EraConverter from '../tools/EraConverter';
import AgeCalculator from '../tools/AgeCalculator';
import Navbar from './Navbar';
import HomeView from './HomeView';
import { useDictionary } from '../i18n/I18nProvider';
import type { DashboardTab, ToolTab } from '@/types';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('home');
  const dict = useDictionary();

  const tools: { id: ToolTab; label: string; icon: React.ReactNode }[] = [
    { 
      id: 'unit', 
      label: dict.dashboard.unitConverter.title,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/>
          <path d="m14.5 12.5 2-2"/><path d="m11.5 9.5 2-2"/><path d="m8.5 6.5 2-2"/><path d="m17.5 15.5 2-2"/>
        </svg>
      )
    },
    { 
      id: 'currency', 
      label: dict.dashboard.currencyConverter.title,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/>
        </svg>
      )
    },
    { 
      id: 'era', 
      label: dict.dashboard.eraConverter?.title || 'Era Converter',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      )
    },
    { 
      id: 'age', 
      label: dict.dashboard.ageCalculator?.title || 'Age Calculator',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
      )
    },
  ];

  return (
    <div className="w-full flex-1 flex flex-col">
      <Navbar 
        activeTab={activeTab} 
        onSelectTab={setActiveTab} 
        tools={tools} 
      />

      {/* Main Content Area */}
      <div className="relative flex-1 flex flex-col justify-center">
        {activeTab === 'home' ? (
          <HomeView onSelectTool={setActiveTab} />
        ) : activeTab === 'unit' ? (
          <UnitConverter />
        ) : activeTab === 'currency' ? (
          <CurrencyConverter />
        ) : activeTab === 'era' ? (
          <EraConverter />
        ) : (
          <AgeCalculator />
        )}
      </div>
    </div>
  );
}
