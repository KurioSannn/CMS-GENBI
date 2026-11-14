import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const COOKIE_NAME = 'genbi_admin_token';

function decodeBase64UrlToBytes(b64url: string): Uint8Array<ArrayBuffer> {
  const padded = b64url.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (b64url.length % 4)) % 4);
  const binary = atob(padded);
  const buffer = new ArrayBuffer(binary.length);
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function isValidAdminJwt(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;

    const [headerB64, payloadB64, sigB64] = parts;
    const decoder = new TextDecoder();
    const header = JSON.parse(decoder.decode(decodeBase64UrlToBytes(headerB64)));
    if (header?.alg !== 'HS256') return false;

    const secret = process.env.SESSION_SECRET || 'genbi-default-jwt-secret-2026';
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const verified = await crypto.subtle.verify(
      'HMAC',
      key,
      decodeBase64UrlToBytes(sigB64),
      encoder.encode(`${headerB64}.${payloadB64}`)
    );
    if (!verified) return false;

    const payload = JSON.parse(decoder.decode(decodeBase64UrlToBytes(payloadB64)));
    if (typeof payload?.exp === 'number' && Date.now() >= payload.exp * 1000) {
      return false;
    }

    return Boolean(payload?.id && payload?.username);
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const validSession = await isValidAdminJwt(token);

  // 1. Proteksi seluruh rute /admin/* (Kecuali /admin/login)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!validSession) {
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('redirect', pathname);
      const res = NextResponse.redirect(loginUrl);
      if (token) {
        res.cookies.set(COOKIE_NAME, '', { path: '/', maxAge: 0 });
      }
      return res;
    }
  }

  // 2. Jika admin sudah terautentikasi valid dan mengakses /admin/login, arahkan ke /admin
  if (pathname === '/admin/login') {
    if (validSession) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }
    if (token) {
      const res = NextResponse.next();
      res.cookies.set(COOKIE_NAME, '', { path: '/', maxAge: 0 });
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
