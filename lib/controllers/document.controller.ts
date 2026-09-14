import db from '@/lib/db';
import { AdminPayload } from '@/lib/auth';

export const documentController = {
  async getAll() {
    return await db.document.findMany();
  },

  async create(data: {
    title: string;
    category: string;
    fileUrl: string;
    fileSize?: string | null;
    description?: string | null;
  }, user?: AdminPayload | null) {
    if (!data.title || !data.category || !data.fileUrl) {
      throw new Error('Judul, kategori, dan file URL dokumen wajib diisi');
    }

    const doc = await db.document.create({
      title: data.title,
      category: data.category,
      fileUrl: data.fileUrl,
      fileSize: data.fileSize || '1.0 MB',
      description: data.description || null,
      publishedAt: new Date().toISOString(),
    });

    await db.activityLog.create({
      adminId: user?.id,
      adminName: user?.name,
      action: 'CREATE_DOCUMENT',
      description: `Mengunggah dokumen arsip: "${data.title}"`,
    });

    return doc;
  },

  async delete(id: number, user?: AdminPayload | null) {
    if (!id) throw new Error('ID dokumen wajib disertakan');

    await db.document.delete(Number(id));

    await db.activityLog.create({
      adminId: user?.id,
      adminName: user?.name,
      action: 'DELETE_DOCUMENT',
      description: `Menghapus dokumen arsip ID: ${id}`,
    });

    return true;
  },
};

export default documentController;
