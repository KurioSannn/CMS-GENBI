import type { NextApiRequest, NextApiResponse } from 'next';
import articleController from '@/lib/controllers/article.controller';
import { parsePositiveId, requireAdminUser } from '@/lib/auth';
import { getErrorMessage } from '@/lib/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = requireAdminUser(req, res);
  if (!user) return;

  try {
    if (req.method === 'GET') {
      const { slug, id, status } = req.query;
      if (slug) {
        const article = await articleController.getBySlug(String(slug));
        return res.status(200).json({ success: true, data: article });
      }
      if (id !== undefined) {
        const parsedId = parsePositiveId(id);
        if (!parsedId) {
          return res.status(400).json({ success: false, message: 'ID berita tidak valid' });
        }
        const article = await articleController.getById(parsedId);
        return res.status(200).json({ success: true, data: article });
      }
      const normalizedStatus = status === 'DRAFT' || status === 'PUBLISHED' ? status : undefined;
      const articles = await articleController.getAll(normalizedStatus);
      return res.status(200).json({ success: true, data: articles });
    }

    if (req.method === 'POST') {
      const article = await articleController.create(req.body, user);
      return res.status(201).json({ success: true, data: article });
    }

    if (req.method === 'PUT') {
      const { id, ...updates } = req.body || {};
      const parsedId = parsePositiveId(id);
      if (!parsedId) {
        return res.status(400).json({ success: false, message: 'ID berita tidak valid' });
      }
      const updated = await articleController.update(parsedId, updates, user);
      return res.status(200).json({ success: true, data: updated });
    }

    if (req.method === 'DELETE') {
      const parsedId = parsePositiveId(req.query.id);
      if (!parsedId) {
        return res.status(400).json({ success: false, message: 'ID berita tidak valid' });
      }
      await articleController.delete(parsedId, user);
      return res.status(200).json({ success: true, message: 'Berita berhasil dihapus' });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error: unknown) {
    return res.status(500).json({ success: false, message: getErrorMessage(error) });
  }
}
