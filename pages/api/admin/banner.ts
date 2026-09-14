import type { NextApiRequest, NextApiResponse } from 'next';
import bannerController from '@/lib/controllers/banner.controller';
import { getAuthUser } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = getAuthUser(req);
  if (!user && req.method !== 'GET') {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  try {
    if (req.method === 'GET') {
      const banners = await bannerController.getAll();
      return res.status(200).json({ success: true, data: banners });
    }

    if (req.method === 'POST') {
      const banner = await bannerController.create(req.body, user);
      return res.status(201).json({ success: true, data: banner });
    }

    if (req.method === 'PUT') {
      const { id, ...updates } = req.body;
      const updated = await bannerController.update(Number(id), updates, user);
      return res.status(200).json({ success: true, data: updated });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      await bannerController.delete(Number(id), user);
      return res.status(200).json({ success: true, message: 'Banner berhasil dihapus' });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
