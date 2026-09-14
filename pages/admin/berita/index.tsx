import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import AdminLayout from '@/components/admin/AdminLayout';
import FileUpload from '@/components/admin/FileUpload';
import RichEditor from '@/components/admin/RichEditor';
import { Plus, Edit2, Trash2, ExternalLink, Newspaper, Calendar, User, Loader2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { toast } from 'sonner';

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  author: string;
  status: 'DRAFT' | 'PUBLISHED';
  publishedAt: string;
}

export default function AdminBeritaPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Edukasi');
  const [author, setAuthor] = useState('Humas GenBI');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED'>('PUBLISHED');

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/admin/berita');
      const json = await res.json();
      if (json.success) setArticles(json.data);
    } catch (e) {
      toast.error('Gagal mengambil data berita');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setTitle('');
    setCategory('Edukasi');
    setAuthor('Humas GenBI');
    setExcerpt('');
    setCoverImage('');
    setContent('<p>Tulis isi lengkap berita atau publikasi di sini...</p>');
    setStatus('PUBLISHED');
    setModalOpen(true);
  };

  const openEditModal = (a: Article) => {
    setEditingId(a.id);
    setTitle(a.title);
    setCategory(a.category);
    setAuthor(a.author);
    setExcerpt(a.excerpt);
    setCoverImage(a.coverImage);
    setContent(a.content);
    setStatus(a.status);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !coverImage || !content) {
      toast.error('Judul, cover image, dan isi artikel wajib diisi');
      return;
    }

    setSaving(true);
    try {
      const method = editingId ? 'PUT' : 'POST';
      const body = {
        ...(editingId && { id: editingId }),
        title,
        category,
        author,
        excerpt: excerpt || title.substring(0, 150),
        coverImage,
        content,
        status,
      };

      const res = await fetch('/api/admin/berita', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message);

      toast.success(editingId ? 'Berita diperbarui' : 'Berita berhasil diterbitkan');
      setModalOpen(false);
      fetchArticles();
    } catch (err: any) {
      toast.error(err.message || 'Gagal menyimpan');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus artikel ini?')) return;

    try {
      const res = await fetch(`/api/admin/berita?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message);

      toast.success('Artikel dihapus');
      fetchArticles();
    } catch (e: any) {
      toast.error(e.message || 'Gagal menghapus');
    }
  };

  return (
    <AdminLayout
      title="Berita & Artikel Publikasi"
      subtitle="Tulis berita, pengumuman beasiswa, dan dokumentasi aksi nyata GenBI"
      action={
        <button
          type="button"
          onClick={openCreateModal}
          className="px-4 py-2 bg-[#0B1F40] hover:bg-[#16386e] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Plus size={15} className="text-[#EAB308]" /> Tulis Berita Baru
        </button>
      }
    >
      <Head>
        <title>Berita & Artikel - GenBIHub CMS</title>
      </Head>

      {/* Articles Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-4">Artikel / Judul</th>
                <th className="py-3.5 px-4">Kategori</th>
                <th className="py-3.5 px-4">Penulis</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Tanggal Terbit</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    Memuat daftar artikel...
                  </td>
                </tr>
              ) : articles.length > 0 ? (
                articles.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3 min-w-[240px]">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0">
                          <img src={a.coverImage} alt={a.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 truncate max-w-sm">{a.title}</p>
                          <p className="text-[11px] text-slate-400 font-mono mt-0.5">/berita/{a.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        {a.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700">{a.author}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          a.status === 'PUBLISHED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {a.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-medium">{formatDate(a.publishedAt)}</td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <a
                          href={`/berita/${a.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"
                          title="Lihat di Web"
                        >
                          <ExternalLink size={14} />
                        </a>
                        <button
                          type="button"
                          onClick={() => openEditModal(a)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="Edit"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(a.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                          title="Hapus"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    Belum ada artikel yang diterbitkan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FULL-SIZE MODAL FORM WRITER */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6 shadow-2xl border border-slate-200 max-h-[95vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {editingId ? 'Edit Artikel Berita' : 'Tulis Berita / Pengumuman Baru'}
                </h2>
                <p className="text-xs text-slate-400">Format konten menggunakan editor visual interaktif</p>
              </div>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 bg-white"
              >
                <option value="PUBLISHED">Publikasikan Langsung</option>
                <option value="DRAFT">Simpan Sebagai Draft</option>
              </select>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Judul Artikel *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Misal: Future Scholar Talk: Strategi Jitu Raih Beasiswa BI"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kategori Artikel *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600 bg-white"
                  >
                    <option value="Edukasi">Edukasi & Beasiswa</option>
                    <option value="Ekonomi Kreatif">Ekonomi Kreatif & UMKM</option>
                    <option value="Sosial Lingkungan">Sosial Lingkungan</option>
                    <option value="Keuangan">Finansial & Investasi</option>
                    <option value="Kebanksentralan">Kebanksentralan & Rupiah</option>
                    <option value="Umum">Umum & Kegiatan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Penulis / Departemen</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Divisi Pendidikan / Humas GenBI"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Cover Image Upload (16:9 crop) */}
              <FileUpload
                value={coverImage}
                onChange={setCoverImage}
                scope="berita"
                aspectRatio={16 / 9}
                label="Cover Image Artikel (Rasio 16:9) *"
                helperText="Gambar sampul utama yang akan muncul di kartu berita dan preview media sosial"
              />

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ringkasan Singkat (Excerpt)</label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Ringkasan 1-2 kalimat untuk preview di beranda..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600"
                />
              </div>

              {/* Rich Editor for full body */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Konten Lengkap Berita *</label>
                <RichEditor value={content} onChange={setContent} />
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
                  className="px-6 py-2.5 text-xs font-bold bg-[#0B1F40] hover:bg-[#16386e] text-white rounded-xl flex items-center gap-1.5 shadow-sm disabled:opacity-50"
                >
                  {saving && <Loader2 size={14} className="animate-spin" />}
                  <span>{editingId ? 'Simpan Perubahan' : 'Terbitkan Sekarang'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
