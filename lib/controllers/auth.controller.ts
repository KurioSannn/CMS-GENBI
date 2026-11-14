import type { NextApiRequest, NextApiResponse } from 'next';
import db from '@/lib/db';
import {
  comparePassword,
  generateToken,
  hashPassword,
  setAuthCookie,
  clearAuthCookie,
  getAuthUser,
  type AdminPayload,
} from '@/lib/auth';
import { getClientIp, getRateLimitStatus, recordFailure, resetFailures } from '@/lib/rate-limit';

// Batas percobaan login gagal: per kombinasi IP+username, serta total per IP.
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES_PER_USER = 5;
const MAX_FAILURES_PER_IP = 20;

// Kebijakan ganti password
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_BYTES = 72;
const MAX_PASSWORD_CHANGE_FAILURES = 5;

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

  async changePassword(req: NextApiRequest, res: NextApiResponse, user: AdminPayload) {
    const { currentPassword, newPassword } = req.body || {};

    if (typeof currentPassword !== 'string' || typeof newPassword !== 'string' || !currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Password lama dan password baru wajib diisi' });
    }

    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      return res
        .status(400)
        .json({ success: false, message: `Password baru minimal ${MIN_PASSWORD_LENGTH} karakter` });
    }

    // bcrypt hanya memproses 72 byte pertama; tolak agar tidak ada password yang terpotong diam-diam
    if (Buffer.byteLength(newPassword, 'utf8') > MAX_PASSWORD_BYTES) {
      return res
        .status(400)
        .json({ success: false, message: `Password baru maksimal ${MAX_PASSWORD_BYTES} byte` });
    }

    if (newPassword === currentPassword) {
      return res.status(400).json({ success: false, message: 'Password baru harus berbeda dari password lama' });
    }

    const limitKey = `pwchange:${user.id}`;
    const limit = getRateLimitStatus(limitKey, MAX_PASSWORD_CHANGE_FAILURES);
    if (limit.blocked) {
      res.setHeader('Retry-After', String(limit.retryAfterSeconds));
      return res.status(429).json({
        success: false,
        message: `Terlalu banyak percobaan gagal. Coba lagi dalam ${Math.ceil(limit.retryAfterSeconds / 60)} menit.`,
      });
    }

    const admin = await db.adminUser.findUnique({ id: user.id });
    if (!admin || !comparePassword(currentPassword, admin.passwordHash)) {
      recordFailure(limitKey, LOGIN_WINDOW_MS);
      return res.status(400).json({ success: false, message: 'Password lama tidak sesuai' });
    }

    const updated = await db.adminUser.updatePassword(admin.id, hashPassword(newPassword));
    if (!updated) {
      return res.status(500).json({ success: false, message: 'Gagal menyimpan password baru' });
    }
    resetFailures(limitKey);

    try {
      await db.activityLog.create({
        adminId: admin.id,
        adminName: admin.name,
        action: 'UPDATE_PASSWORD',
        description: `Admin ${admin.name} mengubah password akunnya`,
        ipAddress: getClientIp(req),
      });
    } catch {
      // Activity log failure should not block password change
    }

    return res.status(200).json({ success: true, message: 'Password berhasil diubah' });
  },
};

export default authController;
