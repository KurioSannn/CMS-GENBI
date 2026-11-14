import db from '@/lib/db';

export const statsController = {
  async getOverview() {
    const [stats, recentLogs, recentArticles, divisionsList] = await Promise.all([
      db.getStats(),
      db.activityLog.findMany(10),
      db.article.findMany(),
      db.division.findMany(),
    ]);

    return {
      stats,
      recentLogs,
      recentArticles: recentArticles.slice(0, 5),
      divisionSummary: divisionsList.map((d) => ({
        id: d.id,
        name: d.name,
        slug: d.slug,
        memberCount: d.members?.length || 0,
        prokerCount: 0,
      })),
    };
  },
};

export default statsController;
