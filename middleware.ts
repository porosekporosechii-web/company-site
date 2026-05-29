import { NextResponse, type NextRequest } from 'next/server';

// Temporarily a no-op: next-auth v4 subpath exports (`next-auth/middleware`,
// `next-auth/jwt`) don't resolve under Next 16 Turbopack and 500-d the whole site.
// /admin/* is still protected at the page level by getServerSession() in
// app/admin/layout.tsx. Re-enable real protection here after migrating to
// next-auth v5 (Auth.js) or once the v4 subpath resolution is fixed.
export function middleware(_req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/((?!login).*)'],
};
