import { App, cert, getApps, initializeApp } from 'firebase-admin/app';
import { Firestore, getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

const globalForFirebase = globalThis as unknown as {
  __genbiFirebaseApp?: App;
  __genbiFirestore?: Firestore;
  __genbiFirestoreConfigured?: boolean;
};

function cleanEnvValue(value?: string): string {
  if (!value) return '';
  return value.trim().replace(/^["']|["']$/g, '');
}

function getFirebaseCredentials() {
  const projectId = cleanEnvValue(process.env.FIREBASE_PROJECT_ID);
  const clientEmail = cleanEnvValue(process.env.FIREBASE_CLIENT_EMAIL);
  const rawPrivateKey = cleanEnvValue(process.env.FIREBASE_PRIVATE_KEY);
  const privateKey = rawPrivateKey ? rawPrivateKey.replace(/\\n/g, '\n') : '';
  const storageBucket = cleanEnvValue(process.env.FIREBASE_STORAGE_BUCKET).replace(/^gs:\/\//, '');

  return {
    projectId,
    clientEmail,
    privateKey,
    storageBucket,
  };
}

export function hasFirebaseCredentials(): boolean {
  const { projectId, clientEmail, privateKey } = getFirebaseCredentials();
  return Boolean(projectId && clientEmail && privateKey);
}

export function isFirestoreConfigured(): boolean {
  const provider = cleanEnvValue(process.env.DB_PROVIDER).toLowerCase();
  if (provider === 'json') return false;
  return hasFirebaseCredentials();
}

export function isFirebaseStorageConfigured(): boolean {
  const { storageBucket } = getFirebaseCredentials();
  return hasFirebaseCredentials() && Boolean(storageBucket);
}

export function getFirebaseAdminApp(): App {
  if (globalForFirebase.__genbiFirebaseApp) {
    return globalForFirebase.__genbiFirebaseApp;
  }

  const existingApps = getApps();
  if (existingApps.length > 0) {
    globalForFirebase.__genbiFirebaseApp = existingApps[0];
    return existingApps[0];
  }

  const { projectId, clientEmail, privateKey, storageBucket } = getFirebaseCredentials();

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      'Kredensial Firebase Admin SDK belum lengkap. Harap isi FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, dan FIREBASE_PRIVATE_KEY.'
    );
  }

  const app = initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
    ...(storageBucket ? { storageBucket } : {}),
  });

  globalForFirebase.__genbiFirebaseApp = app;
  return app;
}

export function getFirestoreDb(): Firestore {
  if (globalForFirebase.__genbiFirestore) {
    return globalForFirebase.__genbiFirestore;
  }

  const app = getFirebaseAdminApp();
  const firestore = getFirestore(app);

  if (!globalForFirebase.__genbiFirestoreConfigured) {
    try {
      firestore.settings({ ignoreUndefinedProperties: true });
    } catch {
      // Ignore if Firestore settings were already initialized in another HMR tick
    }
    globalForFirebase.__genbiFirestoreConfigured = true;
  }

  globalForFirebase.__genbiFirestore = firestore;
  return firestore;
}

export function getStorageBucket() {
  const { storageBucket } = getFirebaseCredentials();
  if (!storageBucket) {
    throw new Error('FIREBASE_STORAGE_BUCKET belum diatur.');
  }

  const app = getFirebaseAdminApp();
  return getStorage(app).bucket(storageBucket);
}
