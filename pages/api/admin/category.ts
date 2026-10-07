import type { NextApiRequest, NextApiResponse } from 'next';
import categoryController from '@/lib/controllers/category.controller';
import { getAuthUser } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = getAuthUser(req);
  if (!user && req.method !== 'GET') {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  try {
    if (req.method === 'GET') {
      const { type, id } = req.query;
      if (id) {
        const category = await categoryController.getById(Number(id));
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
      const { id, ...updates } = req.body;
      const updated = await categoryController.update(Number(id), updates, user);
      return res.status(200).json({ success: true, data: updated });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      await categoryController.delete(Number(id), user);
      return res.status(200).json({ success: true, message: 'Kategori berhasil dihapus' });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
