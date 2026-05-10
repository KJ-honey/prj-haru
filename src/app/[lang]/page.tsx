import Dashboard from '@/components/layout/Dashboard';
import { getDictionary } from '@/i18n/getDictionary';

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang as 'en' | 'kr' | 'jp');

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-pink-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-indigo-950 p-4 md:p-8 lg:p-12 transition-colors duration-500 font-sans">
      <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col pt-4 md:pt-8">
        <Dashboard />
        
        <footer className="mt-auto pt-16 pb-4 text-center text-sm text-gray-500 dark:text-gray-500">
          <p>{dict.dashboard.footer.replace('{year}', new Date().getFullYear().toString())}</p>
        </footer>
      </div>
    </main>
  );
}
