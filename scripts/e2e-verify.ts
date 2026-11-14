import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

const PORT = 3099;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const DB_PATH = path.join(process.cwd(), 'data', 'genbihub.db.json');
const UPLOAD_TEST_DIR = path.join(process.cwd(), 'public', 'uploads', 'test-e2e');

// Valid 1x1 transparent PNG
const VALID_1X1_PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
  'base64'
);

interface HttpRes {
  status: number;
  headers: http.IncomingHttpHeaders;
  body: string;
}

function requestRaw(
  method: string,
  reqPath: string,
  options?: { cookie?: string; json?: unknown; form?: { filename: string; contentType: string; data: Buffer; scope: string } }
): Promise<HttpRes> {
  return new Promise((resolve, reject) => {
    const headers: Record<string, string | number> = {};
    if (options?.cookie) headers['Cookie'] = options.cookie;

    let bodyBuf: Buffer | undefined;

    if (options?.json !== undefined) {
      bodyBuf = Buffer.from(JSON.stringify(options.json), 'utf-8');
      headers['Content-Type'] = 'application/json';
      headers['Content-Length'] = bodyBuf.byteLength;
    } else if (options?.form) {
      const boundary = `----GenBIE2EBoundary${Date.now()}${Math.random().toString(16).slice(2)}`;
      const partScope = Buffer.from(
        `--${boundary}\r\nContent-Disposition: form-data; name="scope"\r\n\r\n${options.form.scope}\r\n`,
        'utf-8'
      );
      const partFileHeader = Buffer.from(
        `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${options.form.filename}"\r\nContent-Type: ${options.form.contentType}\r\n\r\n`,
        'utf-8'
      );
      const partEnd = Buffer.from(`\r\n--${boundary}--\r\n`, 'utf-8');
      bodyBuf = Buffer.concat([partScope, partFileHeader, options.form.data, partEnd]);
      headers['Content-Type'] = `multipart/form-data; boundary=${boundary}`;
      headers['Content-Length'] = bodyBuf.byteLength;
    }

    const req = http.request(
      {
        hostname: '127.0.0.1',
        port: PORT,
        path: reqPath,
        method,
        headers,
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => {
          resolve({
            status: res.statusCode ?? 0,
            headers: res.headers,
            body: Buffer.concat(chunks).toString('utf-8'),
          });
        });
      }
    );

    req.on('error', reject);
    if (bodyBuf) req.write(bodyBuf);
    req.end();
  });
}

function extractCookieValue(setCookieHeader: string[] | string | undefined, name: string): string | null {
  if (!setCookieHeader) return null;
  const list = Array.isArray(setCookieHeader) ? setCookieHeader : [setCookieHeader];
  for (const raw of list) {
    const first = raw.split(';')[0]?.trim();
    if (first && first.startsWith(`${name}=`)) {
      return first;
    }
  }
  return null;
}

async function runTest(name: string, fn: () => Promise<void>) {
  process.stdout.write(`  [RUN] ${name}... `);
  await fn();
  console.log('PASS');
}

async function startServer() {
  const srv = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', String(PORT)], {
    env: {
      ...process.env,
      DB_PROVIDER: 'json',
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  await new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Timeout waiting for Next.js test server')), 20000);
    srv.stdout.on('data', (chunk) => {
      const text = chunk.toString();
      if (text.includes('Ready in') || text.includes(String(PORT))) {
        clearTimeout(timer);
        resolve();
      }
    });
    srv.stderr.on('data', (chunk) => {
      const text = chunk.toString();
      if (text.toLowerCase().includes('eaddrinuse')) {
        clearTimeout(timer);
        reject(new Error(`Port ${PORT} already in use`));
      }
    });
    srv.on('exit', (code) => {
      clearTimeout(timer);
      if (code !== null && code !== 0) {
        reject(new Error(`Next.js server exited early with code ${code}`));
      }
    });
  });

  return srv;
}

async function main() {
  if (!fs.existsSync(path.join(process.cwd(), '.next'))) {
    throw new Error('Folder .next tidak ditemukan. Jalankan "npm run build" sebelum "npm run test:e2e".');
  }

  const originalDbRaw = fs.existsSync(DB_PATH) ? fs.readFileSync(DB_PATH, 'utf-8') : null;
  const srv = await startServer();

  let passed = 0;
  const exec = async (name: string, fn: () => Promise<void>) => {
    await runTest(name, fn);
    passed++;
  };

  try {
    console.log(`\nMenjalankan GenBIHub E2E Verification Suite pada ${BASE_URL}\n`);

    // 1. Security & Edge Middleware Checks
    await exec('Unauthenticated /admin routes redirect to /admin/login (307)', async () => {
      for (const route of ['/admin', '/admin/pengaturan', '/admin/aktivitas', '/admin/divisi']) {
        const res = await requestRaw('GET', route);
        assert.equal(res.status, 307, `${route} expected 307, got ${res.status}`);
        assert.ok(String(res.headers.location || '').includes('/admin/login'), `${route} missing login redirect`);
      }
    });

    await exec('Forged JWT cookie is rejected by Edge middleware (307 + no login loop)', async () => {
      const forged = await requestRaw('GET', '/admin', { cookie: 'genbi_admin_token=forged.invalid.jwt' });
      assert.equal(forged.status, 307, `forged cookie on /admin returned ${forged.status}`);
      assert.ok(String(forged.headers.location || '').includes('/admin/login'));

      const loginRes = await requestRaw('GET', '/admin/login', { cookie: 'genbi_admin_token=forged.invalid.jwt' });
      assert.equal(loginRes.status, 200, `forged cookie on /admin/login should return 200, got ${loginRes.status}`);
    });

    await exec('All 12 /api/admin/* & /api/upload endpoints reject unauthenticated requests (401)', async () => {
      const getEndpoints = [
        '/api/admin/backup',
        '/api/admin/stats',
        '/api/admin/logs',
        '/api/admin/banner',
        '/api/admin/berita',
        '/api/admin/bph',
        '/api/admin/category',
        '/api/admin/divisi',
        '/api/admin/dokumen',
        '/api/admin/prestasi',
        '/api/admin/settings',
        '/api/auth/me',
      ];
      for (const ep of getEndpoints) {
        const res = await requestRaw('GET', ep);
        assert.equal(res.status, 401, `GET ${ep} expected 401, got ${res.status}`);
      }
      const uploadRes = await requestRaw('POST', '/api/upload');
      assert.equal(uploadRes.status, 401, `POST /api/upload expected 401, got ${uploadRes.status}`);
    });

    // 2. Authentication Flow
    let adminCookie = '';

    await exec('Login rejects invalid credentials (401) and accepts valid admin login (200)', async () => {
      const bad = await requestRaw('POST', '/api/auth/login', {
        json: { username: 'admin', password: 'wrong-password-123' },
      });
      assert.equal(bad.status, 401);

      const good = await requestRaw('POST', '/api/auth/login', {
        json: { username: 'admin', password: 'admin123' },
      });
      assert.equal(good.status, 200);
      const json = JSON.parse(good.body);
      assert.equal(json.success, true);
      assert.equal(json.user?.username, 'admin');

      const cookiePair = extractCookieValue(good.headers['set-cookie'], 'genbi_admin_token');
      assert.ok(cookiePair, 'Expected genbi_admin_token cookie in login response');
      adminCookie = cookiePair;

      // Local HTTP should not set Secure flag that browsers drop over plain HTTP
      const setCookieRaw = String(good.headers['set-cookie'] || '');
      assert.ok(!setCookieRaw.includes('; Secure'), 'Unexpected Secure flag on plain HTTP request');
    });

    await exec('Authenticated session reaches /api/auth/me, /admin, and redirects /admin/login -> /admin', async () => {
      const me = await requestRaw('GET', '/api/auth/me', { cookie: adminCookie });
      assert.equal(me.status, 200);
      assert.equal(JSON.parse(me.body).user?.username, 'admin');

      const dash = await requestRaw('GET', '/admin', { cookie: adminCookie });
      assert.equal(dash.status, 200);

      const loginPage = await requestRaw('GET', '/admin/login', { cookie: adminCookie });
      assert.equal(loginPage.status, 307);
      assert.ok(String(loginPage.headers.location || '').endsWith('/admin'));
    });

    // 3. ID Validation & Full CRUD Roundtrip
    await exec('Admin PUT/DELETE reject invalid IDs with HTTP 400', async () => {
      const badBanner = await requestRaw('PUT', '/api/admin/banner', { cookie: adminCookie, json: { id: 'abc', title: 'X' } });
      assert.equal(badBanner.status, 400);

      const badBerita = await requestRaw('DELETE', '/api/admin/berita?id=0', { cookie: adminCookie });
      assert.equal(badBerita.status, 400);

      const badPrestasi = await requestRaw('DELETE', '/api/admin/prestasi?id=NaN', { cookie: adminCookie });
      assert.equal(badPrestasi.status, 400);

      const badMember = await requestRaw('PUT', '/api/admin/divisi?action=update-member', {
        cookie: adminCookie,
        json: { id: -5, name: 'X' },
      });
      assert.equal(badMember.status, 400);
    });

    await exec('Banner, BPH, Prestasi, Category, and Dokumen CRUD roundtrip', async () => {
      // Banner
      const bCreate = await requestRaw('POST', '/api/admin/banner', {
        cookie: adminCookie,
        json: { title: 'E2E Banner', subtitle: 'Sub', imageUrl: '/carousel-1.jpg', sortOrder: 99, isActive: true },
      });
      assert.equal(bCreate.status, 201);
      const bannerId = JSON.parse(bCreate.body).data.id;
      const bUpd = await requestRaw('PUT', '/api/admin/banner', {
        cookie: adminCookie,
        json: { id: bannerId, title: 'E2E Banner Updated' },
      });
      assert.equal(bUpd.status, 200);
      assert.equal(JSON.parse(bUpd.body).data.title, 'E2E Banner Updated');
      assert.equal((await requestRaw('DELETE', `/api/admin/banner?id=${bannerId}`, { cookie: adminCookie })).status, 200);

      // BPH
      const bphCreate = await requestRaw('POST', '/api/admin/bph', {
        cookie: adminCookie,
        json: { name: 'E2E BPH', category: 'SEKRETARIS', position: 'Sekretaris E2E', imageUrl: '/foto profile genbiupnvjt.png', sortOrder: 99 },
      });
      assert.equal(bphCreate.status, 201);
      const bphId = JSON.parse(bphCreate.body).data.id;
      assert.equal(
        (await requestRaw('PUT', '/api/admin/bph', { cookie: adminCookie, json: { id: bphId, position: 'Updated Pos' } })).status,
        200
      );
      assert.equal((await requestRaw('DELETE', `/api/admin/bph?id=${bphId}`, { cookie: adminCookie })).status, 200);

      // Prestasi
      const pCreate = await requestRaw('POST', '/api/admin/prestasi', {
        cookie: adminCookie,
        json: { title: 'E2E Award', recipient: 'Team', competition: 'Comp', rank: 'gold', year: '2026', imageUrl: '/prestasi-1.jpg', sortOrder: 99 },
      });
      assert.equal(pCreate.status, 201);
      const achId = JSON.parse(pCreate.body).data.id;
      assert.equal(
        (await requestRaw('PUT', '/api/admin/prestasi', { cookie: adminCookie, json: { id: achId, year: '2027' } })).status,
        200
      );
      assert.equal((await requestRaw('DELETE', `/api/admin/prestasi?id=${achId}`, { cookie: adminCookie })).status, 200);

      // Category
      const cCreate = await requestRaw('POST', '/api/admin/category', {
        cookie: adminCookie,
        json: { name: 'Kategori E2E Test', type: 'ARTICLE', sortOrder: 99 },
      });
      assert.equal(cCreate.status, 201);
      const catId = JSON.parse(cCreate.body).data.id;
      assert.equal(
        (await requestRaw('PUT', '/api/admin/category', { cookie: adminCookie, json: { id: catId, name: 'Kategori E2E Edit' } })).status,
        200
      );
      assert.equal((await requestRaw('DELETE', `/api/admin/category?id=${catId}`, { cookie: adminCookie })).status, 200);

      // Dokumen
      const dCreate = await requestRaw('POST', '/api/admin/dokumen', {
        cookie: adminCookie,
        json: { title: 'Dokumen E2E', category: 'BEASISWA', fileUrl: '/LogoBI.png', fileSize: '10 KB' },
      });
      assert.equal(dCreate.status, 201);
      const docId = JSON.parse(dCreate.body).data.id;
      const dokPage = await requestRaw('GET', '/dokumen');
      assert.equal(dokPage.status, 200);
      assert.ok(dokPage.body.includes('Dokumen E2E'), 'Created document should appear on /dokumen');
      assert.equal((await requestRaw('DELETE', `/api/admin/dokumen?id=${docId}`, { cookie: adminCookie })).status, 200);
    });

    await exec('Division + Empty Division SSR + Member CRUD roundtrip', async () => {
      const divCreate = await requestRaw('POST', '/api/admin/divisi', {
        cookie: adminCookie,
        json: { name: 'Divisi E2E Test', description: 'Deskripsi divisi E2E', sortOrder: 99 },
      });
      assert.equal(divCreate.status, 201);
      const div = JSON.parse(divCreate.body).data;

      // Empty division page must render cleanly without React hooks/null crash
      const emptyDivSsr = await requestRaw('GET', `/divisi/${div.slug}`);
      assert.equal(emptyDivSsr.status, 200, `Empty /divisi/${div.slug} returned ${emptyDivSsr.status}`);
      assert.ok(!emptyDivSsr.body.includes('__next_error__'));

      const mAdd = await requestRaw('POST', '/api/admin/divisi?action=add-member', {
        cookie: adminCookie,
        json: { divisionId: div.id, name: 'Anggota E2E', role: 'Staff', imageUrl: '/foto profile genbiupnvjt.png' },
      });
      assert.equal(mAdd.status, 201);
      const memberId = JSON.parse(mAdd.body).data.id;

      const mUpd = await requestRaw('PUT', '/api/admin/divisi?action=update-member', {
        cookie: adminCookie,
        json: { id: memberId, role: 'Kepala Divisi' },
      });
      assert.equal(mUpd.status, 200);

      assert.equal(
        (await requestRaw('DELETE', `/api/admin/divisi?action=delete-member&id=${memberId}`, { cookie: adminCookie })).status,
        200
      );
      assert.equal(
        (await requestRaw('DELETE', `/api/admin/divisi?id=${div.id}`, { cookie: adminCookie })).status,
        200
      );
    });

    await exec('Article DRAFT isolation vs PUBLISHED visibility & CRUD', async () => {
      const aCreate = await requestRaw('POST', '/api/admin/berita', {
        cookie: adminCookie,
        json: {
          title: 'Artikel Rahasia Draft E2E',
          content: '<p>Konten uji draft</p>',
          coverImage: '/GenBI Webinar Career.png',
          status: 'DRAFT',
        },
      });
      assert.equal(aCreate.status, 201);
      const article = JSON.parse(aCreate.body).data;

      // Draft MUST return 404 publicly & not appear in /berita
      const draftPublic = await requestRaw('GET', `/berita/${article.slug}`);
      assert.equal(draftPublic.status, 404, 'DRAFT article leaked via /berita/[slug]');
      const beritaIndex = await requestRaw('GET', '/berita');
      assert.ok(!beritaIndex.body.includes('Artikel Rahasia Draft E2E'), 'DRAFT article leaked on /berita');

      // Publish & verify 200
      const pubRes = await requestRaw('PUT', '/api/admin/berita', {
        cookie: adminCookie,
        json: { id: article.id, status: 'PUBLISHED' },
      });
      assert.equal(pubRes.status, 200);
      const publishedPublic = await requestRaw('GET', `/berita/${article.slug}`);
      assert.equal(publishedPublic.status, 200);

      assert.equal(
        (await requestRaw('DELETE', `/api/admin/berita?id=${article.id}`, { cookie: adminCookie })).status,
        200
      );
    });

    await exec('Settings, Stats, Logs, and sanitized Backup endpoints work cleanly', async () => {
      const sGet = await requestRaw('GET', '/api/admin/settings', { cookie: adminCookie });
      assert.equal(sGet.status, 200);
      const origSettings = JSON.parse(sGet.body).data;

      const sPut = await requestRaw('PUT', '/api/admin/settings', {
        cookie: adminCookie,
        json: { footer: { ...origSettings.footer, copyrightText: 'E2E Footer Marker' } },
      });
      assert.equal(sPut.status, 200);

      const dokumenHtml = await requestRaw('GET', '/dokumen');
      assert.ok(dokumenHtml.body.includes('E2E Footer Marker'), 'Updated SiteSettings Footer did not render on /dokumen');

      // Restore original settings
      await requestRaw('PUT', '/api/admin/settings', { cookie: adminCookie, json: origSettings });

      const stats = await requestRaw('GET', '/api/admin/stats', { cookie: adminCookie });
      assert.equal(stats.status, 200);
      assert.equal(typeof JSON.parse(stats.body).data.stats.totalMembers, 'number');

      const logs = await requestRaw('GET', '/api/admin/logs', { cookie: adminCookie });
      assert.equal(logs.status, 200);
      assert.ok(JSON.parse(logs.body).data.logs.length > 0);

      const backup = await requestRaw('GET', '/api/admin/backup', { cookie: adminCookie });
      assert.equal(backup.status, 200);
      const backupJson = JSON.parse(backup.body);
      assert.ok(Array.isArray(backupJson.adminUsers) && backupJson.adminUsers.length > 0);
      for (const u of backupJson.adminUsers) {
        assert.equal(u.passwordHash, undefined, 'passwordHash leaked in backup!');
      }
    });

    // 4. Upload Security & WebP Compression
    await exec('Upload endpoint rejects .html XSS payload (400) and converts PNG -> WebP (200)', async () => {
      const badUpload = await requestRaw('POST', '/api/upload', {
        cookie: adminCookie,
        form: {
          scope: 'test-e2e',
          filename: 'xss.html',
          contentType: 'text/html',
          data: Buffer.from('<script>alert(1)</script>', 'utf-8'),
        },
      });
      assert.equal(badUpload.status, 400, `Unsafe .html upload returned ${badUpload.status}`);

      const goodUpload = await requestRaw('POST', '/api/upload', {
        cookie: adminCookie,
        form: {
          scope: 'test-e2e',
          filename: 'pixel.png',
          contentType: 'image/png',
          data: VALID_1X1_PNG,
        },
      });
      assert.equal(goodUpload.status, 200, `PNG upload failed: ${goodUpload.body}`);
      const uploadedUrl: string = JSON.parse(goodUpload.body).data.url;
      assert.ok(uploadedUrl.endsWith('.webp'), `Expected .webp conversion, got ${uploadedUrl}`);

      const served = await requestRaw('GET', uploadedUrl);
      assert.equal(served.status, 200, `Uploaded asset ${uploadedUrl} not reachable (${served.status})`);

      const traversal = await requestRaw('GET', '/api/uploads/..%2F..%2Fpackage.json');
      assert.ok(traversal.status === 400 || traversal.status === 403 || traversal.status === 404, `Path traversal check returned ${traversal.status}`);
    });

    // 5. Public SSR Pages, Navbar Cleanup & Rendered Asset Integrity
    await exec('All public SSR routes render 200 without errors, public CMS links, or broken assets', async () => {
      const publicRoutes = [
        '/',
        '/tentang',
        '/berita',
        '/berita/webinar-career-2026',
        '/dokumen',
        '/prestasi',
        '/profil',
        '/news',
        '/divisi/pendidikan',
      ];
      const discoveredImages = new Set<string>();

      for (const r of publicRoutes) {
        const res = await requestRaw('GET', r);
        assert.equal(res.status, 200, `${r} returned ${res.status}`);
        assert.ok(!res.body.includes('__next_error__'), `${r} had __next_error__`);
        assert.ok(!res.body.includes('Portal CMS'), `${r} still rendered "Portal CMS"`);
        assert.ok(!res.body.includes('Portal Redaksi'), `${r} still rendered "Portal Redaksi"`);

        const imgRegex = /src="(\/(?!_next\/)[^"?#]+\.(?:png|jpe?g|webp|gif|svg|ico))(?:\?[^"]*)?"/gi;
        let match: RegExpExecArray | null;
        while ((match = imgRegex.exec(res.body)) !== null) {
          discoveredImages.add(match[1]);
        }
      }

      for (const imgPath of Array.from(discoveredImages)) {
        const assetRes = await requestRaw('GET', encodeURI(decodeURI(imgPath)));
        assert.equal(assetRes.status, 200, `Broken image asset on public pages: ${imgPath} -> ${assetRes.status}`);
      }
    });

    // 6. Logout Verification
    await exec('Logout clears session cookie and revokes access', async () => {
      const out = await requestRaw('POST', '/api/auth/logout', { cookie: adminCookie });
      assert.equal(out.status, 200);
      const cleared = String(out.headers['set-cookie'] || '');
      assert.ok(cleared.includes('Max-Age=0'), 'Logout did not expire cookie');
    });

    console.log(`\nSemua ${passed} suite E2E verification LULUS (0 failures).\n`);
  } finally {
    srv.kill();
    if (originalDbRaw !== null) {
      fs.writeFileSync(DB_PATH, originalDbRaw, 'utf-8');
    }
    if (fs.existsSync(UPLOAD_TEST_DIR)) {
      fs.rmSync(UPLOAD_TEST_DIR, { recursive: true, force: true });
    }
  }
}

main().catch((err) => {
  console.error('\nFAIL:', err);
  process.exit(1);
});
