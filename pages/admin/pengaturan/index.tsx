import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import AdminLayout from '@/components/admin/AdminLayout';
import FileUpload from '@/components/admin/FileUpload';
import {
  DEFAULT_SITE_SETTINGS,
  mergeSiteSettings,
  SiteSettings,
} from '@/lib/site-settings';
import { getErrorMessage } from '@/lib/utils';
import {
  Megaphone,
  BarChart3,
  Award,
  PhoneCall,
  Save,
  Plus,
  Trash2,
  Loader2,
  RotateCcw,
} from 'lucide-react';
import { toast } from 'sonner';

type SettingsTab = 'popup' | 'stats' | 'recruitment' | 'contact';

export default function AdminPengaturanPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('popup');
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/settings');
      const json = await res.json();
      if (json.success && json.data) {
        setSettings(mergeSiteSettings(json.data));
      }
    } catch {
      toast.error('Gagal memuat pengaturan landing page');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Gagal menyimpan pengaturan');
      }
      setSettings(mergeSiteSettings(json.data));
      toast.success('Pengaturan landing page berhasil disimpan');
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, 'Gagal menyimpan pengaturan'));
    } finally {
      setSaving(false);
    }
  };

  const tabs: Array<{ id: SettingsTab; label: string; icon: React.ElementType }> = [
    { id: 'popup', label: 'Popup & Tentang', icon: Megaphone },
    { id: 'stats', label: 'Statistik & Sejarah', icon: BarChart3 },
    { id: 'recruitment', label: 'Rekrutmen & Poster', icon: Award },
    { id: 'contact', label: 'Kontak, FAQ & Footer', icon: PhoneCall },
  ];

  return (
    <AdminLayout
      title="Pengaturan Landing Page"
      subtitle="Kelola popup informasi, angka capaian, poster & syarat rekrutmen, kontak resmi, FAQ, dan footer website."
      action={
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchSettings}
            disabled={loading || saving}
            className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all disabled:opacity-50"
          >
            <RotateCcw size={14} /> Muat Ulang
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={loading || saving}
            className="px-4 py-2 bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] hover:from-[#0369A1] hover:to-[#0284C7] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm shadow-sky-500/25 transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            <span>Simpan Perubahan</span>
          </button>
        </div>
      }
    >
      <Head>
        <title>Pengaturan Landing Page - GenBIHub Admin</title>
      </Head>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all border ${
                isActive
                  ? 'bg-[#0284C7] text-white border-[#0284C7] shadow-sm shadow-sky-500/20'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon size={15} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-400">
          Memuat pengaturan...
        </div>
      ) : (
        <div className="space-y-6">
          {/* TAB 1: POPUP & TENTANG KAMI */}
          {activeTab === 'popup' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h2 className="text-sm font-extrabold text-slate-900">Notifikasi Popup Melayang</h2>
                    <p className="text-[11px] text-slate-400">Tampil di pojok kanan bawah beranda.</p>
                  </div>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.popup.enabled}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          popup: { ...settings.popup, enabled: e.target.checked },
                        })
                      }
                      className="rounded border-slate-300 text-[#0284C7] focus:ring-[#0284C7]"
                    />
                    <span className="text-xs font-bold text-slate-700">Aktifkan</span>
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Badge Atas</label>
                  <input
                    type="text"
                    value={settings.popup.badge}
                    onChange={(e) =>
                      setSettings({ ...settings, popup: { ...settings.popup, badge: e.target.value } })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Judul Utama</label>
                  <input
                    type="text"
                    value={settings.popup.title}
                    onChange={(e) =>
                      setSettings({ ...settings, popup: { ...settings.popup, title: e.target.value } })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Teks Sorotan (Emas)</label>
                  <input
                    type="text"
                    value={settings.popup.highlight}
                    onChange={(e) =>
                      setSettings({ ...settings, popup: { ...settings.popup, highlight: e.target.value } })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Teks Tombol Aksi</label>
                  <input
                    type="text"
                    value={settings.popup.ctaText}
                    onChange={(e) =>
                      setSettings({ ...settings, popup: { ...settings.popup, ctaText: e.target.value } })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-sm font-extrabold text-slate-900">Section Tentang Kami &amp; Profil</h2>
                  <p className="text-[11px] text-slate-400">Ringkasan komunitas di beranda dan foto utama profil.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tagline Pill</label>
                  <input
                    type="text"
                    value={settings.about.tagline}
                    onChange={(e) =>
                      setSettings({ ...settings, about: { ...settings.about, tagline: e.target.value } })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Singkat</label>
                  <textarea
                    rows={3}
                    value={settings.about.description}
                    onChange={(e) =>
                      setSettings({ ...settings, about: { ...settings.about, description: e.target.value } })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Jumlah Program Kerja</label>
                    <input
                      type="number"
                      value={settings.about.prokerCount}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          about: { ...settings.about, prokerCount: Number(e.target.value) || 0 },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Jumlah Anggota Aktif</label>
                    <input
                      type="number"
                      value={settings.about.activeMemberCount}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          about: { ...settings.about, activeMemberCount: Number(e.target.value) || 0 },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Link Virtual Tour Kampus</label>
                  <input
                    type="url"
                    value={settings.about.virtualTourUrl}
                    onChange={(e) =>
                      setSettings({ ...settings, about: { ...settings.about, virtualTourUrl: e.target.value } })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <FileUpload
                  value={settings.about.profileHeroImage}
                  onChange={(url) =>
                    setSettings({ ...settings, about: { ...settings.about, profileHeroImage: url } })
                  }
                  scope="general"
                  aspectRatio={16 / 9}
                  label="Foto Utama Halaman /profil"
                  helperText="Menggantikan foto banner statis di halaman Profil"
                />
              </div>
            </div>
          )}

          {/* TAB 2: STATISTIK & SEJARAH */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h2 className="text-sm font-extrabold text-slate-900">Kartu Statistik Capaian</h2>
                    <p className="text-[11px] text-slate-400">Tampil pada section &quot;Capaian Generasi Baru&quot;.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {settings.stats.map((stat, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-extrabold text-[#0284C7] uppercase">
                          Kartu #{idx + 1}
                        </span>
                        <label className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
                          <input
                            type="checkbox"
                            checked={Boolean(stat.isFloat)}
                            onChange={(e) => {
                              const next = [...settings.stats];
                              next[idx] = { ...next[idx], isFloat: e.target.checked };
                              setSettings({ ...settings, stats: next });
                            }}
                          />
                          Desimal
                        </label>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Label Utama</label>
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) => {
                            const next = [...settings.stats];
                            next[idx] = { ...next[idx], label: e.target.value };
                            setSettings({ ...settings, stats: next });
                          }}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">Angka</label>
                          <input
                            type="number"
                            step={stat.isFloat ? '0.01' : '1'}
                            value={stat.value}
                            onChange={(e) => {
                              const next = [...settings.stats];
                              next[idx] = { ...next[idx], value: Number(e.target.value) || 0 };
                              setSettings({ ...settings, stats: next });
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1">Suffix</label>
                          <input
                            type="text"
                            value={stat.suffix}
                            placeholder="+ / %"
                            onChange={(e) => {
                              const next = [...settings.stats];
                              next[idx] = { ...next[idx], suffix: e.target.value };
                              setSettings({ ...settings, stats: next });
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">Sub-Label</label>
                        <input
                          type="text"
                          value={stat.sub}
                          onChange={(e) => {
                            const next = [...settings.stats];
                            next[idx] = { ...next[idx], sub: e.target.value };
                            setSettings({ ...settings, stats: next });
                          }}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h2 className="text-sm font-extrabold text-slate-900">Paragraf Sejarah GenBI</h2>
                    <p className="text-[11px] text-slate-400">Paragraf kedua otomatis tampil sebagai kutipan sorotan.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setSettings({
                        ...settings,
                        historyParagraphs: [...settings.historyParagraphs, ''],
                      })
                    }
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1"
                  >
                    <Plus size={13} /> Tambah Paragraf
                  </button>
                </div>

                <div className="space-y-3">
                  {settings.historyParagraphs.map((para, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <textarea
                        rows={3}
                        value={para}
                        onChange={(e) => {
                          const next = [...settings.historyParagraphs];
                          next[idx] = e.target.value;
                          setSettings({ ...settings, historyParagraphs: next });
                        }}
                        className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setSettings({
                            ...settings,
                            historyParagraphs: settings.historyParagraphs.filter((_, i) => i !== idx),
                          })
                        }
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        title="Hapus Paragraf"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: REKRUTMEN & POSTER */}
          {activeTab === 'recruitment' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h2 className="text-sm font-extrabold text-slate-900">Status &amp; Portal Pendaftaran</h2>
                    <p className="text-[11px] text-slate-400">Mengontrol tombol &amp; modal pada section Join GenBI CTA.</p>
                  </div>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.recruitment.isOpen}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          recruitment: { ...settings.recruitment, isOpen: e.target.checked },
                        })
                      }
                      className="rounded border-slate-300 text-[#0284C7] focus:ring-[#0284C7]"
                    />
                    <span className="text-xs font-bold text-slate-700">Pendaftaran Dibuka</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Badge Rekrutmen</label>
                    <input
                      type="text"
                      value={settings.recruitment.badge}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          recruitment: { ...settings.recruitment, badge: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Judul Modal Pendaftaran</label>
                    <input
                      type="text"
                      value={settings.recruitment.modalTitle}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          recruitment: { ...settings.recruitment, modalTitle: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Catatan Penting (Banner Modal)</label>
                  <textarea
                    rows={2}
                    value={settings.recruitment.noticeText}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        recruitment: { ...settings.recruitment, noticeText: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Link Detail Seleksi (IG)</label>
                    <input
                      type="url"
                      value={settings.recruitment.detailUrl}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          recruitment: { ...settings.recruitment, detailUrl: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Link Google Form</label>
                    <input
                      type="url"
                      value={settings.recruitment.formUrl}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          recruitment: { ...settings.recruitment, formUrl: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Contact Person</label>
                    <input
                      type="text"
                      value={settings.recruitment.contactPerson}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          recruitment: { ...settings.recruitment, contactPerson: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                </div>

                {/* Syarat Pendaftaran */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-700">Kriteria / Persyaratan Utama</label>
                    <button
                      type="button"
                      onClick={() =>
                        setSettings({
                          ...settings,
                          recruitment: {
                            ...settings.recruitment,
                            requirements: [...settings.recruitment.requirements, ''],
                          },
                        })
                      }
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold flex items-center gap-1"
                    >
                      <Plus size={12} /> Tambah Syarat
                    </button>
                  </div>
                  <div className="space-y-2">
                    {settings.recruitment.requirements.map((req, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={req}
                          onChange={(e) => {
                            const next = [...settings.recruitment.requirements];
                            next[idx] = e.target.value;
                            setSettings({
                              ...settings,
                              recruitment: { ...settings.recruitment, requirements: next },
                            });
                          }}
                          className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setSettings({
                              ...settings,
                              recruitment: {
                                ...settings.recruitment,
                                requirements: settings.recruitment.requirements.filter((_, i) => i !== idx),
                              },
                            })
                          }
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Poster Rekrutmen */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h2 className="text-sm font-extrabold text-slate-900">Poster Galeri Rekrutmen</h2>
                    <p className="text-[11px] text-slate-400">Tampil berjajar pada kartu Join GenBI.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setSettings({
                        ...settings,
                        recruitment: {
                          ...settings.recruitment,
                          posters: [
                            ...settings.recruitment.posters,
                            { id: Date.now(), title: 'Poster Baru', src: '/carousel-1.jpg' },
                          ],
                        },
                      })
                    }
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1"
                  >
                    <Plus size={13} /> Tambah Poster
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {settings.recruitment.posters.map((poster, idx) => (
                    <div key={poster.id} className="p-4 rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <input
                          type="text"
                          value={poster.title}
                          onChange={(e) => {
                            const next = [...settings.recruitment.posters];
                            next[idx] = { ...next[idx], title: e.target.value };
                            setSettings({
                              ...settings,
                              recruitment: { ...settings.recruitment, posters: next },
                            });
                          }}
                          className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setSettings({
                              ...settings,
                              recruitment: {
                                ...settings.recruitment,
                                posters: settings.recruitment.posters.filter((_, i) => i !== idx),
                              },
                            })
                          }
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                          title="Hapus Poster"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <FileUpload
                        value={poster.src}
                        onChange={(url) => {
                          const next = [...settings.recruitment.posters];
                          next[idx] = { ...next[idx], src: url };
                          setSettings({
                            ...settings,
                            recruitment: { ...settings.recruitment, posters: next },
                          });
                        }}
                        scope="banner"
                        aspectRatio={3 / 4}
                        label="Gambar Poster (3:4)"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: KONTAK, FAQ & FOOTER */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                  <h2 className="text-sm font-extrabold text-slate-900 border-b border-slate-100 pb-3">
                    Kontak Resmi &amp; Media Sosial
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Resmi</label>
                      <input
                        type="email"
                        value={settings.contact.email}
                        onChange={(e) =>
                          setSettings({ ...settings, contact: { ...settings.contact, email: e.target.value } })
                        }
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Handle Instagram</label>
                      <input
                        type="text"
                        value={settings.contact.instagramHandle}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            contact: { ...settings.contact, instagramHandle: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">URL Instagram</label>
                      <input
                        type="url"
                        value={settings.contact.instagramUrl}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            contact: { ...settings.contact, instagramUrl: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">URL YouTube</label>
                      <input
                        type="url"
                        value={settings.contact.youtubeUrl}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            contact: { ...settings.contact, youtubeUrl: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Label WhatsApp</label>
                      <input
                        type="text"
                        value={settings.contact.whatsappLabel}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            contact: { ...settings.contact, whatsappLabel: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">URL WhatsApp (wa.me)</label>
                      <input
                        type="url"
                        value={settings.contact.whatsappUrl}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            contact: { ...settings.contact, whatsappUrl: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lokasi</label>
                    <input
                      type="text"
                      value={settings.contact.locationLabel}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          contact: { ...settings.contact, locationLabel: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Link Google Maps</label>
                    <input
                      type="url"
                      value={settings.contact.mapsLink}
                      onChange={(e) =>
                        setSettings({ ...settings, contact: { ...settings.contact, mapsLink: e.target.value } })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Embed URL Google Maps</label>
                    <input
                      type="url"
                      value={settings.contact.mapsEmbedUrl}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          contact: { ...settings.contact, mapsEmbedUrl: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                  <h2 className="text-sm font-extrabold text-slate-900 border-b border-slate-100 pb-3">
                    Pengaturan Footer
                  </h2>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Teks Copyright</label>
                    <input
                      type="text"
                      value={settings.footer.copyrightText}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          footer: { ...settings.footer, copyrightText: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Label Tautan Pedoman</label>
                    <input
                      type="text"
                      value={settings.footer.guideLabel}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          footer: { ...settings.footer, guideLabel: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">URL Tautan Pedoman</label>
                    <input
                      type="url"
                      value={settings.footer.guideUrl}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          footer: { ...settings.footer, guideUrl: e.target.value },
                        })
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Daftar FAQ */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h2 className="text-sm font-extrabold text-slate-900">Daftar Tanya Jawab (FAQ)</h2>
                    <p className="text-[11px] text-slate-400">Otomatis tersinkron juga ke SEO Schema FAQPage di beranda.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setSettings({
                        ...settings,
                        faqs: [...settings.faqs, { question: '', answer: '' }],
                      })
                    }
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1"
                  >
                    <Plus size={13} /> Tambah FAQ
                  </button>
                </div>

                <div className="space-y-4">
                  {settings.faqs.map((faq, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-extrabold text-[#0284C7] uppercase">FAQ #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setSettings({
                              ...settings,
                              faqs: settings.faqs.filter((_, i) => i !== idx),
                            })
                          }
                          className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                          title="Hapus FAQ"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Pertanyaan..."
                        value={faq.question}
                        onChange={(e) => {
                          const next = [...settings.faqs];
                          next[idx] = { ...next[idx], question: e.target.value };
                          setSettings({ ...settings, faqs: next });
                        }}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white font-semibold"
                      />
                      <textarea
                        rows={2}
                        placeholder="Jawaban..."
                        value={faq.answer}
                        onChange={(e) => {
                          const next = [...settings.faqs];
                          next[idx] = { ...next[idx], answer: e.target.value };
                          setSettings({ ...settings, faqs: next });
                        }}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
}
