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
  LogOut,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Toaster, toast } from 'sonner';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

const navItems = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/banner', label: 'Banner Hero', icon: ImageIcon },
  { href: '/admin/bph', label: 'BPH & Pembina', icon: ShieldAlert },
  { href: '/admin/divisi', label: 'Divisi & Anggota', icon: Users },
  { href: '/admin/berita', label: 'Berita & Artikel', icon: Newspaper },
  { href: '/admin/prestasi', label: 'Prestasi', icon: Trophy },
  { href: '/admin/dokumen', label: 'Dokumen Arsip', icon: FileText },
];

export default function AdminLayout({ children, title, subtitle, action }: AdminLayoutProps) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; role: string; username: string } | null>(null);

  useEffect(() => {
    // Check auth status
    fetch('/api/auth/me')
      .then((res) => {
        if (!res.ok) {
          router.replace('/admin/login');
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data?.user) setCurrentUser(data.user);
      })
      .catch(() => {
        router.replace('/admin/login');
      });
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      toast.success('Berhasil logout');
      router.replace('/admin/login');
    } catch (e) {
      router.replace('/admin/login');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Toaster richColors position="top-right" />

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* --- SIDEBAR --- */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo / Header */}
        <div className="h-16 px-6 border-b border-slate-100 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#0B1F40] flex items-center justify-center text-[#EAB308] font-black text-sm shadow-md">
              G
            </div>
            <div>
              <span className="font-black text-slate-900 text-sm tracking-tight flex items-center gap-1">
                GenBI<span className="text-[#EAB308]">CMS</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium block leading-none">UPN "Veteran" Jatim</span>
            </div>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Kelola Konten
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = router.pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#0B1F40] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon size={17} className={isActive ? 'text-[#EAB308]' : 'text-slate-400'} />
                <span>{item.label}</span>
                {isActive && <ChevronRight size={14} className="ml-auto opacity-70" />}
              </Link>
            );
          })}

          <div className="pt-6 px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Tautan Cepat
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 transition-all"
          >
            <ExternalLink size={16} className="text-slate-400" />
            <span>Lihat Web Publik</span>
          </a>
        </div>

        {/* Footer User Info & Logout */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'A'}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">{currentUser?.name || 'Admin'}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                  {currentUser?.role || 'Superadmin'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Link href="/admin" className="hover:text-slate-900">Dashboard</Link>
              {router.pathname !== '/admin' && (
                <>
                  <ChevronRight size={14} className="text-slate-400" />
                  <span className="text-slate-900 font-semibold">{title}</span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Sistem Aktif
            </span>
          </div>
        </header>

        {/* Page Header */}
        <div className="px-6 md:px-8 pt-6 pb-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h1>
              {subtitle && <p className="text-xs md:text-sm text-slate-500 mt-1">{subtitle}</p>}
            </div>
            {action && <div>{action}</div>}
          </div>
        </div>

        {/* Main Body */}
        <main className="flex-1 p-6 md:px-8 pb-16">{children}</main>
      </div>
    </div>
  );
}
