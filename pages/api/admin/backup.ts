import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const dbPath = path.join(process.cwd(), 'data', 'genbihub.db.json');
    if (!fs.existsSync(dbPath)) {
      return res.status(404).json({ success: false, message: 'Database file not found' });
    }

    const raw = fs.readFileSync(dbPath, 'utf-8');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `genbihub_backup_${timestamp}.json`;

    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/json');

    return res.status(200).send(raw);
  } catch (error: any) {
    console.error('Backup Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal membuat backup database',
      error: error?.message,
    });
  }
}
