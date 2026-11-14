import { getFirestoreDb } from './firebase-admin';
import {
  DEFAULT_SITE_SETTINGS,
  mergeSiteSettings,
  SiteSettings,
} from './site-settings';
import type {
  Achievement,
  ActivityLog,
  AdminUser,
  Article,
  Banner,
  BphMember,
  Category,
  DatabaseSchema,
  Division,
  DivisionMember,
  DocumentArchive,
} from './db-types';

const COLLECTIONS = {
  adminUsers: 'adminUsers',
  banners: 'banners',
  bphMembers: 'bphMembers',
  divisions: 'divisions',
  divisionMembers: 'divisionMembers',
  articles: 'articles',
  achievements: 'achievements',
  documents: 'documents',
  activityLogs: 'activityLogs',
  categories: 'categories',
  siteSettings: 'siteSettings',
  counters: 'counters',
} as const;

async function listCollection<T>(collectionName: string): Promise<T[]> {
  const firestore = getFirestoreDb();
  const snap = await firestore.collection(collectionName).get();
  return snap.docs.map((doc) => doc.data() as T);
}

async function getNextId(collectionName: string): Promise<number> {
  const firestore = getFirestoreDb();
  const counterRef = firestore.collection(COLLECTIONS.counters).doc(collectionName);
  const existingDocsSnap = await firestore.collection(collectionName).select('id').get();

  let currentMax = 0;
  for (const doc of existingDocsSnap.docs) {
    const idVal = Number(doc.get('id'));
    if (Number.isFinite(idVal) && idVal > currentMax) {
      currentMax = idVal;
    }
  }

  return firestore.runTransaction(async (tx) => {
    const counterSnap = await tx.get(counterRef);
    const storedLastId = counterSnap.exists ? Number(counterSnap.get('lastId') || 0) : 0;
    const nextId = Math.max(storedLastId, currentMax) + 1;
    tx.set(counterRef, { lastId: nextId, updatedAt: new Date().toISOString() }, { merge: true });
    return nextId;
  });
}

async function attachDivisionMembers(
  divisions: Division[],
  members?: DivisionMember[]
): Promise<Division[]> {
  const allMembers = members ?? (await listCollection<DivisionMember>(COLLECTIONS.divisionMembers));
  const membersByDivision = new Map<number, DivisionMember[]>();

  for (const member of allMembers) {
    const list = membersByDivision.get(member.divisionId) ?? [];
    list.push(member);
    membersByDivision.set(member.divisionId, list);
  }

  return [...divisions]
    .map((division) => ({
      ...division,
      members: [...(membersByDivision.get(division.id) ?? [])].sort(
        (a, b) => a.sortOrder - b.sortOrder
      ),
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function readDatabaseFromFirestore(): Promise<DatabaseSchema> {
  const [
    adminUsers,
    banners,
    bphMembers,
    rawDivisions,
    divisionMembers,
    categories,
    articles,
    achievements,
    documents,
    activityLogs,
    siteSettings,
  ] = await Promise.all([
    listCollection<AdminUser>(COLLECTIONS.adminUsers),
    listCollection<Banner>(COLLECTIONS.banners),
    listCollection<BphMember>(COLLECTIONS.bphMembers),
    listCollection<Division>(COLLECTIONS.divisions),
    listCollection<DivisionMember>(COLLECTIONS.divisionMembers),
    listCollection<Category>(COLLECTIONS.categories),
    listCollection<Article>(COLLECTIONS.articles),
    listCollection<Achievement>(COLLECTIONS.achievements),
    listCollection<DocumentArchive>(COLLECTIONS.documents),
    listCollection<ActivityLog>(COLLECTIONS.activityLogs),
    firestoreDb.siteSettings.get(),
  ]);

  const divisions = await attachDivisionMembers(rawDivisions, divisionMembers);

  return {
    adminUsers: [...adminUsers].sort((a, b) => a.id - b.id),
    banners: [...banners].sort((a, b) => a.sortOrder - b.sortOrder),
    bphMembers: [...bphMembers].sort((a, b) => a.sortOrder - b.sortOrder),
    divisions,
    divisionMembers: [...divisionMembers].sort((a, b) => a.id - b.id),
    categories: [...categories].sort((a, b) => a.sortOrder - b.sortOrder),
    articles: [...articles].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    ),
    achievements: [...achievements].sort((a, b) => a.sortOrder - b.sortOrder),
    documents: [...documents].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ),
    activityLogs: [...activityLogs].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ),
    siteSettings,
  };
}

export const firestoreDb = {
  // --- ADMIN USERS ---
  adminUser: {
    findFirst: async (predicate?: (user: AdminUser) => boolean) => {
      const users = await listCollection<AdminUser>(COLLECTIONS.adminUsers);
      const sorted = [...users].sort((a, b) => a.id - b.id);
      return predicate ? sorted.find(predicate) ?? null : sorted[0] ?? null;
    },
    findUnique: async ({
      username,
      email,
      id,
    }: {
      username?: string;
      email?: string;
      id?: number;
    }) => {
      const users = await listCollection<AdminUser>(COLLECTIONS.adminUsers);
      return (
        users.find(
          (u) =>
            (username && u.username === username) ||
            (email && u.email === email) ||
            (id !== undefined && u.id === id)
        ) ?? null
      );
    },
  },

  // --- BANNERS ---
  banner: {
    findMany: async () => {
      const list = await listCollection<Banner>(COLLECTIONS.banners);
      return [...list].sort((a, b) => a.sortOrder - b.sortOrder);
    },
    create: async (input: Omit<Banner, 'id' | 'createdAt' | 'updatedAt'>) => {
      const firestore = getFirestoreDb();
      const now = new Date().toISOString();
      const id = await getNextId(COLLECTIONS.banners);
      const newBanner: Banner = { ...input, id, createdAt: now, updatedAt: now };
      await firestore.collection(COLLECTIONS.banners).doc(String(id)).set(newBanner);
      return newBanner;
    },
    update: async (id: number, input: Partial<Banner>) => {
      const firestore = getFirestoreDb();
      const docRef = firestore.collection(COLLECTIONS.banners).doc(String(id));
      const snap = await docRef.get();
      if (!snap.exists) throw new Error('Banner not found');
      const updated: Banner = {
        ...(snap.data() as Banner),
        ...input,
        id,
        updatedAt: new Date().toISOString(),
      };
      await docRef.set(updated, { merge: true });
      return updated;
    },
    delete: async (id: number) => {
      const firestore = getFirestoreDb();
      await firestore.collection(COLLECTIONS.banners).doc(String(id)).delete();
      return true;
    },
  },

  // --- BPH & PEMBINA ---
  bphMember: {
    findMany: async () => {
      const list = await listCollection<BphMember>(COLLECTIONS.bphMembers);
      return [...list].sort((a, b) => a.sortOrder - b.sortOrder);
    },
    create: async (input: Omit<BphMember, 'id' | 'createdAt' | 'updatedAt'>) => {
      const firestore = getFirestoreDb();
      const now = new Date().toISOString();
      const id = await getNextId(COLLECTIONS.bphMembers);
      const newMember: BphMember = { ...input, id, createdAt: now, updatedAt: now };
      await firestore.collection(COLLECTIONS.bphMembers).doc(String(id)).set(newMember);
      return newMember;
    },
    update: async (id: number, input: Partial<BphMember>) => {
      const firestore = getFirestoreDb();
      const docRef = firestore.collection(COLLECTIONS.bphMembers).doc(String(id));
      const snap = await docRef.get();
      if (!snap.exists) throw new Error('Member not found');
      const updated: BphMember = {
        ...(snap.data() as BphMember),
        ...input,
        id,
        updatedAt: new Date().toISOString(),
      };
      await docRef.set(updated, { merge: true });
      return updated;
    },
    delete: async (id: number) => {
      const firestore = getFirestoreDb();
      await firestore.collection(COLLECTIONS.bphMembers).doc(String(id)).delete();
      return true;
    },
  },

  // --- DIVISI & ANGGOTA ---
  division: {
    findMany: async () => {
      const rawDivisions = await listCollection<Division>(COLLECTIONS.divisions);
      return attachDivisionMembers(rawDivisions);
    },
    findBySlug: async (slug: string) => {
      const firestore = getFirestoreDb();
      const snap = await firestore
        .collection(COLLECTIONS.divisions)
        .where('slug', '==', slug)
        .limit(1)
        .get();
      if (snap.empty) return null;
      const division = snap.docs[0].data() as Division;
      const membersSnap = await firestore
        .collection(COLLECTIONS.divisionMembers)
        .where('divisionId', '==', division.id)
        .get();
      const members = membersSnap.docs
        .map((d) => d.data() as DivisionMember)
        .sort((a, b) => a.sortOrder - b.sortOrder);
      return { ...division, members };
    },
    findById: async (id: number) => {
      const firestore = getFirestoreDb();
      const snap = await firestore.collection(COLLECTIONS.divisions).doc(String(id)).get();
      if (!snap.exists) return null;
      const division = snap.data() as Division;
      const membersSnap = await firestore
        .collection(COLLECTIONS.divisionMembers)
        .where('divisionId', '==', id)
        .get();
      const members = membersSnap.docs
        .map((d) => d.data() as DivisionMember)
        .sort((a, b) => a.sortOrder - b.sortOrder);
      return { ...division, members };
    },
    create: async (input: Omit<Division, 'id' | 'members' | 'createdAt' | 'updatedAt'>) => {
      const firestore = getFirestoreDb();
      const now = new Date().toISOString();
      const id = await getNextId(COLLECTIONS.divisions);
      const newDiv: Division = { ...input, id, members: [], createdAt: now, updatedAt: now };
      await firestore.collection(COLLECTIONS.divisions).doc(String(id)).set(newDiv);
      return newDiv;
    },
    update: async (id: number, input: Partial<Division>) => {
      const firestore = getFirestoreDb();
      const docRef = firestore.collection(COLLECTIONS.divisions).doc(String(id));
      const snap = await docRef.get();
      if (!snap.exists) throw new Error('Division not found');
      const { members: _ignoredMembers, ...rest } = input;
      const updated: Division = {
        ...(snap.data() as Division),
        ...rest,
        id,
        updatedAt: new Date().toISOString(),
      };
      await docRef.set(updated, { merge: true });
      const hydrated = await firestoreDb.division.findById(id);
      return hydrated ?? updated;
    },
    delete: async (id: number) => {
      const firestore = getFirestoreDb();
      const membersSnap = await firestore
        .collection(COLLECTIONS.divisionMembers)
        .where('divisionId', '==', id)
        .get();

      const batch = firestore.batch();
      batch.delete(firestore.collection(COLLECTIONS.divisions).doc(String(id)));
      for (const doc of membersSnap.docs) {
        batch.delete(doc.ref);
      }
      await batch.commit();
      return true;
    },
    addMember: async (
      divisionId: number,
      memberInput: Omit<DivisionMember, 'id' | 'divisionId' | 'createdAt' | 'updatedAt'>
    ) => {
      const firestore = getFirestoreDb();
      const divRef = firestore.collection(COLLECTIONS.divisions).doc(String(divisionId));
      const divSnap = await divRef.get();
      if (!divSnap.exists) throw new Error('Division not found');

      const now = new Date().toISOString();
      const id = await getNextId(COLLECTIONS.divisionMembers);
      const newMember: DivisionMember = {
        ...memberInput,
        id,
        divisionId,
        createdAt: now,
        updatedAt: now,
      };

      const batch = firestore.batch();
      batch.set(firestore.collection(COLLECTIONS.divisionMembers).doc(String(id)), newMember);
      batch.set(divRef, { updatedAt: now }, { merge: true });
      await batch.commit();
      return newMember;
    },
    updateMember: async (memberId: number, input: Partial<DivisionMember>) => {
      const firestore = getFirestoreDb();
      const memberRef = firestore.collection(COLLECTIONS.divisionMembers).doc(String(memberId));
      const snap = await memberRef.get();
      if (!snap.exists) throw new Error('Member not found');

      const now = new Date().toISOString();
      const updated: DivisionMember = {
        ...(snap.data() as DivisionMember),
        ...input,
        id: memberId,
        updatedAt: now,
      };
      await memberRef.set(updated, { merge: true });
      return updated;
    },
    deleteMember: async (memberId: number) => {
      const firestore = getFirestoreDb();
      const memberRef = firestore.collection(COLLECTIONS.divisionMembers).doc(String(memberId));
      const snap = await memberRef.get();
      if (!snap.exists) return false;
      await memberRef.delete();
      return true;
    },
  },

  // --- BERITA / ARTIKEL ---
  article: {
    findMany: async (status?: 'DRAFT' | 'PUBLISHED') => {
      let list = await listCollection<Article>(COLLECTIONS.articles);
      if (status) {
        list = list.filter((a) => a.status === status);
      }
      return [...list].sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    },
    findBySlug: async (slug: string) => {
      const firestore = getFirestoreDb();
      const snap = await firestore
        .collection(COLLECTIONS.articles)
        .where('slug', '==', slug)
        .limit(1)
        .get();
      return snap.empty ? null : (snap.docs[0].data() as Article);
    },
    findById: async (id: number) => {
      const firestore = getFirestoreDb();
      const snap = await firestore.collection(COLLECTIONS.articles).doc(String(id)).get();
      return snap.exists ? (snap.data() as Article) : null;
    },
    create: async (input: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>) => {
      const firestore = getFirestoreDb();
      const now = new Date().toISOString();
      const id = await getNextId(COLLECTIONS.articles);
      const newArticle: Article = {
        ...input,
        id,
        publishedAt: input.publishedAt || now,
        createdAt: now,
        updatedAt: now,
      };
      await firestore.collection(COLLECTIONS.articles).doc(String(id)).set(newArticle);
      return newArticle;
    },
    update: async (id: number, input: Partial<Article>) => {
      const firestore = getFirestoreDb();
      const docRef = firestore.collection(COLLECTIONS.articles).doc(String(id));
      const snap = await docRef.get();
      if (!snap.exists) throw new Error('Article not found');
      const updated: Article = {
        ...(snap.data() as Article),
        ...input,
        id,
        updatedAt: new Date().toISOString(),
      };
      await docRef.set(updated, { merge: true });
      return updated;
    },
    delete: async (id: number) => {
      const firestore = getFirestoreDb();
      await firestore.collection(COLLECTIONS.articles).doc(String(id)).delete();
      return true;
    },
  },

  // --- PRESTASI ---
  achievement: {
    findMany: async () => {
      const list = await listCollection<Achievement>(COLLECTIONS.achievements);
      return [...list].sort((a, b) => a.sortOrder - b.sortOrder);
    },
    create: async (input: Omit<Achievement, 'id' | 'createdAt' | 'updatedAt'>) => {
      const firestore = getFirestoreDb();
      const now = new Date().toISOString();
      const id = await getNextId(COLLECTIONS.achievements);
      const newAch: Achievement = { ...input, id, createdAt: now, updatedAt: now };
      await firestore.collection(COLLECTIONS.achievements).doc(String(id)).set(newAch);
      return newAch;
    },
    update: async (id: number, input: Partial<Achievement>) => {
      const firestore = getFirestoreDb();
      const docRef = firestore.collection(COLLECTIONS.achievements).doc(String(id));
      const snap = await docRef.get();
      if (!snap.exists) throw new Error('Achievement not found');
      const updated: Achievement = {
        ...(snap.data() as Achievement),
        ...input,
        id,
        updatedAt: new Date().toISOString(),
      };
      await docRef.set(updated, { merge: true });
      return updated;
    },
    delete: async (id: number) => {
      const firestore = getFirestoreDb();
      await firestore.collection(COLLECTIONS.achievements).doc(String(id)).delete();
      return true;
    },
  },

  // --- DOKUMEN ARSIP ---
  document: {
    findMany: async () => {
      const list = await listCollection<DocumentArchive>(COLLECTIONS.documents);
      return [...list].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    },
    create: async (input: Omit<DocumentArchive, 'id' | 'createdAt' | 'updatedAt'>) => {
      const firestore = getFirestoreDb();
      const now = new Date().toISOString();
      const id = await getNextId(COLLECTIONS.documents);
      const newDoc: DocumentArchive = {
        ...input,
        id,
        publishedAt: input.publishedAt || now,
        createdAt: now,
        updatedAt: now,
      };
      await firestore.collection(COLLECTIONS.documents).doc(String(id)).set(newDoc);
      return newDoc;
    },
    delete: async (id: number) => {
      const firestore = getFirestoreDb();
      await firestore.collection(COLLECTIONS.documents).doc(String(id)).delete();
      return true;
    },
  },

  // --- ACTIVITY LOGS ---
  activityLog: {
    findMany: async (limit: number = 20) => {
      const list = await listCollection<ActivityLog>(COLLECTIONS.activityLogs);
      return [...list]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, limit);
    },
    create: async (input: {
      adminId?: number;
      adminName?: string;
      action: string;
      description: string;
      ipAddress?: string;
    }) => {
      const firestore = getFirestoreDb();
      const id = await getNextId(COLLECTIONS.activityLogs);
      const newLog: ActivityLog = {
        id,
        adminId: input.adminId ?? null,
        adminName: input.adminName ?? 'Admin',
        action: input.action,
        description: input.description,
        ipAddress: input.ipAddress ?? null,
        createdAt: new Date().toISOString(),
      };
      await firestore.collection(COLLECTIONS.activityLogs).doc(String(id)).set(newLog);
      return newLog;
    },
  },

  // --- KATEGORI ---
  category: {
    findMany: async (type?: string) => {
      let list = await listCollection<Category>(COLLECTIONS.categories);
      if (type) {
        const normalizedType = type.toUpperCase();
        list = list.filter((c) => c.type.toUpperCase() === normalizedType);
      }
      return [...list].sort((a, b) => {
        if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
    },
    findUnique: async (where: { id?: number; slug?: string }) => {
      const categories = await listCollection<Category>(COLLECTIONS.categories);
      if (where.id !== undefined) return categories.find((c) => c.id === where.id) ?? null;
      if (where.slug) return categories.find((c) => c.slug === where.slug) ?? null;
      return null;
    },
    create: async (input: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => {
      const firestore = getFirestoreDb();
      const now = new Date().toISOString();
      const id = await getNextId(COLLECTIONS.categories);
      const newCat: Category = {
        ...input,
        id,
        createdAt: now,
        updatedAt: now,
      };
      await firestore.collection(COLLECTIONS.categories).doc(String(id)).set(newCat);
      return newCat;
    },
    update: async (id: number, input: Partial<Omit<Category, 'id' | 'createdAt'>>) => {
      const firestore = getFirestoreDb();
      const docRef = firestore.collection(COLLECTIONS.categories).doc(String(id));
      const snap = await docRef.get();
      if (!snap.exists) throw new Error('Kategori tidak ditemukan');
      const updated: Category = {
        ...(snap.data() as Category),
        ...input,
        id,
        updatedAt: new Date().toISOString(),
      };
      await docRef.set(updated, { merge: true });
      return updated;
    },
    delete: async (id: number) => {
      const firestore = getFirestoreDb();
      const docRef = firestore.collection(COLLECTIONS.categories).doc(String(id));
      const snap = await docRef.get();
      if (!snap.exists) throw new Error('Kategori tidak ditemukan');
      const target = snap.data() as Category;
      await docRef.delete();
      return target;
    },
  },

  // --- PENGATURAN LANDING PAGE ---
  siteSettings: {
    get: async (): Promise<SiteSettings> => {
      const firestore = getFirestoreDb();
      const snap = await firestore.collection(COLLECTIONS.siteSettings).doc('default').get();
      if (!snap.exists) return mergeSiteSettings(DEFAULT_SITE_SETTINGS);
      return mergeSiteSettings(snap.data() as Partial<SiteSettings>);
    },
    update: async (input: Partial<SiteSettings>): Promise<SiteSettings> => {
      const firestore = getFirestoreDb();
      const docRef = firestore.collection(COLLECTIONS.siteSettings).doc('default');
      const current = await firestoreDb.siteSettings.get();
      const updated = mergeSiteSettings({
        ...current,
        ...input,
        popup: input.popup ? { ...current.popup, ...input.popup } : current.popup,
        about: input.about ? { ...current.about, ...input.about } : current.about,
        recruitment: input.recruitment
          ? { ...current.recruitment, ...input.recruitment }
          : current.recruitment,
        contact: input.contact ? { ...current.contact, ...input.contact } : current.contact,
        footer: input.footer ? { ...current.footer, ...input.footer } : current.footer,
        updatedAt: new Date().toISOString(),
      });
      await docRef.set(updated, { merge: true });
      return updated;
    },
  },

  // --- STATS OVERVIEW ---
  getStats: async () => {
    const [
      banners,
      bphMembers,
      divisions,
      divisionMembers,
      articles,
      achievements,
      documents,
      categories,
    ] = await Promise.all([
      listCollection<Banner>(COLLECTIONS.banners),
      listCollection<BphMember>(COLLECTIONS.bphMembers),
      listCollection<Division>(COLLECTIONS.divisions),
      listCollection<DivisionMember>(COLLECTIONS.divisionMembers),
      listCollection<Article>(COLLECTIONS.articles),
      listCollection<Achievement>(COLLECTIONS.achievements),
      listCollection<DocumentArchive>(COLLECTIONS.documents),
      listCollection<Category>(COLLECTIONS.categories),
    ]);

    return {
      banners: banners.length,
      bphMembers: bphMembers.length,
      divisions: divisions.length,
      totalMembers: divisionMembers.length,
      articles: articles.length,
      achievements: achievements.length,
      documents: documents.length,
      categories: categories.length,
    };
  },
};
