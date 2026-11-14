import type { NextApiRequest, NextApiResponse } from 'next';
import documentController from '@/lib/controllers/document.controller';
import { parsePositiveId, requireAdminUser } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = requireAdminUser(req, res);
  if (!user) return;

  try {
    if (req.method === 'GET') {
      const documents = await documentController.getAll();
      return res.status(200).json({ success: true, data: documents });
    }

    if (req.method === 'POST') {
      const doc = await documentController.create(req.body, user);
      return res.status(201).json({ success: true, data: doc });
    }

    if (req.method === 'DELETE') {
      const parsedId = parsePositiveId(req.query.id);
      if (!parsedId) {
        return res.status(400).json({ success: false, message: 'ID dokumen tidak valid' });
      }
      await documentController.delete(parsedId, user);
      return res.status(200).json({ success: true, message: 'Dokumen berhasil dihapus' });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
