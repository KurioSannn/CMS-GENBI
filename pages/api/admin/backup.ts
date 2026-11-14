import type { NextApiRequest, NextApiResponse } from 'next';
import { readDatabase } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { getErrorMessage } from '@/lib/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = getAuthUser(req);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const db = await readDatabase();
    const sanitizedDb = {
      ...db,
      adminUsers: (db.adminUsers || []).map((adminUser) => {
        const safeUser: Partial<typeof adminUser> = { ...adminUser };
        delete safeUser.passwordHash;
        return safeUser;
      }),
    };

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `genbihub_backup_${timestamp}.json`;

    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/json');

    return res.status(200).send(JSON.stringify(sanitizedDb, null, 2));
  } catch (error: unknown) {
    console.error('Backup Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Gagal membuat backup database',
      error: getErrorMessage(error),
    });
  }
}
