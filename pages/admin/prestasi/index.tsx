import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import AdminLayout from '@/components/admin/AdminLayout';
import FileUpload from '@/components/admin/FileUpload';
import { Plus, Edit2, Trash2, Trophy, Medal, Award, Loader2 } from 'lucide-react';
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
    setSortOrder('0');
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
      toast.error('Judul, nama kompetisi, dan foto wajib diisi');
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

      toast.success(editingId ? 'Prestasi diperbarui' : 'Prestasi berhasil ditambahkan');
      setModalOpen(false);
      fetchAchievements();
    } catch (err: any) {
      toast.error(err.message || 'Gagal menyimpan');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus prestasi ini?')) return;

    try {
      const res = await fetch(`/api/admin/prestasi?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message);

      toast.success('Prestasi dihapus');
      fetchAchievements();
    } catch (e: any) {
      toast.error(e.message || 'Gagal menghapus');
    }
  };

  const getRankBadgeClass = (r: string) => {
    switch (r) {
      case 'gold':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'silver':
        return 'bg-slate-100 text-slate-800 border-slate-200';
      case 'bronze':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <AdminLayout
      title="Prestasi & Penghargaan"
      subtitle="Kelola pencapaian membanggakan mahasiswa penerima beasiswa BI"
      action={
        <button
          type="button"
          onClick={openCreateModal}
          className="px-4 py-2 bg-[#0B1F40] hover:bg-[#16386e] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Plus size={15} className="text-[#EAB308]" /> Tambah Prestasi
        </button>
      }
    >
      <Head>
        <title>Prestasi - GenBIHub CMS</title>
      </Head>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full p-8 text-center text-xs text-slate-400">Memuat data...</div>
        ) : achievements.length > 0 ? (
          achievements.map((a) => (
            <div
              key={a.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col p-5"
            >
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 relative">
                  <img src={a.imageUrl} alt={a.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${getRankBadgeClass(
                      a.rank
                    )}`}
                  >
                    {a.badge || a.rank}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm mt-1 truncate">{a.title}</h3>
                  <p className="text-xs text-slate-500 font-medium truncate mt-0.5">{a.competition}</p>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Tahun {a.year} • #{a.sortOrder}
                  </p>
                </div>
              </div>

              {a.description && (
                <p className="mt-3 text-xs text-slate-600 line-clamp-2">{a.description}</p>
              )}

              <div className="flex items-center justify-between pt-4 mt-auto border-t border-slate-100 text-[11px] text-slate-500">
                <span className="font-medium truncate max-w-[150px]">{a.recipient}</span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => openEditModal(a)}
                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                    title="Edit"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(a.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    title="Hapus"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full p-12 text-center bg-white rounded-2xl border border-slate-200">
            <p className="text-sm font-semibold text-slate-700">Belum ada data prestasi</p>
          </div>
        )}
      </div>

      {/* MODAL FORM */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-slate-900 mb-1">
              {editingId ? 'Edit Prestasi' : 'Tambah Prestasi Baru'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Judul / Capaian Penghargaan *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="1st Winner Duta Millenial Penggerak CBPR"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Ajang / Kompetisi *</label>
                  <input
                    type="text"
                    required
                    value={competition}
                    onChange={(e) => setCompetition(e.target.value)}
                    placeholder="KPw. Bank Indonesia Jatim 2024"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pemenang / Delegasi</label>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="Tim Delegasi GenBI UPNVJT"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Badge Teks</label>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    placeholder="1st Winner"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tingkat Medali</label>
                  <select
                    value={rank}
                    onChange={(e) => setRank(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600 bg-white"
                  >
                    <option value="gold">Emas (Gold / Juara 1)</option>
                    <option value="silver">Perak (Silver / Juara 2)</option>
                    <option value="bronze">Perunggu (Bronze / Runner Up)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tahun</label>
                  <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="2025"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <FileUpload
                value={imageUrl}
                onChange={setImageUrl}
                scope="prestasi"
                label="Foto Dokumentasi / Piagam *"
                helperText="Pilih foto dokumentasi penyerahan piala / piagam penghargaan"
              />

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Keterangan singkat pencapaian..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600"
                />
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
                  <span>{editingId ? 'Simpan Perubahan' : 'Simpan Prestasi'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
