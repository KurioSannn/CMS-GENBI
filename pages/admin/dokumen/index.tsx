import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import AdminLayout from '@/components/admin/AdminLayout';
import FileUpload from '@/components/admin/FileUpload';
import {
  Plus,
  Trash2,
  FileText,
  ExternalLink,
  Download,
  Loader2,
  Search,
  Filter,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  X,
  Edit2,
  FileCheck,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { toast } from 'sonner';

interface DocumentArchive {
  id: number;
  title: string;
  category: string;
  fileUrl: string;
  fileSize?: string | null;
  description?: string | null;
  publishedAt: string;
}

export default function AdminDokumenPage() {
  const [documents, setDocuments] = useState<DocumentArchive[]>([]);
  const [categories, setCategories] = useState<Array<{ name: string; slug: string }>>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Search & Filter & Pagination
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Delete Modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [targetDelete, setTargetDelete] = useState<DocumentArchive | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Panduan Beasiswa BI');
  const [fileUrl, setFileUrl] = useState('');
  const [fileSize, setFileSize] = useState('1.5 MB');
  const [description, setDescription] = useState('');

  const fetchDocuments = async () => {
    try {
      const res = await fetch('/api/admin/dokumen');
      const json = await res.json();
      if (json.success) setDocuments(json.data);
    } catch (e) {
      toast.error('Gagal mengambil dokumen');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/category?type=DOCUMENT');
      const json = await res.json();
      if (json.success && json.data?.length > 0) {
        setCategories(json.data);
      } else {
        setCategories([
          { name: 'SK & Surat Keputusan', slug: 'sk-resmi' },
          { name: 'Laporan Pertanggungjawaban (LPJ)', slug: 'lpj-divisi' },
          { name: 'Panduan Beasiswa BI', slug: 'panduan-beasiswa' },
          { name: 'Template & Format Proposal', slug: 'template-proposal' },
          { name: 'AD/ART & Tata Tertib', slug: 'ad-art' },
        ]);
      }
    } catch (e) {
      setCategories([
        { name: 'SK & Surat Keputusan', slug: 'sk-resmi' },
        { name: 'Laporan Pertanggungjawaban (LPJ)', slug: 'lpj-divisi' },
        { name: 'Panduan Beasiswa BI', slug: 'panduan-beasiswa' },
      ]);
    }
  };

  useEffect(() => {
    fetchDocuments();
    fetchCategories();
  }, []);

  const openCreateModal = () => {
    setTitle('');
    setCategory(categories[0]?.name || 'Panduan Beasiswa BI');
    setFileUrl('');
    setFileSize('1.2 MB');
    setDescription('');
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !fileUrl) {
      toast.error('Judul dan file dokumen wajib diisi');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/dokumen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          fileUrl,
          fileSize: fileSize || '1.0 MB',
          description: description || null,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message);

      toast.success('Dokumen berhasil diunggah ke arsip');
      setModalOpen(false);
      fetchDocuments();
    } catch (err: any) {
      toast.error(err.message || 'Gagal menyimpan dokumen');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!targetDelete) return;

    try {
      const res = await fetch(`/api/admin/dokumen?id=${targetDelete.id}`, { method: 'DELETE' });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message);

      toast.success(`Dokumen "${targetDelete.title}" berhasil dihapus`);
      setDeleteModalOpen(false);
      setTargetDelete(null);
      fetchDocuments();
    } catch (e: any) {
      toast.error(e.message || 'Gagal menghapus dokumen');
    }
  };

  // Filter & Pagination Logic
  const filteredDocs = documents.filter((d) => {
    const matchCat = selectedCategory === 'ALL' || d.category === selectedCategory;
    const matchSearch =
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      (d.description && d.description.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const totalPages = Math.ceil(filteredDocs.length / itemsPerPage) || 1;
  const paginatedDocs = filteredDocs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <AdminLayout
      title="Manajemen Dokumen & Bank Data"
      subtitle="Kelola arsip berkas resmi, SK Beasiswa Bank Indonesia, template LPJ, dan proposal"
      action={
        <button
          onClick={openCreateModal}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] hover:from-[#0369A1] hover:to-[#0284C7] text-white font-bold text-xs shadow-sm shadow-sky-500/25 transition-all"
        >
          <Plus size={15} />
          <span>Unggah Dokumen</span>
        </button>
      }
    >
      <Head>
        <title>Kelola Dokumen Arsip - Admin GenBIHub</title>
      </Head>

      <div className="space-y-6">
        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0284C7] flex items-center justify-center shrink-0">
              <Filter size={15} />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30"
            >
              <option value="ALL">Semua Kategori ({documents.length})</option>
              {categories.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari judul dokumen..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30"
            />
          </div>
        </div>

        {/* Documents Table Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-5">Nama Dokumen</th>
                  <th className="py-3.5 px-5">Kategori</th>
                  <th className="py-3.5 px-5">Ukuran</th>
                  <th className="py-3.5 px-5">Tanggal Terbit</th>
                  <th className="py-3.5 px-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400">
                      Memuat daftar dokumen...
                    </td>
                  </tr>
                ) : paginatedDocs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400">
                      Tidak ada dokumen yang ditemukan.
                    </td>
                  </tr>
                ) : (
                  paginatedDocs.map((doc) => (
                    <tr key={doc.id} className="hover:bg-blue-50/20 transition-colors">
                      <td className="py-3.5 px-5 max-w-md">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-50 to-rose-100 text-red-600 flex items-center justify-center shrink-0 border border-red-200/60 shadow-xs">
                            <FileText size={18} />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 truncate">{doc.title}</p>
                            {doc.description && (
                              <p className="text-[11px] text-slate-400 truncate mt-0.5">{doc.description}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-5">
                        <span className="inline-block px-2.5 py-1 rounded-lg text-[10px] font-bold bg-gradient-to-r from-slate-100 to-blue-50 text-slate-800 border border-slate-200">
                          {doc.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-slate-500 font-mono text-[11px]">
                        {doc.fileSize || 'PDF File'}
                      </td>
                      <td className="py-3.5 px-5 text-slate-500 font-mono text-[11px]">
                        {formatDate(doc.publishedAt)}
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={doc.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            title="Unduh / Buka File PDF"
                            className="p-1.5 rounded-lg text-slate-600 hover:text-[#0284C7] hover:bg-sky-50 transition-colors"
                          >
                            <Download size={15} />
                          </a>
                          <button
                            onClick={() => {
                              setTargetDelete(doc);
                              setDeleteModalOpen(true);
                            }}
                            title="Hapus Dokumen"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={15} />
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
                        ? 'bg-gradient-to-r from-[#0B1F40] to-[#0284C7] text-white shadow-xs'
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

      {/* --- MODAL UPLOAD DOKUMEN --- */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-black text-slate-900 text-base">Unggah Dokumen Baru</h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Dokumen *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: SK Pengurus GenBI UPNVJT 2025/2026"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Kategori Dokumen *</label>
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
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  placeholder="Catatan mengenai isi berkas..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">File PDF URL / Path *</label>
                <input
                  type="text"
                  required
                  placeholder="/panduan-beasiswa-bi-2026.pdf atau link dokumen"
                  value={fileUrl}
                  onChange={(e) => setFileUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 font-mono placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30"
                />
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
                  Unggah Dokumen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL CONFIRM DELETE --- */}
      {deleteModalOpen && targetDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={26} />
            </div>
            <h3 className="font-black text-slate-900 text-base mb-1">Konfirmasi Hapus Dokumen</h3>
            <p className="text-xs text-slate-500 mb-5 leading-relaxed">
              Apakah Anda yakin ingin menghapus berkas arsip{' '}
              <span className="font-bold text-slate-800">"{targetDelete.title}"</span>? Berkas tidak akan dapat diunduh
              lagi oleh publik.
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
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
