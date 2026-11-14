import type { NextApiRequest, NextApiResponse } from 'next';
import bphController from '@/lib/controllers/bph.controller';
import { parsePositiveId, requireAdminUser } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = requireAdminUser(req, res);
  if (!user) return;

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
      const { id, ...updates } = req.body || {};
      const parsedId = parsePositiveId(id);
      if (!parsedId) {
        return res.status(400).json({ success: false, message: 'ID pengurus tidak valid' });
      }
      const updated = await bphController.update(parsedId, updates, user);
      return res.status(200).json({ success: true, data: updated });
    }

    if (req.method === 'DELETE') {
      const parsedId = parsePositiveId(req.query.id);
      if (!parsedId) {
        return res.status(400).json({ success: false, message: 'ID pengurus tidak valid' });
      }
      await bphController.delete(parsedId, user);
      return res.status(200).json({ success: true, message: 'Pengurus berhasil dihapus' });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
