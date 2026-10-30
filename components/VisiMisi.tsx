"use client";
import React, { useState } from 'react';
import Image from 'next/image';

interface ProgramDetail {
  id: string;
  title: string;
  category: string;
  desc: string;
  image: string;
  impactBadge: string;
}

interface PilarMandat {
  id: string;
  code: string;
  name: string;
  title: string;
  tagline: string;
  desc: string;
  programs: ProgramDetail[];
}

const pilarList: PilarMandat[] = [
  {
    id: "front-liners",
    code: "01",
    name: "Front Liners",
    title: "Garda Terdepan Komunikasi Kebijakan Sentral",
    tagline: "Edukasi Literasi CBP Rupiah & Akselerasi QRIS Digital",
    desc: "Menjadi penyambung lidah strategis Bank Indonesia kepada publik, mahasiswa, dan generasi muda. Menggaungkan kampanye Cinta, Bangga, dan Paham (CBP) Rupiah serta mempercepat penetrasi pembayaran digital QRIS.",
    programs: [
      {
        id: "fl-1",
        title: "GenBI COIN: Edukasi Literasi CBP Rupiah & Pasar Modal",
        category: "Finansial & Kebanksentralan",
        desc: "Kolaborasi bersama Kantor Perwakilan Bank Indonesia dan IDX Surabaya mengedukasi ribuan mahasiswa tentang keaslian rupiah dan kecerdasan finansial.",
        image: "/GenBI Coin.png",
        impactBadge: "5.000+ Mahasiswa Teredukasi",
      },
      {
        id: "fl-2",
        title: "Akselerasi Merchant QRIS Digital UMKM Surabaya",
        category: "Ekosistem Pembayaran Digital",
        desc: "Pendampingan langsung pedagang sentra kuliner dan pasar tradisional di Surabaya untuk bertransformasi ke ekosistem transaksi nontunai QRIS.",
        image: "/corousel-2.jpg",
        impactBadge: "150+ Merchant Aktif Terbina",
      },
      {
        id: "fl-3",
        title: "Diseminasi & Simulasi Beasiswa Bank Indonesia",
        category: "Edukasi & Beasiswa",
        desc: "Bimbingan teknis portofolio, penulisan esai motivasi, dan simulasi wawancara tatap muka bagi calon awardee Beasiswa Bank Indonesia.",
        image: "/GenBI Webinar Career.png",
        impactBadge: "98% Tingkat Kelulusan Seleksi",
      },
    ],
  },
  {
    id: "change-agents",
    code: "02",
    name: "Change Agents",
    title: "Katalisator Transformasi Sosial & Pemberdayaan",
    tagline: "Inkubasi Bisnis UMKM & Konservasi Lingkungan Hidup",
    desc: "Motor penggerak inovasi sosial dan ekonomi di akar rumput. Menginkubasi pelaku UMKM agar mandiri dan berdaya saing, serta memelopori aksi pelestarian lingkungan berkelanjutan.",
    programs: [
      {
        id: "ca-1",
        title: "GenBI SCALE: Pendampingan & Kurasi Bisnis UMKM",
        category: "Ekonomi Kreatif & Inkubasi",
        desc: "Pelatihan pembukuan keuangan digital, pendampingan legalitas NIB, sertifikasi halal, dan strategi pemasaran digital bagi pelaku usaha kecil.",
        image: "/GENBI SCALE.png",
        impactBadge: "30+ UMKM Berdaya Saing",
      },
      {
        id: "ca-2",
        title: "GenBI Planters: Aksi Hijau Konservasi Alam",
        category: "Sosial & Lingkungan Hidup",
        desc: "Gerakan penanaman ratusan bibit pohon dan workshop pengolahan kompos organik di sekolah Adiwiyata dan kawasan pesisir Jawa Timur.",
        image: "/Genbi Planters.png",
        impactBadge: "500+ Pohon Ditanam",
      },
      {
        id: "ca-3",
        title: "Aksi Tanggap Darurat & Donor Darah Massal PMI",
        category: "Kemanusiaan & Bakti Sosial",
        desc: "Penyaluran bantuan kemanusiaan serta agenda donor darah rutin bersama PMI Kota Surabaya untuk membantu pemenuhan kantong darah medis.",
        image: "/corousel-3.jpg",
        impactBadge: "300+ Kantong Darah Terkumpul",
      },
    ],
  },
  {
    id: "future-leaders",
    code: "03",
    name: "Future Leaders",
    title: "Laboratorium Pemimpin Karakter Bela Negara",
    tagline: "Kawah Candradimuka Integritas & Kepemimpinan Nasional",
    desc: "Menempa mahasiswa penerima beasiswa menjadi calon pemimpin bangsa yang berintegritas tinggi, berwawasan global, dan berjiwa tangguh dengan nilai luhur Karakter Bela Negara.",
    programs: [
      {
        id: "fl-lead-1",
        title: "Leadership Camp & Karakter Bela Negara",
        category: "Kepemimpinan & Wawasan Kebangsaan",
        desc: "Pelatihan kedisiplinan lapangan, etika kebangsaan, dan kepemimpinan strategis yang menyatukan nilai-nilai Bela Negara UPNVJT.",
        image: "/carousel-1.jpg",
        impactBadge: "100% Lulusan Berintegritas",
      },
      {
        id: "fl-lead-2",
        title: "BIVENTURE: Eksplorasi Sejarah Heritage De Javasche Bank",
        category: "Studi Kebanksentralan",
        desc: "Napak tilas sejarah moneter dan perbankan nasional di Museum De Javasche Bank Surabaya untuk menumbuhkan kebanggaan pada kedaulatan rupiah.",
        image: "/BIVENTURE.png",
        impactBadge: "Wawasan Moneter Terapan",
      },
      {
        id: "fl-lead-3",
        title: "Masterclass Karier Global & Bimbingan Bahasa",
        category: "Pengembangan Karier Profesional",
        desc: "Workshop intensif TOEFL/EPT, audit curriculum vitae profesional, dan coaching karier bersama alumni beasiswa BI yang berkarier nasional.",
        image: "/GenBI Webinar Career.png",
        impactBadge: "Skor Bahasa & Daya Saing Tinggi",
      },
    ],
  },
];

const VisiMisi: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const currentPilar = pilarList[activeTab];

  return (
    <section id="visi-misi" className="py-20 sm:py-28 bg-[#030A18] text-white border-b border-white/5 relative overflow-hidden">
      
      {/* Background Graphic Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0284C7]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-12 max-w-7xl relative z-10 space-y-12 sm:space-y-14">
        
        {/* Section Header: Strictly 2 Lines */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            <span className="block">Tiga pilar mandat</span>
            <span className="block mt-1 text-[#FCD34D]">
              Fokus aksi &amp; program kerja nyata.
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal pt-1 max-w-2xl mx-auto">
            Komitmen pengabdian mahasiswa penerima Beasiswa Bank Indonesia UPN &quot;Veteran&quot; Jawa Timur melalui inisiatif Front Liners, Change Agents, dan Future Leaders.
          </p>

          {/* Clean 3-Tab Switcher (No Dots, Sleek Executive Tabs) */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
            {pilarList.map((pilar, idx) => {
              const isActive = idx === activeTab;
              return (
                <button
                  key={pilar.id}
                  onClick={() => setActiveTab(idx)}
                  className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer flex items-center gap-2.5 ${
                    isActive
                      ? 'bg-[#0284C7] text-white shadow-lg shadow-sky-600/30 ring-1 ring-sky-300/40 transform scale-102'
                      : 'bg-white/[0.05] text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  <span className={`font-mono text-xs ${isActive ? 'text-white' : 'text-slate-400'}`}>
                    {pilar.code}
                  </span>
                  <span>{pilar.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Pillar Title (Spaced Nicely Below Tabs) */}
        <div className="max-w-2xl mx-auto text-center pt-2">
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {currentPilar.title}
          </h3>
        </div>

        {/* 3 Showcase Cards - Subtle 3D Elevation, Wing Angles, Equal Height, Bigger & Photo Pure */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-2 [perspective:1400px] [transform-style:preserve-3d]">
          {currentPilar.programs.map((prog, idx) => {
            // Wing 3D Tilt calculation (Angled Inwards Towards Center)
            const wingTransformClass =
              idx === 0
                ? "md:[transform:rotateY(7deg)_scale(0.98)] md:hover:[transform:rotateY(0deg)_scale(1.02)_translateY(-8px)]"
                : idx === 2
                ? "md:[transform:rotateY(-7deg)_scale(0.98)] md:hover:[transform:rotateY(0deg)_scale(1.02)_translateY(-8px)]"
                : "md:[transform:translateZ(15px)] md:hover:[transform:translateY(-8px)_scale(1.02)]";

            return (
              <div
                key={prog.id}
                className={`rounded-2xl overflow-hidden group border border-white/12 hover:border-sky-400/40 transition-all duration-500 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.85)] hover:shadow-[0_25px_60px_-10px_rgba(2,132,199,0.3)] bg-[#071328] flex flex-col justify-between h-full transform-gpu ${wingTransformClass}`}
              >
                {/* Photo Area (Enlarged & Pure Clean - No Badge Obstructing) */}
                <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-slate-900 shrink-0">
                  <Image
                    src={prog.image}
                    alt={prog.title}
                    fill
                    className="object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071328] via-transparent to-transparent opacity-85" />
                </div>

                {/* Information Area (Strictly Aligned Rows Across All 3 Cards) */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Title Row with Fixed Min Height for Identical Baseline */}
                    <h4 className="text-base sm:text-lg font-bold text-white leading-snug group-hover:text-[#FCD34D] transition-colors min-h-[52px] line-clamp-2">
                      {prog.title}
                    </h4>
                    {/* Description Row with Fixed Min Height */}
                    <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed min-h-[64px] line-clamp-3">
                      {prog.desc}
                    </p>
                  </div>

                  {/* Bottom Impact Footer (Purged All Toy Icons, Clean Executive Badges) */}
                  <div className="pt-4 mt-5 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-semibold text-sky-300">
                      {prog.impactBadge}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      Proker #{idx + 1}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default VisiMisi;
