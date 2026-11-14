import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import os from 'os';
import path from 'path';
import sharp from 'sharp';
import crypto from 'crypto';
import { getAuthUser } from '@/lib/auth';
import { getStorageBucket, isFirebaseStorageConfigured } from '@/lib/firebase-admin';
import { put } from '@vercel/blob';

function cleanEnvValue(value?: string): string {
  return (value || '').trim().replace(/^["']|["']$/g, '');
}

function getVercelBlobToken(): string {
  return cleanEnvValue(process.env.BLOB_READ_WRITE_TOKEN);
}

function isVercelBlobConfigured(): boolean {
  return Boolean(
    getVercelBlobToken() ||
      (cleanEnvValue(process.env.VERCEL_OIDC_TOKEN) && cleanEnvValue(process.env.BLOB_STORE_ID))
  );
}

function isServerlessRuntime(): boolean {
  return Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NETLIFY);
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const user = getAuthUser(req);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Harap login terlebih dahulu' });
  }

  const uploadTempDir = path.join(os.tmpdir(), 'genbihub-uploads');
  if (!fs.existsSync(uploadTempDir)) {
    fs.mkdirSync(uploadTempDir, { recursive: true });
  }

  const form = formidable({
    multiples: false,
    uploadDir: uploadTempDir,
    keepExtensions: true,
    maxFileSize: 25 * 1024 * 1024, // 25MB
  });

  interface UploadedFile {
    filepath: string;
    originalFilename?: string | null;
    mimetype?: string | null;
  }

  let fields: Record<string, string | string[] | undefined>;
  let files: Record<string, UploadedFile | UploadedFile[] | undefined>;
  try {
    [fields, files] = (await form.parse(req)) as [typeof fields, typeof files];
  } catch (err: unknown) {
    console.error('Upload parse error:', err);
    return res.status(400).json({ success: false, message: 'Gagal memproses file upload' });
  }

  const fileObj = Array.isArray(files.file) ? files.file[0] : files.file;
  if (!fileObj) {
    return res.status(400).json({ success: false, message: 'Tidak ada file yang diunggah' });
  }

  try {
    const scopeField = Array.isArray(fields.scope) ? fields.scope[0] : fields.scope;
    const scope = (scopeField || 'general').replace(/[^a-zA-Z0-9_-]/g, '') || 'general';

    const originalFilename = fileObj.originalFilename || 'upload.bin';
    const ext = path.extname(originalFilename).toLowerCase();
    const mime = (fileObj.mimetype || 'application/octet-stream').toLowerCase();
    const uniqueId = crypto.randomUUID();

    const ALLOWED_IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    const ALLOWED_DOC_EXTS = ['.pdf', '.doc', '.docx'];
    const ALLOWED_EXTS = [...ALLOWED_IMAGE_EXTS, ...ALLOWED_DOC_EXTS];

    if (!ALLOWED_EXTS.includes(ext)) {
      return res.status(400).json({
        success: false,
        message: 'Format file tidak diizinkan. Gunakan JPG, PNG, WEBP, GIF, PDF, atau DOC/DOCX.',
      });
    }

    const isImage = ALLOWED_IMAGE_EXTS.includes(ext) && (mime === '' || mime.startsWith('image/'));
    const isDoc =
      ALLOWED_DOC_EXTS.includes(ext) &&
      (mime === '' ||
        mime === 'application/pdf' ||
        mime === 'application/msword' ||
        mime === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        mime === 'application/octet-stream');

    if (!isImage && !isDoc) {
      return res.status(400).json({
        success: false,
        message: 'Tipe MIME file tidak sesuai dengan ekstensi yang diizinkan.',
      });
    }

    const isGif = ext === '.gif' || mime === 'image/gif';

    let finalFilename = `${uniqueId}${ext}`;
    let contentType = mime;
    let fileBuffer: Buffer;

    if (isImage && !isGif) {
      // Compress & convert images (non-GIF) to WebP via Sharp
      finalFilename = `${uniqueId}.webp`;
      contentType = 'image/webp';
      fileBuffer = await sharp(fileObj.filepath)
        .rotate()
        .webp({ quality: 82 })
        .toBuffer();
    } else {
      fileBuffer = await fs.promises.readFile(fileObj.filepath);
    }

    const fileSize = fileBuffer.byteLength;
    const sizeInMb = (fileSize / (1024 * 1024)).toFixed(1);
    const storagePath = `uploads/${scope}/${finalFilename}`;
    let returnUrl = '';
    let storageProvider: 'vercel-blob' | 'firebase' | 'local' = 'local';

    if (isVercelBlobConfigured()) {
      const token = getVercelBlobToken();
      const blob = await put(storagePath, fileBuffer, {
        access: 'public',
        addRandomSuffix: false,
        contentType,
        cacheControlMaxAge: 60 * 60 * 24 * 365,
        ...(token ? { token } : {}),
      });
      returnUrl = blob.url;
      storageProvider = 'vercel-blob';
    } else if (isFirebaseStorageConfigured()) {
      const bucket = getStorageBucket();
      const downloadToken = crypto.randomUUID();
      const storageFile = bucket.file(storagePath);

      await storageFile.save(fileBuffer, {
        resumable: false,
        contentType,
        metadata: {
          contentType,
          cacheControl: 'public, max-age=31536000',
          metadata: {
            firebaseStorageDownloadTokens: downloadToken,
            originalName: originalFilename,
          },
        },
      });

      returnUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(
        storagePath
      )}?alt=media&token=${downloadToken}`;
      storageProvider = 'firebase';
    } else if (isServerlessRuntime()) {
      return res.status(500).json({
        success: false,
        message:
          'Cloud storage belum dikonfigurasi untuk environment serverless. Hubungkan Vercel Blob (BLOB_READ_WRITE_TOKEN) atau isi FIREBASE_STORAGE_BUCKET.',
      });
    } else {
      // Fallback penyimpanan lokal untuk dev offline / VPS tanpa cloud storage
      const targetDir = path.join(process.cwd(), 'public', 'uploads', scope);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      const finalPath = path.join(targetDir, finalFilename);
      await fs.promises.writeFile(finalPath, fileBuffer);
      returnUrl = `/uploads/${scope}/${finalFilename}`;
    }

    return res.status(200).json({
      success: true,
      data: {
        url: returnUrl,
        filename: finalFilename,
        originalName: originalFilename,
        size: fileSize,
        sizeFormatted: `${sizeInMb} MB`,
        storage: storageProvider,
      },
    });
  } catch (processError: unknown) {
    console.error('File processing error:', processError);
    return res.status(500).json({
      success: false,
      message: 'Gagal memproses dan mengunggah file',
    });
  } finally {
    try {
      if (fileObj?.filepath && fs.existsSync(fileObj.filepath)) {
        await fs.promises.unlink(fileObj.filepath);
      }
    } catch {
      // Non-blocking temp cleanup
    }
  }
}
