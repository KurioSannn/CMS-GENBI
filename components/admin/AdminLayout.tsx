import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  LayoutDashboard,
  Image as ImageIcon,
  Users,
  ShieldAlert,
  Newspaper,
  Trophy,
  FileText,
  Tag,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  Bell,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { Toaster, toast } from 'sonner';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

interface NavGroup {
  group: string;
  items: {
    href: string;
    label: string;
    icon: React.ElementType;
    badge?: string;
  }[];
}

const navigationGroups: NavGroup[] = [
  {
    group: 'UTAMA',
    items: [
      { href: '/admin', label: 'Dashboard Overview', icon: LayoutDashboard },
    ],
  },
  {
    group: 'KONTEN PUBLIKASI',
    items: [
      { href: '/admin/berita', label: 'Berita & Artikel', icon: Newspaper },
      { href: '/admin/banner', label: 'Banner Carousel', icon: ImageIcon },
      { href: '/admin/kategori', label: 'Master Kategori', icon: Tag },
    ],
  },
  {
    group: 'ORGANISASI & STRUKTUR',
    items: [
      { href: '/admin/divisi', label: 'Struktur & Kepengurusan', icon: Users },
      { href: '/admin/prestasi', label: 'Prestasi & Lomba', icon: Trophy },
    ],
  },
  {
    group: 'ARSIP DATA',
    items: [
      { href: '/admin/dokumen', label: 'Dokumen Resmi', icon: FileText },
    ],
  },
];

export default function AdminLayout({ children, title, subtitle, action }: AdminLayoutProps) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; role: string; username: string } | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => {
        if (!res.ok) {
          window.location.href = '/admin/login';
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data?.user) setCurrentUser(data.user);
      })
      .catch(() => {
        window.location.href = '/admin/login';
      });
  }, [router]);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      toast.success('Berhasil logout dari sistem');
      setTimeout(() => {
        window.location.href = '/admin/login';
      }, 300);
    } catch (e) {
      window.location.href = '/admin/login';
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return 'AD';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-800 font-sans antialiased">
      <Toaster richColors position="top-right" />

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ================= CLEAN SIDEBAR WITH GRADIENT ACCENTS ================= */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-white border-r border-slate-200/90 flex flex-col transition-transform duration-200 ease-in-out shadow-sm ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Logo Header */}
        <div className="h-16 px-6 border-b border-slate-100 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3 group">
            <img
              src="/favicongenbiupnvj.png"
              alt="Logo GenBI UPNVJT"
              className="w-8 h-8 object-contain shrink-0 group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-slate-900 text-sm tracking-tight flex items-center gap-1">
                GenBI<span className="text-[#0284C7]">Hub</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium">UPN "Veteran" Jatim</span>
            </div>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Groups */}
        <div className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
          {navigationGroups.map((grp) => (
            <div key={grp.group} className="space-y-1">
              <div className="px-3 pb-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                {grp.group}
              </div>
              {grp.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  router.pathname === item.href ||
                  (item.href === '/admin/divisi' &&
                    (router.pathname.startsWith('/admin/divisi') || router.pathname.startsWith('/admin/bph')));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`group flex items-center px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] text-white font-bold shadow-sm shadow-sky-500/25'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        size={16}
                        className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-700 transition-colors'}
                      />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* Sidebar Footer / User Profile */}
        <div className="p-3 border-t border-slate-100 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all"
          >
            <div className="flex items-center gap-2">
              <ExternalLink size={14} className="text-slate-400" />
              <span>Lihat Web Publik</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-bold border border-slate-200">Live</span>
          </a>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-[#0B1F40] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
                {getInitials(currentUser?.name)}
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-slate-900 truncate">{currentUser?.name || 'Administrator'}</p>
                <p className="text-[10px] text-slate-500 font-medium">Admin</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              title="Keluar / Logout"
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              {isLoggingOut ? <Loader2 size={15} className="animate-spin text-red-500" /> : <LogOut size={15} />}
            </button>
          </div>
        </div>
      </aside>

      {/* ================= MAIN WORKSPACE ================= */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Clean Top Header with Subtle Gradient Accent */}
        <header className="h-16 bg-white border-b border-slate-200/80 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              <Menu size={18} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-[#0B1F40] to-[#0284C7] uppercase">
                  GENBI UPNVJT
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-[10px] font-medium text-slate-400">Panel Pengurus</span>
              </div>
              <h1 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">{title}</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {action}
          </div>
        </header>

        {/* Workspace Canvas */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
