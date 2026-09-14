import type { NextApiRequest, NextApiResponse } from 'next';
import divisionController from '@/lib/controllers/division.controller';
import { getAuthUser } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = getAuthUser(req);
  if (!user && req.method !== 'GET') {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  try {
    if (req.method === 'GET') {
      const { id, slug } = req.query;
      if (id) {
        const division = await divisionController.getById(Number(id));
        return res.status(200).json({ success: true, data: division });
      }
      if (slug) {
        const division = await divisionController.getBySlug(String(slug));
        return res.status(200).json({ success: true, data: division });
      }
      const divisions = await divisionController.getAll();
      return res.status(200).json({ success: true, data: divisions });
    }

    if (req.method === 'POST') {
      const { action } = req.query;

      if (action === 'add-member') {
        const member = await divisionController.addMember(Number(req.body.divisionId), req.body, user);
        return res.status(201).json({ success: true, data: member });
      }

      const division = await divisionController.create(req.body, user);
      return res.status(201).json({ success: true, data: division });
    }

    if (req.method === 'PUT') {
      const { action } = req.query;

      if (action === 'update-member') {
        const { id, ...updates } = req.body;
        const updated = await divisionController.updateMember(Number(id), updates, user);
        return res.status(200).json({ success: true, data: updated });
      }

      const { id, ...updates } = req.body;
      const updated = await divisionController.update(Number(id), updates, user);
      return res.status(200).json({ success: true, data: updated });
    }

    if (req.method === 'DELETE') {
      const { action, id } = req.query;

      if (action === 'delete-member') {
        await divisionController.deleteMember(Number(id), user);
        return res.status(200).json({ success: true, message: 'Anggota divisi berhasil dihapus' });
      }

      await divisionController.delete(Number(id), user);
      return res.status(200).json({ success: true, message: 'Divisi berhasil dihapus' });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
