"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Calendar } from 'lucide-react';
import type { Article } from '@/lib/db';

interface KegiatanProps {
  articles?: Article[];
}

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  category: string;
  categoryGroup: 'all' | 'edukasi' | 'finansial' | 'ekonomi' | 'sosial';
  excerpt: string;
  image: string;
  publishedAt: string;
  author: string;
  readTime: string;
}

const defaultNewsList: NewsItem[] = [
  {
    id: 1,
    title: "Future Scholar Talk: Bedah Berkas Administrasi & Simulasi Wawancara Beasiswa BI 2026",
    slug: "future-scholar-talk-2026",
    category: "Edukasi & Beasiswa",
    categoryGroup: "edukasi",
    excerpt: "Bimbingan teknis portofolio unggul, penulisan motivation letter berbobot, dan simulasi wawancara tatap muka bersama awardee berprestasi untuk persiapan seleksi Beasiswa Bank Indonesia.",
    image: "/GenBI Webinar Career.png",
    publishedAt: "30 Januari 2026",
    author: "Divisi Pendidikan",
    readTime: "4 min baca",
  },
  {
    id: 2,
    title: "GenBI SCALE: Akselerasi Digitalisasi UMKM Melalui QRIS di Kawasan Rungkut Surabaya",
    slug: "genbi-scale-rungkut",
    category: "Ekonomi Kreatif",
    categoryGroup: "ekonomi",
    excerpt: "Pendampingan langsung puluhan pedagang sentra kuliner dan UMKM dalam mengadopsi ekosistem transaksi nontunai QRIS guna memperluas daya saing di era ekonomi digital Jawa Timur.",
    image: "/GENBI SCALE.png",
    publishedAt: "25 Januari 2026",
    author: "Divisi Kewirausahaan",
    readTime: "3 min baca",
  },
  {
    id: 3,
    title: "GenBI COIN: Edukasi Literasi Pasar Modal & Saham Bersama Bursa Efek Indonesia",
    slug: "genbi-coin-literasi",
    category: "Finansial & CBP",
    categoryGroup: "finansial",
    excerpt: "Sinergi edukasi bersama IDX Surabaya dan KPw Bank Indonesia Jatim mengupas instrumen investasi cerdas serta pengenalan Cinta Bangga Paham Rupiah bagi ratusan mahasiswa.",
    image: "/GenBI Coin.png",
    publishedAt: "20 Januari 2026",
    author: "Divisi Pendidikan",
    readTime: "5 min baca",
  },
  {
    id: 4,
    title: "GenBI Planters: Aksi Nyata Konservasi Lingkungan Hidup di Sekolah Adiwiyata Jawa Timur",
    slug: "genbi-planters-lingkungan",
    category: "Sosial & Lingkungan",
    categoryGroup: "sosial",
    excerpt: "Gerakan penanaman ratusan bibit pohon peneduh serta workshop pengolahan kompos organik di sekolah Adiwiyata untuk menumbuhkan kepedulian bumi sejak usia dini.",
    image: "/Genbi Planters.png",
    publishedAt: "15 Januari 2026",
    author: "Divisi Lingkungan",
    readTime: "3 min baca",
  },
  {
    id: 5,
    title: "BIVENTURE: Eksplorasi Nilai Heritage dan Sejarah Moneter di Museum De Javasche Bank",
    slug: "biventure-heritage-surabaya",
    category: "Finansial & CBP",
    categoryGroup: "finansial",
    excerpt: "Napak tilas sejarah perbankan sentral di Surabaya guna menelusuri evolusi rupiah dan memperkokoh rasa bangga generasi muda terhadap kedaulatan moneter Indonesia.",
    image: "/BIVENTURE.png",
    publishedAt: "10 Januari 2026",
    author: "Divisi Humas",
    readTime: "4 min baca",
  },
];

const categoryTabs = [
  { key: 'all', label: 'Semua Berita' },
  { key: 'edukasi', label: 'Edukasi & Beasiswa' },
  { key: 'finansial', label: 'Finansial & CBP' },
  { key: 'ekonomi', label: 'Ekonomi Kreatif' },
  { key: 'sosial', label: 'Sosial & Lingkungan' },
];

const formatDate = (dateStr: string) => {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    return dateStr;
  }
};

const mapCategoryToGroup = (cat: string): 'all' | 'edukasi' | 'finansial' | 'ekonomi' | 'sosial' => {
  const c = (cat || '').toLowerCase();
  if (c.includes('edukasi') || c.includes('beasiswa') || c.includes('karir') || c.includes('karier')) return 'edukasi';
  if (c.includes('finansial') || c.includes('cbp') || c.includes('rupiah') || c.includes('bank')) return 'finansial';
  if (c.includes('ekonomi') || c.includes('umkm') || c.includes('wirausaha') || c.includes('bisnis')) return 'ekonomi';
  if (c.includes('lingkungan') || c.includes('sosial') || c.includes('kesehatan') || c.includes('pohon')) return 'sosial';
  return 'all';
};

const Kegiatan: React.FC<KegiatanProps> = ({ articles }) => {
  const [activeTab, setActiveTab] = useState('all');

  // Convert database articles to unified NewsItem format or fallback to defaultNewsList
  const newsItems: NewsItem[] = articles && articles.length > 0
    ? articles.map((a) => ({
        id: a.id,
        title: a.title,
        slug: a.slug,
        category: a.category || "Warta Resmi",
        categoryGroup: mapCategoryToGroup(a.category),
        excerpt: a.excerpt || "Kabar dan dokumentasi kegiatan terbaru dari mahasiswa penerima Beasiswa Bank Indonesia UPN Veteran Jawa Timur.",
        image: a.coverImage || "/GenBI Webinar Career.png",
        publishedAt: formatDate(a.publishedAt || a.createdAt),
        author: a.author || "Redaksi GenBI",
        readTime: "3 min baca",
      }))
    : defaultNewsList;

  const filteredItems = activeTab === 'all'
    ? newsItems
    : newsItems.filter(item => item.categoryGroup === activeTab);

  // Take top 3 items for a balanced, symmetric 3-card layout
  const displayItems = (filteredItems.length > 0 ? filteredItems : newsItems).slice(0, 3);

  return (
    <section id="berita" className="py-24 sm:py-32 bg-[#F8FAFC] text-slate-900 border-b border-slate-200 relative overflow-hidden">
      
      {/* Background Architectural Subtle Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-sky-200/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-12 max-w-7xl relative z-10 space-y-12">
        
        {/* Section Header: Centered & Strictly 2 Lines */}
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#071224] leading-tight">
            <span className="block">Warta &amp; kabar terkini</span>
            <span className="block mt-1 text-[#0284C7] whitespace-normal sm:whitespace-nowrap">
              Liputan resmi dinamika GenBI UPNVJT.
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal pt-1 max-w-2xl mx-auto">
            Dokumentasi berkala inisiatif kepemimpinan, pendampingan masyarakat, serta publikasi kegiatan mahasiswa penerima Beasiswa Bank Indonesia di Jawa Timur.
          </p>

          {/* Minimalist Floating Pill Filter */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {categoryTabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#071224] text-white shadow-md shadow-slate-900/20 ring-1 ring-[#071224]'
                      : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200 shadow-sm'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-Card Horizon Grid (Apple Newsroom Style: Symmetric, Equal Heights, Enlarged Luxury Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
          {displayItems.map((item) => (
            <Link
              key={item.id}
              href={`/berita/${item.slug}`}
              className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-[0_12px_35px_-5px_rgba(7,18,36,0.06)] hover:shadow-[0_28px_60px_-10px_rgba(7,18,36,0.14)] hover:border-[#0284C7]/50 hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between h-full"
            >
              <div>
                {/* 16:10 Cinematic Cover Image (Enlarged & Pure Clean) */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900 shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />
                </div>

                {/* Content Area (Enlarged & Spacious) */}
                <div className="p-7 sm:p-8 space-y-4">
                  {/* Publication Metadata (Clean Date - Zero Clutter) */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Calendar size={14} className="text-[#0284C7]" />
                    <span>{item.publishedAt}</span>
                  </div>

                  {/* Title with Fixed Min Height for Identical Baseline */}
                  <h3 className="text-xl font-extrabold text-[#071224] leading-snug group-hover:text-[#0284C7] transition-colors min-h-[58px] line-clamp-2">
                    {item.title}
                  </h3>

                  {/* Excerpt with Fixed Min Height */}
                  <p className="text-sm text-slate-600 leading-relaxed min-h-[66px] line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer (Author & Read Action) */}
              <div className="px-7 sm:px-8 pb-7 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-500 line-clamp-1">
                  {item.author}
                </span>

                <span className="inline-flex items-center gap-1.5 font-bold text-[#0284C7] group-hover:text-[#0369A1] group-hover:translate-x-1 transition-all">
                  <span>Baca</span>
                  <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Clean Center Action Link */}
        <div className="flex justify-center pt-4">
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#071224] hover:bg-[#0284C7] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-md transform hover:-translate-y-0.5 active:scale-95"
          >
            <span>Jelajahi Arsip Warta Lengkap</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Kegiatan;
