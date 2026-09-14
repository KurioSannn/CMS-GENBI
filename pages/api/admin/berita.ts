import type { NextApiRequest, NextApiResponse } from 'next';
import articleController from '@/lib/controllers/article.controller';
import { getAuthUser } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = getAuthUser(req);
  if (!user && req.method !== 'GET') {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  try {
    if (req.method === 'GET') {
      const { slug, id, status } = req.query;
      if (slug) {
        const article = await articleController.getBySlug(String(slug));
        return res.status(200).json({ success: true, data: article });
      }
      if (id) {
        const article = await articleController.getById(Number(id));
        return res.status(200).json({ success: true, data: article });
      }
      const articles = await articleController.getAll(status as any);
      return res.status(200).json({ success: true, data: articles });
    }

    if (req.method === 'POST') {
      const article = await articleController.create(req.body, user);
      return res.status(201).json({ success: true, data: article });
    }

    if (req.method === 'PUT') {
      const { id, ...updates } = req.body;
      const updated = await articleController.update(Number(id), updates, user);
      return res.status(200).json({ success: true, data: updated });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      await articleController.delete(Number(id), user);
      return res.status(200).json({ success: true, message: 'Berita berhasil dihapus' });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
