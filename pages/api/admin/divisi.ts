import type { NextApiRequest, NextApiResponse } from 'next';
import divisionController from '@/lib/controllers/division.controller';
import { parsePositiveId, requireAdminUser } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = requireAdminUser(req, res);
  if (!user) return;

  try {
    if (req.method === 'GET') {
      const { id, slug } = req.query;
      if (id !== undefined) {
        const parsedId = parsePositiveId(id);
        if (!parsedId) {
          return res.status(400).json({ success: false, message: 'ID divisi tidak valid' });
        }
        const division = await divisionController.getById(parsedId);
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
        const parsedDivisionId = parsePositiveId(req.body?.divisionId);
        if (!parsedDivisionId) {
          return res.status(400).json({ success: false, message: 'ID divisi tidak valid' });
        }
        const member = await divisionController.addMember(parsedDivisionId, req.body, user);
        return res.status(201).json({ success: true, data: member });
      }

      const division = await divisionController.create(req.body, user);
      return res.status(201).json({ success: true, data: division });
    }

    if (req.method === 'PUT') {
      const { action } = req.query;
      const { id, ...updates } = req.body || {};
      const parsedId = parsePositiveId(id);
      if (!parsedId) {
        return res.status(400).json({
          success: false,
          message: action === 'update-member' ? 'ID anggota tidak valid' : 'ID divisi tidak valid',
        });
      }

      if (action === 'update-member') {
        const updated = await divisionController.updateMember(parsedId, updates, user);
        return res.status(200).json({ success: true, data: updated });
      }

      const updated = await divisionController.update(parsedId, updates, user);
      return res.status(200).json({ success: true, data: updated });
    }

    if (req.method === 'DELETE') {
      const { action, id } = req.query;
      const parsedId = parsePositiveId(id);
      if (!parsedId) {
        return res.status(400).json({
          success: false,
          message: action === 'delete-member' ? 'ID anggota tidak valid' : 'ID divisi tidak valid',
        });
      }

      if (action === 'delete-member') {
        await divisionController.deleteMember(parsedId, user);
        return res.status(200).json({ success: true, message: 'Anggota divisi berhasil dihapus' });
      }

      await divisionController.delete(parsedId, user);
      return res.status(200).json({ success: true, message: 'Divisi berhasil dihapus' });
    }

    return res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
