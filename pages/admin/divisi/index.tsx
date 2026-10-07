import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/admin/AdminLayout';
import FileUpload from '@/components/admin/FileUpload';
import { exportToCsv } from '@/lib/export';
import {
  Plus,
  Edit2,
  Trash2,
  UserPlus,
  Search,
  LayoutGrid,
  List,
  Building2,
  AlertCircle,
  X,
  Instagram,
  Linkedin,
  Loader2,
  Download,
} from 'lucide-react';
import { toast } from 'sonner';

// ================= TYPES =================
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

export default function AdminStrukturPage() {
  const router = useRouter();

  // Active Tab: 'BPH' or Division ID (number)
  const [activeTab, setActiveTab] = useState<string | number>('BPH');

  // Loading states
  const [loadingDiv, setLoadingDiv] = useState(true);
  const [loadingBph, setLoadingBph] = useState(true);

  // Data states
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [bphMembers, setBphMembers] = useState<BphMember[]>([]);

  // Division views
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [searchMember, setSearchMember] = useState('');

  // Division Modal states
  const [divModalOpen, setDivModalOpen] = useState(false);
  const [editingDivId, setEditingDivId] = useState<number | null>(null);
  const [divName, setDivName] = useState('');
  const [divTagline, setDivTagline] = useState('');
  const [divDescription, setDivDescription] = useState('');
  const [divLogoUrl, setDivLogoUrl] = useState('');
  const [divSortOrder, setDivSortOrder] = useState('0');

  // Division Member Modal states
  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<number | null>(null);
  const [memName, setMemName] = useState('');
  const [memRole, setMemRole] = useState('Staff');
  const [memProdi, setMemProdi] = useState('');
  const [memImageUrl, setMemImageUrl] = useState('');
  const [memSortOrder, setMemSortOrder] = useState('0');

  // BPH Member Modal states
  const [bphModalOpen, setBphModalOpen] = useState(false);
  const [editingBphId, setEditingBphId] = useState<number | null>(null);
  const [bphName, setBphName] = useState('');
  const [bphCategory, setBphCategory] = useState('KETUA');
  const [bphPosition, setBphPosition] = useState('');
  const [bphImageUrl, setBphImageUrl] = useState('');
  const [bphQuote, setBphQuote] = useState('');
  const [bphInstagram, setBphInstagram] = useState('');
  const [bphLinkedin, setBphLinkedin] = useState('');
  const [bphSortOrder, setBphSortOrder] = useState('0');

  // Generic Delete Modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteType, setDeleteType] = useState<'bph' | 'divMember' | null>(null);
  const [targetDeleteBph, setTargetDeleteBph] = useState<BphMember | null>(null);
  const [targetDeleteMember, setTargetDeleteMember] = useState<DivisionMember | null>(null);

  const [saving, setSaving] = useState(false);

  // Sync tab from query param if available e.g. /admin/divisi?tab=BPH
  useEffect(() => {
    if (router.query.tab) {
      if (router.query.tab === 'BPH' || router.query.tab === 'bph') {
        setActiveTab('BPH');
      } else {
        const num = Number(router.query.tab);
        if (!isNaN(num)) setActiveTab(num);
      }
    }
  }, [router.query.tab]);

  // Fetch divisions
  const fetchDivisions = async () => {
    try {
      const res = await fetch('/api/admin/divisi');
      const json = await res.json();
      if (json.success) {
        const operational = (json.data as Division[]).filter(
          (d) => !d.name.toLowerCase().includes('badan pengurus harian') && !d.slug.toLowerCase().includes('bph')
        );
        setDivisions(operational);
      }
    } catch (e) {
      toast.error('Gagal memuat divisi');
    } finally {
      setLoadingDiv(false);
    }
  };

  // Fetch BPH members
  const fetchBphMembers = async () => {
    try {
      const res = await fetch('/api/admin/bph');
      const json = await res.json();
      if (json.success) setBphMembers(json.data);
    } catch (e) {
      toast.error('Gagal memuat data BPH');
    } finally {
      setLoadingBph(false);
    }
  };

  useEffect(() => {
    fetchDivisions();
    fetchBphMembers();
  }, []);

  const selectedDivision = typeof activeTab === 'number' ? divisions.find((d) => d.id === activeTab) : null;

  // ================= BPH ACTIONS =================
  const openCreateBphModal = () => {
    setEditingBphId(null);
    setBphName('');
    setBphCategory('KETUA');
    setBphPosition('');
    setBphImageUrl('');
    setBphQuote('');
    setBphInstagram('');
    setBphLinkedin('');
    setBphSortOrder(String(bphMembers.length + 1));
    setBphModalOpen(true);
  };

  const openEditBphModal = (m: BphMember) => {
    setEditingBphId(m.id);
    setBphName(m.name);
    setBphCategory(m.category);
    setBphPosition(m.position);
    setBphImageUrl(m.imageUrl);
    setBphQuote(m.quote || '');
    setBphInstagram(m.instagram || '');
    setBphLinkedin(m.linkedin || '');
    setBphSortOrder(String(m.sortOrder));
    setBphModalOpen(true);
  };

  const handleBphSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bphName || !bphPosition || !bphImageUrl) {
      toast.error('Nama, jabatan, dan foto wajib diisi');
      return;
    }

    setSaving(true);
    try {
      const method = editingBphId ? 'PUT' : 'POST';
      const body = {
        ...(editingBphId && { id: editingBphId }),
        name: bphName,
        category: bphCategory,
        position: bphPosition,
        imageUrl: bphImageUrl,
        quote: bphQuote || null,
        instagram: bphInstagram || null,
        linkedin: bphLinkedin || null,
        sortOrder: Number(bphSortOrder) || 0,
      };

      const res = await fetch('/api/admin/bph', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message);

      toast.success(editingBphId ? 'Data pengurus BPH diperbarui' : 'Pengurus BPH berhasil ditambahkan');
      setBphModalOpen(false);
      fetchBphMembers();
    } catch (err: any) {
      toast.error(err.message || 'Gagal menyimpan data BPH');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteBph = async () => {
    if (!targetDeleteBph) return;
    try {
      const res = await fetch(`/api/admin/bph?id=${targetDeleteBph.id}`, { method: 'DELETE' });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message);

      toast.success(`Pengurus "${targetDeleteBph.name}" dihapus`);
      setDeleteModalOpen(false);
      setTargetDeleteBph(null);
      fetchBphMembers();
    } catch (e: any) {
      toast.error(e.message || 'Gagal menghapus');
    }
  };

  const getBphCategoryBadge = (cat: string) => {
    switch (cat.toUpperCase()) {
      case 'PEMBINA':
        return { label: 'Pembina Organisasi', bg: 'bg-amber-50 text-amber-800 border-amber-200/80' };
      case 'KETUA':
        return { label: 'Ketua Umum', bg: 'bg-sky-50 text-[#0284C7] border-sky-200/80' };
      case 'WAKIL':
        return { label: 'Wakil Ketua Umum', bg: 'bg-blue-50 text-blue-700 border-blue-200/80' };
      case 'SEKRETARIS':
        return { label: 'Sekretaris', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200/80' };
      case 'BENDAHARA':
        return { label: 'Bendahara', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200/80' };
      default:
        return { label: cat, bg: 'bg-slate-100 text-slate-700 border-slate-200' };
    }
  };

  // ================= DIVISION ACTIONS =================
  const openCreateDivModal = () => {
    setEditingDivId(null);
    setDivName('');
    setDivTagline('');
    setDivDescription('');
    setDivLogoUrl('');
    setDivSortOrder(String(divisions.length + 1));
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
      toast.error(err.message || 'Gagal menyimpan divisi');
    } finally {
      setSaving(false);
    }
  };

  // ================= DIVISION MEMBER ACTIONS =================
  const openAddMemberModal = () => {
    if (!selectedDivision) return;
    setEditingMemberId(null);
    setMemName('');
    setMemRole('Staff');
    setMemProdi('');
    setMemImageUrl('');
    setMemSortOrder(String((selectedDivision?.members?.length || 0) + 1));
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

      toast.success(isEdit ? 'Anggota divisi diperbarui' : 'Anggota divisi ditambahkan');
      setMemberModalOpen(false);
      fetchDivisions();
    } catch (err: any) {
      toast.error(err.message || 'Gagal menyimpan anggota');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteMember = async () => {
    if (!targetDeleteMember) return;
    try {
      const res = await fetch(`/api/admin/divisi?action=delete-member&id=${targetDeleteMember.id}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message);

      toast.success(`Anggota "${targetDeleteMember.name}" berhasil dihapus`);
      setDeleteModalOpen(false);
      setTargetDeleteMember(null);
      fetchDivisions();
    } catch (e: any) {
      toast.error(e.message || 'Gagal menghapus anggota');
    }
  };

  // Filter members in active division
  const filteredDivMembers = (selectedDivision?.members || []).filter((m) => {
    const q = searchMember.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q) ||
      (m.prodiAngkatan && m.prodiAngkatan.toLowerCase().includes(q))
    );
  });

  const topLeadershipBph = bphMembers.filter(
    (m) => m.category === 'PEMBINA' || m.category === 'KETUA' || m.category === 'WAKIL'
  );
  const operationalLeadershipBph = bphMembers.filter(
    (m) => m.category !== 'PEMBINA' && m.category !== 'KETUA' && m.category !== 'WAKIL'
  );

  const handleExport = () => {
    try {
      if (activeTab === 'BPH') {
        exportToCsv(
          'Struktur_BPH_dan_Pembina_GenBI_UPNVJT',
          bphMembers,
          [
            { header: 'ID', key: 'id' },
            { header: 'Nama Lengkap', key: 'name' },
            { header: 'Kategori', key: (m) => getBphCategoryBadge(m.category).label },
            { header: 'Jabatan Resmi', key: 'position' },
            { header: 'Kutipan Visi', key: (m) => m.quote || '-' },
            { header: 'Instagram', key: (m) => m.instagram || '-' },
            { header: 'LinkedIn', key: (m) => m.linkedin || '-' },
          ]
        );
        toast.success('Data BPH & Pembina berhasil diunduh (CSV/Excel)');
      } else if (selectedDivision) {
        exportToCsv(
          `Anggota_Divisi_${selectedDivision.name.replace(/[^a-zA-Z0-9]/g, '_')}`,
          selectedDivision.members || [],
          [
            { header: 'ID', key: 'id' },
            { header: 'Divisi', key: () => selectedDivision.name },
            { header: 'Nama Anggota', key: 'name' },
            { header: 'Jabatan', key: 'role' },
            { header: 'Program Studi & Angkatan', key: (m) => m.prodiAngkatan || '-' },
            { header: 'Urutan', key: 'sortOrder' },
          ]
        );
        toast.success(`Data anggota divisi "${selectedDivision.name}" berhasil diunduh`);
      }
    } catch (e: any) {
      toast.error(e.message || 'Gagal mengekspor data');
    }
  };

  return (
    <AdminLayout
      title="Struktur & Kepengurusan Organisasi"
      subtitle="Kelola jajaran pimpinan BPH, profil Dewan Pembina, serta anggota dan program kerja 6 divisi operasional GenBI UPNVJT."
      action={
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200/90 hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-xs transition-all"
            title="Download CSV / Excel"
          >
            <Download size={14} className="text-slate-500" />
            <span>Ekspor Data</span>
          </button>
          {activeTab === 'BPH' ? (
            <button
              type="button"
              onClick={openCreateBphModal}
              className="px-4 py-2 bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] hover:from-[#0369A1] hover:to-[#0284C7] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm shadow-sky-500/25 transition-all"
            >
              <Plus size={15} /> Tambah Pengurus BPH
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={openCreateDivModal}
                className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-200/90 shadow-sm transition-all"
              >
                + Divisi Baru
              </button>
              <button
                type="button"
                onClick={openAddMemberModal}
                className="px-4 py-2 bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] hover:from-[#0369A1] hover:to-[#0284C7] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm shadow-sky-500/25 transition-all"
              >
                <UserPlus size={15} /> Tambah Anggota Divisi
              </button>
            </>
          )}
        </div>
      }
    >
      <Head>
        <title>Struktur & Kepengurusan - GenBIHub Admin</title>
      </Head>

      <div className="space-y-5">
        {/* ================= 1. CLEAN SEGMENTED PILLS TABS (NO DECORATIVE ICONS) ================= */}
        <div className="bg-white p-1.5 rounded-2xl border border-slate-200/90 shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-1.5">
            {/* Tab 1: BPH & PEMBINA */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('BPH');
                setSearchMember('');
              }}
              className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 text-center cursor-pointer ${
                activeTab === 'BPH'
                  ? 'bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] text-white shadow-sm shadow-sky-500/25 border border-transparent'
                  : 'bg-slate-50 hover:bg-white text-slate-700 hover:text-[#0284C7] border border-slate-200/90 hover:border-sky-300 hover:shadow-xs'
              }`}
            >
              <span className="truncate">BPH & Pembina</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                  activeTab === 'BPH' ? 'bg-white text-[#0284C7]' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {bphMembers.length}
              </span>
            </button>

            {/* Tabs 2-7: 6 Operational Divisions */}
            {divisions.map((d) => {
              const isSelected = activeTab === d.id;
              const shortName =
                d.name.match(/\(([^)]+)\)/)?.[1] ||
                (d.name.toLowerCase().includes('ekraf')
                  ? 'EKRAF'
                  : d.name.toLowerCase().includes('eksternal')
                  ? 'HUBEKS'
                  : d.name.toLowerCase().includes('medkom')
                  ? 'MEDKOM'
                  : d.name.toLowerCase().includes('pendidikan')
                  ? 'PENDIDIKAN'
                  : d.name.toLowerCase().includes('psdm')
                  ? 'PSDM'
                  : d.name.toLowerCase().includes('sosling')
                  ? 'SOSLING'
                  : d.name);

              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(d.id);
                    setSearchMember('');
                  }}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 text-center cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] text-white shadow-sm shadow-sky-500/25 border border-transparent'
                      : 'bg-slate-50 hover:bg-white text-slate-700 hover:text-[#0284C7] border border-slate-200/90 hover:border-sky-300 hover:shadow-xs'
                  }`}
                >
                  <span className="truncate">{shortName}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                      isSelected ? 'bg-white text-[#0284C7]' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {d.members?.length || 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= 2. TAB CONTENT: BPH & PEMBINA ================= */}
        {activeTab === 'BPH' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Top Leadership & Pembina */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Dewan Pembina & Pimpinan Tertinggi ({topLeadershipBph.length})
                </h3>
                <span className="text-[11px] font-semibold text-slate-400">
                  Total {bphMembers.length} Pimpinan Terdaftar
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loadingBph ? (
                  <div className="col-span-full p-8 text-center text-xs text-slate-400">Memuat data pengurus...</div>
                ) : topLeadershipBph.length > 0 ? (
                  topLeadershipBph.map((m) => {
                    const badge = getBphCategoryBadge(m.category);
                    return (
                      <div
                        key={m.id}
                        className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:border-slate-300 hover:shadow transition-all flex flex-col justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-start gap-3.5">
                            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shrink-0 shadow-xs">
                              <img
                                src={m.imageUrl}
                                alt={m.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as any).src = '/carousel-1.jpg';
                                }}
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border ${badge.bg}`}
                              >
                                {badge.label}
                              </span>
                              <h4 className="font-extrabold text-xs text-slate-900 truncate mt-1.5">{m.name}</h4>
                              <p className="text-[11px] text-slate-500 truncate mt-0.5">{m.position}</p>
                            </div>
                          </div>

                          {m.quote ? (
                            <div className="mt-3.5 p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-600 leading-relaxed italic line-clamp-2">
                              &ldquo;{m.quote}&rdquo;
                            </div>
                          ) : (
                            <div className="mt-3.5 p-3 bg-slate-50/50 rounded-xl border border-slate-100/60 text-[11px] text-slate-400 italic">
                              Belum ada kutipan visi.
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-400">
                          <div className="flex items-center gap-2">
                            {m.instagram && (
                              <a
                                href={m.instagram}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1 hover:text-pink-600 transition-colors"
                                title="Instagram"
                              >
                                <Instagram size={14} />
                              </a>
                            )}
                            {m.linkedin && (
                              <a
                                href={m.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1 hover:text-blue-600 transition-colors"
                                title="LinkedIn"
                              >
                                <Linkedin size={14} />
                              </a>
                            )}
                            <span className="text-[10px] font-mono text-slate-400">#{m.sortOrder}</span>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => openEditBphModal(m)}
                              className="p-1.5 text-slate-400 hover:text-[#0284C7] hover:bg-sky-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit2 size={13} />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setTargetDeleteBph(m);
                                setDeleteType('bph');
                                setDeleteModalOpen(true);
                              }}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Hapus"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-full p-8 text-center bg-white rounded-2xl border border-slate-200/90 text-xs text-slate-400">
                    Belum ada data pimpinan utama
                  </div>
                )}
              </div>
            </div>

            {/* Sekretariat & Bendahara */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Sekretariat & Bendahara Organisasi ({operationalLeadershipBph.length})
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {operationalLeadershipBph.length > 0 ? (
                  operationalLeadershipBph.map((m) => {
                    const badge = getBphCategoryBadge(m.category);
                    return (
                      <div
                        key={m.id}
                        className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:border-slate-300 hover:shadow transition-all flex flex-col justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-start gap-3.5">
                            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shrink-0 shadow-xs">
                              <img
                                src={m.imageUrl}
                                alt={m.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as any).src = '/carousel-1.jpg';
                                }}
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border ${badge.bg}`}
                              >
                                {badge.label}
                              </span>
                              <h4 className="font-extrabold text-xs text-slate-900 truncate mt-1.5">{m.name}</h4>
                              <p className="text-[11px] text-slate-500 truncate mt-0.5">{m.position}</p>
                            </div>
                          </div>

                          {m.quote ? (
                            <div className="mt-3.5 p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-600 leading-relaxed italic line-clamp-2">
                              &ldquo;{m.quote}&rdquo;
                            </div>
                          ) : (
                            <div className="mt-3.5 p-3 bg-slate-50/50 rounded-xl border border-slate-100/60 text-[11px] text-slate-400 italic">
                              Pelaksana tata kelola & administrasi organisasi.
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-400">
                          <div className="flex items-center gap-2">
                            {m.instagram && (
                              <a
                                href={m.instagram}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1 hover:text-pink-600 transition-colors"
                                title="Instagram"
                              >
                                <Instagram size={14} />
                              </a>
                            )}
                            {m.linkedin && (
                              <a
                                href={m.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="p-1 hover:text-blue-600 transition-colors"
                                title="LinkedIn"
                              >
                                <Linkedin size={14} />
                              </a>
                            )}
                            <span className="text-[10px] font-mono text-slate-400">#{m.sortOrder}</span>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => openEditBphModal(m)}
                              className="p-1.5 text-slate-400 hover:text-[#0284C7] hover:bg-sky-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit2 size={13} />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setTargetDeleteBph(m);
                                setDeleteType('bph');
                                setDeleteModalOpen(true);
                              }}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Hapus"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-full p-8 text-center bg-white rounded-2xl border border-slate-200/90 text-xs text-slate-400">
                    Belum ada data sekretaris atau bendahara
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= 3. TAB CONTENT: OPERATIONAL DIVISIONS ================= */}
        {typeof activeTab === 'number' && selectedDivision && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Division Header Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-100 flex items-center justify-center p-2.5 shrink-0 shadow-xs">
                  {selectedDivision.logoUrl ? (
                    <img
                      src={selectedDivision.logoUrl}
                      alt={selectedDivision.name}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Building2 className="text-[#0284C7]" size={28} />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-extrabold text-slate-900">{selectedDivision.name}</h2>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-sky-50 text-[#0284C7] border border-sky-200/80">
                      {selectedDivision.members?.length || 0} Anggota
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
                    {selectedDivision.description}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => openEditDivModal(selectedDivision)}
                className="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1.5 shrink-0 transition-all"
              >
                <Edit2 size={13} /> Edit Info Divisi
              </button>
            </div>

            {/* Member Search & View Controls */}
            <div className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md w-full">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder={`Cari anggota ${selectedDivision.name}...`}
                  value={searchMember}
                  onChange={(e) => setSearchMember(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                <span className="text-xs font-bold text-slate-500">
                  {filteredDivMembers.length} dari {selectedDivision.members?.length || 0} Anggota
                </span>
                <div className="flex items-center p-1 bg-slate-100 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setViewMode('table')}
                    className={`p-1.5 rounded-lg transition-all ${
                      viewMode === 'table' ? 'bg-white text-[#0284C7] shadow-xs' : 'text-slate-400 hover:text-slate-700'
                    }`}
                    title="Tampilan Tabel"
                  >
                    <List size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg transition-all ${
                      viewMode === 'grid' ? 'bg-white text-[#0284C7] shadow-xs' : 'text-slate-400 hover:text-slate-700'
                    }`}
                    title="Tampilan Grid Kartu"
                  >
                    <LayoutGrid size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Member List Rendering */}
            {viewMode === 'table' ? (
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        <th className="py-3.5 px-5">Foto</th>
                        <th className="py-3.5 px-5">Nama Lengkap</th>
                        <th className="py-3.5 px-5">Jabatan</th>
                        <th className="py-3.5 px-5">Prodi & Angkatan</th>
                        <th className="py-3.5 px-5">Urutan</th>
                        <th className="py-3.5 px-5 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {filteredDivMembers.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-slate-400">
                            {searchMember ? 'Tidak ada anggota yang sesuai pencarian' : 'Belum ada anggota di divisi ini.'}
                          </td>
                        </tr>
                      ) : (
                        filteredDivMembers.map((m) => {
                          const isLead =
                            m.role.toLowerCase().includes('kepala') ||
                            m.role.toLowerCase().includes('ketua') ||
                            m.role.toLowerCase().includes('kadiv');
                          return (
                            <tr key={m.id} className="hover:bg-slate-50/60 transition-colors">
                              <td className="py-3 px-5">
                                <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                                  <img
                                    src={m.imageUrl}
                                    alt={m.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      (e.target as any).src = '/members/dummy.png';
                                    }}
                                  />
                                </div>
                              </td>
                              <td className="py-3 px-5 font-bold text-slate-900">{m.name}</td>
                              <td className="py-3 px-5">
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-extrabold border ${
                                    isLead
                                      ? 'bg-sky-50 text-[#0284C7] border-sky-200/80'
                                      : 'bg-slate-100 text-slate-600 border-slate-200'
                                  }`}
                                >
                                  {m.role}
                                </span>
                              </td>
                              <td className="py-3 px-5 text-slate-500 font-medium">{m.prodiAngkatan || '-'}</td>
                              <td className="py-3 px-5 font-mono text-[11px] text-slate-400">#{m.sortOrder}</td>
                              <td className="py-3 px-5 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => openEditMemberModal(m)}
                                    className="p-1.5 text-slate-400 hover:text-[#0284C7] hover:bg-sky-50 rounded-lg transition-colors"
                                    title="Edit Anggota"
                                  >
                                    <Edit2 size={13} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setTargetDeleteMember(m);
                                      setDeleteType('divMember');
                                      setDeleteModalOpen(true);
                                    }}
                                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Hapus Anggota"
                                  >
                                    <Trash2 size={13} />
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
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredDivMembers.map((m) => {
                  const isLead =
                    m.role.toLowerCase().includes('kepala') ||
                    m.role.toLowerCase().includes('ketua') ||
                    m.role.toLowerCase().includes('kadiv');
                  return (
                    <div
                      key={m.id}
                      className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                          <img
                            src={m.imageUrl}
                            alt={m.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as any).src = '/members/dummy.png';
                            }}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-md text-[9px] font-extrabold border ${
                              isLead
                                ? 'bg-sky-50 text-[#0284C7] border-sky-200/80'
                                : 'bg-slate-100 text-slate-600 border-slate-200'
                            }`}
                          >
                            {m.role}
                          </span>
                          <h4 className="font-bold text-xs text-slate-900 truncate mt-1">{m.name}</h4>
                          <p className="text-[11px] text-slate-400 truncate">{m.prodiAngkatan || '-'}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 text-xs text-slate-400">
                        <span className="text-[10px] font-mono">#{m.sortOrder}</span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => openEditMemberModal(m)}
                            className="p-1 text-slate-400 hover:text-[#0284C7] hover:bg-sky-50 rounded-md"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setTargetDeleteMember(m);
                              setDeleteType('divMember');
                              setDeleteModalOpen(true);
                            }}
                            className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ================= 4. MODAL BPH FORM ================= */}
      {bphModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-base font-extrabold text-slate-900 mb-1">
              {editingBphId ? 'Edit Data Pengurus BPH' : 'Tambah Pengurus BPH / Pembina'}
            </h2>
            <p className="text-xs text-slate-400 mb-4">Lengkapi data profil pimpinan eksekutif GenBI UPNVJT.</p>

            <form onSubmit={handleBphSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Kategori Posisi *</label>
                  <select
                    value={bphCategory}
                    onChange={(e) => setBphCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30 bg-white"
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
                    value={bphSortOrder}
                    onChange={(e) => setBphSortOrder(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap & Gelar *</label>
                <input
                  type="text"
                  required
                  value={bphName}
                  onChange={(e) => setBphName(e.target.value)}
                  placeholder="Masyaroh Unafaznil Khoiroh"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Jabatan Resmi *</label>
                <input
                  type="text"
                  required
                  value={bphPosition}
                  onChange={(e) => setBphPosition(e.target.value)}
                  placeholder="Ketua Umum GenBI UPNVJT 2025/2026"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30"
                />
              </div>

              <FileUpload
                value={bphImageUrl}
                onChange={setBphImageUrl}
                scope="members"
                aspectRatio={1}
                label="Foto Profil (Rasio 1:1 Persegi) *"
                helperText="Otomatis di-crop ke format persegi 1:1 untuk keseragaman kartu profil"
              />

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Quotes / Kutipan Visi</label>
                <textarea
                  rows={2}
                  value={bphQuote}
                  onChange={(e) => setBphQuote(e.target.value)}
                  placeholder="Kutipan pesan inspiratif atau visi pimpinan..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Instagram URL</label>
                  <input
                    type="text"
                    value={bphInstagram}
                    onChange={(e) => setBphInstagram(e.target.value)}
                    placeholder="https://instagram.com/..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">LinkedIn URL</label>
                  <input
                    type="text"
                    value={bphLinkedin}
                    onChange={(e) => setBphLinkedin(e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setBphModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 text-xs font-bold bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] hover:from-[#0369A1] hover:to-[#0284C7] text-white rounded-xl flex items-center gap-1.5 shadow-sm shadow-sky-500/25 transition-all disabled:opacity-50"
                >
                  {saving && <Loader2 size={14} className="animate-spin" />}
                  <span>{editingBphId ? 'Simpan Perubahan' : 'Simpan Pengurus'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= 5. MODAL DIVISION FORM ================= */}
      {divModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-base font-extrabold text-slate-900 mb-1">
              {editingDivId ? 'Edit Data Divisi' : 'Tambah Divisi Baru'}
            </h2>
            <p className="text-xs text-slate-400 mb-4">Informasi divisi kerja operasional GenBI UPNVJT.</p>

            <form onSubmit={handleDivSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Divisi *</label>
                <input
                  type="text"
                  required
                  value={divName}
                  onChange={(e) => setDivName(e.target.value)}
                  placeholder="Ekonomi Kreatif (EKRAF)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tagline Singkat</label>
                <input
                  type="text"
                  value={divTagline}
                  onChange={(e) => setDivTagline(e.target.value)}
                  placeholder="Inovasi & Pemberdayaan Ekonomi..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Fokus Kerja *</label>
                <textarea
                  rows={3}
                  required
                  value={divDescription}
                  onChange={(e) => setDivDescription(e.target.value)}
                  placeholder="Fokus kegiatan dan program kerja divisi..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30"
                />
              </div>

              <FileUpload
                value={divLogoUrl}
                onChange={setDivLogoUrl}
                scope="divisi"
                aspectRatio={1}
                label="Logo / Lambang Divisi"
                helperText="Format 1:1 PNG transparan atau JPG"
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
                  className="px-5 py-2 text-xs font-bold bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] hover:from-[#0369A1] hover:to-[#0284C7] text-white rounded-xl flex items-center gap-1.5 shadow-sm shadow-sky-500/25 transition-all disabled:opacity-50"
                >
                  {saving && <Loader2 size={14} className="animate-spin" />}
                  <span>{editingDivId ? 'Simpan Perubahan' : 'Buat Divisi'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= 6. MODAL DIVISION MEMBER FORM ================= */}
      {memberModalOpen && selectedDivision && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-base font-extrabold text-slate-900 mb-1">
              {editingMemberId ? 'Edit Anggota Divisi' : `Tambah Anggota ${selectedDivision.name}`}
            </h2>
            <p className="text-xs text-slate-400 mb-4">Lengkapi data profil anggota atau pimpinan divisi.</p>

            <form onSubmit={handleMemberSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap *</label>
                <input
                  type="text"
                  required
                  value={memName}
                  onChange={(e) => setMemName(e.target.value)}
                  placeholder="Nama anggota..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Jabatan *</label>
                  <input
                    type="text"
                    required
                    value={memRole}
                    onChange={(e) => setMemRole(e.target.value)}
                    placeholder="Kepala Divisi / Staff"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Prodi & Angkatan</label>
                  <input
                    type="text"
                    value={memProdi}
                    onChange={(e) => setMemProdi(e.target.value)}
                    placeholder="Informatika '22"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30"
                  />
                </div>
              </div>

              <FileUpload
                value={memImageUrl}
                onChange={setMemImageUrl}
                scope="members"
                aspectRatio={1}
                label="Foto Profil Anggota (1:1) *"
                helperText="Otomatis di-crop ke format persegi 1:1"
              />

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
                  className="px-5 py-2 text-xs font-bold bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] hover:from-[#0369A1] hover:to-[#0284C7] text-white rounded-xl flex items-center gap-1.5 shadow-sm shadow-sky-500/25 transition-all disabled:opacity-50"
                >
                  {saving && <Loader2 size={14} className="animate-spin" />}
                  <span>{editingMemberId ? 'Simpan Perubahan' : 'Tambah Anggota'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= 7. MODAL CONFIRM DELETE ================= */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={26} />
            </div>
            <h3 className="font-black text-slate-900 text-base mb-1">
              {deleteType === 'bph' ? 'Konfirmasi Hapus Pengurus BPH' : 'Konfirmasi Hapus Anggota Divisi'}
            </h3>
            <p className="text-xs text-slate-500 mb-5 leading-relaxed">
              Apakah Anda yakin ingin menghapus{' '}
              <span className="font-bold text-slate-800">
                "{deleteType === 'bph' ? targetDeleteBph?.name : targetDeleteMember?.name}"
              </span>
              ? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex items-center justify-center gap-2.5">
              <button
                onClick={() => {
                  setDeleteModalOpen(false);
                  setTargetDeleteBph(null);
                  setTargetDeleteMember(null);
                }}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                onClick={deleteType === 'bph' ? handleDeleteBph : handleDeleteMember}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/20"
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
