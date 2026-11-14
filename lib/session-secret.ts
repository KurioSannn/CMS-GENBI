/**
 * Resolusi secret JWT sesi admin (dipakai oleh lib/auth.ts dan middleware.ts / Edge Runtime).
 *
 * - Production: SESSION_SECRET WAJIB diisi, minimal 32 karakter, dan bukan nilai contoh/default
 *   yang pernah tercantum di repositori. Jika tidak valid, fungsi mengembalikan `null`
 *   sehingga login ditolak dan seluruh sesi dianggap tidak valid (fail closed).
 * - Development/test: memakai SESSION_SECRET bila ada, jika kosong memakai secret lokal khusus dev.
 */

export const MIN_SESSION_SECRET_LENGTH = 32;

const DEV_FALLBACK_SECRET = 'genbihub-dev-only-secret-do-not-use-in-production';

// Nilai yang pernah/ sedang tercantum di repositori sehingga dianggap tidak aman untuk production.
const KNOWN_WEAK_SECRETS = new Set<string>([
  'genbi-default-jwt-secret-2026',
  'genbihub-super-secret-key-upnvjt-2026',
  DEV_FALLBACK_SECRET,
]);

export function getSessionSecret(): string | null {
  const secret = (process.env.SESSION_SECRET || '').trim();

  if (process.env.NODE_ENV === 'production') {
    if (secret.length < MIN_SESSION_SECRET_LENGTH || KNOWN_WEAK_SECRETS.has(secret)) {
      return null;
    }
    return secret;
  }

  return secret || DEV_FALLBACK_SECRET;
}

export const SESSION_SECRET_ERROR_MESSAGE =
  'SESSION_SECRET belum diset dengan aman untuk production. Isi SESSION_SECRET di .env ' +
  `(minimal ${MIN_SESSION_SECRET_LENGTH} karakter acak, bukan nilai contoh). ` +
  'Contoh generate: node -e "console.log(require(\'crypto\').randomBytes(48).toString(\'hex\'))"';
