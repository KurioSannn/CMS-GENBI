import type { NextApiRequest, NextApiResponse } from 'next';
import db from '@/lib/db';
import { comparePassword, generateToken, setAuthCookie, clearAuthCookie, getAuthUser } from '@/lib/auth';

export const authController = {
  async login(req: NextApiRequest, res: NextApiResponse) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username dan password wajib diisi' });
    }

    const admin = await db.adminUser.findUnique({
      username: username.trim(),
    });

    if (!admin || !comparePassword(password, admin.passwordHash)) {
      return res.status(401).json({ success: false, message: 'Username atau password salah' });
    }

    const payload = {
      id: admin.id,
      username: admin.username,
      name: admin.name,
      role: admin.role,
    };

    const token = generateToken(payload);
    setAuthCookie(res, token);

    // Activity Log
    try {
      await db.activityLog.create({
        adminId: admin.id,
        adminName: admin.name,
        action: 'LOGIN',
        description: `Admin ${admin.name} berhasil login ke dashboard`,
        ipAddress: (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1',
      });
    } catch (e) {}

    return res.status(200).json({
      success: true,
      message: 'Login berhasil',
      user: payload,
    });
  },

  logout(res: NextApiResponse) {
    clearAuthCookie(res);
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
