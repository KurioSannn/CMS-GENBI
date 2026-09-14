import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  ImageIcon,
  Users,
  Newspaper,
  Trophy,
  FileText,
  Clock,
  ArrowUpRight,
  Plus,
  TrendingUp,
  Activity,
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
    };
    recentLogs: Array<{
      id: number;
      adminName: string;
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
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      title="Ringkasan Dashboard"
      subtitle="Pantau dan kelola seluruh konten website resmi GenBI UPNVJT"
    >
      <Head>
        <title>Admin Dashboard - GenBIHub</title>
      </Head>

      <div className="space-y-8">
        {/* --- STAT CARDS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Banner */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hero Carousel</span>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <ImageIcon size={20} />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tight">
              {loading ? '...' : stats?.banners ?? 0}
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <span className="text-emerald-600 font-bold">Slide Aktif</span> di halaman beranda
            </p>
          </div>

          {/* Card 2: Pengurus */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Anggota</span>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Users size={20} />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tight">
              {loading ? '...' : (stats?.totalMembers ?? 0) + (stats?.bphMembers ?? 0)}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Tersebar di <span className="font-bold text-slate-700">{stats?.divisions ?? 7} Divisi</span> & BPH
            </p>
          </div>

          {/* Card 3: Berita */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Artikel Berita</span>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Newspaper size={20} />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tight">
              {loading ? '...' : stats?.articles ?? 0}
            </div>
            <p className="text-xs text-slate-500 mt-1">Publikasi & pengumuman resmi</p>
          </div>

          {/* Card 4: Prestasi */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Prestasi & Arsip</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Trophy size={20} />
              </div>
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tight">
              {loading ? '...' : (stats?.achievements ?? 0) + (stats?.documents ?? 0)}
            </div>
            <p className="text-xs text-slate-500 mt-1">Piala & dokumen resmi terbit</p>
          </div>
        </div>

        {/* --- QUICK ACTIONS --- */}
        <div className="bg-gradient-to-r from-[#0B1F40] to-[#16386e] rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold tracking-tight">Pintasan Cepat Manajemen</h2>
            <p className="text-xs text-slate-300 mt-0.5">Pilih tindakan yang ingin segera kamu lakukan</p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/admin/berita"
              className="px-3.5 py-2 bg-[#EAB308] hover:bg-[#ca9a07] text-[#0B1F40] text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md transition-all"
            >
              <Plus size={14} /> Tulis Berita
            </Link>
            <Link
              href="/admin/banner"
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all border border-white/20"
            >
              <Plus size={14} /> Atur Banner
            </Link>
            <Link
              href="/admin/divisi"
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all border border-white/20"
            >
              <Plus size={14} /> Kelola Divisi
            </Link>
          </div>
        </div>

        {/* --- TWO COLUMNS: RECENT ARTICLES & AUDIT TRAIL --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Recent Articles */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-bold text-slate-900">Berita Terakhir</h3>
                <p className="text-xs text-slate-400">Daftar publikasi artikel terbaru</p>
              </div>
              <Link
                href="/admin/berita"
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                Lihat Semua <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="space-y-3">
              {loading ? (
                <div className="p-4 text-center text-xs text-slate-400">Memuat data...</div>
              ) : data?.recentArticles && data.recentArticles.length > 0 ? (
                data.recentArticles.map((article) => (
                  <div
                    key={article.id}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between gap-3 hover:border-slate-200 transition-all"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">{article.title}</p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                        <span className="font-semibold text-blue-600">{article.category}</span>
                        <span>•</span>
                        <span>{formatDate(article.publishedAt)}</span>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        article.status === 'PUBLISHED'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {article.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-xs text-slate-400">Belum ada artikel</div>
              )}
            </div>
          </div>

          {/* Right Column: Activity Log (Audit Trail) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Activity size={18} className="text-blue-600" />
                  Audit Trail Aktivitas
                </h3>
                <p className="text-xs text-slate-400">Catatan riwayat perubahan konten admin</p>
              </div>
            </div>

            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {loading ? (
                <div className="p-4 text-center text-xs text-slate-400">Memuat log...</div>
              ) : data?.recentLogs && data.recentLogs.length > 0 ? (
                data.recentLogs.map((log) => (
                  <div key={log.id} className="flex gap-3 text-xs p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">
                      <Clock size={12} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-slate-800 font-medium leading-snug">{log.description}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {log.adminName} • {formatDate(log.createdAt)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-xs text-slate-400">Belum ada aktivitas tercatat</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
