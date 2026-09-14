import db from '@/lib/db';
import { AdminPayload } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export const articleController = {
  async getAll(status?: 'DRAFT' | 'PUBLISHED') {
    return await db.article.findMany(status);
  },

  async getById(id: number) {
    const article = await db.article.findById(Number(id));
    if (!article) throw new Error('Berita tidak ditemukan');
    return article;
  },

  async getBySlug(slug: string) {
    const article = await db.article.findBySlug(slug);
    if (!article) throw new Error('Berita tidak ditemukan');
    return article;
  },

  async create(data: {
    title: string;
    excerpt?: string;
    content: string;
    coverImage: string;
    category?: string;
    author?: string;
    status?: 'DRAFT' | 'PUBLISHED';
  }, user?: AdminPayload | null) {
    if (!data.title || !data.content || !data.coverImage) {
      throw new Error('Judul, cover image, dan isi artikel wajib diisi');
    }

    let baseSlug = slugify(data.title);
    let uniqueSlug = baseSlug;
    let counter = 1;
    while (await db.article.findBySlug(uniqueSlug)) {
      uniqueSlug = `${baseSlug}-${counter++}`;
    }

    const article = await db.article.create({
      title: data.title,
      slug: uniqueSlug,
      excerpt: data.excerpt || data.title.substring(0, 150),
      content: data.content,
      coverImage: data.coverImage,
      category: data.category || 'Edukasi',
      author: data.author || user?.name || 'Humas GenBI',
      status: data.status === 'DRAFT' ? 'DRAFT' : 'PUBLISHED',
      publishedAt: new Date().toISOString(),
    });

    await db.activityLog.create({
      adminId: user?.id,
      adminName: user?.name,
      action: 'CREATE_ARTICLE',
      description: `Menerbitkan berita baru: "${data.title}"`,
    });

    return article;
  },

  async update(id: number, data: any, user?: AdminPayload | null) {
    if (!id) throw new Error('ID berita wajib disertakan');

    if (data.title && !data.slug) {
      data.slug = slugify(data.title);
    }

    const updated = await db.article.update(Number(id), data);

    await db.activityLog.create({
      adminId: user?.id,
      adminName: user?.name,
      action: 'UPDATE_ARTICLE',
      description: `Memperbarui berita ID: ${id}`,
    });

    return updated;
  },

  async delete(id: number, user?: AdminPayload | null) {
    if (!id) throw new Error('ID berita wajib disertakan');

    await db.article.delete(Number(id));

    await db.activityLog.create({
      adminId: user?.id,
      adminName: user?.name,
      action: 'DELETE_ARTICLE',
      description: `Menghapus berita ID: ${id}`,
    });

    return true;
  },
};

export default articleController;
