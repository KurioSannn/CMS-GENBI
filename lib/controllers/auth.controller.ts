import type { NextApiRequest, NextApiResponse } from 'next';
import db from '@/lib/db';
import { comparePassword, generateToken, setAuthCookie, clearAuthCookie, getAuthUser } from '@/lib/auth';
import { getClientIp, getRateLimitStatus, recordFailure, resetFailures } from '@/lib/rate-limit';

// Batas percobaan login gagal: per kombinasi IP+username, serta total per IP.
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES_PER_USER = 5;
const MAX_FAILURES_PER_IP = 20;

export const authController = {
  async login(req: NextApiRequest, res: NextApiResponse) {
    const { username, password } = req.body || {};

    if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ success: false, message: 'Username dan password wajib diisi' });
    }

    const ip = getClientIp(req);
    const userKey = `login:user:${ip}|${username.trim().toLowerCase()}`;
    const ipKey = `login:ip:${ip}`;

    const userStatus = getRateLimitStatus(userKey, MAX_FAILURES_PER_USER);
    const ipStatus = getRateLimitStatus(ipKey, MAX_FAILURES_PER_IP);
    if (userStatus.blocked || ipStatus.blocked) {
      const retryAfter = Math.max(userStatus.retryAfterSeconds, ipStatus.retryAfterSeconds);
      res.setHeader('Retry-After', String(retryAfter));
      return res.status(429).json({
        success: false,
        message: `Terlalu banyak percobaan login gagal. Coba lagi dalam ${Math.ceil(retryAfter / 60)} menit.`,
      });
    }

    const admin = await db.adminUser.findUnique({
      username: username.trim(),
    });

    if (!admin || !comparePassword(password, admin.passwordHash)) {
      recordFailure(userKey, LOGIN_WINDOW_MS);
      recordFailure(ipKey, LOGIN_WINDOW_MS);
      return res.status(401).json({ success: false, message: 'Username atau password salah' });
    }

    resetFailures(userKey);

    const payload = {
      id: admin.id,
      username: admin.username,
      name: admin.name,
      role: admin.role,
    };

    const token = generateToken(payload);
    setAuthCookie(res, token, req);

    // Activity Log
    try {
      await db.activityLog.create({
        adminId: admin.id,
        adminName: admin.name,
        action: 'LOGIN',
        description: `Admin ${admin.name} berhasil login ke dashboard`,
        ipAddress: ip,
      });
    } catch {
      // Activity log failure should not block login
    }

    return res.status(200).json({
      success: true,
      message: 'Login berhasil',
      user: payload,
    });
  },

  logout(res: NextApiResponse, req?: NextApiRequest) {
    clearAuthCookie(res, req);
    return res.status(200).json({ success: true, message: 'Logout berhasil' });
  },

  me(req: NextApiRequest, res: NextApiResponse) {
    const user = getAuthUser(req);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Belum login' });
    }
    return res.status(200).json({ success: true, user });
  },
};

export default authController;
