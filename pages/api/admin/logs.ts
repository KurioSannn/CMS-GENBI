import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuthUser } from '@/lib/auth';
import { readDb } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = getAuthUser(req);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const dbData = readDb();
    const allLogs = [...(dbData.activityLogs || [])].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const nowMs = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;

    const stats = {
      total: allLogs.length,
      todayCount: allLogs.filter((l) => nowMs - new Date(l.createdAt).getTime() <= dayMs).length,
      createCount: allLogs.filter((l) => (l.action || '').toUpperCase().includes('CREATE')).length,
      updateCount: allLogs.filter((l) => (l.action || '').toUpperCase().includes('UPDATE')).length,
      deleteCount: allLogs.filter((l) => (l.action || '').toUpperCase().includes('DELETE')).length,
    };

    const actionFilter = String(req.query.action || 'ALL').toUpperCase();
    const searchQuery = String(req.query.search || '').trim().toLowerCase();
    const limit = Math.min(Math.max(Number(req.query.limit) || 100, 1), 500);

    const filtered = allLogs.filter((item) => {
      if (actionFilter !== 'ALL' && !(item.action || '').toUpperCase().includes(actionFilter)) {
        return false;
      }
      if (searchQuery) {
        const hay = `${item.adminName || ''} ${item.action || ''} ${item.description || ''}`.toLowerCase();
        if (!hay.includes(searchQuery)) return false;
      }
      return true;
    });

    return res.status(200).json({
      success: true,
      data: {
        logs: filtered.slice(0, limit),
        stats,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || 'Gagal memuat log aktivitas admin',
    });
  }
}
