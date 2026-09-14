import type { NextApiRequest, NextApiResponse } from 'next';
import documentController from '@/lib/controllers/document.controller';
import { getAuthUser } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = getAuthUser(req);
  if (!user && req.method !== 'GET') {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

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
      const { id } = req.query;
      await documentController.delete(Number(id), user);
      return res.status(200).json({ success: true, message: 'Dokumen berhasil dihapus' });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
