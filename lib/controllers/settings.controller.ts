import db, { SiteSettings } from '@/lib/db';
import { AdminPayload } from '@/lib/auth';

export const settingsController = {
  async get(): Promise<SiteSettings> {
    return db.siteSettings.get();
  },

  async update(data: Partial<SiteSettings>, user?: AdminPayload | null): Promise<SiteSettings> {
    const updated = await db.siteSettings.update(data);

    await db.activityLog.create({
      adminId: user?.id,
      adminName: user?.name || 'Admin',
      action: 'UPDATE_SITE_SETTINGS',
      description: 'Memperbarui pengaturan konten landing page & informasi kontak',
    });

    return updated;
  },
};

export default settingsController;
