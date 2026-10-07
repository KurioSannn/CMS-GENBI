import type { NextApiRequest, NextApiResponse } from 'next';
import { readDatabase } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const db = await readDatabase();

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `genbihub_backup_${timestamp}.json`;

    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/json');

    return res.status(200).send(JSON.stringify(db, null, 2));
  } catch (error: any) {
    console.error('Backup Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal membuat backup database',
      error: error?.message,
    });
  }
}
