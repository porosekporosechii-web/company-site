'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get('callbackUrl') ?? '/admin';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);

    const res = await signIn('credentials', {
      username,
      password,
      redirect: false,
      callbackUrl,
    });
    setBusy(false);

    if (res?.error) {
      setError('Неверный логин или пароль');
      return;
    }
    if (res?.ok) router.push(callbackUrl);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <div className="text-xs font-bold tracking-[0.3em] uppercase text-accent mb-2">RAUCO</div>
          <h1 className="text-2xl font-bold tracking-tight">Вход в админ-панель</h1>
          <p className="text-sm text-muted mt-2">Доступ только для администратора сайта</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-muted mb-2">
              Логин
            </label>
            <input
              type="text"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-snow dark:bg-surface-dark border border-graphite/15 dark:border-white/10 text-graphite dark:text-snow focus:outline-none focus:border-accent text-sm"
            />
          </div>
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-muted mb-2">
              Пароль
            </label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-snow dark:bg-surface-dark border border-graphite/15 dark:border-white/10 text-graphite dark:text-snow focus:outline-none focus:border-accent text-sm"
            />
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={busy}
            className="w-full py-3 bg-accent hover:bg-led disabled:opacity-50 text-snow font-semibold text-sm tracking-wide transition-colors"
          >
            {busy ? 'Проверка…' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
}
