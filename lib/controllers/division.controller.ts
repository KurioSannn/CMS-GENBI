import db from '@/lib/db';
import { AdminPayload } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export const divisionController = {
  async getAll() {
    return await db.division.findMany();
  },

  async getById(id: number) {
    const division = await db.division.findById(Number(id));
    if (!division) throw new Error('Divisi tidak ditemukan');
    return division;
  },

  async getBySlug(slug: string) {
    const division = await db.division.findBySlug(slug);
    if (!division) throw new Error('Divisi tidak ditemukan');
    return division;
  },

  async create(data: {
    name: string;
    tagline?: string | null;
    description: string;
    logoUrl?: string | null;
    teamPhotoUrl?: string | null;
    sortOrder?: number;
  }, user?: AdminPayload | null) {
    if (!data.name || !data.description) {
      throw new Error('Nama divisi dan deskripsi wajib diisi');
    }

    const slug = slugify(data.name);
    const division = await db.division.create({
      name: data.name,
      slug,
      tagline: data.tagline || null,
      description: data.description,
      logoUrl: data.logoUrl || null,
      teamPhotoUrl: data.teamPhotoUrl || null,
      sortOrder: Number(data.sortOrder) || 0,
    });

    await db.activityLog.create({
      adminId: user?.id,
      adminName: user?.name,
      action: 'CREATE_DIVISION',
      description: `Menambahkan divisi baru: "${data.name}"`,
    });

    return division;
  },

  async update(id: number, data: any, user?: AdminPayload | null) {
    if (!id) throw new Error('ID divisi wajib disertakan');

    if (data.name && !data.slug) {
      data.slug = slugify(data.name);
    }

    const updated = await db.division.update(Number(id), data);

    await db.activityLog.create({
      adminId: user?.id,
      adminName: user?.name,
      action: 'UPDATE_DIVISION',
      description: `Memperbarui divisi ID: ${id}`,
    });

    return updated;
  },

  async delete(id: number, user?: AdminPayload | null) {
    if (!id) throw new Error('ID divisi wajib disertakan');

    await db.division.delete(Number(id));

    await db.activityLog.create({
      adminId: user?.id,
      adminName: user?.name,
      action: 'DELETE_DIVISION',
      description: `Menghapus divisi ID: ${id}`,
    });

    return true;
  },

  // Member sub-resource methods
  async addMember(divisionId: number, data: {
    name: string;
    role: string;
    prodiAngkatan?: string | null;
    imageUrl: string;
    sortOrder?: number;
  }, user?: AdminPayload | null) {
    if (!divisionId || !data.name || !data.role || !data.imageUrl) {
      throw new Error('Divisi, nama, jabatan, dan foto wajib diisi');
    }

    const member = await db.division.addMember(Number(divisionId), {
      name: data.name,
      role: data.role,
      prodiAngkatan: data.prodiAngkatan || null,
      imageUrl: data.imageUrl,
      sortOrder: Number(data.sortOrder) || 0,
    });

    await db.activityLog.create({
      adminId: user?.id,
      adminName: user?.name,
      action: 'ADD_MEMBER',
      description: `Menambahkan anggota "${data.name}" ke divisi ID: ${divisionId}`,
    });

    return member;
  },

  async updateMember(memberId: number, data: any, user?: AdminPayload | null) {
    if (!memberId) throw new Error('ID anggota wajib disertakan');

    const updated = await db.division.updateMember(Number(memberId), data);

    await db.activityLog.create({
      adminId: user?.id,
      adminName: user?.name,
      action: 'UPDATE_MEMBER',
      description: `Memperbarui anggota ID: ${memberId}`,
    });

    return updated;
  },

  async deleteMember(memberId: number, user?: AdminPayload | null) {
    if (!memberId) throw new Error('ID anggota wajib disertakan');

    await db.division.deleteMember(Number(memberId));

    await db.activityLog.create({
      adminId: user?.id,
      adminName: user?.name,
      action: 'DELETE_MEMBER',
      description: `Menghapus anggota divisi ID: ${memberId}`,
    });

    return true;
  },
};

export default divisionController;
