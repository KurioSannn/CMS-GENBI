import React, { useState, useRef, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { UploadCloud, X, Check, Crop as CropIcon, Image as ImageIcon, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface FileUploadProps {
  value?: string | null;
  onChange: (url: string) => void;
  scope?: 'banner' | 'members' | 'berita' | 'prestasi' | 'dokumen' | 'general';
  aspectRatio?: number; // e.g. 1 for 1:1, 16/9 for 16:9
  acceptPdf?: boolean;
  label?: string;
  helperText?: string;
}

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function FileUpload({
  value,
  onChange,
  scope = 'general',
  aspectRatio,
  acceptPdf = false,
  label = 'Unggah File',
  helperText = 'Maksimal ukuran 15MB',
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>('');
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [isCroppingOpen, setIsCroppingOpen] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const onSelectFile = (file: File) => {
    if (file.type === 'application/pdf') {
      // Direct upload for PDF
      uploadDirect(file);
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Format file tidak didukung');
      return;
    }

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setImgSrc(reader.result?.toString() || '');
      setIsCroppingOpen(true);
    });
    reader.readAsDataURL(file);
  };

  const uploadDirect = async (file: File | Blob, filename: string = 'file.webp') => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file, filename);
    formData.append('scope', scope);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Gagal mengunggah');
      }

      onChange(json.data.url);
      toast.success('File berhasil diunggah!');
      setIsCroppingOpen(false);
      setImgSrc('');
    } catch (err: any) {
      toast.error(err.message || 'Gagal mengunggah file');
    } finally {
      setIsUploading(false);
    }
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (aspectRatio) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspectRatio));
    }
  };

  const generateCroppedBlob = async (): Promise<Blob | null> => {
    const image = imgRef.current;
    if (!image || !completedCrop) return null;

    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          resolve(blob);
        },
        'image/webp',
        0.88
      );
    });
  };

  const handleApplyCrop = async () => {
    if (!completedCrop) {
      // If user did not modify crop, upload as is
      if (imgSrc) {
        const res = await fetch(imgSrc);
        const blob = await res.blob();
        await uploadDirect(blob, 'upload.webp');
      }
      return;
    }

    const croppedBlob = await generateCroppedBlob();
    if (croppedBlob) {
      await uploadDirect(croppedBlob, 'cropped.webp');
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onSelectFile(acceptedFiles[0]);
    }
  }, []);

  const acceptConfig: Record<string, string[]> = acceptPdf
    ? {
        'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif'],
        'application/pdf': ['.pdf'],
      }
    : {
        'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif'],
      };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptConfig,
    multiple: false,
    maxSize: 20 * 1024 * 1024,
  });

  return (
    <div className="w-full space-y-2">
      {label && <label className="block text-sm font-semibold text-slate-700">{label}</label>}

      {/* Preview existing value */}
      {value && !isCroppingOpen && (
        <div className="relative border border-slate-200 rounded-xl p-3 bg-slate-50 flex items-center gap-4">
          {value.endsWith('.pdf') ? (
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-lg flex items-center justify-center font-bold text-xs">
              PDF
            </div>
          ) : (
            <div className="relative w-20 h-20 bg-slate-200 rounded-lg overflow-hidden border border-slate-300">
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-800 truncate">{value}</p>
            <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1 mt-1">
              <Check size={12} /> File aktif terpasang
            </p>
          </div>
          <button
            type="button"
            onClick={() => onChange('')}
            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
            title="Hapus / Ganti"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Dropzone Upload Box */}
      {!value && !isCroppingOpen && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
            isDragActive
              ? 'border-blue-500 bg-blue-50/50'
              : 'border-slate-300 hover:border-slate-400 bg-slate-50/50 hover:bg-slate-50'
          }`}
        >
          <input {...getInputProps()} />
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            {isUploading ? <Loader2 size={24} className="animate-spin" /> : <UploadCloud size={24} />}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-700">
              {isDragActive ? 'Lepaskan file di sini' : 'Klik atau drag foto / file ke sini'}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">{helperText}</p>
          </div>
        </div>
      )}

      {/* Cropper Modal Interface */}
      {isCroppingOpen && imgSrc && (
        <div className="border border-blue-200 bg-white rounded-xl p-4 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
              <CropIcon size={16} className="text-blue-600" />
              <span>Sesuaikan Potongan Foto (Crop)</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsCroppingOpen(false);
                setImgSrc('');
              }}
              className="text-slate-400 hover:text-slate-600"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex justify-center max-h-[380px] overflow-auto bg-slate-900/5 rounded-lg p-2">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspectRatio}
            >
              <img
                ref={imgRef}
                src={imgSrc}
                alt="Crop preview"
                onLoad={onImageLoad}
                style={{ maxHeight: '340px', width: 'auto' }}
              />
            </ReactCrop>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-500">
              {aspectRatio ? `Rasio terkunci: ${aspectRatio === 1 ? '1:1 (Persegi)' : '16:9 (Landscape)'}` : 'Rasio Bebas'}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsCroppingOpen(false);
                  setImgSrc('');
                }}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={isUploading}
                onClick={handleApplyCrop}
                className="px-4 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50"
              >
                {isUploading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>Mengunggah...</span>
                  </>
                ) : (
                  <>
                    <Check size={14} />
                    <span>Terapkan & Simpan</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
