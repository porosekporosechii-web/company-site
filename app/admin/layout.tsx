import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';
import { AdminSignOut } from './AdminSignOut';
import { AdminNav } from './_components/AdminNav';

export const metadata: Metadata = {
  title: 'Админ-панель',
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-surface dark:bg-graphite text-graphite dark:text-snow">
      {/* Top bar */}
      {session && (
        <header className="border-b border-graphite/[0.08] dark:border-white/[0.08] bg-snow dark:bg-surface-dark">
          <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <Link href="/admin" className="font-bold tracking-tight text-sm">
                RAUCO <span className="text-muted font-normal">/ admin</span>
              </Link>
              <Link href="/" target="_blank" className="text-xs text-muted hover:text-accent transition-colors">
                ↗ Сайт
              </Link>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted">
              <span>{session.user?.name}</span>
              <AdminSignOut />
            </div>
          </div>
        </header>
      )}

      {/* Body — sidebar + content */}
      {session ? (
        <div className="max-w-[1400px] mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6">
          <AdminNav />
          <main>{children}</main>
        </div>
      ) : (
        // Login page renders without nav
        <main>{children}</main>
      )}
    </div>
  );
}
