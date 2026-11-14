import type { NextApiRequest, NextApiResponse } from 'next';
import authController from '@/lib/controllers/auth.controller';
import { requireAdminUser } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const user = requireAdminUser(req, res);
  if (!user) return;

  try {
    return await authController.changePassword(req, res, user);
  } catch (error: unknown) {
    console.error('Change password error:', error);
    return res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server' });
  }
}
