import db from '@/lib/db';
import { AdminPayload } from '@/lib/auth';

export const achievementController = {
  async getAll() {
    return await db.achievement.findMany();
  },

  async create(data: {
    title: string;
    recipient?: string;
    competition: string;
    badge?: string | null;
    rank?: string;
    year?: string;
    imageUrl: string;
    description?: string | null;
    sortOrder?: number;
  }, user?: AdminPayload | null) {
    if (!data.title || !data.competition || !data.imageUrl) {
      throw new Error('Judul, nama kompetisi, dan foto prestasi wajib diisi');
    }

    const achievement = await db.achievement.create({
      title: data.title,
      recipient: data.recipient || 'Delegasi GenBI UPNVJT',
      competition: data.competition,
      badge: data.badge || 'Winner',
      rank: data.rank || 'gold',
      year: data.year || new Date().getFullYear().toString(),
      imageUrl: data.imageUrl,
      description: data.description || null,
      sortOrder: Number(data.sortOrder) || 0,
    });

    await db.activityLog.create({
      adminId: user?.id,
      adminName: user?.name,
      action: 'CREATE_ACHIEVEMENT',
      description: `Menambahkan prestasi: "${data.title}"`,
    });

    return achievement;
  },

  async update(id: number, data: any, user?: AdminPayload | null) {
    if (!id) throw new Error('ID prestasi wajib disertakan');

    const updated = await db.achievement.update(Number(id), data);

    await db.activityLog.create({
      adminId: user?.id,
      adminName: user?.name,
      action: 'UPDATE_ACHIEVEMENT',
      description: `Memperbarui prestasi ID: ${id}`,
    });

    return updated;
  },

  async delete(id: number, user?: AdminPayload | null) {
    if (!id) throw new Error('ID prestasi wajib disertakan');

    await db.achievement.delete(Number(id));

    await db.activityLog.create({
      adminId: user?.id,
      adminName: user?.name,
      action: 'DELETE_ACHIEVEMENT',
      description: `Menghapus prestasi ID: ${id}`,
    });

    return true;
  },
};

export default achievementController;
