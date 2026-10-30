import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Activity, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  User, 
  ShieldCheck, 
  RefreshCw,
  PlusCircle,
  Edit,
  Trash2,
  LogIn,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface ActivityLogItem {
  id: number;
  adminId?: number;
  adminName: string;
  action: string;
  description: string;
  ipAddress?: string;
  createdAt: string;
}

interface ActivityStats {
  total: number;
  todayCount: number;
  createCount: number;
  updateCount: number;
  deleteCount: number;
}

export default function AdminAktivitasPage() {
  const [logs, setLogs] = useState<ActivityLogItem[]>([]);
  const [stats, setStats] = useState<ActivityStats>({
    total: 0,
    todayCount: 0,
    createCount: 0,
    updateCount: 0,
    deleteCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedAction, setSelectedAction] = useState('ALL');

  const fetchLogs = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (selectedAction !== 'ALL') params.append('action', selectedAction);
    if (search.trim()) params.append('search', search.trim());
    params.append('limit', '100');

    fetch(`/api/admin/logs?${params.toString()}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setLogs(json.data.logs || []);
          if (json.data.stats) setStats(json.data.stats);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchLogs();
  }, [selectedAction]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLogs();
  };

  const getActionBadge = (action: string) => {
    const act = (action || '').toUpperCase();
    if (act.includes('CREATE') || act.includes('TAMBAH') || act.includes('UPLOAD')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <PlusCircle size={12} />
          <span>{action}</span>
        </span>
      );
    }
    if (act.includes('UPDATE') || act.includes('UBAH') || act.includes('EDIT')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
          <Edit size={12} />
          <span>{action}</span>
        </span>
      );
    }
    if (act.includes('DELETE') || act.includes('HAPUS')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
          <Trash2 size={12} />
          <span>{action}</span>
        </span>
      );
    }
    if (act.includes('LOGIN') || act.includes('MASUK')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
          <LogIn size={12} />
          <span>{action}</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
        <Activity size={12} />
        <span>{action}</span>
      </span>
    );
  };

  return (
    <AdminLayout
      title="Log Aktivitas Admin"
      subtitle="Rekapitulasi jejak audit sistem, pembaruan konten website, dan aktivitas pengurus secara transparan."
      action={
        <button
          onClick={fetchLogs}
          disabled={loading}
          className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-all shadow-xs disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw size={13} className={loading ? 'animate-spin text-[#0284C7]' : 'text-slate-500'} />
          <span>Segarkan Data</span>
        </button>
      }
    >
      <Head>
        <title>Log Aktivitas Admin - GenBIHub</title>
      </Head>

      <div className="space-y-6">
        
        {/* Metric Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Total Log Aktivitas
            </span>
            <span className="text-2xl font-black text-slate-900 block">
              {stats.total}
            </span>
            <span className="text-[11px] text-slate-400 font-medium block">
              Terekam dalam basis data
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-[#0284C7] uppercase tracking-wider block">
              Aktivitas Hari Ini
            </span>
            <span className="text-2xl font-black text-[#0284C7] block">
              {stats.todayCount}
            </span>
            <span className="text-[11px] text-slate-400 font-medium block">
              Tindakan 24 jam terakhir
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">
              Publikasi &amp; Tambah (Create)
            </span>
            <span className="text-2xl font-black text-emerald-600 block">
              {stats.createCount}
            </span>
            <span className="text-[11px] text-slate-400 font-medium block">
              Konten &amp; arsip baru
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
            <span className="text-[11px] font-bold text-sky-600 uppercase tracking-wider block">
              Pembaruan Data (Update)
            </span>
            <span className="text-2xl font-black text-sky-600 block">
              {stats.updateCount}
            </span>
            <span className="text-[11px] text-slate-400 font-medium block">
              Modifikasi data pengurus &amp; berita
            </span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Action Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap w-full md:w-auto">
            {['ALL', 'CREATE', 'UPDATE', 'DELETE', 'LOGIN'].map((act) => (
              <button
                key={act}
                onClick={() => setSelectedAction(act)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedAction === act
                    ? 'bg-[#0284C7] text-white shadow-xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {act === 'ALL' ? 'Semua Aksi' : act}
              </button>
            ))}
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full md:w-80">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari admin atau aktivitas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 focus:border-[#0284C7] transition-all"
              />
            </div>
            <button
              type="submit"
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all cursor-pointer"
            >
              Cari
            </button>
          </form>

        </div>

        {/* Audit Trail Table */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4 w-44">Waktu &amp; Tanggal</th>
                  <th className="py-3.5 px-4 w-40">Admin Pengurus</th>
                  <th className="py-3.5 px-4 w-36">Tindakan</th>
                  <th className="py-3.5 px-4">Deskripsi Aktivitas</th>
                  <th className="py-3.5 px-4 w-32 text-right">Alamat IP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400 font-medium">
                      Memuat riwayat aktivitas...
                    </td>
                  </tr>
                ) : logs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400 font-medium">
                      Belum ada riwayat aktivitas yang sesuai filter.
                    </td>
                  </tr>
                ) : (
                  logs.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-medium text-slate-500 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Clock size={12} className="text-slate-400 shrink-0" />
                          <span>{formatDate(item.createdAt)}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center font-bold text-[10px] shrink-0">
                            {(item.adminName || 'A').charAt(0).toUpperCase()}
                          </div>
                          <span className="font-bold text-slate-900">{item.adminName}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        {getActionBadge(item.action)}
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-800">
                        {item.description}
                      </td>
                      <td className="py-3 px-4 text-right text-slate-400 font-mono text-[11px] whitespace-nowrap">
                        {item.ipAddress || '127.0.0.1'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
