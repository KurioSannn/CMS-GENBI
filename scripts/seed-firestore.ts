import fs from 'fs';
import path from 'path';
import { getFirestoreDb, hasFirebaseCredentials } from '../lib/firebase-admin';
import { readDb } from '../lib/db';
import { mergeSiteSettings } from '../lib/site-settings';

function loadEnvFile(filePath: string) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf-8');
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const eqIdx = line.indexOf('=');
    if (eqIdx === -1) continue;
    const key = line.slice(0, eqIdx).trim();
    let val = line.slice(eqIdx + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) {
      process.env[key] = val;
    }
  }
}

async function seedCollection<T extends { id: number }>(
  collectionName: string,
  items: T[]
): Promise<number> {
  const firestore = getFirestoreDb();
  const colRef = firestore.collection(collectionName);
  const now = new Date().toISOString();

  let maxId = 0;
  for (const item of items) {
    if (item.id > maxId) maxId = item.id;
  }

  // Chunk into batches of 400 writes (Firestore limit is 500)
  for (let i = 0; i < items.length; i += 400) {
    const chunk = items.slice(i, i + 400);
    const batch = firestore.batch();
    for (const item of chunk) {
      batch.set(colRef.doc(String(item.id)), item, { merge: true });
    }
    await batch.commit();
  }

  await firestore
    .collection('counters')
    .doc(collectionName)
    .set({ lastId: maxId, updatedAt: now }, { merge: true });

  return items.length;
}

async function main() {
  loadEnvFile(path.join(process.cwd(), '.env'));
  loadEnvFile(path.join(process.cwd(), '.env.local'));

  if (!hasFirebaseCredentials()) {
    console.error(
      'ERROR: Kredensial Firebase belum diatur. Isi FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, dan FIREBASE_PRIVATE_KEY di .env terlebih dahulu.'
    );
    process.exit(1);
  }

  console.log('Membaca data awal dari data/genbihub.db.json...');
  const data = readDb();

  // Pastikan divisions disimpan tanpa array members duplikat (divisionMembers jadi source of truth)
  const divisionsMeta = (data.divisions || []).map(({ members: _members, ...rest }) => ({
    ...rest,
    members: [],
  }));

  const firestore = getFirestoreDb();
  const counts = {
    adminUsers: await seedCollection('adminUsers', data.adminUsers || []),
    banners: await seedCollection('banners', data.banners || []),
    bphMembers: await seedCollection('bphMembers', data.bphMembers || []),
    divisions: await seedCollection('divisions', divisionsMeta),
    divisionMembers: await seedCollection('divisionMembers', data.divisionMembers || []),
    categories: await seedCollection('categories', data.categories || []),
    articles: await seedCollection('articles', data.articles || []),
    achievements: await seedCollection('achievements', data.achievements || []),
    documents: await seedCollection('documents', data.documents || []),
    activityLogs: await seedCollection('activityLogs', data.activityLogs || []),
  };

  const settings = mergeSiteSettings(data.siteSettings);
  await firestore.collection('siteSettings').doc('default').set(settings, { merge: true });

  console.log('Seed Firestore selesai dengan rincian dokumen:');
  console.table({ ...counts, siteSettings: 1 });
  console.log('Semua data awal + akun admin berhasil disinkronkan ke Firestore.');
}

main().catch((err) => {
  console.error('Seed Firestore gagal:', err);
  process.exit(1);
});
