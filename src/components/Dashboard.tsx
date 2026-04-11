"use client";

import { useState } from 'react';
import UnitConverter from './UnitConverter';
import QRCodeGenerator from './QRCodeGenerator';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'unit' | 'qr'>('unit');

  return (
    <div className="w-full">
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-white/50 dark:bg-gray-900/50 backdrop-blur-md p-1.5 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50">
          <button
            onClick={() => setActiveTab('unit')}
            className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
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
            단위 환산기
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'qr' 
                ? 'bg-white dark:bg-gray-800 text-pink-600 dark:text-pink-400 shadow-md transform scale-[1.02]' 
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-800/50'
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <rect x="7" y="7" width="3" height="3"/>
              <rect x="14" y="7" width="3" height="3"/>
              <rect x="7" y="14" width="3" height="3"/>
              <rect x="14" y="14" width="3" height="3"/>
            </svg>
            QR 코드 생성기
          </button>
        </div>
      </div>

      <div className="relative">
        {activeTab === 'unit' ? <UnitConverter /> : <QRCodeGenerator />}
      </div>
    </div>
  );
}
