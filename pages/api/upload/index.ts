import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import crypto from 'crypto';
import { getAuthUser } from '@/lib/auth';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Check auth
  const user = getAuthUser(req);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Harap login terlebih dahulu' });
  }

  const uploadTempDir = path.join(process.cwd(), 'public', 'uploads', 'tmp');
  if (!fs.existsSync(uploadTempDir)) {
    fs.mkdirSync(uploadTempDir, { recursive: true });
  }

  const form = formidable({
    multiples: false,
    uploadDir: uploadTempDir,
    keepExtensions: true,
    maxFileSize: 25 * 1024 * 1024, // 25MB
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Upload parse error:', err);
      return res.status(400).json({ success: false, message: 'Gagal memproses file upload' });
    }

    try {
      const scopeField = Array.isArray(fields.scope) ? fields.scope[0] : fields.scope;
      const scope = (scopeField || 'general').replace(/[^a-zA-Z0-9_-]/g, '');

      const fileObj = Array.isArray(files.file) ? files.file[0] : files.file;
      if (!fileObj) {
        return res.status(400).json({ success: false, message: 'Tidak ada file yang diunggah' });
      }

      const originalFilename = fileObj.originalFilename || 'upload.bin';
      const ext = path.extname(originalFilename).toLowerCase();
      const mime = fileObj.mimetype || '';
      const uniqueId = crypto.randomUUID();

      const targetDir = path.join(process.cwd(), 'public', 'uploads', scope);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      let finalFilename = `${uniqueId}${ext}`;
      let finalPath = path.join(targetDir, finalFilename);
      let returnUrl = `/uploads/${scope}/${finalFilename}`;

      const isImage = mime.startsWith('image/') || ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext);
      const isGif = ext === '.gif' || mime === 'image/gif';

      if (isImage && !isGif) {
        // Convert to WebP via Sharp for superior performance & compression
        finalFilename = `${uniqueId}.webp`;
        finalPath = path.join(targetDir, finalFilename);
        returnUrl = `/uploads/${scope}/${finalFilename}`;

        await sharp(fileObj.filepath)
          .rotate() // Auto-orient according to EXIF
          .webp({ quality: 82 })
          .toFile(finalPath);

        // Remove temp file
        try {
          fs.unlinkSync(fileObj.filepath);
        } catch (e) {}
      } else {
        // PDF or GIF or other files: move as-is
        fs.renameSync(fileObj.filepath, finalPath);
      }

      const fileStats = fs.statSync(finalPath);
      const sizeInMb = (fileStats.size / (1024 * 1024)).toFixed(1);

      return res.status(200).json({
        success: true,
        data: {
          url: returnUrl,
          filename: finalFilename,
          originalName: originalFilename,
          size: fileStats.size,
          sizeFormatted: `${sizeInMb} MB`,
        },
      });
    } catch (processError: any) {
      console.error('File processing error:', processError);
      return res.status(500).json({ success: false, message: 'Gagal memproses dan mengompres file' });
    }
  });
}
