import db from '@/lib/db';
import { AdminPayload } from '@/lib/auth';

export const bannerController = {
  async getAll() {
    return await db.banner.findMany();
  },

  async create(data: {
    title: string;
    subtitle?: string | null;
    imageUrl: string;
    buttonText?: string | null;
    buttonUrl?: string | null;
    sortOrder?: number;
    isActive?: boolean;
  }, user?: AdminPayload | null) {
    if (!data.title || !data.imageUrl) {
      throw new Error('Judul dan gambar banner wajib diisi');
    }

    const banner = await db.banner.create({
      title: data.title,
      subtitle: data.subtitle || null,
      imageUrl: data.imageUrl,
      buttonText: data.buttonText || null,
      buttonUrl: data.buttonUrl || null,
      sortOrder: Number(data.sortOrder) || 0,
      isActive: data.isActive !== false,
    });

    await db.activityLog.create({
      adminId: user?.id,
      adminName: user?.name,
      action: 'CREATE_BANNER',
      description: `Menambahkan banner hero baru: "${data.title}"`,
    });

    return banner;
  },

  async update(id: number, data: any, user?: AdminPayload | null) {
    if (!id) throw new Error('ID banner wajib disertakan');

    const updated = await db.banner.update(Number(id), data);

    await db.activityLog.create({
      adminId: user?.id,
      adminName: user?.name,
      action: 'UPDATE_BANNER',
      description: `Memperbarui banner ID: ${id}`,
    });

    return updated;
  },

  async delete(id: number, user?: AdminPayload | null) {
    if (!id) throw new Error('ID banner wajib disertakan');

    await db.banner.delete(Number(id));

    await db.activityLog.create({
      adminId: user?.id,
      adminName: user?.name,
      action: 'DELETE_BANNER',
      description: `Menghapus banner ID: ${id}`,
    });

    return true;
  },
};

export default bannerController;
