"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Check, Users, UserCheck } from 'lucide-react';
import { genbiDivisions } from '@/data/members';
import type { Division } from '@/lib/db';

interface StrukturProps {
  divisions?: Division[];
}

const defaultDivisionsData = [
  {
    id: 1,
    num: "01",
    name: "Badan Pengurus Harian (BPH)",
    slug: "bph",
    logo: "/bph.png",
    teamPhoto: "/BPH ALL TEAM.png",
    tagline: "Tata Kelola Strategis, Integritas & Diplomasi Lembaga",
    desc: "Memimpin komando organisasi, koordinasi lintas departemen, serta menjaga hubungan diplomasi formal bersama KPw Bank Indonesia Jawa Timur dan pimpinan rektorat UPNVJT.",
    headTitle: "Ketua & Wakil Komisariat",
    membersCount: 5,
    prokerPreview: [
      "Pleno Rapat Kerja Tahunan Organisasi",
      "Monitoring & Evaluasi Kinerja Semester",
      "Diplomasi Formal Lembaga Bank Indonesia",
      "Manajemen Akuntabilitas Anggaran",
    ],
  },
  {
    id: 2,
    num: "02",
    name: "Pendidikan",
    slug: "pendidikan",
    logo: "/Pendidikan.png",
    teamPhoto: "/Pendidikan ALL TEAM.png",
    tagline: "Edukasi Beasiswa, Literasi CBP Rupiah & Kapasitas Akademis",
    desc: "Pusat pengembangan intelektual awardee, inisiator bimbingan intensif seleksi Beasiswa Bank Indonesia, sosialisasi Cinta Bangga Paham Rupiah, dan pelatihan kapasitas bahasa.",
    headTitle: "Kepala Divisi Pendidikan",
    membersCount: 8,
    prokerPreview: [
      "Future Scholar Talk & Mentoring Beasiswa",
      "GenBI EPT Masterclass Preparation",
      "GenBI SHINE Literasi CBP Rupiah",
      "Klinik Konsultasi Portofolio Mahasiswa",
    ],
  },
  {
    id: 3,
    num: "03",
    name: "Ekonomi Kreatif (EKRAF)",
    slug: "ekraf",
    logo: "/Ekraf.png",
    teamPhoto: "/EKRAF ALL TEAM.png",
    tagline: "Akselerasi Ekonomi Kreatif & Digitalisasi QRIS UMKM",
    desc: "Mendorong adopsi pembayaran digital nirsentuh melalui QRIS bagi pedagang mikro sentra kuliner Surabaya serta inkubasi bisnis rintisan mandiri bagi anggota GenBI.",
    headTitle: "Kepala Divisi EKRAF",
    membersCount: 7,
    prokerPreview: [
      "GenBI SCALE: Akselerasi Digitalisasi UMKM",
      "Mentoring Penyusunan Business Plan",
      "Pameran Produk Kreatif & Bazar Mahasiswa",
      "GenBI Official Merchandising",
    ],
  },
  {
    id: 4,
    num: "04",
    name: "Sosial Lingkungan (SOSLING)",
    slug: "sosling",
    logo: "/SOSLING.png",
    teamPhoto: "/SOSLING ALL TEAM.png",
    tagline: "Konservasi Hayati, Penanaman Pohon & Aksi Peduli Bumi",
    desc: "Pelopor kesadaran lingkungan hidup, kampanye pengurangan emisi karbon dan plastik sekali pakai, program reboisasi sekolah adiwiyata, serta pengelolaan sampah terpadu.",
    headTitle: "Kepala Divisi SOSLING",
    membersCount: 7,
    prokerPreview: [
      "GenBI Planters: Reboisasi Pohon Sekolah",
      "Kampanye Zero Waste Lifestyle",
      "Edukasi Pemilahan Sampah Organik",
      "Aksi Bersih Pantai & Konservasi Pesisir",
    ],
  },
  {
    id: 5,
    num: "05",
    name: "Hubungan Eksternal (HUBEKS)",
    slug: "hubeks",
    logo: "/HUBEKS.png",
    teamPhoto: "/HUBEKS ALL TEAM.png",
    tagline: "Jejaring Kemitraan Strategis, Relasi Publik & Diplomasi",
    desc: "Membangun kemitraan eksternal bersama instansi pemerintah, media massa, korporasi mitra, serta komunitas kemahasiswaan se-Jawa Timur.",
    headTitle: "Kepala Divisi HUBEKS",
    membersCount: 7,
    prokerPreview: [
      "GenBI Visit & Company Knowledge Exchange",
      "Sinergi Kemitraan Media Publikasi",
      "Forum Koordinasi GenBI Wilayah Jatim",
      "Studi Banding Antar-Komisariat Kampus",
    ],
  },
  {
    id: 6,
    num: "06",
    name: "PSDM",
    slug: "psdm",
    logo: "/PSDM.png",
    teamPhoto: "/PSDM ALL TEAM.png",
    tagline: "Kaderisasi Karakter Bela Negara, Solidaritas & Internal Bonding",
    desc: "Kawah candradimuka pembinaan internal, upgrading soft-skills, pelatihan karakter kepemimpinan Bela Negara, dan evaluasi kepuasan anggota organisasi.",
    headTitle: "Kepala Divisi PSDM",
    membersCount: 6,
    prokerPreview: [
      "Leadership Training & Karakter Bela Negara",
      "Upgrading Soft-Skills & Public Speaking",
      "Internal Bonding & Gathering Anggota",
      "Apresiasi Awardee Berprestasi Semester",
    ],
  },
  {
    id: 7,
    num: "07",
    name: "Media & Komunikasi (MEDKOM)",
    slug: "medkom",
    logo: "/Medkom.png",
    teamPhoto: "/Medkom ALL TEAM.png",
    tagline: "Branding Institusi, Desain Visual & Pengelolaan Media",
    desc: "Ujung tombak visual dan komunikasi publik GenBI UPNVJT di platform digital. Memproduksi konten infografis kebijakan moneter, video dokumenter, dan majalah organisasi.",
    headTitle: "Kepala Divisi MEDKOM",
    membersCount: 7,
    prokerPreview: [
      "Produksi Konten Edukasi CBP & QRIS",
      "Manajemen Media Sosial Instagram & TikTok",
      "Dokumentasi Foto & Video Kegiatan",
      "Pengelolaan Portal Berita GenBI-Hub",
    ],
  },
];

const Struktur: React.FC<StrukturProps> = ({ divisions }) => {
  const [activeSlug, setActiveSlug] = useState('bph');

  const current = defaultDivisionsData.find(d => d.slug === activeSlug) || defaultDivisionsData[0];
  const fullDivData = genbiDivisions.find(d => d.slug === current.slug);
  const totalMembers = fullDivData?.members.length || current.membersCount;

  return (
    <section id="struktur-organisasi" className="py-24 sm:py-32 bg-[#050C18] text-white border-b border-white/5 relative overflow-hidden">
      
      {/* Background Graphic Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:32px_32px] opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[400px] bg-[#0284C7]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-12 max-w-7xl relative z-10 space-y-12 sm:space-y-14">
        
        {/* Section Header: Strictly 2 Lines Without Double Periods */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            <span className="block">Struktur kepengurusan</span>
            <span className="block mt-1 text-[#FCD34D]">
              Energi penggerak aksi nyata.
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal pt-1 max-w-2xl mx-auto">
            Sinergi 7 departemen kepengurusan GenBI UPN &quot;Veteran&quot; Jawa Timur dalam mengemban amanat kebanksentralan dan dedikasi pengabdian masyarakat.
          </p>

          {/* Clean 7-Department Pill Switcher (Minimalist & Executive) */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2.5">
            {defaultDivisionsData.map((d) => {
              const isActive = d.slug === activeSlug;
              return (
                <button
                  key={d.slug}
                  onClick={() => setActiveSlug(d.slug)}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#0284C7] text-white shadow-lg shadow-sky-600/30 ring-1 ring-sky-300/40'
                      : 'bg-white/[0.05] text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-white p-1 shrink-0 flex items-center justify-center shadow-xs">
                    <div className="relative w-full h-full">
                      <Image src={d.logo} alt={d.name} fill className="object-contain" />
                    </div>
                  </div>
                  <span>{d.slug.toUpperCase()}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Seamless Showcase Stage (Pure Luxury, Zero Clutter) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-2">
          
          {/* Left Column (7 Cols): Cinematic Full Team Photo */}
          <div className="lg:col-span-7">
            <div className="relative h-80 sm:h-[440px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/12 bg-[#071328] group">
              <Image
                src={current.teamPhoto}
                alt={`Foto Tim Resmi ${current.name}`}
                fill
                priority
                className="object-cover object-center brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050C18] via-[#050C18]/20 to-transparent" />
              
              {/* Clean Bottom Overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-xs font-mono font-bold text-[#FCD34D] tracking-wider uppercase block">
                  Foto Resmi Kepengurusan
                </span>
                <p className="text-base sm:text-lg font-bold text-slate-100 leading-snug">
                  {current.tagline}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (5 Cols): Clean Department Profile & Focus */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                {current.name}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {current.desc}
              </p>
            </div>

            {/* Leadership & Strength Strip */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/10 text-xs">
              <div className="space-y-1">
                <span className="text-[11px] text-slate-400 font-mono block">Pimpinan</span>
                <span className="font-bold text-white text-sm block">{current.headTitle}</span>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] text-slate-400 font-mono block">Kekuatan Tim</span>
                <span className="font-bold text-[#FCD34D] text-sm block">{totalMembers} Anggota Aktif</span>
              </div>
            </div>

            {/* Key Focus Initiatives */}
            <div className="space-y-2.5">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                Fokus Agenda Kerja
              </span>
              <div className="space-y-2">
                {current.prokerPreview.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-200">
                    <span className="w-4 h-4 rounded-full bg-[#0284C7]/20 border border-[#0284C7]/40 flex items-center justify-center shrink-0">
                      <Check size={10} className="text-sky-300" />
                    </span>
                    <span className="font-medium leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clean Action Button */}
            <div className="pt-2">
              <Link
                href="/divisi"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-sky-950/40 transition-all transform hover:-translate-y-0.5 active:scale-95"
              >
                <span>Direktori Lengkap Seluruh Anggota</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Struktur;
