"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, CheckCircle2, ShieldCheck } from 'lucide-react';

const HomeCTA: React.FC = () => {
  return (
    <section className="py-24 lg:py-32 bg-[#FFFFFF] text-slate-900 border-b border-slate-200">
      <div className="container mx-auto px-6 sm:px-10 max-w-7xl">
        
        {/* Main CTA Statement Box */}
        <div className="rounded-[2.5rem] bg-[#0B1F40] text-white p-8 sm:p-14 lg:p-16 shadow-2xl space-y-10">
          
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-sky-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <ShieldCheck size={14} />
              <span>Penerimaan Beasiswa Bank Indonesia</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-white">
              Siap mengabdi dan{' '}
              <span className="font-serif italic font-normal text-sky-300">
                menjadi bagian
              </span>{' '}
              dari perubahan bangsa?
            </h2>

            <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed font-normal max-w-2xl">
              Program Beasiswa Bank Indonesia diselenggarakan setiap tahun akademis di lingkungan 
              UPN &ldquo;Veteran&rdquo; Jawa Timur. Bergabunglah bersama puluhan mahasiswa terpilih lainnya 
              untuk mengasah kepemimpinan, integritas, dan kontribusi nyata bagi ibu pertiwi.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/berita"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#0284C7] to-[#0EA5E9] hover:from-[#0369A1] hover:to-[#0284C7] text-white font-bold text-sm shadow-lg shadow-sky-500/25 active:scale-[0.98] transition-all"
              >
                <span>Info &amp; Panduan Seleksi</span>
                <ArrowRight size={16} />
              </Link>

              <a
                href="https://www.instagram.com/genbi_upnvjatim/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm backdrop-blur-md active:scale-[0.98] transition-all"
              >
                <span>Instagram Resmi</span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>

          {/* 3 Eligibility Criteria Tiles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-white/10">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="flex items-center gap-2 text-sky-300 text-xs font-bold">
                <CheckCircle2 size={16} />
                <span>Kriteria 01</span>
              </div>
              <h4 className="text-sm font-bold text-white">
                Mahasiswa Semester 3 &amp; 5
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Terdaftar aktif jenjang Sarjana (S1) di lingkungan kampus UPN &ldquo;Veteran&rdquo; Jawa Timur.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="flex items-center gap-2 text-sky-300 text-xs font-bold">
                <CheckCircle2 size={16} />
                <span>Kriteria 02</span>
              </div>
              <h4 className="text-sm font-bold text-white">
                Standar Akademis (IPK ≥ 3.00)
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Memiliki prestasi akademis yang konsisten dan tidak sedang menerima beasiswa dari institusi lain.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="flex items-center gap-2 text-sky-300 text-xs font-bold">
                <CheckCircle2 size={16} />
                <span>Kriteria 03</span>
              </div>
              <h4 className="text-sm font-bold text-white">
                Jiwa Kepemimpinan &amp; Sosial
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Aktif dalam kepanitiaan/organisasi dan bersedia mendedikasikan waktu dalam program GenBI.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default HomeCTA;