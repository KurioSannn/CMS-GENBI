import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('genbi_admin_token')?.value;

  // 1. Proteksi seluruh rute /admin/* (Kecuali /admin/login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!token) {
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Jika admin sudah login dan mengakses /admin/login, otomatis lempar ke dashboard /admin
  if (pathname === '/admin/login' && token) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  return NextResponse.next();
}

// Hanya jalankan middleware pada rute admin
export const config = {
  matcher: ['/admin/:path*'],
};
