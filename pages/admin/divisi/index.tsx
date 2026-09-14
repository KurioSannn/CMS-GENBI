import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import AdminLayout from '@/components/admin/AdminLayout';
import FileUpload from '@/components/admin/FileUpload';
import { Plus, Edit2, Trash2, Users, UserPlus, Image as ImageIcon, ChevronRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface DivisionMember {
  id: number;
  divisionId: number;
  name: string;
  role: string;
  prodiAngkatan?: string | null;
  imageUrl: string;
  sortOrder: number;
}

interface Division {
  id: number;
  name: string;
  slug: string;
  tagline?: string | null;
  description: string;
  logoUrl?: string | null;
  teamPhotoUrl?: string | null;
  sortOrder: number;
  members: DivisionMember[];
}

export default function AdminDivisiPage() {
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDivId, setSelectedDivId] = useState<number | null>(null);

  // Division Modal states
  const [divModalOpen, setDivModalOpen] = useState(false);
  const [editingDivId, setEditingDivId] = useState<number | null>(null);
  const [divName, setDivName] = useState('');
  const [divTagline, setDivTagline] = useState('');
  const [divDescription, setDivDescription] = useState('');
  const [divLogoUrl, setDivLogoUrl] = useState('');
  const [divSortOrder, setDivSortOrder] = useState('0');

  // Member Modal states
  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<number | null>(null);
  const [memName, setMemName] = useState('');
  const [memRole, setMemRole] = useState('');
  const [memProdi, setMemProdi] = useState('');
  const [memImageUrl, setMemImageUrl] = useState('');
  const [memSortOrder, setMemSortOrder] = useState('0');

  const [saving, setSaving] = useState(false);

  const fetchDivisions = async () => {
    try {
      const res = await fetch('/api/admin/divisi');
      const json = await res.json();
      if (json.success) {
        setDivisions(json.data);
        if (!selectedDivId && json.data.length > 0) {
          setSelectedDivId(json.data[0].id);
        }
      }
    } catch (e) {
      toast.error('Gagal memuat divisi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDivisions();
  }, []);

  const selectedDivision = divisions.find((d) => d.id === selectedDivId) || divisions[0];

  // --- DIVISION ACTIONS ---
  const openCreateDivModal = () => {
    setEditingDivId(null);
    setDivName('');
    setDivTagline('');
    setDivDescription('');
    setDivLogoUrl('');
    setDivSortOrder('0');
    setDivModalOpen(true);
  };

  const openEditDivModal = (d: Division) => {
    setEditingDivId(d.id);
    setDivName(d.name);
    setDivTagline(d.tagline || '');
    setDivDescription(d.description);
    setDivLogoUrl(d.logoUrl || '');
    setDivSortOrder(String(d.sortOrder));
    setDivModalOpen(true);
  };

  const handleDivSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!divName || !divDescription) {
      toast.error('Nama divisi dan deskripsi wajib diisi');
      return;
    }

    setSaving(true);
    try {
      const method = editingDivId ? 'PUT' : 'POST';
      const body = {
        ...(editingDivId && { id: editingDivId }),
        name: divName,
        tagline: divTagline || null,
        description: divDescription,
        logoUrl: divLogoUrl || null,
        sortOrder: Number(divSortOrder) || 0,
      };

      const res = await fetch('/api/admin/divisi', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message);

      toast.success(editingDivId ? 'Divisi diperbarui' : 'Divisi ditambahkan');
      setDivModalOpen(false);
      fetchDivisions();
    } catch (err: any) {
      toast.error(err.message || 'Gagal menyimpan');
    } finally {
      setSaving(false);
    }
  };

  // --- MEMBER ACTIONS ---
  const openAddMemberModal = () => {
    setEditingMemberId(null);
    setMemName('');
    setMemRole('');
    setMemProdi('');
    setMemImageUrl('');
    setMemSortOrder('0');
    setMemberModalOpen(true);
  };

  const openEditMemberModal = (m: DivisionMember) => {
    setEditingMemberId(m.id);
    setMemName(m.name);
    setMemRole(m.role);
    setMemProdi(m.prodiAngkatan || '');
    setMemImageUrl(m.imageUrl);
    setMemSortOrder(String(m.sortOrder));
    setMemberModalOpen(true);
  };

  const handleMemberSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!memName || !memRole || !memImageUrl || !selectedDivision) {
      toast.error('Nama, jabatan, dan foto wajib diisi');
      return;
    }

    setSaving(true);
    try {
      const isEdit = !!editingMemberId;
      const url = isEdit ? '/api/admin/divisi?action=update-member' : '/api/admin/divisi?action=add-member';
      const method = isEdit ? 'PUT' : 'POST';

      const body = {
        ...(isEdit ? { id: editingMemberId } : { divisionId: selectedDivision.id }),
        name: memName,
        role: memRole,
        prodiAngkatan: memProdi || null,
        imageUrl: memImageUrl,
        sortOrder: Number(memSortOrder) || 0,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message);

      toast.success(isEdit ? 'Anggota diperbarui' : 'Anggota ditambahkan');
      setMemberModalOpen(false);
      fetchDivisions();
    } catch (err: any) {
      toast.error(err.message || 'Gagal menyimpan');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteMember = async (memberId: number) => {
    if (!confirm('Hapus anggota ini dari divisi?')) return;

    try {
      const res = await fetch(`/api/admin/divisi?action=delete-member&id=${memberId}`, { method: 'DELETE' });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message);

      toast.success('Anggota dihapus');
      fetchDivisions();
    } catch (e: any) {
      toast.error(e.message || 'Gagal menghapus');
    }
  };

  return (
    <AdminLayout
      title="Divisi & Anggota Pengurus"
      subtitle="Kelola struktur 7 divisi GenBI dan anggota di dalamnya"
      action={
        <div className="flex gap-2">
          <button
            type="button"
            onClick={openCreateDivModal}
            className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-300 shadow-sm transition-all"
          >
            + Divisi Baru
          </button>
          <button
            type="button"
            onClick={openAddMemberModal}
            className="px-4 py-2 bg-[#0B1F40] hover:bg-[#16386e] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
          >
            <UserPlus size={15} className="text-[#EAB308]" /> Tambah Anggota
          </button>
        </div>
      }
    >
      <Head>
        <title>Divisi & Anggota - GenBIHub CMS</title>
      </Head>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left: Division List / Tabs */}
        <div className="lg:col-span-1 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
            Daftar Divisi ({divisions.length})
          </span>
          <div className="bg-white rounded-2xl border border-slate-200 p-2 space-y-1 shadow-sm">
            {divisions.map((d) => {
              const isSelected = selectedDivId === d.id;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setSelectedDivId(d.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all text-left ${
                    isSelected ? 'bg-[#0B1F40] text-white shadow-sm' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    {d.logoUrl ? (
                      <img src={d.logoUrl} alt={d.name} className="w-5 h-5 object-contain" />
                    ) : (
                      <div className="w-5 h-5 rounded bg-slate-200" />
                    )}
                    <span className="truncate">{d.name}</span>
                  </div>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      isSelected ? 'bg-white/20 text-[#EAB308]' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {d.members?.length || 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Division Details & Members Table */}
        <div className="lg:col-span-3 space-y-6">
          {selectedDivision ? (
            <>
              {/* Header Box of Selected Division */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {selectedDivision.logoUrl && (
                    <div className="w-16 h-16 rounded-2xl p-2 bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0">
                      <img
                        src={selectedDivision.logoUrl}
                        alt={selectedDivision.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <div>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">{selectedDivision.name}</h2>
                    <p className="text-xs text-slate-500 mt-1 max-w-xl">{selectedDivision.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEditDivModal(selectedDivision)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5"
                  >
                    <Edit2 size={13} /> Edit Divisi
                  </button>
                </div>
              </div>

              {/* Members List Cards */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-800">
                    Susunan Anggota ({selectedDivision.members?.length || 0})
                  </h3>
                  <button
                    type="button"
                    onClick={openAddMemberModal}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    <Plus size={14} /> Tambah Anggota ke Divisi Ini
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedDivision.members && selectedDivision.members.length > 0 ? (
                    selectedDivision.members.map((m) => (
                      <div
                        key={m.id}
                        className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 relative">
                            <img src={m.imageUrl} alt={m.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block truncate">
                              {m.role}
                            </span>
                            <h4 className="font-bold text-xs text-slate-900 truncate mt-0.5">{m.name}</h4>
                            <p className="text-[11px] text-slate-400 mt-0.5 truncate">{m.prodiAngkatan || '-'}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-[10px] text-slate-400">
                          <span>Urutan: #{m.sortOrder}</span>
                          <div className="flex gap-1">
                            <button
                              type="button"
                              onClick={() => openEditMemberModal(m)}
                              className="p-1 text-slate-400 hover:text-blue-600"
                              title="Edit"
                            >
                              <Edit2 size={13} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteMember(m.id)}
                              className="p-1 text-slate-400 hover:text-red-600"
                              title="Hapus"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full p-8 text-center bg-white rounded-xl border border-slate-200 text-xs text-slate-400">
                      Belum ada anggota terdaftar di divisi ini
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-xs text-slate-400">Pilih divisi terlebih dahulu</div>
          )}
        </div>
      </div>

      {/* --- MODAL EDIT/ADD DIVISION --- */}
      {divModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-1">
              {editingDivId ? 'Edit Data Divisi' : 'Tambah Divisi Baru'}
            </h2>
            <form onSubmit={handleDivSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Divisi *</label>
                <input
                  type="text"
                  required
                  value={divName}
                  onChange={(e) => setDivName(e.target.value)}
                  placeholder="Ekonomi Kreatif (EKRAF)"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Divisi *</label>
                <textarea
                  rows={3}
                  required
                  value={divDescription}
                  onChange={(e) => setDivDescription(e.target.value)}
                  placeholder="Fokus kerja dan kontribusi divisi..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600"
                />
              </div>

              <FileUpload
                value={divLogoUrl}
                onChange={setDivLogoUrl}
                scope="members"
                aspectRatio={1}
                label="Logo Divisi (PNG Transparan / Persegi)"
                helperText="Upload file logo divisi"
              />

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setDivModalOpen(false)}
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
                  <span>{editingDivId ? 'Simpan Perubahan' : 'Buat Divisi'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL EDIT/ADD MEMBER --- */}
      {memberModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-slate-900 mb-1">
              {editingMemberId ? 'Edit Anggota' : 'Tambah Anggota Divisi'}
            </h2>
            <p className="text-xs text-slate-400 mb-4">Divisi: {selectedDivision?.name}</p>

            <form onSubmit={handleMemberSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Anggota *</label>
                <input
                  type="text"
                  required
                  value={memName}
                  onChange={(e) => setMemName(e.target.value)}
                  placeholder="Nama lengkap"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Jabatan / Role *</label>
                  <input
                    type="text"
                    required
                    value={memRole}
                    onChange={(e) => setMemRole(e.target.value)}
                    placeholder="Kepala Divisi / Staff"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Prodi & Angkatan</label>
                  <input
                    type="text"
                    value={memProdi}
                    onChange={(e) => setMemProdi(e.target.value)}
                    placeholder="Informatika '23"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <FileUpload
                value={memImageUrl}
                onChange={setMemImageUrl}
                scope="members"
                aspectRatio={1}
                label="Foto Anggota (Rasio 1:1 Persegi) *"
                helperText="Otomatis di-crop 1:1 persegi agar tampilan kartu rapi"
              />

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Urutan Sort</label>
                <input
                  type="number"
                  value={memSortOrder}
                  onChange={(e) => setMemSortOrder(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setMemberModalOpen(false)}
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
                  <span>{editingMemberId ? 'Simpan Perubahan' : 'Simpan Anggota'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
