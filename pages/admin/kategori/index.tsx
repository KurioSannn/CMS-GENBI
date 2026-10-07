import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  Tag,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  FileText,
  Newspaper,
  FolderTree,
  X,
  Layers,
} from 'lucide-react';
import { toast } from 'sonner';

interface CategoryItem {
  id: number;
  name: string;
  slug: string;
  type: string;
  description?: string | null;
  sortOrder: number;
  createdAt: string;
}

export default function AdminKategoriPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'ARTICLE' | 'DOCUMENT'>('ALL');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'ARTICLE',
    description: '',
    sortOrder: 0,
  });

  // Delete Confirm Modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [targetDelete, setTargetDelete] = useState<CategoryItem | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/category');
      const json = await res.json();
      if (json.success) setCategories(json.data);
    } catch (e) {
      toast.error('Gagal memuat master kategori');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenCreate = () => {
    setEditId(null);
    setFormData({
      name: '',
      type: 'ARTICLE',
      description: '',
      sortOrder: categories.length + 1,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (item: CategoryItem) => {
    setEditId(item.id);
    setFormData({
      name: item.name,
      type: item.type,
      description: item.description || '',
      sortOrder: item.sortOrder || 0,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Nama kategori wajib diisi');
      return;
    }

    try {
      const method = editId ? 'PUT' : 'POST';
      const body = editId ? { id: editId, ...formData } : formData;

      const res = await fetch('/api/admin/category', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await res.json();

      if (json.success) {
        toast.success(editId ? 'Kategori berhasil diperbarui' : 'Kategori baru berhasil ditambahkan');
        setModalOpen(false);
        fetchCategories();
      } else {
        toast.error(json.message || 'Gagal menyimpan kategori');
      }
    } catch (err: any) {
      toast.error(err.message || 'Terjadi kesalahan sistem');
    }
  };

  const handleDelete = async () => {
    if (!targetDelete) return;

    try {
      const res = await fetch(`/api/admin/category?id=${targetDelete.id}`, {
        method: 'DELETE',
      });
      const json = await res.json();

      if (json.success) {
        toast.success(`Kategori "${targetDelete.name}" berhasil dihapus`);
        setDeleteModalOpen(false);
        setTargetDelete(null);
        fetchCategories();
      } else {
        toast.error(json.message || 'Gagal menghapus kategori');
      }
    } catch (err: any) {
      toast.error(err.message || 'Gagal menghapus kategori');
    }
  };

  const filteredCategories = categories.filter((c) => {
    const matchType = filterType === 'ALL' || c.type === filterType;
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.slug.toLowerCase().includes(search.toLowerCase()) ||
      (c.description && c.description.toLowerCase().includes(search.toLowerCase()));
    return matchType && matchSearch;
  });

  return (
    <AdminLayout
      title="Master Kategori"
      subtitle="Kelola kategori dinamis untuk Berita, Dokumen, dan Program Kerja"
      action={
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] hover:from-[#0369A1] hover:to-[#0284C7] text-white font-bold text-xs shadow-sm shadow-sky-500/25 transition-all"
        >
          <Plus size={15} />
          <span>Tambah Kategori</span>
        </button>
      }
    >
      <Head>
        <title>Master Kategori - Admin GenBIHub</title>
      </Head>

      <div className="space-y-6">
        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Tabs Filter */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterType === 'ALL'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua ({categories.length})
            </button>
            <button
              onClick={() => setFilterType('ARTICLE')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                filterType === 'ARTICLE'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Newspaper size={13} />
              Berita ({categories.filter((c) => c.type === 'ARTICLE').length})
            </button>
            <button
              onClick={() => setFilterType('DOCUMENT')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                filterType === 'DOCUMENT'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText size={13} />
              Dokumen ({categories.filter((c) => c.type === 'DOCUMENT').length})
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari kategori..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30"
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-slate-50 via-blue-50/30 to-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-5">No</th>
                  <th className="py-3.5 px-5">Nama Kategori</th>
                  <th className="py-3.5 px-5">Slug</th>
                  <th className="py-3.5 px-5">Tipe Modul</th>
                  <th className="py-3.5 px-5">Deskripsi</th>
                  <th className="py-3.5 px-5 text-center">Urutan</th>
                  <th className="py-3.5 px-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      Memuat data master kategori...
                    </td>
                  </tr>
                ) : filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      Belum ada data kategori yang sesuai.
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-blue-50/20 transition-colors">
                      <td className="py-3.5 px-5 font-semibold text-slate-400">{idx + 1}</td>
                      <td className="py-3.5 px-5 font-bold text-slate-900">{item.name}</td>
                      <td className="py-3.5 px-5 font-mono text-[11px] text-slate-500">{item.slug}</td>
                      <td className="py-3.5 px-5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                            item.type === 'ARTICLE'
                              ? 'bg-gradient-to-r from-blue-50 to-sky-50 text-[#0F2C59] border border-blue-200/80'
                              : 'bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-800 border border-emerald-200/80'
                          }`}
                        >
                          {item.type === 'ARTICLE' ? <Newspaper size={11} /> : <FileText size={11} />}
                          {item.type === 'ARTICLE' ? 'Berita / Artikel' : 'Dokumen Arsip'}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-slate-500 max-w-xs truncate">
                        {item.description || '-'}
                      </td>
                      <td className="py-3.5 px-5 text-center font-bold text-slate-700">{item.sortOrder}</td>
                      <td className="py-3.5 px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(item)}
                            title="Edit Kategori"
                            className="p-1.5 rounded-lg text-slate-600 hover:text-[#0F2C59] hover:bg-slate-100 transition-colors"
                          >
                            <Edit2 size={15} />
                          </button>
                          <button
                            onClick={() => {
                              setTargetDelete(item);
                              setDeleteModalOpen(true);
                            }}
                            title="Hapus Kategori"
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
        </div>
      </div>

      {/* --- MODAL FORM CREATE / EDIT --- */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="font-black text-slate-900 text-base">
                {editId ? 'Edit Master Kategori' : 'Tambah Kategori Baru'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Kategori *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Edukasi BI & CBP Rupiah"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Tipe Modul *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30 bg-white"
                >
                  <option value="ARTICLE">Berita & Artikel</option>
                  <option value="DOCUMENT">Dokumen & Bank Data PDF</option>
                  <option value="PROKER">Program Kerja Divisi</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  placeholder="Penjelasan singkat mengenai kategori ini..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Urutan Tampilan</label>
                <input
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) => setFormData({ ...formData, sortOrder: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] hover:from-[#0369A1] hover:to-[#0284C7] text-white font-bold text-xs shadow-sm shadow-sky-500/25 transition-all"
                >
                  {editId ? 'Simpan Perubahan' : 'Buat Kategori'}
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
            <h3 className="font-black text-slate-900 text-base mb-1">Konfirmasi Hapus</h3>
            <p className="text-xs text-slate-500 mb-5 leading-relaxed">
              Apakah Anda yakin ingin menghapus kategori{' '}
              <span className="font-bold text-slate-800">"{targetDelete.name}"</span>? Tindakan ini tidak dapat
              dibatalkan.
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
