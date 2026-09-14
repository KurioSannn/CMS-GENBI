import db from '@/lib/db';

export const statsController = {
  async getOverview() {
    const stats = await db.getStats();
    const recentLogs = await db.activityLog.findMany(10);
    const recentArticles = await db.article.findMany();

    return {
      stats,
      recentLogs,
      recentArticles: recentArticles.slice(0, 5),
    };
  },
};

export default statsController;
