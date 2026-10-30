"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Calendar, User, Clock } from 'lucide-react';
import type { Article } from '@/lib/db';

interface GenBINewsProps {
  articles?: Article[];
}

const defaultArticles = [
  {
    id: 1,
    title: "Future Scholar Talk: Strategi Lolos Seleksi Beasiswa Bank Indonesia 2026",
    slug: "future-scholar-talk-2026",
    category: "Edukasi & Beasiswa",
    publishedAt: "30 Januari 2026",
    author: "Divisi Pendidikan",
    excerpt: "GenBI UPNVJT sukses menggelar webinar pendampingan intensif kurasi portofolio, motivation letter, dan simulasi wawancara tatap muka bersama para awardee berprestasi.",
    coverImage: "/GenBI Webinar Career.png",
  },
  {
    id: 2,
    title: "GenBI SCALE: Akselerasi Digitalisasi UMKM Lokal Melalui QRIS di Kawasan Rungkut",
    slug: "genbi-scale-rungkut",
    category: "Ekonomi Kreatif",
    publishedAt: "25 Januari 2026",
    author: "Divisi Kewirausahaan",
    excerpt: "Mendorong adopsi pembayaran digital tanpa tatap muka bagi para pelaku usaha mikro guna memperluas jangkauan pasar.",
    coverImage: "/GENBI SCALE.png",
  },
  {
    id: 3,
    title: "Literasi Pasar Modal: Sinergi Edukasi GenBI COIN Bersama IDX Surabaya",
    slug: "genbi-coin-literasi",
    category: "Finansial",
    publishedAt: "20 Januari 2026",
    author: "Divisi Pendidikan",
    excerpt: "Meningkatkan literasi investasi cerdas dan pengenalan instrumen pasar modal bagi generasi muda kampus.",
    coverImage: "/GenBI Coin.png",
  },
  {
    id: 4,
    title: "GenBI Planters: Aksi Nyata Konservasi Lingkungan Hidup di SDN Rungkut Menanggal 1",
    slug: "genbi-planters-lingkungan",
    category: "Lingkungan Hidup",
    publishedAt: "15 Januari 2026",
    author: "Divisi Lingkungan",
    excerpt: "Penanaman ratusan bibit pohon peneduh serta edukasi pemilahan sampah organik sejak usia dini.",
    coverImage: "/Genbi Planters.png",
  },
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

const GenBINews: React.FC<GenBINewsProps> = ({ articles }) => {
  const displayArticles = articles && articles.length > 0
    ? articles.map((a) => ({
        id: a.id,
        title: a.title,
        slug: a.slug,
        category: a.category || "Siaran Pers",
        publishedAt: formatDate(a.publishedAt || a.createdAt),
        author: a.author || "Redaksi GenBI",
        excerpt: a.excerpt || "Kabar dan kegiatan terbaru seputar komunitas GenBI UPNVJT.",
        coverImage: a.coverImage || "/GenBI Webinar Career.png",
      }))
    : defaultArticles;

  const lead = displayArticles[0];
  const sideArticles = displayArticles.slice(1, 4);

  return (
    <section id="warta" className="py-24 bg-[#F8FAFC] text-slate-900 border-b border-slate-200">
      <div className="container mx-auto px-6 sm:px-12 max-w-7xl space-y-12">
        
        {/* Section Header (BudayaGo Editorial Style) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 tracking-[0.2em] text-[11px] font-bold uppercase text-[#0B1F40]">
              <span>08 / PUSAT PUBLIKASI &amp; SIARAN PERS</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#071224] leading-tight">
              Warta terkini. <br />
              <span className="text-[#0284C7]">Kabar kegiatan &amp; publikasi resmi.</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
              Liputan program kerja, siaran pers resmi bersama Bank Indonesia, serta rilis artikel opini dan karya tulis anggota.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/berita"
              className="inline-flex items-center gap-2 px-5 py-3 border border-slate-300 hover:border-[#071224] text-xs font-bold uppercase tracking-wider text-slate-800 hover:text-black transition-all bg-white"
            >
              <span>Arsip Berita Lengkap</span>
              <ArrowUpRight size={15} className="text-[#0284C7]" />
            </Link>
          </div>
        </div>

        {/* Corporate Newsroom Layout (Pertamina Style Spread) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Lead Story (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 overflow-hidden group hover:border-[#0284C7] transition-all">
            <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-slate-900">
              <Image
                src={lead.coverImage}
                alt={lead.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071224] via-transparent to-transparent" />
              
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 bg-[#EAB308] text-[#071224] text-[11px] font-extrabold tracking-widest uppercase">
                  {lead.category}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] font-mono tracking-widest text-slate-300 uppercase block mb-1">
                  {lead.publishedAt} • {lead.author}
                </span>
                <Link href={`/berita/${lead.slug}`}>
                  <h3 className="text-xl sm:text-2xl font-bold leading-snug hover:text-[#FCD34D] transition-colors">
                    {lead.title}
                  </h3>
                </Link>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {lead.excerpt}
              </p>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <span className="text-xs font-mono font-bold text-slate-400">
                  SIARAN PERS RESMI
                </span>
                <Link
                  href={`/berita/${lead.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0284C7] group-hover:translate-x-1 transition-transform"
                >
                  <span>Baca Selengkapnya</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* 3 Secondary News Items (Right 5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {sideArticles.map((item, idx) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 p-4 sm:p-5 flex gap-4 hover:border-[#0284C7] transition-all group"
              >
                <div className="relative h-24 w-28 shrink-0 overflow-hidden bg-slate-900 border border-slate-200">
                  <Image
                    src={item.coverImage}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between space-y-1">
                  <div>
                    <span className="text-[10px] font-mono tracking-wider text-[#0284C7] font-bold uppercase block">
                      0{idx + 1} // {item.category}
                    </span>
                    <Link href={`/berita/${item.slug}`}>
                      <h4 className="text-sm font-bold text-[#071224] leading-snug group-hover:text-[#0284C7] transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                    </Link>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {item.publishedAt}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default GenBINews;
