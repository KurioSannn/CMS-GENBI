import type { NextApiRequest, NextApiResponse } from 'next';
import categoryController from '@/lib/controllers/category.controller';
import { parsePositiveId, requireAdminUser } from '@/lib/auth';
import { getErrorMessage } from '@/lib/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = requireAdminUser(req, res);
  if (!user) return;

  try {
    if (req.method === 'GET') {
      const { type, id } = req.query;
      if (id !== undefined) {
        const parsedId = parsePositiveId(id);
        if (!parsedId) {
          return res.status(400).json({ success: false, message: 'ID kategori tidak valid' });
        }
        const category = await categoryController.getById(parsedId);
        return res.status(200).json({ success: true, data: category });
      }
      const categories = await categoryController.getAll(type ? String(type) : undefined);
      return res.status(200).json({ success: true, data: categories });
    }

    if (req.method === 'POST') {
      const category = await categoryController.create(req.body, user);
      return res.status(201).json({ success: true, data: category });
    }

    if (req.method === 'PUT') {
      const { id, ...updates } = req.body || {};
      const parsedId = parsePositiveId(id);
      if (!parsedId) {
        return res.status(400).json({ success: false, message: 'ID kategori tidak valid' });
      }
      const updated = await categoryController.update(parsedId, updates, user);
      return res.status(200).json({ success: true, data: updated });
    }

    if (req.method === 'DELETE') {
      const parsedId = parsePositiveId(req.query.id);
      if (!parsedId) {
        return res.status(400).json({ success: false, message: 'ID kategori tidak valid' });
      }
      await categoryController.delete(parsedId, user);
      return res.status(200).json({ success: true, message: 'Kategori berhasil dihapus' });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error: unknown) {
    return res.status(500).json({ success: false, message: getErrorMessage(error) });
  }
}
