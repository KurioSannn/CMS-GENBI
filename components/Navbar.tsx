"use client";
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowUpRight, 
  Menu, 
  X, 
  ChevronDown, 
  Trophy, 
  Zap, 
  Calendar, 
  Newspaper 
} from 'lucide-react';

interface NavbarProps {
  isScrolled?: boolean;
}

const Navbar: React.FC<NavbarProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isActivitiesOpen, setIsActivitiesOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { scrollY } = useScroll();

  const headerBg = useTransform(scrollY, [0, 40], ["rgba(255, 255, 255, 0.95)", "rgba(255, 255, 255, 0.98)"]);
  const headerBlur = useTransform(scrollY, [0, 40], ["blur(12px)", "blur(20px)"]);
  const navHeight = useTransform(scrollY, [0, 40], ["78px", "68px"]);
  const shadowValue = useTransform(scrollY, [0, 40], ["0 1px 2px rgba(0,0,0,0.03)", "0 4px 20px rgba(7,18,36,0.06)"]);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setIsActivitiesOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsActivitiesOpen(false);
    }, 150);
  };

  const activities = [
    { title: "Prestasi", href: "/#prestasi", icon: Trophy },
    { title: "Program Kerja", href: "/#program-kerja", icon: Calendar },
    { title: "3 Pilar Mandat", href: "/#visi-misi", icon: Zap },
    { title: "Warta Redaksi", href: "/berita", icon: Newspaper },
  ];

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
        <div className="container mx-auto px-6 sm:px-12 max-w-7xl flex justify-between items-center">
          
          {/* Logo & Clean Title */}
          <Link href="/" className="flex items-center gap-3.5 group">
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

          {/* Desktop Navigation Links - Nogogeni Style (Compact & Spacious) */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            
            <Link
              href="/#beranda"
              className="text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-[#071224] transition-colors py-2 relative group"
            >
              <span>Beranda</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#0284C7] transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link
              href="/tentang"
              className="text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-[#071224] transition-colors py-2 relative group"
            >
              <span>Tentang Kami</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#0284C7] transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link
              href="/#prestasi"
              className="text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-[#071224] transition-colors py-2 relative group"
            >
              <span>Prestasi</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#0284C7] transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link
              href="/berita"
              className="text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-[#071224] transition-colors py-2 relative group"
            >
              <span>Warta Berita</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#0284C7] transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link
              href="/#beasiswa-faq"
              className="text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-[#071224] transition-colors py-2 relative group"
            >
              <span>Panduan Beasiswa</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#0284C7] transition-all duration-300 group-hover:w-full" />
            </Link>

          </nav>

          {/* Action Button: Portal CMS */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#071224] hover:bg-[#0284C7] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95"
            >
              <span>Portal CMS</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>

          {/* Mobile Hamburger Trigger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-black focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 w-full h-screen bg-white/98 backdrop-blur-xl z-[90] flex flex-col justify-center px-8 lg:hidden overflow-y-auto"
          >
            <div className="space-y-6 max-w-sm mx-auto w-full py-12">
              <div className="border-b border-slate-200 pb-4">
                <span className="font-extrabold text-xl tracking-tight text-[#071224]">
                  GenBI <span className="text-[#0284C7]">UPNVJT</span>
                </span>
              </div>

              <div className="flex flex-col space-y-4">
                <Link
                  href="/#beranda"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-base font-bold uppercase tracking-wider text-slate-800 hover:text-[#0284C7]"
                >
                  Beranda
                </Link>
                <Link
                  href="/tentang"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-base font-bold uppercase tracking-wider text-slate-800 hover:text-[#0284C7]"
                >
                  Tentang Kami
                </Link>
                <Link
                  href="/#prestasi"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-base font-bold uppercase tracking-wider text-slate-800 hover:text-[#0284C7]"
                >
                  Prestasi
                </Link>
                <Link
                  href="/#visi-misi"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-base font-bold uppercase tracking-wider text-slate-800 hover:text-[#0284C7]"
                >
                  3 Pilar Mandat
                </Link>
                <Link
                  href="/berita"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-base font-bold uppercase tracking-wider text-slate-800 hover:text-[#0284C7]"
                >
                  Warta Berita
                </Link>
                <Link
                  href="/#beasiswa-faq"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-base font-bold uppercase tracking-wider text-slate-800 hover:text-[#0284C7]"
                >
                  Panduan Beasiswa
                </Link>
              </div>

              <div className="pt-6 border-t border-slate-200">
                <Link
                  href="/admin/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#071224] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#0284C7] transition-colors"
                >
                  <span>Akses Portal CMS</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
