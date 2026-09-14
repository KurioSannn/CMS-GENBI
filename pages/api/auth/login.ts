import type { NextApiRequest, NextApiResponse } from 'next';
import authController from '@/lib/controllers/auth.controller';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    return await authController.login(req, res);
  } catch (error: any) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server' });
  }
}
