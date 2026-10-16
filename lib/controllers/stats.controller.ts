import prisma from '@/lib/prisma';
import db from '@/lib/db';

export const statsController = {
  async getOverview() {
    try {
      const [
        banners,
        bphMembers,
        divisions,
        totalMembers,
        articles,
        achievements,
        documents,
        categories,
        recentArticles,
        recentLogs,
        divisionsList,
      ] = await Promise.all([
        prisma.banner.count(),
        prisma.bphMember.count(),
        prisma.division.count(),
        prisma.divisionMember.count(),
        prisma.article.count(),
        prisma.achievement.count(),
        prisma.documentArchive.count(),
        prisma.category.count(),
        prisma.article.findMany({
          take: 5,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.activityLog.findMany({
          take: 8,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.division.findMany({
          include: {
            members: true,
            workPrograms: true,
          },
          orderBy: { sortOrder: 'asc' },
        }),
      ]);

      const divisionSummary = divisionsList.map((div: any) => ({
        id: div.id,
        name: div.name,
        slug: div.slug,
        memberCount: div.members.length,
        prokerCount: div.workPrograms.length,
      }));

      return {
        stats: {
          banners,
          bphMembers,
          divisions,
          totalMembers,
          articles,
          achievements,
          documents,
          categories,
        },
        recentLogs,
        recentArticles,
        divisionSummary,
      };
    } catch (e) {
      console.warn('Prisma stats query fallback to db.ts:', e);
      const stats = await db.getStats();
      const recentLogs = await db.activityLog.findMany(10);
      const recentArticles = await db.article.findMany();
      const divisionsList = await db.division.findMany();

      return {
        stats: {
          ...stats,
          categories: 10,
        },
        recentLogs,
        recentArticles: recentArticles.slice(0, 5),
        divisionSummary: divisionsList.map((d: any) => ({
          id: d.id,
          name: d.name,
          slug: d.slug,
          memberCount: d.members?.length || 0,
          prokerCount: d.workPrograms?.length || 0,
        })),
      };
    }
  },
};

export default statsController;
