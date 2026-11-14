"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Menu, X, Users, Trophy, Newspaper, FileText } from 'lucide-react';

interface NavbarProps {
  isScrolled?: boolean;
}

const sectionNavItems = [
  { label: "Beranda", href: "/#beranda" },
  { label: "Prestasi", href: "/#prestasi" },
  { label: "Tentang Kami", href: "/#tentang-kami" },
  { label: "Pilar Mandat", href: "/#visi-misi" },
  { label: "Warta Berita", href: "/#berita" },
  { label: "Beasiswa & FAQ", href: "/#beasiswa-faq" },
];

const pageNavItems = [
  {
    label: "Profil & Struktur Pengurus",
    desc: "Pembina, BPH, dan departemen strategis GenBI",
    href: "/tentang",
    icon: Users,
  },
  {
    label: "Galeri & Rekam Prestasi",
    desc: "Capaian akademik & penghargaan awardee",
    href: "/prestasi",
    icon: Trophy,
  },
  {
    label: "Arsip Warta & Berita",
    desc: "Liputan program kerja & publikasi redaksi",
    href: "/berita",
    icon: Newspaper,
  },
  {
    label: "Arsip Dokumen & Panduan",
    desc: "Unduhan berkas resmi & informasi beasiswa",
    href: "/dokumen",
    icon: FileText,
  },
];

const Navbar: React.FC<NavbarProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { scrollY } = useScroll();

  const headerBg = useTransform(scrollY, [0, 40], ["rgba(255, 255, 255, 0.95)", "rgba(255, 255, 255, 0.98)"]);
  const headerBlur = useTransform(scrollY, [0, 40], ["blur(12px)", "blur(20px)"]);
  const navHeight = useTransform(scrollY, [0, 40], ["78px", "68px"]);
  const shadowValue = useTransform(scrollY, [0, 40], ["0 1px 2px rgba(0,0,0,0.03)", "0 4px 20px rgba(7,18,36,0.06)"]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      <motion.header
        style={{
          backgroundColor: headerBg,
          backdropFilter: headerBlur,
          height: navHeight,
          boxShadow: shadowValue,
        }}
        className="fixed top-0 left-0 w-full z-[100] flex items-center border-b border-slate-200/80 transition-none"
      >
        <div className="container mx-auto px-6 sm:px-12 max-w-7xl flex justify-between items-center gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3.5 group shrink-0">
            <div className="relative w-9 h-9 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/LogoBI.png"
                alt="Bank Indonesia Logo"
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="h-6 w-px bg-slate-300 hidden sm:block" />

            <div className="flex items-center">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#071224] leading-none">
                GenBI <span className="text-[#0284C7]">UPNVJT</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Urut sesuai section Landing Page dari atas ke bawah) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
            {sectionNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-[#071224] transition-colors py-2 relative group whitespace-nowrap"
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#0284C7] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Hamburger Trigger (Pengganti Portal CMS untuk navigasi pindah halaman & drawer mobile) */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Tutup Menu" : "Buka Menu Halaman"}
            aria-expanded={isMenuOpen}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-100/90 hover:bg-[#071224] text-[#071224] hover:text-white border border-slate-200/90 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer active:scale-95 shrink-0"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            <span className="hidden sm:inline">Menu</span>
          </button>
        </div>
      </motion.header>

      {/* Slide-over Hamburger Drawer Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-[#030A18]/45 backdrop-blur-xs z-[110]"
            />

            {/* Right Panel */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-screen w-full max-w-md bg-white z-[120] shadow-2xl border-l border-slate-200 flex flex-col justify-between overflow-y-auto"
            >
              <div className="p-6 sm:p-8 space-y-8">
                {/* Drawer Header */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-5">
                  <div>
                    <span className="font-extrabold text-xl tracking-tight text-[#071224] block">
                      GenBI <span className="text-[#0284C7]">UPNVJT</span>
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      Direktori Halaman &amp; Navigasi
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Tutup Menu"
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Pages Group (Pindah Halaman) */}
                <div className="space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#0284C7] block">
                    Halaman &amp; Direktori Resmi
                  </span>
                  <div className="space-y-2.5">
                    {pageNavItems.map((page) => {
                      const Icon = page.icon;
                      const isActive = router.pathname === page.href || router.pathname.startsWith(`${page.href}/`);
                      return (
                        <Link
                          key={page.href}
                          href={page.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`group flex items-start justify-between gap-3 p-4 rounded-2xl border transition-all ${
                            isActive
                              ? 'bg-sky-50/90 border-[#0284C7] shadow-xs'
                              : 'bg-slate-50/70 hover:bg-white border-slate-200/80 hover:border-[#0284C7]/60 hover:shadow-md'
                          }`}
                        >
                          <div className="flex items-start gap-3.5">
                            <div
                              className={`p-2.5 rounded-xl shrink-0 transition-colors ${
                                isActive
                                  ? 'bg-[#0284C7] text-white'
                                  : 'bg-white text-[#0284C7] border border-slate-200/80 group-hover:bg-[#0284C7] group-hover:text-white'
                              }`}
                            >
                              <Icon size={17} />
                            </div>
                            <div>
                              <span className="text-sm font-extrabold text-[#071224] group-hover:text-[#0284C7] transition-colors block">
                                {page.label}
                              </span>
                              <span className="text-xs text-slate-500 leading-snug block mt-0.5">
                                {page.desc}
                              </span>
                            </div>
                          </div>
                          <ArrowUpRight
                            size={16}
                            className="text-slate-400 group-hover:text-[#0284C7] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1"
                          />
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Mobile/Tablet Section Links (Urut sesuai Landing Page) */}
                <div className="space-y-3 pt-4 border-t border-slate-200 lg:hidden">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 block">
                    Bagian Halaman Utama
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {sectionNavItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-sky-50 border border-slate-200/80 hover:border-[#0284C7]/50 text-xs font-bold text-slate-700 hover:text-[#0284C7] transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-6 sm:px-8 border-t border-slate-200 bg-slate-50/70">
                <p className="text-[11px] font-semibold text-slate-500">
                  GenBI Komisariat UPN &quot;Veteran&quot; Jawa Timur • Energi untuk Negeri
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
