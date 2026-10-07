import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  Newspaper,
  Users,
  Trophy,
  FileText,
  Plus,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Image as ImageIcon,
  Tag,
  Calendar,
  CheckCircle2,
  Download,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function AdminOverviewPage() {
  const [data, setData] = useState<{
    stats: {
      banners: number;
      bphMembers: number;
      divisions: number;
      totalMembers: number;
      articles: number;
      achievements: number;
      documents: number;
      categories?: number;
    };
    recentLogs: Array<{
      id: number;
      adminName?: string;
      action: string;
      description: string;
      createdAt: string;
    }>;
    recentArticles: Array<{
      id: number;
      title: string;
      slug: string;
      category: string;
      status: string;
      publishedAt: string;
    }>;
    divisionSummary?: Array<{
      id: number;
      name: string;
      slug: string;
      memberCount: number;
      prokerCount: number;
    }>;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  // Format today's date in Indonesian
  const [todayString, setTodayString] = useState('');

  useEffect(() => {
    const now = new Date();
    setTodayString(
      now.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    );

    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setData(json.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const stats = data?.stats;

  return (
    <AdminLayout
      title="Dashboard Overview"
      subtitle="Pusat tata kelola informasi publik, data kepengurusan, arsip dokumen, dan capaian prestasi GenBI UPNVJT."
      action={
        <div className="flex items-center gap-2.5">
          {todayString && (
            <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/90 text-slate-600 text-xs font-semibold shadow-xs">
              <Calendar size={13} className="text-slate-400" />
              <span>{todayString}</span>
            </div>
          )}
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-all shadow-xs"
          >
            <ExternalLink size={13} className="text-slate-400" />
            <span>Kunjungi Website</span>
          </Link>
          <Link
            href="/admin/berita"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] hover:from-[#0369A1] hover:to-[#0284C7] text-white font-bold text-xs shadow-sm shadow-sky-500/25 flex items-center gap-1.5 transition-all"
          >
            <Plus size={15} />
            <span>Rilis Berita Baru</span>
          </Link>
        </div>
      }
    >
      <Head>
        <title>Dashboard Overview - GenBIHub Admin</title>
      </Head>

      <div className="space-y-6">
        {/* ================= 1. EXECUTIVE QUICK ACTION & STATUS HUB ================= */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          {/* Greeting & Community Info */}
          <div className="space-y-1">
            <h2 className="text-sm font-extrabold text-slate-900">
              Panel Kendali GenBI UPN &ldquo;Veteran&rdquo; Jawa Timur
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Komisariat KPw Bank Indonesia Provinsi Jawa Timur
            </p>
          </div>

          {/* Quick Action Shortcuts (Direct Productivity Tools) */}
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href="/admin/berita"
              className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-200 text-slate-700 hover:text-[#0284C7] text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Plus size={13} className="text-[#0284C7]" />
              <span>Tulis Berita</span>
            </Link>

            <Link
              href="/admin/banner"
              className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-200 text-slate-700 hover:text-[#0284C7] text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <ImageIcon size={13} className="text-[#0284C7]" />
              <span>Ganti Banner</span>
            </Link>

            <Link
              href="/admin/prestasi"
              className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-200 text-slate-700 hover:text-[#0284C7] text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Trophy size={13} className="text-amber-500" />
              <span>Catat Prestasi</span>
            </Link>

            <Link
              href="/admin/kategori"
              className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Tag size={13} className="text-slate-400" />
              <span>Master Kategori</span>
            </Link>

            <a
              href="/api/admin/backup"
              download
              className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 text-slate-600 hover:text-emerald-700 text-xs font-bold transition-all flex items-center gap-1.5"
              title="Unduh snapshot arsip seluruh database JSON"
            >
              <Download size={13} className="text-emerald-600" />
              <span>Backup Database</span>
            </a>
          </div>
        </div>

        {/* ================= 2. 4 METRIC CARDS WITH SOFT-TINTED ICONS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Berita */}
          <Link
            href="/admin/berita"
            className="group bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:border-slate-300 hover:shadow transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Publikasi & Berita
                </span>
                <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#0284C7] border border-sky-100 flex items-center justify-center shrink-0 group-hover:bg-[#0284C7] group-hover:text-white transition-colors shadow-xs">
                  <Newspaper size={17} />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {loading ? '...' : stats?.articles ?? 0}
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-xs">
              <span className="text-slate-400">Rilis kegiatan aktif</span>
              <span className="font-bold text-[#0284C7] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Kelola <ArrowRight size={12} />
              </span>
            </div>
          </Link>

          {/* Card 2: Pengurus */}
          <Link
            href="/admin/divisi"
            className="group bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:border-slate-300 hover:shadow transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Total Kepengurusan
                </span>
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-xs">
                  <Users size={17} />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {loading ? '...' : (stats?.totalMembers ?? 0) + (stats?.bphMembers ?? 0)}
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-xs">
              <span className="text-slate-400">BPH & 6 Divisi Kerja</span>
              <span className="font-bold text-[#0284C7] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Struktur <ArrowRight size={12} />
              </span>
            </div>
          </Link>

          {/* Card 3: Prestasi */}
          <Link
            href="/admin/prestasi"
            className="group bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:border-slate-300 hover:shadow transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Prestasi & Penghargaan
                </span>
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-colors shadow-xs">
                  <Trophy size={17} />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {loading ? '...' : stats?.achievements ?? 0}
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-xs">
              <span className="text-slate-400">Juara, delegasi & award</span>
              <span className="font-bold text-[#0284C7] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Rekap <ArrowRight size={12} />
              </span>
            </div>
          </Link>

          {/* Card 4: Dokumen */}
          <Link
            href="/admin/dokumen"
            className="group bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:border-slate-300 hover:shadow transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Arsip Dokumen Resmi
                </span>
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors shadow-xs">
                  <FileText size={17} />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {loading ? '...' : stats?.documents ?? 0}
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-xs">
              <span className="text-slate-400">SK, LPJ & Berkas PDF</span>
              <span className="font-bold text-[#0284C7] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Arsip <ArrowRight size={12} />
              </span>
            </div>
          </Link>
        </div>

        {/* ================= 3. BENTO SECTION: RECENT ARTICLES & STRUKTUR RINGKAS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Recent Articles (2 Cols) */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between">
            <div>
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    Publikasi Berita Terbaru
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Artikel kegiatan, pengumuman, dan edukasi kebijakan BI</p>
                </div>
                <Link
                  href="/admin/berita"
                  className="text-xs font-bold text-[#0284C7] hover:underline"
                >
                  Kelola Semua →
                </Link>
              </div>

              <div className="divide-y divide-slate-100">
                {loading ? (
                  <div className="p-8 text-center text-xs text-slate-400">Memuat data publikasi...</div>
                ) : data?.recentArticles && data.recentArticles.length > 0 ? (
                  data.recentArticles.map((article) => (
                    <div
                      key={article.id}
                      className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between gap-4"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-600">
                            {article.category}
                          </span>
                          <span className="text-[11px] text-slate-400">{formatDate(article.publishedAt)}</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {article.title}
                        </h4>
                      </div>

                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                          article.status === 'PUBLISHED'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {article.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-xs text-slate-400">Belum ada artikel yang diterbitkan</div>
                )}
              </div>
            </div>

            <div className="p-4 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Total {stats?.articles ?? 0} publikasi tersimpan</span>
              <Link href="/admin/berita" className="font-bold text-[#0284C7] hover:underline transition-colors">
                Buka Manajemen Berita →
              </Link>
            </div>
          </div>

          {/* Right: Struktur & Divisi Summary (1 Col) */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    Struktur & Divisi
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Komposisi anggota divisi operasional</p>
                </div>
                <Link
                  href="/admin/divisi"
                  className="text-xs font-bold text-[#0284C7] hover:underline"
                >
                  Detail →
                </Link>
              </div>

              <div className="space-y-2">
                {/* BPH Link */}
                <Link
                  href="/admin/divisi?tab=BPH"
                  className="p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/60 hover:bg-slate-100/60 transition-all flex items-center justify-between text-xs"
                >
                  <span className="font-bold text-slate-900">BPH & Dewan Pembina</span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200/60">
                    {stats?.bphMembers ?? 4} Pimpinan
                  </span>
                </Link>

                {/* 6 Operational Divisions */}
                {loading ? (
                  <div className="p-6 text-center text-xs text-slate-400">Memuat divisi...</div>
                ) : data?.divisionSummary && data.divisionSummary.length > 0 ? (
                  data.divisionSummary
                    .filter((d) => !d.name.toLowerCase().includes('badan pengurus harian'))
                    .map((div) => (
                      <Link
                        key={div.id}
                        href={`/admin/divisi?tab=${div.id}`}
                        className="p-2.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/40 hover:bg-slate-100/60 transition-all flex items-center justify-between text-xs"
                      >
                        <span className="font-medium text-slate-700 truncate max-w-[180px]">{div.name}</span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white text-slate-600 border border-slate-200">
                          {div.memberCount} Anggota
                        </span>
                      </Link>
                    ))
                ) : (
                  <div className="p-4 text-center text-xs text-slate-400">Data divisi belum tersedia</div>
                )}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Total {(stats?.totalMembers ?? 0) + (stats?.bphMembers ?? 0)} Anggota</span>
              <Link href="/admin/divisi" className="font-bold text-[#0284C7] hover:underline">
                Kelola Anggota →
              </Link>
            </div>
          </div>
        </div>

        {/* ================= 4. ACTIVITY LOGS (MINIMALIST AUDIT TABLE) ================= */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                Catatan Log Sistem & Pembaruan
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Riwayat pembaruan konten dan aktivitas pengelolaan database</p>
            </div>
            <span className="text-[10px] font-bold text-slate-400">Realtime Audit</span>
          </div>

          <div className="divide-y divide-slate-100 mt-1">
            {loading ? (
              <div className="p-6 text-center text-xs text-slate-400">Memuat log aktivitas...</div>
            ) : data?.recentLogs && data.recentLogs.length > 0 ? (
              data.recentLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="py-3 flex items-center justify-between gap-4 text-xs">
                  <div className="min-w-0 flex-1">
                    <span className="font-bold text-slate-800">{log.action}</span>
                    <span className="text-slate-500 ml-2">{log.description}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 shrink-0 font-mono">
                    {formatDate(log.createdAt)}
                  </span>
                </div>
              ))
            ) : (
              <div className="py-6 text-center text-xs text-slate-400">Belum ada aktivitas yang tercatat</div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
