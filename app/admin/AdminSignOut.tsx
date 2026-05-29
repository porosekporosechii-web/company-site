'use client';

import { signOut } from 'next-auth/react';

export function AdminSignOut() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/admin/login' })}
      className="text-muted hover:text-accent transition-colors uppercase tracking-wide"
    >
      Выйти
    </button>
  );
}
