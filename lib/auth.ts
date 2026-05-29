import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

/**
 * Single-admin authentication.
 *
 * Required env vars (set in .env.local for dev, in production env for deployment):
 *   ADMIN_USERNAME        — e.g. "admin"
 *   ADMIN_PASSWORD_HASH   — bcrypt hash of the password (generate via scripts/hash-password.ts)
 *   NEXTAUTH_SECRET       — random 32+ char string for JWT signing
 *   NEXTAUTH_URL          — https://rauco.ru (in production)
 */
export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/admin/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Admin',
      credentials: {
        username: { label: 'Логин', type: 'text' },
        password: { label: 'Пароль', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) return null;

        const expectedUsername = process.env.ADMIN_USERNAME;
        const expectedHash = process.env.ADMIN_PASSWORD_HASH;
        if (!expectedUsername || !expectedHash) {
          console.error('[auth] ADMIN_USERNAME or ADMIN_PASSWORD_HASH not set');
          return null;
        }

        if (credentials.username !== expectedUsername) return null;

        const ok = await bcrypt.compare(credentials.password, expectedHash);
        if (!ok) return null;

        return { id: 'admin', name: expectedUsername, email: null };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = 'admin';
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as { role?: string }).role = token.role as string | undefined;
      return session;
    },
  },
};
