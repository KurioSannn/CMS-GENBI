import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';

const JWT_SECRET = process.env.SESSION_SECRET || 'genbi-default-jwt-secret-2026';
export const AUTH_COOKIE_NAME = 'genbi_admin_token';

export interface AdminPayload {
  id: number;
  username: string;
  name: string;
  role: string;
}

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

export function comparePassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

export function generateToken(payload: AdminPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): AdminPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminPayload;
  } catch {
    return null;
  }
}

export function isSecureRequest(req?: NextApiRequest): boolean {
  if (!req) {
    return process.env.NODE_ENV === 'production';
  }
  const forwardedProto = req.headers['x-forwarded-proto'];
  if (typeof forwardedProto === 'string') {
    return forwardedProto.split(',')[0].trim().toLowerCase() === 'https';
  }
  return Boolean((req.socket as { encrypted?: boolean } | undefined)?.encrypted);
}

export function setAuthCookie(res: NextApiResponse, token: string, req?: NextApiRequest) {
  const secureFlag = isSecureRequest(req) ? '; Secure' : '';
  const cookie = `${AUTH_COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}${secureFlag}`;
  res.setHeader('Set-Cookie', cookie);
}

export function clearAuthCookie(res: NextApiResponse, req?: NextApiRequest) {
  const secureFlag = isSecureRequest(req) ? '; Secure' : '';
  res.setHeader(
    'Set-Cookie',
    `${AUTH_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT${secureFlag}`
  );
}

export function getAuthUser(req: NextApiRequest): AdminPayload | null {
  const cookies = req.headers.cookie;
  if (!cookies) return null;

  const match = cookies
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${AUTH_COOKIE_NAME}=`));

  if (!match) return null;

  const token = match.substring(AUTH_COOKIE_NAME.length + 1);
  return verifyToken(token);
}

export function requireAdminUser(req: NextApiRequest, res: NextApiResponse): AdminPayload | null {
  const user = getAuthUser(req);
  if (!user) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
    return null;
  }
  return user;
}

export function parsePositiveId(value: unknown): number | null {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === undefined || raw === null || raw === '') return null;
  const parsed = Number(raw);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}
