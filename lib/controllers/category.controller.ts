import prisma from '@/lib/prisma';
import { AdminPayload } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export const categoryController = {
  async getAll(type?: string) {
    try {
      return await prisma.category.findMany({
        where: type ? { type: type.toUpperCase() } : undefined,
        orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      });
    } catch (e) {
      console.error('Error fetching categories from prisma:', e);
      return [];
    }
  },

  async getById(id: number) {
    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
    });
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

    let baseSlug = slugify(data.name);
    let uniqueSlug = baseSlug;
    let counter = 1;
    while (await prisma.category.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${baseSlug}-${counter++}`;
    }

    const category = await prisma.category.create({
      data: {
        name: data.name.trim(),
        slug: uniqueSlug,
        type: data.type.toUpperCase(),
        description: data.description || null,
        sortOrder: Number(data.sortOrder) || 0,
      },
    });

    try {
      await prisma.activityLog.create({
        data: {
          adminId: user?.id,
          action: 'CREATE_CATEGORY',
          description: `Membuat kategori baru: "${data.name}" (${data.type})`,
        },
      });
    } catch (logErr) {
      console.warn('Could not log activity:', logErr);
    }

    return category;
  },

  async update(id: number, data: {
    name?: string;
    type?: string;
    description?: string;
    sortOrder?: number;
  }, user?: AdminPayload | null) {
    if (!id) throw new Error('ID kategori wajib disertakan');

    const updateData: any = {};
    if (data.name) {
      updateData.name = data.name.trim();
      updateData.slug = slugify(data.name);
    }
    if (data.type) updateData.type = data.type.toUpperCase();
    if (data.description !== undefined) updateData.description = data.description;
    if (data.sortOrder !== undefined) updateData.sortOrder = Number(data.sortOrder);

    const updated = await prisma.category.update({
      where: { id: Number(id) },
      data: updateData,
    });

    try {
      await prisma.activityLog.create({
        data: {
          adminId: user?.id,
          action: 'UPDATE_CATEGORY',
          description: `Memperbarui kategori ID: ${id} (${updated.name})`,
        },
      });
    } catch (logErr) {
      console.warn('Could not log activity:', logErr);
    }

    return updated;
  },

  async delete(id: number, user?: AdminPayload | null) {
    if (!id) throw new Error('ID kategori wajib disertakan');

    const deleted = await prisma.category.delete({
      where: { id: Number(id) },
    });

    try {
      await prisma.activityLog.create({
        data: {
          adminId: user?.id,
          action: 'DELETE_CATEGORY',
          description: `Menghapus kategori: "${deleted.name}"`,
        },
      });
    } catch (logErr) {
      console.warn('Could not log activity:', logErr);
    }

    return true;
  },
};

export default categoryController;
