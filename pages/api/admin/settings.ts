import type { NextApiRequest, NextApiResponse } from 'next';
import settingsController from '@/lib/controllers/settings.controller';
import { getAuthUser } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = getAuthUser(req);
  if (!user && req.method !== 'GET') {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  try {
    if (req.method === 'GET') {
      const settings = await settingsController.get();
      return res.status(200).json({ success: true, data: settings });
    }

    if (req.method === 'PUT') {
      const updated = await settingsController.update(req.body || {}, user);
      return res.status(200).json({ success: true, data: updated });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || 'Gagal memproses pengaturan landing page',
    });
  }
}
