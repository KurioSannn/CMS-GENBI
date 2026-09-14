import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import AdminLayout from '@/components/admin/AdminLayout';
import FileUpload from '@/components/admin/FileUpload';
import { Plus, Edit2, Trash2, Shield, User, Instagram, Linkedin, Quote, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface BphMember {
  id: number;
  name: string;
  category: string;
  position: string;
  imageUrl: string;
  quote?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
  sortOrder: number;
}

export default function AdminBphPage() {
  const [members, setMembers] = useState<BphMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState('KETUA');
  const [position, setPosition] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [quote, setQuote] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [sortOrder, setSortOrder] = useState('0');

  const fetchMembers = async () => {
    try {
      const res = await fetch('/api/admin/bph');
      const json = await res.json();
      if (json.success) setMembers(json.data);
    } catch (e) {
      toast.error('Gagal mengambil data pengurus');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setName('');
    setCategory('KETUA');
    setPosition('');
    setImageUrl('');
    setQuote('');
    setInstagram('');
    setLinkedin('');
    setSortOrder('0');
    setModalOpen(true);
  };

  const openEditModal = (m: BphMember) => {
    setEditingId(m.id);
    setName(m.name);
    setCategory(m.category);
    setPosition(m.position);
    setImageUrl(m.imageUrl);
    setQuote(m.quote || '');
    setInstagram(m.instagram || '');
    setLinkedin(m.linkedin || '');
    setSortOrder(String(m.sortOrder));
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !position || !imageUrl) {
      toast.error('Nama, jabatan, dan foto wajib diisi');
      return;
    }

    setSaving(true);
    try {
      const method = editingId ? 'PUT' : 'POST';
      const body = {
        ...(editingId && { id: editingId }),
        name,
        category,
        position,
        imageUrl,
        quote: quote || null,
        instagram: instagram || null,
        linkedin: linkedin || null,
        sortOrder: Number(sortOrder) || 0,
      };

      const res = await fetch('/api/admin/bph', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message);

      toast.success(editingId ? 'Data pengurus diperbarui' : 'Pengurus berhasil ditambahkan');
      setModalOpen(false);
      fetchMembers();
    } catch (err: any) {
      toast.error(err.message || 'Gagal menyimpan');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus data pengurus ini?')) return;

    try {
      const res = await fetch(`/api/admin/bph?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message);

      toast.success('Pengurus dihapus');
      fetchMembers();
    } catch (e: any) {
      toast.error(e.message || 'Gagal menghapus');
    }
  };

  return (
    <AdminLayout
      title="BPH & Pembina Organisasi"
      subtitle="Kelola jajaran Badan Pengurus Harian dan profil Bapak Pembina GenBI UPNVJT"
      action={
        <button
          type="button"
          onClick={openCreateModal}
          className="px-4 py-2 bg-[#0B1F40] hover:bg-[#16386e] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Plus size={15} className="text-[#EAB308]" /> Tambah Pengurus
        </button>
      }
    >
      <Head>
        <title>BPH & Pembina - GenBIHub CMS</title>
      </Head>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full p-8 text-center text-xs text-slate-400">Memuat data...</div>
        ) : members.length > 0 ? (
          members.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col p-5"
            >
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 relative">
                  <img src={m.imageUrl} alt={m.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-amber-100 text-amber-800">
                    {m.category}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm mt-1 truncate">{m.name}</h3>
                  <p className="text-xs text-slate-500 font-medium truncate mt-0.5">{m.position}</p>
                  <p className="text-[10px] text-slate-400 mt-1">Urutan: #{m.sortOrder}</p>
                </div>
              </div>

              {m.quote && (
                <div className="mt-4 p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 italic line-clamp-2">
                  "{m.quote}"
                </div>
              )}

              <div className="flex items-center justify-between pt-4 mt-auto border-t border-slate-100">
                <div className="flex items-center gap-2 text-slate-400">
                  {m.instagram && <Instagram size={14} className="hover:text-pink-600" />}
                  {m.linkedin && <Linkedin size={14} className="hover:text-blue-600" />}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => openEditModal(m)}
                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                    title="Edit"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(m.id)}
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
            <p className="text-sm font-semibold text-slate-700">Belum ada data pengurus</p>
          </div>
        )}
      </div>

      {/* MODAL FORM */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-slate-900 mb-1">
              {editingId ? 'Edit Data Pengurus' : 'Tambah Pengurus Baru'}
            </h2>
            <p className="text-xs text-slate-400 mb-6">Lengkapi data profil BPH atau Pembina Organisasi</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kategori *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600 bg-white"
                  >
                    <option value="PEMBINA">Pembina Organisasi</option>
                    <option value="KETUA">Ketua Umum</option>
                    <option value="WAKIL">Wakil Ketua Umum</option>
                    <option value="SEKRETARIS">Sekretaris</option>
                    <option value="BENDAHARA">Bendahara</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Urutan Sort</label>
                  <input
                    type="number"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap & Gelar *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masyaroh Unafaznil Khoiroh"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Jabatan Resmi *</label>
                <input
                  type="text"
                  required
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="Ketua Umum GenBI UPNVJT 2025/2026"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600"
                />
              </div>

              {/* Upload Foto Pengurus with 1:1 square crop */}
              <FileUpload
                value={imageUrl}
                onChange={setImageUrl}
                scope="members"
                aspectRatio={1}
                label="Foto Profil (Rasio 1:1 Persegi) *"
                helperText="Otomatis di-crop ke format persegi 1:1 untuk keseragaman kartu profil"
              />

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Quotes / Kutipan</label>
                <textarea
                  rows={2}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="Kutipan pesan inspiratif..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Instagram URL</label>
                  <input
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="https://instagram.com/..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">LinkedIn URL</label>
                  <input
                    type="text"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600"
                  />
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
                  <span>{editingId ? 'Simpan Perubahan' : 'Simpan Pengurus'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
