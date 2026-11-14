import type { NextApiRequest, NextApiResponse } from 'next';
import bannerController from '@/lib/controllers/banner.controller';
import { parsePositiveId, requireAdminUser } from '@/lib/auth';
import { getErrorMessage } from '@/lib/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = requireAdminUser(req, res);
  if (!user) return;

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
      const { id, ...updates } = req.body || {};
      const parsedId = parsePositiveId(id);
      if (!parsedId) {
        return res.status(400).json({ success: false, message: 'ID banner tidak valid' });
      }
      const updated = await bannerController.update(parsedId, updates, user);
      return res.status(200).json({ success: true, data: updated });
    }

    if (req.method === 'DELETE') {
      const parsedId = parsePositiveId(req.query.id);
      if (!parsedId) {
        return res.status(400).json({ success: false, message: 'ID banner tidak valid' });
      }
      await bannerController.delete(parsedId, user);
      return res.status(200).json({ success: true, message: 'Banner berhasil dihapus' });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error: unknown) {
    return res.status(500).json({ success: false, message: getErrorMessage(error) });
  }
}
