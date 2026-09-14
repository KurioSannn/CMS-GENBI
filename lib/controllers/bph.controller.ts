import db from '@/lib/db';
import { AdminPayload } from '@/lib/auth';

export const bphController = {
  async getAll() {
    return await db.bphMember.findMany();
  },

  async create(data: {
    name: string;
    category: string;
    position: string;
    imageUrl: string;
    quote?: string | null;
    instagram?: string | null;
    linkedin?: string | null;
    sortOrder?: number;
  }, user?: AdminPayload | null) {
    if (!data.name || !data.category || !data.position || !data.imageUrl) {
      throw new Error('Nama, kategori, jabatan, dan foto wajib diisi');
    }

    const member = await db.bphMember.create({
      name: data.name,
      category: data.category,
      position: data.position,
      imageUrl: data.imageUrl,
      quote: data.quote || null,
      instagram: data.instagram || null,
      linkedin: data.linkedin || null,
      sortOrder: Number(data.sortOrder) || 0,
    });

    await db.activityLog.create({
      adminId: user?.id,
      adminName: user?.name,
      action: 'CREATE_BPH',
      description: `Menambahkan pengurus BPH/Pembina: "${data.name}" (${data.position})`,
    });

    return member;
  },

  async update(id: number, data: any, user?: AdminPayload | null) {
    if (!id) throw new Error('ID pengurus wajib disertakan');

    const updated = await db.bphMember.update(Number(id), data);

    await db.activityLog.create({
      adminId: user?.id,
      adminName: user?.name,
      action: 'UPDATE_BPH',
      description: `Memperbarui data pengurus BPH/Pembina ID: ${id}`,
    });

    return updated;
  },

  async delete(id: number, user?: AdminPayload | null) {
    if (!id) throw new Error('ID pengurus wajib disertakan');

    await db.bphMember.delete(Number(id));

    await db.activityLog.create({
      adminId: user?.id,
      adminName: user?.name,
      action: 'DELETE_BPH',
      description: `Menghapus pengurus BPH/Pembina ID: ${id}`,
    });

    return true;
  },
};

export default bphController;
