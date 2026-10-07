import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import AdminLayout from '@/components/admin/AdminLayout';
import FileUpload from '@/components/admin/FileUpload';
import { exportToCsv } from '@/lib/export';
import {
  Plus,
  Edit2,
  Trash2,
  Loader2,
  Search,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  X,
  Download,
} from 'lucide-react';
import { toast } from 'sonner';

interface Achievement {
  id: number;
  title: string;
  recipient: string;
  competition: string;
  badge?: string | null;
  rank: string;
  year: string;
  imageUrl: string;
  description?: string | null;
  sortOrder: number;
}

export default function AdminPrestasiPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  // Search & Filter & Pagination
  const [search, setSearch] = useState('');
  const [filterRank, setFilterRank] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Delete Modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [targetDelete, setTargetDelete] = useState<Achievement | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [recipient, setRecipient] = useState('Delegasi GenBI UPNVJT');
  const [competition, setCompetition] = useState('');
  const [badge, setBadge] = useState('1st Winner');
  const [rank, setRank] = useState('gold');
  const [year, setYear] = useState('2025');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [sortOrder, setSortOrder] = useState('0');

  const fetchAchievements = async () => {
    try {
      const res = await fetch('/api/admin/prestasi');
      const json = await res.json();
      if (json.success) setAchievements(json.data);
    } catch (e) {
      toast.error('Gagal mengambil data prestasi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setTitle('');
    setRecipient('Delegasi GenBI UPNVJT');
    setCompetition('');
    setBadge('1st Winner');
    setRank('gold');
    setYear(new Date().getFullYear().toString());
    setImageUrl('');
    setDescription('');
    setSortOrder(String(achievements.length + 1));
    setModalOpen(true);
  };

  const openEditModal = (a: Achievement) => {
    setEditingId(a.id);
    setTitle(a.title);
    setRecipient(a.recipient);
    setCompetition(a.competition);
    setBadge(a.badge || '');
    setRank(a.rank);
    setYear(a.year);
    setImageUrl(a.imageUrl);
    setDescription(a.description || '');
    setSortOrder(String(a.sortOrder));
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !competition || !imageUrl) {
      toast.error('Judul, nama kompetisi, dan foto dokumentasi wajib diisi');
      return;
    }

    setSaving(true);
    try {
      const method = editingId ? 'PUT' : 'POST';
      const body = {
        ...(editingId && { id: editingId }),
        title,
        recipient,
        competition,
        badge,
        rank,
        year,
        imageUrl,
        description: description || null,
        sortOrder: Number(sortOrder) || 0,
      };

      const res = await fetch('/api/admin/prestasi', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message);

      toast.success(editingId ? 'Prestasi berhasil diperbarui' : 'Prestasi baru berhasil ditambahkan');
      setModalOpen(false);
      fetchAchievements();
    } catch (err: any) {
      toast.error(err.message || 'Gagal menyimpan prestasi');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!targetDelete) return;

    try {
      const res = await fetch(`/api/admin/prestasi?id=${targetDelete.id}`, { method: 'DELETE' });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message);

      toast.success(`Prestasi "${targetDelete.title}" berhasil dihapus`);
      setDeleteModalOpen(false);
      setTargetDelete(null);
      fetchAchievements();
    } catch (e: any) {
      toast.error(e.message || 'Gagal menghapus prestasi');
    }
  };

  const getRankConfig = (r: string) => {
    switch (r.toLowerCase()) {
      case 'gold':
        return {
          label: 'Juara 1 / Gold',
          badgeClass: 'bg-amber-50 text-amber-800 border-amber-200/90',
        };
      case 'silver':
        return {
          label: 'Juara 2 / Silver',
          badgeClass: 'bg-slate-100 text-slate-800 border-slate-300',
        };
      case 'bronze':
        return {
          label: 'Juara 3 / Bronze',
          badgeClass: 'bg-orange-50 text-orange-800 border-orange-200/90',
        };
      case 'finalist':
        return {
          label: 'Harapan / Finalist',
          badgeClass: 'bg-sky-50 text-[#0284C7] border-sky-200/90',
        };
      case 'delegate':
        return {
          label: 'Delegasi / Duta',
          badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200/90',
        };
      case 'special':
        return {
          label: 'Special Award',
          badgeClass: 'bg-purple-50 text-purple-800 border-purple-200/90',
        };
      default:
        return {
          label: r,
          badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
        };
    }
  };

  // Filter & Pagination Logic
  const filteredAchievements = achievements.filter((a) => {
    const matchRank = filterRank === 'ALL' || a.rank.toLowerCase() === filterRank.toLowerCase();
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.competition.toLowerCase().includes(search.toLowerCase()) ||
      a.recipient.toLowerCase().includes(search.toLowerCase()) ||
      a.year.includes(search);
    return matchRank && matchSearch;
  });

  const totalPages = Math.ceil(filteredAchievements.length / itemsPerPage) || 1;
  const paginatedAchievements = filteredAchievements.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const filterTabs = [
    { key: 'ALL', label: 'Semua', count: achievements.length },
    { key: 'gold', label: 'Juara 1', count: achievements.filter((a) => a.rank.toLowerCase() === 'gold').length },
    { key: 'silver', label: 'Juara 2', count: achievements.filter((a) => a.rank.toLowerCase() === 'silver').length },
    { key: 'bronze', label: 'Juara 3', count: achievements.filter((a) => a.rank.toLowerCase() === 'bronze').length },
    { key: 'finalist', label: 'Harapan / Finalist', count: achievements.filter((a) => a.rank.toLowerCase() === 'finalist').length },
    { key: 'delegate', label: 'Delegasi', count: achievements.filter((a) => a.rank.toLowerCase() === 'delegate').length },
    { key: 'special', label: 'Special Award', count: achievements.filter((a) => a.rank.toLowerCase() === 'special').length },
  ];

  const handleExport = () => {
    try {
      exportToCsv(
        'Rekap_Prestasi_GenBI_UPNVJT',
        achievements,
        [
          { header: 'ID', key: 'id' },
          { header: 'Nama Penghargaan / Prestasi', key: 'title' },
          { header: 'Penyelenggara / Kompetisi', key: 'competition' },
          { header: 'Penerima / Delegasi', key: 'recipient' },
          { header: 'Kategori Tingkat', key: (a) => getRankConfig(a.rank).label },
          { header: 'Label Badge', key: (a) => a.badge || '-' },
          { header: 'Tahun', key: 'year' },
          { header: 'Deskripsi', key: (a) => a.description || '-' },
        ]
      );
      toast.success('Rekap data prestasi berhasil diunduh (CSV/Excel)');
    } catch (e: any) {
      toast.error(e.message || 'Gagal mengekspor data');
    }
  };

  return (
    <AdminLayout
      title="Manajemen Prestasi & Rekap Juara"
      subtitle="Kelola capaian juara kompetisi, delegasi nasional/regional, penghargaan Bank Indonesia, dan sertifikasi anggota."
      action={
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-xs transition-all"
            title="Download Rekap CSV / Excel"
          >
            <Download size={14} className="text-slate-500" />
            <span>Ekspor CSV</span>
          </button>
          <button
            onClick={openCreateModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] hover:from-[#0369A1] hover:to-[#0284C7] text-white font-bold text-xs shadow-sm shadow-sky-500/25 transition-all"
          >
            <Plus size={15} />
            <span>Tambah Prestasi</span>
          </button>
        </div>
      }
    >
      <Head>
        <title>Kelola Prestasi - Admin GenBIHub</title>
      </Head>

      <div className="space-y-5">
        {/* ================= 1. SEARCH & CATEGORY FILTER TABS (NO DECORATIVE ICONS) ================= */}
        <div className="bg-white p-1.5 sm:p-2 rounded-2xl border border-slate-200/90 shadow-sm space-y-3">
          {/* Filter Pills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-1.5">
            {filterTabs.map((tab) => {
              const isSelected = filterRank === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => {
                    setFilterRank(tab.key);
                    setCurrentPage(1);
                  }}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 text-center cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] text-white shadow-sm shadow-sky-500/25 border border-transparent'
                      : 'bg-slate-50 hover:bg-white text-slate-700 hover:text-[#0284C7] border border-slate-200/90 hover:border-sky-300 hover:shadow-xs'
                  }`}
                >
                  <span className="truncate">{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                      isSelected ? 'bg-white text-[#0284C7]' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3 px-1">
            <div className="relative flex-1 max-w-md">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari judul prestasi, kompetisi, peraih, atau tahun..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30"
              />
            </div>
            <div className="text-xs font-bold text-slate-500 hidden sm:block">
              Menampilkan {filteredAchievements.length} data
            </div>
          </div>
        </div>

        {/* ================= 2. DATA TABLE ================= */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-5">Foto</th>
                  <th className="py-3.5 px-5">Prestasi & Kompetisi</th>
                  <th className="py-3.5 px-5">Penerima / Delegasi</th>
                  <th className="py-3.5 px-5">Kategori & Badge</th>
                  <th className="py-3.5 px-5">Tahun</th>
                  <th className="py-3.5 px-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      Memuat daftar prestasi...
                    </td>
                  </tr>
                ) : paginatedAchievements.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      Tidak ada data prestasi yang ditemukan.
                    </td>
                  </tr>
                ) : (
                  paginatedAchievements.map((item) => {
                    const cfg = getRankConfig(item.rank);
                    return (
                      <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-5">
                          <div className="w-14 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as any).src = '/prestasi-1.jpg';
                              }}
                            />
                          </div>
                        </td>
                        <td className="py-3.5 px-5 max-w-sm">
                          <p className="font-bold text-slate-900 leading-snug">{item.title}</p>
                          <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">{item.competition}</p>
                        </td>
                        <td className="py-3.5 px-5 font-medium text-slate-700">{item.recipient}</td>
                        <td className="py-3.5 px-5">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-extrabold border ${cfg.badgeClass}`}
                          >
                            {item.badge || cfg.label}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 font-mono text-[11px] text-slate-600 font-bold">{item.year}</td>
                        <td className="py-3.5 px-5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => openEditModal(item)}
                              title="Edit Prestasi"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-[#0284C7] hover:bg-sky-50 transition-colors"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => {
                                setTargetDelete(item);
                                setDeleteModalOpen(true);
                              }}
                              title="Hapus Prestasi"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
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

      {/* ================= 3. MODAL FORM CREATE / EDIT ================= */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-black text-slate-900 text-base">
                  {editingId ? 'Edit Prestasi Organisasi' : 'Tambah Prestasi Baru'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Lengkapi data capaian juara, delegasi, atau penghargaan.</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Penghargaan / Prestasi *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: 1st Winner Duta Millenial Penggerak CBPR / Harapan 1 LKTIN"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Penyelenggara / Kompetisi *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: KPw. Bank Indonesia Jawa Timur 2025"
                    value={competition}
                    onChange={(e) => setCompetition(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Penerima / Nama Delegasi</label>
                  <input
                    type="text"
                    placeholder="Contoh: Masyaroh Unafaznil / Delegasi GenBI UPNVJT"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Kategori / Tingkat *</label>
                  <select
                    value={rank}
                    onChange={(e) => setRank(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30"
                  >
                    <option value="gold">Juara 1 / Gold / Winner</option>
                    <option value="silver">Juara 2 / Silver</option>
                    <option value="bronze">Juara 3 / Bronze</option>
                    <option value="finalist">Juara Harapan / Finalist</option>
                    <option value="delegate">Delegasi / Duta / Participant</option>
                    <option value="special">Special Award / Best Speaker</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Label Badge Singkat</label>
                  <input
                    type="text"
                    placeholder="Contoh: 1st Winner / Harapan 1 / Best Speaker"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Tahun Raihan</label>
                  <input
                    type="text"
                    placeholder="2025"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30"
                  />
                </div>
              </div>

              {/* Upload Foto Prestasi */}
              <FileUpload
                label="Foto Dokumentasi Prestasi / Sertifikat *"
                value={imageUrl}
                onChange={setImageUrl}
                scope="prestasi"
                aspectRatio={4 / 3}
                helperText="Format 4:3 (Lanskap) disarankan untuk dokumentasi penyerahan piala / penghargaan"
              />

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Deskripsi / Catatan Singkat</label>
                <textarea
                  rows={2}
                  placeholder="Keterangan singkat mengenai penghargaan atau karya yang dikompetisikan..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30"
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
                  {editingId ? 'Simpan Perubahan' : 'Tambah Prestasi'}
                </button>
              </div>
            </form>
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
            <h3 className="font-black text-slate-900 text-base mb-1">Konfirmasi Hapus Prestasi</h3>
            <p className="text-xs text-slate-500 mb-5 leading-relaxed">
              Apakah Anda yakin ingin menghapus data prestasi{' '}
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
