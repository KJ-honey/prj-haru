import Dashboard from '@/components/layout/Dashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UtilityHub - 다목적 유틸리티 모음',
  description: '단위 환산 및 QR 코드 생성을 지원하는 모던 웹 유틸리티 대시보드',
};

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-pink-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-indigo-950 p-4 md:p-8 lg:p-12 transition-colors duration-500 font-sans">
      <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col pt-4 md:pt-8">
        <Dashboard />
        
        <footer className="mt-auto pt-16 pb-4 text-center text-sm text-gray-500 dark:text-gray-500">
          <p>© {new Date().getFullYear()} UtilityHub. Crafted with Next.js & Tailwind CSS.</p>
        </footer>
      </div>
    </main>
  );
}
