import type { NextApiRequest, NextApiResponse } from 'next';
import bphController from '@/lib/controllers/bph.controller';
import { getAuthUser } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = getAuthUser(req);
  if (!user && req.method !== 'GET') {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  try {
    if (req.method === 'GET') {
      const members = await bphController.getAll();
      return res.status(200).json({ success: true, data: members });
    }

    if (req.method === 'POST') {
      const member = await bphController.create(req.body, user);
      return res.status(201).json({ success: true, data: member });
    }

    if (req.method === 'PUT') {
      const { id, ...updates } = req.body;
      const updated = await bphController.update(Number(id), updates, user);
      return res.status(200).json({ success: true, data: updated });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      await bphController.delete(Number(id), user);
      return res.status(200).json({ success: true, message: 'Pengurus berhasil dihapus' });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
