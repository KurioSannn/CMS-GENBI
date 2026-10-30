"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { History, Award, Users, TrendingUp, ShieldCheck, ArrowUpRight } from 'lucide-react';

const CapaianDanTentang: React.FC = () => {
  const stats = [
    { label: "MAHASISWA TERPILIH", value: "100+", sub: "Awardee Aktif 2026", code: "01" },
    { label: "PROGRAM TERLAKSANA", value: "50+", sub: "Inisiatif Tahunan", code: "02" },
    { label: "IPK RATA-RATA", value: "3.75", sub: "Prestasi Akademik", code: "03" },
  ];

  return (
    <section className="py-24 bg-[#050C18] text-white relative overflow-hidden border-b border-white/10">
      <div className="container mx-auto px-6 sm:px-12 max-w-7xl space-y-16 relative z-10">
        
        {/* Section Header (BudayaGo Editorial Style) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 tracking-[0.2em] text-[11px] font-bold uppercase text-[#FCD34D]">
              <span>07 / REKAM JEJAK &amp; SEJARAH ORGANISASI</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Pilar keunggulan. <br />
              <span className="text-[#FCD34D]">Dedikasi nyata pemuda bagi negeri.</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Rekam jejak performa akademis dan kontribusi sosial nyata mahasiswa penerima Beasiswa Bank Indonesia di Jawa Timur.
            </p>
          </div>
        </div>

        {/* 3 Large Technical Metric Blocks (Pertamina Style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-8 bg-[#0B1E38] border border-white/15 hover:border-[#EAB308] transition-colors relative"
            >
              <div className="flex items-center justify-between text-slate-400 font-mono text-xs font-bold mb-4">
                <span>{stat.code} // REKOR</span>
                <span className="w-2 h-2 rounded-full bg-[#EAB308]" />
              </div>
              <span className="text-4xl sm:text-6xl font-black text-white tracking-tight block">
                {stat.value}
              </span>
              <span className="block text-xs sm:text-sm font-bold text-[#FCD34D] uppercase tracking-wider mt-2">
                {stat.label}
              </span>
              <span className="block text-xs text-slate-400 mt-1">
                {stat.sub}
              </span>
            </div>
          ))}
        </div>

        {/* Historical Milestone Section (11 Nov 2011) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-8 border-t border-white/10">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-[#FCD34D] text-xs font-mono tracking-widest uppercase">
              <History size={15} />
              <span>TONGGAK PERJALANAN SEJAK 11 NOVEMBER 2011</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Kisah di balik lahirnya wadah dedikasi pemuda bagi ibu pertiwi.
            </h3>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                <strong>Generasi Baru Indonesia (GenBI)</strong> resmi didirikan pada tanggal <strong>11 November 2011</strong>. 
                Komunitas ini lahir atas inisiasi Bank Indonesia sebagai wadah bagi para mahasiswa terpilih penerima beasiswa Bank Indonesia yang tersebar di seluruh pelosok negeri.
              </p>
              <div className="p-5 bg-[#0B1E38] border-l-4 border-[#EAB308] text-slate-200 text-xs sm:text-sm font-medium">
                &ldquo;GenBI tidak hanya sekadar kelompok penerima bantuan finansial, melainkan sebuah laboratorium kepemimpinan yang dibentuk untuk mengasah jiwa sosial dan kompetensi mahasiswa guna mempersiapkan pemimpin bangsa di masa depan.&rdquo;
              </div>
              <p className="text-xs text-slate-400">
                — Amanat Kebanksentralan Departemen Komunikasi Bank Indonesia
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative h-72 sm:h-80 w-full overflow-hidden border border-white/20 bg-[#071224]">
              <Image
                src="/foto profile genbiupnvjt.png"
                alt="Foto Profil GenBI UPNVJT"
                fill
                className="object-cover brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071224] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                <span className="text-[10px] font-mono tracking-wider text-[#FCD34D] block uppercase">
                  KOMISARIAT RESMI
                </span>
                <p className="font-bold">UPN "Veteran" Jawa Timur</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default CapaianDanTentang;
