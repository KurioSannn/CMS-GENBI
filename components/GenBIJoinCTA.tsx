"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';

const GenBIJoinCTA: React.FC = () => {
  return (
    <section id="join-cta-section" className="py-24 bg-[#071224] text-white border-b border-white/10">
      <div className="container mx-auto px-6 sm:px-12 max-w-7xl">
        
        <div className="bg-[#0B1E38] border border-white/15 p-8 sm:p-14 lg:p-16 space-y-12">
          
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 tracking-[0.2em] text-[11px] font-bold uppercase text-[#FCD34D]">
              <span>09 / PENERIMAAN BEASISWA BANK INDONESIA</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Siap mengabdi. <br />
              <span className="text-[#FCD34D]">Menjadi bagian dari penggerak perubahan bangsa.</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Program Beasiswa Bank Indonesia diselenggarakan setiap tahun akademis bagi mahasiswa berprestasi di lingkungan UPN "Veteran" Jawa Timur. Bergabunglah bersama puluhan mahasiswa terpilih lainnya untuk mengasah kepemimpinan, integritas, dan kontribusi nyata bagi ibu pertiwi.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link
                href="/berita"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#EAB308] hover:bg-white text-[#071224] font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-lg active:scale-95"
              >
                <span>Info &amp; Panduan Seleksi</span>
                <ArrowRight size={15} />
              </Link>

              <a
                href="https://www.instagram.com/genbi_upnvjatim/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-4 border border-white/20 hover:border-white text-white font-semibold text-xs sm:text-sm tracking-wider uppercase bg-white/5 transition-all"
              >
                <span>Instagram Resmi</span>
                <ArrowUpRight size={14} className="text-[#FCD34D]" />
              </a>
            </div>
          </div>

          {/* 3 Criteria Columns (BudayaGo Requirements Style) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
            
            <div className="p-6 bg-[#071224] border border-white/10 space-y-2">
              <span className="text-[11px] font-mono tracking-widest text-[#FCD34D] uppercase font-bold block">
                01 // SYARAT SEMESTER
              </span>
              <h4 className="text-base font-bold text-white">
                Mahasiswa Semester 3 &amp; 5
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Terdaftar aktif jenjang Sarjana (S1) di lingkungan kampus UPN "Veteran" Jawa Timur pada fakultas yang ditentukan.
              </p>
            </div>

            <div className="p-6 bg-[#071224] border border-white/10 space-y-2">
              <span className="text-[11px] font-mono tracking-widest text-[#FCD34D] uppercase font-bold block">
                02 // PRESTASI AKADEMIK
              </span>
              <h4 className="text-base font-bold text-white">
                Standar IPK ≥ 3.00
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Memiliki prestasi akademis yang konsisten dan tidak sedang menerima ikatan beasiswa dari instansi lain.
              </p>
            </div>

            <div className="p-6 bg-[#071224] border border-white/10 space-y-2">
              <span className="text-[11px] font-mono tracking-widest text-[#FCD34D] uppercase font-bold block">
                03 // KOMITMEN &amp; KARAKTER
              </span>
              <h4 className="text-base font-bold text-white">
                Jiwa Kepemimpinan Bela Negara
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Aktif dalam kepanitiaan/organisasi dan bersedia mendedikasikan waktu dalam program pengabdian masyarakat Bank Indonesia.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default GenBIJoinCTA;
