import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import AdminLayout from '@/components/admin/AdminLayout';
import FileUpload from '@/components/admin/FileUpload';
import { Plus, Edit2, Trash2, CheckCircle2, XCircle, Image as ImageIcon, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface Banner {
  id: number;
  title: string;
  subtitle?: string | null;
  imageUrl: string;
  buttonText?: string | null;
  buttonUrl?: string | null;
  sortOrder: number;
  isActive: boolean;
}

export default function AdminBannerPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [buttonUrl, setButtonUrl] = useState('');
  const [sortOrder, setSortOrder] = useState('0');
  const [isActive, setIsActive] = useState(true);

  const fetchBanners = async () => {
    try {
      const res = await fetch('/api/admin/banner');
      const json = await res.json();
      if (json.success) setBanners(json.data);
    } catch (e) {
      toast.error('Gagal mengambil data banner');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setTitle('');
    setSubtitle('');
    setImageUrl('');
    setButtonText('');
    setButtonUrl('');
    setSortOrder('0');
    setIsActive(true);
    setModalOpen(true);
  };

  const openEditModal = (b: Banner) => {
    setEditingId(b.id);
    setTitle(b.title);
    setSubtitle(b.subtitle || '');
    setImageUrl(b.imageUrl);
    setButtonText(b.buttonText || '');
    setButtonUrl(b.buttonUrl || '');
    setSortOrder(String(b.sortOrder));
    setIsActive(b.isActive);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) {
      toast.error('Judul dan gambar banner wajib diisi');
      return;
    }

    setSaving(true);
    try {
      const method = editingId ? 'PUT' : 'POST';
      const body = {
        ...(editingId && { id: editingId }),
        title,
        subtitle: subtitle || null,
        imageUrl,
        buttonText: buttonText || null,
        buttonUrl: buttonUrl || null,
        sortOrder: Number(sortOrder) || 0,
        isActive,
      };

      const res = await fetch('/api/admin/banner', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message);

      toast.success(editingId ? 'Banner berhasil diperbarui' : 'Banner berhasil ditambahkan');
      setModalOpen(false);
      fetchBanners();
    } catch (err: any) {
      toast.error(err.message || 'Gagal menyimpan');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus banner ini?')) return;

    try {
      const res = await fetch(`/api/admin/banner?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message);

      toast.success('Banner dihapus');
      fetchBanners();
    } catch (e: any) {
      toast.error(e.message || 'Gagal menghapus');
    }
  };

  return (
    <AdminLayout
      title="Manajemen Banner Hero"
      subtitle="Atur gambar carousel dan teks utama yang tampil di beranda website"
      action={
        <button
          type="button"
          onClick={openCreateModal}
          className="px-4 py-2 bg-[#0B1F40] hover:bg-[#16386e] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Plus size={15} className="text-[#EAB308]" /> Tambah Banner
        </button>
      }
    >
      <Head>
        <title>Banner Hero - GenBIHub CMS</title>
      </Head>

      {/* Grid of Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full p-8 text-center text-xs text-slate-400">Memuat data banner...</div>
        ) : banners.length > 0 ? (
          banners.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
                <img src={b.imageUrl} alt={b.title} className="w-full h-full object-cover" />
                <div className="absolute top-2.5 right-2.5">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                      b.isActive
                        ? 'bg-emerald-500/90 text-white backdrop-blur-sm'
                        : 'bg-slate-700/80 text-white backdrop-blur-sm'
                    }`}
                  >
                    {b.isActive ? <CheckCircle2 size={11} /> : <XCircle size={11} />}
                    {b.isActive ? 'Aktif' : 'Nonaktif'}
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Urutan ke-{b.sortOrder}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm mt-0.5 line-clamp-1">{b.title}</h3>
                  {b.subtitle && <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{b.subtitle}</p>}
                </div>

                <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-100">
                  <span className="text-[11px] text-blue-600 font-medium truncate max-w-[120px]">
                    {b.buttonUrl || '-'}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => openEditModal(b)}
                      className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      title="Edit"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(b.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      title="Hapus"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full p-12 text-center bg-white rounded-2xl border border-slate-200">
            <p className="text-sm font-semibold text-slate-700">Belum ada banner terdaftar</p>
            <p className="text-xs text-slate-400 mt-1">Tambahkan banner baru untuk beranda utama website</p>
          </div>
        )}
      </div>

      {/* MODAL FORM */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-slate-900 mb-1">
              {editingId ? 'Edit Banner Hero' : 'Tambah Banner Hero Baru'}
            </h2>
            <p className="text-xs text-slate-400 mb-6">Pastikan gambar proporsional landscape (16:9)</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Judul Banner *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Generasi Baru Indonesia"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subjudul / Deskripsi Singkat</label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Energi untuk Negeri"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>

              {/* Upload Foto Banner with 16:9 crop */}
              <FileUpload
                value={imageUrl}
                onChange={setImageUrl}
                scope="banner"
                aspectRatio={16 / 9}
                label="Foto Banner (Rasio 16:9) *"
                helperText="Pilih atau geser gambar banner untuk otomatis di-crop ke rasio 16:9"
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Teks Tombol CTA</label>
                  <input
                    type="text"
                    value={buttonText}
                    onChange={(e) => setButtonText(e.target.value)}
                    placeholder="Jelajahi Profil"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">URL Link Tombol</label>
                  <input
                    type="text"
                    value={buttonUrl}
                    onChange={(e) => setButtonUrl(e.target.value)}
                    placeholder="/profil"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Urutan Tampil (Sort)</label>
                  <input
                    type="number"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    Status Aktif
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 text-xs font-bold bg-[#0B1F40] hover:bg-[#16386e] text-white rounded-xl flex items-center gap-1.5 shadow-sm disabled:opacity-50"
                >
                  {saving && <Loader2 size={14} className="animate-spin" />}
                  <span>{editingId ? 'Simpan Perubahan' : 'Terbitkan Banner'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
