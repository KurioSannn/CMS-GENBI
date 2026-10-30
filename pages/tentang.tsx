import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { genbiDivisions, Member } from '@/data/members';
import { 
  Users, 
  CheckCircle2, 
  ArrowLeft, 
  Quote,
  Landmark
} from 'lucide-react';

export default function TentangPage() {
  // Operational 6 divisions (BPH has its own dedicated executive leadership suite above)
  const operationalDivisions = genbiDivisions.filter(d => d.slug !== 'bph');
  const bphDivision = genbiDivisions.find(d => d.slug === 'bph');

  const [activeTab, setActiveTab] = useState<string>('pendidikan');

  const activeDivision = operationalDivisions.find((d) => d.slug === activeTab) || operationalDivisions[0];

  const divisionTeamPhotos: Record<string, string> = {
    pendidikan: "/Pendidikan ALL TEAM.png",
    ekraf: "/EKRAF ALL TEAM.png",
    sosling: "/SOSLING ALL TEAM.png",
    hubeks: "/HUBEKS ALL TEAM.png",
    psdm: "/PSDM ALL TEAM.png",
    medkom: "/Medkom ALL TEAM.png",
  };

  const divisionDetails: Record<string, { tagline: string; fullDesc: string; proker: string[] }> = {
    pendidikan: {
      tagline: "Edukasi Beasiswa, Literasi CBP Rupiah & Kapasitas Akademis",
      fullDesc: "Pusat pengembangan kapasitas intelektual awardee, pendampingan intensif seleksi Beasiswa Bank Indonesia, sosialisasi Cinta Bangga Paham Rupiah, dan pelatihan kemahiran bahasa.",
      proker: [
        "Future Scholar Talk & Mentoring Beasiswa",
        "GenBI EPT Masterclass Preparation",
        "GenBI SHINE: Literasi CBP Rupiah",
        "Klinik Konsultasi Portofolio Mahasiswa",
      ],
    },
    ekraf: {
      tagline: "Akselerasi Ekonomi Kreatif & Digitalisasi QRIS UMKM",
      fullDesc: "Mendorong adopsi pembayaran digital nirsentuh QRIS bagi pedagang mikro sentra kuliner Surabaya serta inkubasi bisnis rintisan mandiri bagi anggota GenBI.",
      proker: [
        "GenBI SCALE: Akselerasi Digitalisasi UMKM",
        "Mentoring Penyusunan Business Plan",
        "Pameran Produk Kreatif & Bazar Mahasiswa",
        "GenBI Official Merchandising & Store",
      ],
    },
    sosling: {
      tagline: "Konservasi Hayati, Penanaman Pohon & Aksi Peduli Bumi",
      fullDesc: "Pelopor kesadaran lingkungan hidup, kampanye pengurangan sampah plastik, program reboisasi sekolah adiwiyata, serta aksi konservasi pesisir.",
      proker: [
        "GenBI Planters: Reboisasi Pohon Sekolah",
        "Kampanye Zero Waste Lifestyle Kampus",
        "Edukasi Pemilahan Sampah Organik & Bank Sampah",
        "Aksi Bersih Pantai & Konservasi Pesisir",
      ],
    },
    hubeks: {
      tagline: "Jejaring Kemitraan Strategis, Relasi Publik & Diplomasi",
      fullDesc: "Membangun kemitraan eksternal bersama instansi pemerintah, media massa, korporasi mitra, serta koordinasi antar-komisariat se-Jawa Timur.",
      proker: [
        "GenBI Visit & Company Knowledge Exchange",
        "Sinergi Kemitraan Media Publikasi & Pers",
        "Forum Koordinasi GenBI Wilayah Jatim",
        "Studi Banding Antar-Komisariat Kampus",
      ],
    },
    psdm: {
      tagline: "Kaderisasi Karakter Bela Negara, Solidaritas & Internal Bonding",
      fullDesc: "Kawah candradimuka pembinaan internal, upgrading soft-skills, pelatihan kepemimpinan Bela Negara, dan evaluasi kepuasan anggota organisasi.",
      proker: [
        "Leadership Training & Karakter Bela Negara",
        "Upgrading Soft-Skills & Public Speaking",
        "Internal Bonding & Gathering Anggota",
        "Apresiasi Awardee Berprestasi Semester",
      ],
    },
    medkom: {
      tagline: "Branding Institusi, Desain Visual & Pengelolaan Media",
      fullDesc: "Ujung tombak visual dan komunikasi publik GenBI UPNVJT di platform digital. Memproduksi konten infografis kebijakan moneter, video dokumenter, dan portal berita.",
      proker: [
        "Produksi Konten Edukasi CBP & QRIS",
        "Manajemen Media Sosial Instagram & TikTok",
        "Dokumentasi Foto & Video Kegiatan",
        "Pengelolaan Portal Berita GenBI-Hub",
      ],
    },
  };

  // Pembina Organisasi
  const pembina = {
    name: "M. Khadik Asrori, S.Kom., M.Kom.",
    role: "Pembina GenBI Komisariat UPN \"Veteran\" Jawa Timur",
    affiliation: "UPN \"Veteran\" Jawa Timur & KPw Bank Indonesia Provinsi Jawa Timur",
    photo: "/foto profile genbiupnvjt.png",
    quote: "Generasi Baru Indonesia harus menjadi pionir agen perubahan dan terus memberikan dampak nyata bagi masyarakat luas.",
  };

  // BPH Leaders
  const bphKetua = bphDivision?.members.find(m => m.position.toLowerCase().includes('ketua umum') && !m.position.toLowerCase().includes('wakil'));
  const bphWakil = bphDivision?.members.find(m => m.position.toLowerCase().includes('wakil'));
  const bphSecretariesAndFinance = bphDivision?.members.filter(m => 
    m !== bphKetua && m !== bphWakil
  ) || [];

  return (
    <>
      <Head>
        <title>Tentang Kami &amp; Struktur Kepengurusan | GenBI UPNVJT</title>
        <meta 
          name="description" 
          content="Profil resmi, Pembina Organisasi, Badan Pengurus Harian, dan 6 Departemen Strategis GenBI Komisariat UPN Veteran Jawa Timur." 
        />
      </Head>

      <Navbar />

      <main className="min-h-screen bg-[#F8FAFC] text-slate-900 pt-28 pb-24 selection:bg-[#0284C7] selection:text-white">
        
        {/* Subtle Architectural Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none" />

        <div className="container mx-auto px-6 sm:px-12 max-w-7xl relative z-10 space-y-16 sm:space-y-20">

          {/* Top Breadcrumb: Noticeable Tactile Button */}
          <div className="pt-2">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-[#0284C7] border border-slate-200/90 text-xs font-bold shadow-xs transition-all group"
            >
              <ArrowLeft size={14} className="text-slate-400 group-hover:text-[#0284C7] group-hover:-translate-x-1 transition-transform" />
              <span>Kembali ke Beranda Utama</span>
            </Link>
          </div>

          {/* 1. HERO HEADER: CENTERED & STRICTLY 2 LINES */}
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#071224] leading-tight">
              <span className="block whitespace-normal sm:whitespace-nowrap">Komitmen kepemimpinan</span>
              <span className="block mt-1 text-[#0284C7] whitespace-normal sm:whitespace-nowrap">
                Mengabdi bersama Bank Indonesia.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-3xl mx-auto pt-1">
              Generasi Baru Indonesia (GenBI) didirikan pada <strong>11 November 2011</strong> atas inisiatif <strong>Bank Indonesia</strong> sebagai wadah akselerasi kepemimpinan bagi awardee Beasiswa Bank Indonesia. Di lingkungan <strong>UPN &quot;Veteran&quot; Jawa Timur</strong>, kami memadukan literasi moneter &amp; kebanksentralan dengan <strong>Karakter Bela Negara</strong> untuk mengabdi sepenuh hati bagi masyarakat luas.
            </p>

            {/* Quick Metric Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 max-w-3xl mx-auto">
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <span className="text-xl sm:text-2xl font-black text-[#071224] block">50+</span>
                <span className="text-xs text-slate-500 font-semibold">Awardee Aktif</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <span className="text-xl sm:text-2xl font-black text-[#0284C7] block">7 Divisi</span>
                <span className="text-xs text-slate-500 font-semibold">Departemen Kerja</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <span className="text-xl sm:text-2xl font-black text-[#071224] block">KPw Jatim</span>
                <span className="text-xs text-slate-500 font-semibold">Pembina Sentral</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <span className="text-xl sm:text-2xl font-black text-[#0284C7] block">UPNVJT</span>
                <span className="text-xs text-slate-500 font-semibold">Kampus Bela Negara</span>
              </div>
            </div>
          </div>

          {/* 2. PEMBINA ORGANISASI (CLEAN EXECUTIVE SHOWCASE) */}
          <section className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-900/5 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center relative z-10">
              
              {/* Pembina Photo (Enlarged & Clean Frame, Zero Overlapping Badges) */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-md h-80 sm:h-[420px] rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-[#071224] group">
                  <Image 
                    src={pembina.photo} 
                    alt={pembina.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                </div>
              </div>

              {/* Pembina Profile & Quote (Pure Clean, Zero Toy Ornaments) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-1.5">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#071224] tracking-tight leading-tight">
                    {pembina.name}
                  </h2>
                  <p className="text-sm sm:text-base font-bold text-[#0284C7]">
                    {pembina.role}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500">
                    {pembina.affiliation}
                  </p>
                </div>

                <div className="p-6 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <p className="text-sm sm:text-base text-slate-700 italic leading-relaxed font-medium">
                    &ldquo;{pembina.quote}&rdquo;
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* 3. BADAN PENGURUS HARIAN (BPH EXECUTIVE LEADERSHIP SUITE) */}
          <section className="space-y-8">
            <div className="space-y-1.5 border-b border-slate-200 pb-5">
              <span className="text-xs font-bold text-[#0284C7] tracking-wider uppercase block">
                PIMPINAN INTI LEMBAGA
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071224] tracking-tight">
                Badan Pengurus Harian (BPH)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed font-normal">
                Komando tertinggi organisasi yang bertanggung jawab atas koordinasi strategis lintas departemen, diplomasi eksternal, serta akuntabilitas tata kelola GenBI UPNVJT.
              </p>
            </div>

            {/* Row 1: Ketua Umum & Wakil Ketua Umum */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Ketua Umum Card */}
              {bphKetua && (
                <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-md shadow-slate-900/5 flex flex-col sm:flex-row items-center gap-6 group hover:border-[#0284C7] hover:shadow-xl transition-all duration-300">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shrink-0 border-2 border-slate-200 group-hover:border-[#0284C7] bg-[#071224] transition-colors shadow-sm">
                    <Image 
                      src={bphKetua.imageGif} 
                      alt={bphKetua.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  </div>
                  <div className="space-y-2 text-center sm:text-left">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-50 text-[#0284C7] border border-sky-200">
                      {bphKetua.position}
                    </span>
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#071224] leading-snug">
                      {bphKetua.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-semibold">
                      {bphKetua.prodiAngkatan}
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal pt-0.5">
                      Memimpin arah kebijakan strategis dan representasi formal institusi.
                    </p>
                  </div>
                </div>
              )}

              {/* Wakil Ketua Umum Card */}
              {bphWakil && (
                <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 shadow-md shadow-slate-900/5 flex flex-col sm:flex-row items-center gap-6 group hover:border-[#0284C7] hover:shadow-xl transition-all duration-300">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shrink-0 border-2 border-slate-200 group-hover:border-[#0284C7] bg-[#071224] transition-colors shadow-sm">
                    <Image 
                      src={bphWakil.imageGif} 
                      alt={bphWakil.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  </div>
                  <div className="space-y-2 text-center sm:text-left">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-50 text-[#0284C7] border border-sky-200">
                      {bphWakil.position}
                    </span>
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#071224] leading-snug">
                      {bphWakil.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-semibold">
                      {bphWakil.prodiAngkatan}
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal pt-0.5">
                      Mengawal operasional harian dan sinergi internal antar-departemen.
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* Row 2: Sekretaris & Bendahara (Unified Elegant Presentation) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {bphSecretariesAndFinance.map((staff, idx) => (
                <div 
                  key={idx}
                  className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#0284C7] transition-all duration-300 flex flex-col items-center text-center group"
                >
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden mb-3 border-2 border-slate-200 group-hover:border-[#0284C7] bg-[#071224] transition-colors shadow-sm">
                    <Image
                      src={staff.imageGif}
                      alt={staff.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  </div>
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-50 text-[#0284C7] border border-sky-200 mb-2">
                    {staff.position}
                  </span>
                  <h4 className="text-sm sm:text-base font-extrabold text-[#071224] leading-snug">
                    {staff.name}
                  </h4>
                  <p className="text-xs text-slate-600 font-semibold mt-1">
                    {staff.prodiAngkatan}
                  </p>
                </div>
              ))}
            </div>

          </section>

          {/* 4. DIREKTORI 6 DEPARTEMEN PELAKSANA (INTERACTIVE VISUAL STAGE) */}
          <section id="struktur" className="space-y-8 pt-4">
            
            <div className="space-y-2 border-b border-slate-200 pb-5">
              <span className="text-xs font-bold text-[#0284C7] tracking-wider uppercase block">
                DIREKTORI DEPARTEMEN STRATEGIS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071224] tracking-tight">
                6 Departemen Penggerak Program
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
                Pilih departemen di bawah untuk meninjau foto tim resmi, misi kerja, dan susunan seluruh staf awardee yang bertugas.
              </p>
            </div>

            {/* Department Navigation Tabs (6 Clean Columns on Desktop) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {operationalDivisions.map((div) => {
                const isActive = div.slug === activeTab;
                return (
                  <button
                    key={div.slug}
                    onClick={() => setActiveTab(div.slug)}
                    className={`p-3 rounded-2xl border text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-2 text-center ${
                      isActive
                        ? 'bg-[#0284C7] text-white border-sky-500 shadow-md shadow-sky-600/20'
                        : 'bg-white text-slate-700 hover:bg-slate-50 hover:text-[#071224] border-slate-200'
                    }`}
                  >
                    <div className="w-11 h-11 rounded-full bg-white p-2 shadow-xs border border-slate-200/90 shrink-0 flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <Image 
                          src={div.logo} 
                          alt={div.name} 
                          fill 
                          className="object-contain" 
                        />
                      </div>
                    </div>
                    <span className="truncate w-full block uppercase text-[11px] font-bold">
                      {div.slug}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Department Stage Showcase */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-900/5 space-y-10">
              
              {/* Header Info & Team Photo */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Team Photo (Balanced Height) */}
                <div className="lg:col-span-7">
                  <div className="relative h-64 sm:h-72 lg:h-80 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md group bg-[#071224]">
                    <Image
                      src={divisionTeamPhotos[activeDivision.slug] || "/BPH ALL TEAM.png"}
                      alt={`Foto Tim Resmi ${activeDivision.name}`}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071224]/80 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-[10px] font-bold tracking-wider text-[#FCD34D] uppercase block">
                        FOTO RESMI KEPENGURUSAN
                      </span>
                      <p className="text-sm sm:text-base font-bold text-white">
                        {activeDivision.name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Division Narrative (Balanced & Zero Empty Whitespace) */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white p-2 shadow-xs border border-slate-200/90 flex items-center justify-center shrink-0">
                        <div className="relative w-full h-full">
                          <Image src={activeDivision.logo} alt={activeDivision.name} fill className="object-contain" />
                        </div>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-[#071224] tracking-tight">
                        {activeDivision.name}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-[#0284C7] leading-snug">
                      {(divisionDetails[activeDivision.slug]?.tagline) || activeDivision.description}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {(divisionDetails[activeDivision.slug]?.fullDesc) || activeDivision.description}
                    </p>
                  </div>

                  {/* Program Kerja Unggulan (4 Clean Badges) */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                      Inisiatif &amp; Program Kerja Utama:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(divisionDetails[activeDivision.slug]?.proker || [
                        "Program Kerja Tahunan Terpadu",
                        "Edukasi Literasi CBP Rupiah",
                        "Sinergi Komunitas & Masyarakat",
                        "Pengabdian Mahasiswa UPNVJT"
                      ]).map((item, pIdx) => (
                        <div key={pIdx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/90 shadow-2xs flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 size={14} className="text-[#0284C7] shrink-0 mt-0.5" />
                          <span className="font-semibold leading-tight">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

              {/* Members Directory Grid */}
              <div className="space-y-6 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <h4 className="text-base sm:text-lg font-bold text-[#071224] tracking-tight">
                    Direktori Anggota {activeDivision.name}
                  </h4>
                  <span className="text-xs font-bold text-slate-500">
                    Total: {activeDivision.members.length} Awardee
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                  {activeDivision.members.map((member, idx) => {
                    const isKadiv = member.position.toLowerCase().includes('kepala divisi');
                    return (
                      <div 
                        key={idx}
                        className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col items-center text-center group ${
                          isKadiv 
                            ? 'bg-sky-50/50 border-sky-200 hover:border-[#0284C7] shadow-sm' 
                            : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-md'
                        }`}
                      >
                        {/* Avatar / GIF */}
                        <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 mb-3 bg-[#071224] transition-colors ${
                          isKadiv ? 'border-[#0284C7]' : 'border-slate-200 group-hover:border-[#0284C7]'
                        }`}>
                          <Image
                            src={member.imageGif}
                            alt={member.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            unoptimized
                          />
                        </div>

                        {/* Position Badge */}
                        <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded mb-1.5 ${
                          isKadiv 
                            ? 'bg-[#0284C7] text-white' 
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {member.position}
                        </span>

                        {/* Name & Prodi */}
                        <h5 className="text-xs sm:text-sm font-bold text-[#071224] line-clamp-1 leading-tight">
                          {member.name}
                        </h5>
                        <p className="text-[10px] text-slate-500 mt-1 font-medium">
                          {member.prodiAngkatan}
                        </p>
                      </div>
                    );
                  })}
                </div>

              </div>

            </div>

          </section>

        </div>

      </main>

      <Footer />
    </>
  );
}
