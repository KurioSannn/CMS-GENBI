"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Youtube, Mail, Globe, ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050C18] text-white border-t border-white/10">
      <div className="container mx-auto px-6 sm:px-12 max-w-7xl py-20">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          
          {/* Col 1: Brand & Official Status (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Link href="/" className="inline-flex items-center gap-4 group">
              <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-105">
                <Image 
                  src="/LogoBI.png" 
                  alt="Bank Indonesia" 
                  fill 
                  className="object-contain" 
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl tracking-tight uppercase leading-none text-white">
                  GENBI UPNVJT
                </span>
                <span className="text-[11px] font-semibold text-[#FCD34D] mt-1">
                  Binaan KPw Bank Indonesia Provinsi Jawa Timur
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Wadah mahasiswa berprestasi penerima Beasiswa Bank Indonesia di lingkungan UPN "Veteran" Jawa Timur. Mengabdi sepenuh hati sebagai garda terdepan komunikasi kebijakan sentral dan katalisator inovasi bangsa.
            </p>

            <div className="inline-block px-3.5 py-1.5 border border-white/15 text-xs text-slate-300 font-mono">
              #SatuGenBI • Energi untuk Negeri
            </div>
          </div>

          {/* Col 2: Navigation Links (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold text-[#FCD34D] uppercase tracking-wider">
              NAVIGASI UTAMA
            </h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>
                <Link href="/#beranda" className="hover:text-white transition-colors">
                  Beranda Utama
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="hover:text-white transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/#visi-misi" className="hover:text-white transition-colors">
                  3 Pilar Mandat
                </Link>
              </li>
              <li>
                <Link href="/#program-kerja" className="hover:text-white transition-colors">
                  Program Kerja
                </Link>
              </li>
              <li>
                <Link href="/tentang#struktur" className="hover:text-white transition-colors">
                  Departemen &amp; Struktur
                </Link>
              </li>
              <li>
                <Link href="/#prestasi" className="hover:text-white transition-colors">
                  Hall of Fame Prestasi
                </Link>
              </li>
              <li>
                <Link href="/berita" className="hover:text-white transition-colors">
                  Warta Redaksi Resmi
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Institutional Channels (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-mono font-bold text-[#FCD34D] uppercase tracking-wider">
              SALURAN RESMI
            </h4>
            
            <div className="space-y-3 text-sm">
              <a
                href="mailto:genbi.upnvjt@gmail.com"
                className="flex items-center justify-between p-4 bg-white border border-slate-200/90 hover:bg-slate-50 hover:border-slate-300 text-slate-800 font-semibold rounded-xl transition-all shadow-sm group"
              >
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-[#0284C7] group-hover:scale-110 transition-transform" />
                  <span className="lowercase text-xs sm:text-sm">genbi.upnvjt@gmail.com</span>
                </div>
                <ArrowUpRight size={15} className="text-slate-400 group-hover:text-[#0284C7] transition-colors" />
              </a>

              <a
                href="https://www.instagram.com/genbi_upnvjatim/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-white border border-slate-200/90 hover:bg-slate-50 hover:border-slate-300 text-slate-800 font-semibold rounded-xl transition-all shadow-sm group"
              >
                <div className="flex items-center gap-3">
                  <Instagram size={16} className="text-[#0284C7] group-hover:scale-110 transition-transform" />
                  <span className="text-xs sm:text-sm">@genbi_upnvjatim</span>
                </div>
                <ArrowUpRight size={15} className="text-slate-400 group-hover:text-[#0284C7] transition-colors" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <p>
            &copy; {new Date().getFullYear()} GenBI UPN "Veteran" Jawa Timur. Hak Cipta Dilindungi.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/admin/login" className="hover:text-white transition-colors">
              Portal Redaksi
            </Link>
            <a href="https://upnjatim.ac.id" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Portal UPNVJT
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
