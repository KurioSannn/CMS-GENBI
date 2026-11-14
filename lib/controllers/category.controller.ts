import db from '@/lib/db';
import { AdminPayload } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export const categoryController = {
  async getAll(type?: string) {
    return db.category.findMany(type);
  },

  async getById(id: number) {
    const category = await db.category.findUnique({ id: Number(id) });
    if (!category) throw new Error('Kategori tidak ditemukan');
    return category;
  },

  async create(data: {
    name: string;
    type: string;
    description?: string;
    sortOrder?: number;
  }, user?: AdminPayload | null) {
    if (!data.name || !data.type) {
      throw new Error('Nama kategori dan tipe wajib diisi');
    }

    const baseSlug = slugify(data.name);
    let uniqueSlug = baseSlug;
    let counter = 1;
    while (await db.category.findUnique({ slug: uniqueSlug })) {
      uniqueSlug = `${baseSlug}-${counter++}`;
    }

    const category = await db.category.create({
      name: data.name.trim(),
      slug: uniqueSlug,
      type: data.type.toUpperCase(),
      description: data.description || null,
      sortOrder: Number(data.sortOrder) || 0,
    });

    await db.activityLog.create({
      adminId: user?.id,
      adminName: user?.name || 'Admin',
      action: 'CREATE_CATEGORY',
      description: `Membuat kategori baru: "${data.name}" (${data.type})`,
    });

    return category;
  },

  async update(id: number, data: {
    name?: string;
    type?: string;
    description?: string;
    sortOrder?: number;
  }, user?: AdminPayload | null) {
    if (!id) throw new Error('ID kategori wajib disertakan');

    const updateData: {
      name?: string;
      slug?: string;
      type?: string;
      description?: string | null;
      sortOrder?: number;
    } = {};

    if (data.name) {
      updateData.name = data.name.trim();
      const baseSlug = slugify(data.name);
      let uniqueSlug = baseSlug;
      let counter = 1;
      let existing = await db.category.findUnique({ slug: uniqueSlug });
      while (existing && existing.id !== Number(id)) {
        uniqueSlug = `${baseSlug}-${counter++}`;
        existing = await db.category.findUnique({ slug: uniqueSlug });
      }
      updateData.slug = uniqueSlug;
    }
    if (data.type) updateData.type = data.type.toUpperCase();
    if (data.description !== undefined) updateData.description = data.description;
    if (data.sortOrder !== undefined) updateData.sortOrder = Number(data.sortOrder);

    const updated = await db.category.update(Number(id), updateData);

    await db.activityLog.create({
      adminId: user?.id,
      adminName: user?.name || 'Admin',
      action: 'UPDATE_CATEGORY',
      description: `Memperbarui kategori ID: ${id} (${updated.name})`,
    });

    return updated;
  },

  async delete(id: number, user?: AdminPayload | null) {
    if (!id) throw new Error('ID kategori wajib disertakan');

    const deleted = await db.category.delete(Number(id));

    await db.activityLog.create({
      adminId: user?.id,
      adminName: user?.name || 'Admin',
      action: 'DELETE_CATEGORY',
      description: `Menghapus kategori: "${deleted.name}"`,
    });

    return true;
  },
};

export default categoryController;
