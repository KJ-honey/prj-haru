import Dashboard from '@/components/Dashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UtilityHub - 다목적 유틸리티 모음',
  description: '단위 환산 및 QR 코드 생성을 지원하는 모던 웹 유틸리티 대시보드',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-indigo-950 p-4 md:p-8 lg:p-12 transition-colors duration-500 font-sans">
      <div className="max-w-4xl mx-auto pt-10 md:pt-20">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-pink-500 shadow-lg shadow-indigo-500/20 text-white transform hover:scale-110 transition-transform duration-300">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2"/>
              <polyline points="2 17 12 22 22 17"/>
              <polyline points="2 12 12 17 22 12"/>
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
            Utility<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">Hub</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">단위 계산부터 QR 코드 생성까지, 간편한 도구 모음</p>
        </header>

        <Dashboard />
        
        <footer className="mt-20 text-center text-sm text-gray-500 dark:text-gray-500">
          <p>© {new Date().getFullYear()} UtilityHub. Crafted with Next.js & Tailwind CSS.</p>
        </footer>
      </div>
    </main>
  );
}
