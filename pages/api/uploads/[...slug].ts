import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const MIME_TYPES: Record<string, string> = {
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

export const config = {
  api: {
    responseLimit: false,
  },
};

/**
 * Dynamically serves runtime-uploaded local files under `public/uploads/`
 * so newly uploaded assets are immediately reachable in `next start` production mode.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return res.status(405).end('Method Not Allowed');
  }

  const rawSlug = req.query.slug;
  const segments = Array.isArray(rawSlug) ? rawSlug : rawSlug ? [rawSlug] : [];
  if (
    segments.length === 0 ||
    segments.some((seg) => !seg || seg === '.' || seg === '..' || seg.includes('\0') || seg.includes('\\') || seg.includes('/'))
  ) {
    return res.status(400).end('Bad Request');
  }

  const uploadsRoot = path.resolve(process.cwd(), 'public', 'uploads');
  const candidatePath = path.resolve(uploadsRoot, ...segments);

  const isWithinRoot = (root: string, target: string): boolean => {
    const rel = path.relative(root, target);
    return Boolean(rel && !rel.startsWith('..') && !path.isAbsolute(rel));
  };

  if (!isWithinRoot(uploadsRoot, candidatePath)) {
    return res.status(403).end('Forbidden');
  }

  try {
    const [realRoot, realTarget] = await Promise.all([
      fs.promises.realpath(uploadsRoot),
      fs.promises.realpath(candidatePath),
    ]);

    if (!isWithinRoot(realRoot, realTarget)) {
      return res.status(403).end('Forbidden');
    }

    const stat = await fs.promises.stat(realTarget);
    if (!stat.isFile()) {
      return res.status(404).end('Not Found');
    }

    const ext = path.extname(realTarget).toLowerCase();
    const contentType = MIME_TYPES[ext];
    if (!contentType) {
      return res.status(404).end('Not Found');
    }

    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.setHeader('X-Content-Type-Options', 'nosniff');

    if (req.method === 'HEAD') {
      return res.status(200).end();
    }

    await new Promise<void>((resolve) => {
      const stream = fs.createReadStream(realTarget);
      stream.on('end', () => resolve());
      res.on('close', () => {
        stream.destroy();
        resolve();
      });
      stream.on('error', () => {
        if (!res.headersSent) {
          res.status(500).end('Internal Server Error');
        } else {
          res.end();
        }
        resolve();
      });
      stream.pipe(res);
    });
  } catch {
    if (!res.headersSent) {
      return res.status(404).end('Not Found');
    }
  }
}
