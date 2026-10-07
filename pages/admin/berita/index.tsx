import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import FileUpload from '@/components/admin/FileUpload';
import RichEditor from '@/components/admin/RichEditor';
import { exportToCsv } from '@/lib/export';
import {
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Calendar,
  User,
  Loader2,
  Search,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  X,
  Eye,
  Download,
  Clock,
  FileText,
} from 'lucide-react';
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
  const [categories, setCategories] = useState<Array<{ name: string; slug: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  // Modal mode: 'edit' or 'preview'
  const [modalMode, setModalMode] = useState<'edit' | 'preview'>('edit');

  // Search, Filter & Pagination
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Delete Modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [targetDelete, setTargetDelete] = useState<Article | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Edukasi BI & CBP Rupiah');
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

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/category?type=ARTICLE');
      const json = await res.json();
      if (json.success && json.data?.length > 0) {
        setCategories(json.data);
      } else {
        setCategories([
          { name: 'Edukasi BI & CBP Rupiah', slug: 'edukasi-bi' },
          { name: 'Sosial Lingkungan', slug: 'sosial-lingkungan' },
          { name: 'Ekonomi Kreatif & UMKM', slug: 'ekonomi-kreatif' },
          { name: 'Rilis Kegiatan & Proker', slug: 'rilis-kegiatan' },
          { name: 'Opini & Artikel Anggota', slug: 'opini-anggota' },
        ]);
      }
    } catch (e) {
      setCategories([
        { name: 'Edukasi BI & CBP Rupiah', slug: 'edukasi-bi' },
        { name: 'Sosial Lingkungan', slug: 'sosial-lingkungan' },
        { name: 'Ekonomi Kreatif & UMKM', slug: 'ekonomi-kreatif' },
      ]);
    }
  };

  useEffect(() => {
    fetchArticles();
    fetchCategories();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setTitle('');
    setCategory(categories[0]?.name || 'Edukasi BI & CBP Rupiah');
    setAuthor('Humas GenBI');
    setExcerpt('');
    setCoverImage('');
    setContent('');
    setStatus('PUBLISHED');
    setModalMode('edit');
    setModalOpen(true);
  };

  const openEditModal = (article: Article) => {
    setEditingId(article.id);
    setTitle(article.title);
    setCategory(article.category);
    setAuthor(article.author);
    setExcerpt(article.excerpt);
    setCoverImage(article.coverImage);
    setContent(article.content);
    setStatus(article.status);
    setModalMode('edit');
    setModalOpen(true);
  };

  const calculateReadTime = (text: string) => {
    const plainText = text.replace(/<[^>]+>/g, ' ');
    const words = plainText.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 180));
    return `${minutes} menit baca`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !excerpt || !content || !coverImage) {
      toast.error('Judul, ringkasan, cover foto, dan isi artikel wajib diisi');
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
        excerpt,
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

      toast.success(editingId ? 'Artikel berhasil diperbarui' : 'Artikel baru berhasil diterbitkan');
      setModalOpen(false);
      fetchArticles();
    } catch (err: any) {
      toast.error(err.message || 'Gagal menyimpan artikel');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!targetDelete) return;

    try {
      const res = await fetch(`/api/admin/berita?id=${targetDelete.id}`, { method: 'DELETE' });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message);

      toast.success(`Artikel "${targetDelete.title}" berhasil dihapus`);
      setDeleteModalOpen(false);
      setTargetDelete(null);
      fetchArticles();
    } catch (e: any) {
      toast.error(e.message || 'Gagal menghapus artikel');
    }
  };

  const handleExport = () => {
    try {
      exportToCsv(
        'Daftar_Publikasi_Berita_GenBI_UPNVJT',
        articles,
        [
          { header: 'ID', key: 'id' },
          { header: 'Judul Berita', key: 'title' },
          { header: 'Kategori', key: 'category' },
          { header: 'Penulis', key: 'author' },
          { header: 'Status', key: 'status' },
          { header: 'Tanggal Publikasi', key: (a) => formatDate(a.publishedAt) },
          { header: 'Slug URL', key: 'slug' },
          { header: 'Ringkasan', key: 'excerpt' },
        ]
      );
      toast.success('Data artikel berita berhasil diunduh (CSV/Excel)');
    } catch (e: any) {
      toast.error(e.message || 'Gagal mengekspor data');
    }
  };

  // Filter & Pagination Logic
  const filteredArticles = articles.filter((a) => {
    const matchCategory = selectedCategory === 'ALL' || a.category === selectedCategory;
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      a.author.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage) || 1;
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <AdminLayout
      title="Manajemen Berita & Publikasi"
      subtitle="Kelola siaran pers, artikel kegiatan, diseminasi CBP Rupiah, dan edukasi kebijakan Bank Indonesia."
      action={
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-xs transition-all"
            title="Download CSV / Excel"
          >
            <Download size={14} className="text-slate-500" />
            <span>Ekspor CSV</span>
          </button>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] hover:from-[#0369A1] hover:to-[#0284C7] text-white font-bold text-xs shadow-sm shadow-sky-500/25 transition-all"
          >
            <Plus size={15} />
            <span>Tulis Berita Baru</span>
          </button>
        </div>
      }
    >
      <Head>
        <title>Kelola Berita - Admin GenBIHub</title>
      </Head>

      <div className="space-y-5">
        {/* ================= 1. SEARCH & CATEGORY FILTER BAR ================= */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30"
            >
              <option value="ALL">Semua Kategori ({articles.length})</option>
              {categories.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name} ({articles.filter((a) => a.category === c.name).length})
                </option>
              ))}
            </select>
          </div>

          <div className="relative w-full md:w-80">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari judul, ringkasan, atau penulis..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30"
            />
          </div>
        </div>

        {/* ================= 2. ARTICLES DATA TABLE ================= */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-5">Cover</th>
                  <th className="py-3.5 px-5">Judul & Ringkasan</th>
                  <th className="py-3.5 px-5">Kategori</th>
                  <th className="py-3.5 px-5">Penulis</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5">Tanggal</th>
                  <th className="py-3.5 px-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      Memuat daftar artikel...
                    </td>
                  </tr>
                ) : paginatedArticles.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      Tidak ada artikel berita yang ditemukan.
                    </td>
                  </tr>
                ) : (
                  paginatedArticles.map((article) => (
                    <tr key={article.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-5">
                        <div className="w-14 h-10 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                          <img
                            src={article.coverImage}
                            alt={article.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as any).src = '/berita-1.jpg';
                            }}
                          />
                        </div>
                      </td>
                      <td className="py-3 px-5 max-w-sm">
                        <p className="font-bold text-slate-900 leading-snug line-clamp-1">{article.title}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{article.excerpt}</p>
                      </td>
                      <td className="py-3 px-5">
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">
                          {article.category}
                        </span>
                      </td>
                      <td className="py-3 px-5 text-slate-600 font-medium">{article.author}</td>
                      <td className="py-3 px-5">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            article.status === 'PUBLISHED'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/80'
                              : 'bg-amber-50 text-amber-700 border border-amber-200/80'
                          }`}
                        >
                          {article.status}
                        </span>
                      </td>
                      <td className="py-3 px-5 text-[11px] text-slate-500">{formatDate(article.publishedAt)}</td>
                      <td className="py-3 px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/berita/${article.slug}`}
                            target="_blank"
                            title="Lihat Halaman Publik"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-[#0284C7] hover:bg-sky-50 transition-colors"
                          >
                            <ExternalLink size={14} />
                          </Link>
                          <button
                            onClick={() => openEditModal(article)}
                            title="Edit Artikel"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-[#0284C7] hover:bg-sky-50 transition-colors"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => {
                              setTargetDelete(article);
                              setDeleteModalOpen(true);
                            }}
                            title="Hapus Artikel"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Menampilkan halaman <span className="font-bold text-slate-900">{currentPage}</span> dari{' '}
                <span className="font-bold text-slate-900">{totalPages}</span>
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                      currentPage === i + 1
                        ? 'bg-gradient-to-r from-[#0284C7] to-[#0EA5E9] text-white shadow-sm'
                        : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ================= 3. MODAL FORM CREATE / EDIT WITH LIVE PREVIEW TAB ================= */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6 sm:p-7 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200 my-8 max-h-[92vh] overflow-y-auto">
            {/* Header with Switcher Tabs */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-1 bg-slate-100 rounded-xl flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setModalMode('edit')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      modalMode === 'edit'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Form Editor
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalMode('preview')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      modalMode === 'preview'
                        ? 'bg-gradient-to-r from-[#0284C7] to-[#0EA5E9] text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Eye size={13} />
                    <span>Live Preview</span>
                  </button>
                </div>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            {/* TAB 1: FORM EDITOR */}
            {modalMode === 'edit' ? (
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Judul Berita / Rilis Pers *</label>
                  <input
                    type="text"
                    required
                    placeholder="Masukkan judul artikel yang informatif..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Kategori *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30"
                    >
                      {categories.map((c) => (
                        <option key={c.name} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Penulis / Rilis Oleh</label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Status Publikasi</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as any)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30"
                    >
                      <option value="PUBLISHED">PUBLISHED (Tayang Publik)</option>
                      <option value="DRAFT">DRAFT (Simpan Dulu)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Ringkasan Singkat (Excerpt) *</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Ringkasan 1-2 kalimat untuk preview di beranda website..."
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30"
                  />
                </div>

                {/* Upload Cover Image */}
                <FileUpload
                  label="Foto Sampul / Dokumentasi Berita *"
                  value={coverImage}
                  onChange={setCoverImage}
                  scope="berita"
                  aspectRatio={16 / 9}
                  helperText="Format lanskap 16:9 disarankan untuk tampilan kartu berita yang proporsional"
                />

                {/* Rich Editor for Content */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700">Isi Lengkap Berita *</label>
                    <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                      <Clock size={12} /> {calculateReadTime(content)}
                    </span>
                  </div>
                  <RichEditor value={content} onChange={setContent} />
                </div>

                <div className="pt-4 flex items-center justify-end gap-2.5 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] hover:from-[#0369A1] hover:to-[#0284C7] text-white font-bold text-xs shadow-sm shadow-sky-500/25 flex items-center gap-2 disabled:opacity-50 transition-all"
                  >
                    {saving && <Loader2 size={14} className="animate-spin" />}
                    {editingId ? 'Simpan Perubahan' : 'Terbitkan Berita'}
                  </button>
                </div>
              </form>
            ) : (
              /* TAB 2: LIVE PREVIEW */
              <div className="mt-5 space-y-5 animate-in fade-in duration-200">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/90 space-y-4">
                  <div className="flex items-center gap-2 flex-wrap text-xs">
                    <span className="px-3 py-1 rounded-md font-bold bg-[#0284C7] text-white">
                      {category}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-600 font-medium">{author}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 flex items-center gap-1">
                      <Clock size={12} /> {calculateReadTime(content)}
                    </span>
                    <span
                      className={`ml-auto px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        status === 'PUBLISHED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      Status: {status}
                    </span>
                  </div>

                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                    {title || 'Judul Artikel Belum Diisi'}
                  </h1>

                  {excerpt && (
                    <p className="text-xs text-slate-600 leading-relaxed italic p-3 bg-white rounded-xl border border-slate-200/80">
                      &ldquo;{excerpt}&rdquo;
                    </p>
                  )}

                  {coverImage && (
                    <div className="w-full h-64 rounded-2xl overflow-hidden bg-slate-200 border border-slate-200 shadow-sm">
                      <img src={coverImage} alt={title} className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 prose prose-sm max-w-none text-slate-800">
                    {content ? (
                      <div dangerouslySetInnerHTML={{ __html: content }} />
                    ) : (
                      <p className="text-slate-400 italic">Belum ada isi artikel yang ditulis.</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalMode('edit')}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                  >
                    Kembali ke Editor
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit as any}
                    disabled={saving}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] text-white text-xs font-bold shadow-sm shadow-sky-500/25"
                  >
                    {editingId ? 'Simpan Perubahan' : 'Terbitkan Berita'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= 4. MODAL CONFIRM DELETE ================= */}
      {deleteModalOpen && targetDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={26} />
            </div>
            <h3 className="font-black text-slate-900 text-base mb-1">Konfirmasi Hapus Berita</h3>
            <p className="text-xs text-slate-500 mb-5 leading-relaxed">
              Apakah Anda yakin ingin menghapus artikel{' '}
              <span className="font-bold text-slate-800">"{targetDelete.title}"</span>? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex items-center justify-center gap-2.5">
              <button
                onClick={() => {
                  setDeleteModalOpen(false);
                  setTargetDelete(null);
                }}
                className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="w-1/2 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-700 shadow-md shadow-red-500/20"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
