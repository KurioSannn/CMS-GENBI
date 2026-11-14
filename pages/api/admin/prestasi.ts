import type { NextApiRequest, NextApiResponse } from 'next';
import achievementController from '@/lib/controllers/achievement.controller';
import { parsePositiveId, requireAdminUser } from '@/lib/auth';
import { getErrorMessage } from '@/lib/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = requireAdminUser(req, res);
  if (!user) return;

  try {
    if (req.method === 'GET') {
      const achievements = await achievementController.getAll();
      return res.status(200).json({ success: true, data: achievements });
    }

    if (req.method === 'POST') {
      const achievement = await achievementController.create(req.body, user);
      return res.status(201).json({ success: true, data: achievement });
    }

    if (req.method === 'PUT') {
      const { id, ...updates } = req.body || {};
      const parsedId = parsePositiveId(id);
      if (!parsedId) {
        return res.status(400).json({ success: false, message: 'ID prestasi tidak valid' });
      }
      const updated = await achievementController.update(parsedId, updates, user);
      return res.status(200).json({ success: true, data: updated });
    }

    if (req.method === 'DELETE') {
      const parsedId = parsePositiveId(req.query.id);
      if (!parsedId) {
        return res.status(400).json({ success: false, message: 'ID prestasi tidak valid' });
      }
      await achievementController.delete(parsedId, user);
      return res.status(200).json({ success: true, message: 'Prestasi berhasil dihapus' });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error: unknown) {
    return res.status(500).json({ success: false, message: getErrorMessage(error) });
  }
}
