import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import type { GetServerSideProps } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import db, { Article } from '@/lib/db';
import { 
  Search, 
  Calendar, 
  User, 
  ArrowRight, 
  ArrowLeft,
  Sparkles, 
  Clock,
  BookOpen
} from 'lucide-react';

interface BeritaIndexProps {
  articles: Article[];
}

const fallbackArticles: Article[] = [
  {
    id: 1,
    title: "Future Scholar Talk: Bedah Berkas Administrasi & Simulasi Wawancara Beasiswa BI 2026",
    slug: "future-scholar-talk-2026",
    category: "Edukasi & Beasiswa",
    excerpt: "Bimbingan teknis portofolio unggul, penulisan motivation letter berbobot, dan simulasi wawancara tatap muka bersama awardee berprestasi untuk persiapan seleksi Beasiswa Bank Indonesia.",
    content: "",
    coverImage: "/GenBI Webinar Career.png",
    author: "Divisi Pendidikan",
    published: true,
    publishedAt: "2026-01-30T10:00:00Z",
    createdAt: "2026-01-30T10:00:00Z",
    updatedAt: "2026-01-30T10:00:00Z",
  },
  {
    id: 2,
    title: "GenBI SCALE: Akselerasi Digitalisasi UMKM Melalui QRIS di Kawasan Rungkut Surabaya",
    slug: "genbi-scale-rungkut",
    category: "Ekonomi Kreatif",
    excerpt: "Pendampingan langsung puluhan pedagang sentra kuliner dan UMKM dalam mengadopsi ekosistem transaksi nontunai QRIS guna memperluas daya saing di era ekonomi digital Jawa Timur.",
    content: "",
    coverImage: "/GENBI SCALE.png",
    author: "Divisi Kewirausahaan",
    published: true,
    publishedAt: "2026-01-25T10:00:00Z",
    createdAt: "2026-01-25T10:00:00Z",
    updatedAt: "2026-01-25T10:00:00Z",
  },
  {
    id: 3,
    title: "GenBI COIN: Edukasi Literasi Pasar Modal & Saham Bersama Bursa Efek Indonesia",
    slug: "genbi-coin-literasi",
    category: "Finansial & CBP",
    excerpt: "Sinergi edukasi bersama IDX Surabaya dan KPw Bank Indonesia Jatim mengupas instrumen investasi cerdas serta pengenalan Cinta Bangga Paham Rupiah bagi ratusan mahasiswa.",
    content: "",
    coverImage: "/GenBI Coin.png",
    author: "Divisi Pendidikan",
    published: true,
    publishedAt: "2026-01-20T10:00:00Z",
    createdAt: "2026-01-20T10:00:00Z",
    updatedAt: "2026-01-20T10:00:00Z",
  },
  {
    id: 4,
    title: "GenBI Planters: Aksi Nyata Konservasi Lingkungan Hidup di Sekolah Adiwiyata Jawa Timur",
    slug: "genbi-planters-lingkungan",
    category: "Sosial & Lingkungan",
    excerpt: "Gerakan penanaman ratusan bibit pohon peneduh serta workshop pengolahan kompos organik di sekolah Adiwiyata untuk menumbuhkan kepedulian bumi sejak usia dini.",
    content: "",
    coverImage: "/Genbi Planters.png",
    author: "Divisi Lingkungan",
    published: true,
    publishedAt: "2026-01-15T10:00:00Z",
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-01-15T10:00:00Z",
  },
  {
    id: 5,
    title: "BIVENTURE: Eksplorasi Nilai Heritage dan Sejarah Moneter di Museum De Javasche Bank",
    slug: "biventure-heritage-surabaya",
    category: "Finansial & CBP",
    excerpt: "Napak tilas sejarah perbankan sentral di Surabaya guna menelusuri evolusi rupiah dan memperkokoh rasa bangga generasi muda terhadap kedaulatan moneter Indonesia.",
    content: "",
    coverImage: "/BIVENTURE.png",
    author: "Divisi Humas",
    published: true,
    publishedAt: "2026-01-10T10:00:00Z",
    createdAt: "2026-01-10T10:00:00Z",
    updatedAt: "2026-01-10T10:00:00Z",
  },
];

const categories = [
  { key: 'all', label: 'Semua Kategori' },
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

export default function BeritaPage({ articles = [] }: BeritaIndexProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const displayList = useMemo(() => {
    const source = articles && articles.length > 0 ? articles : fallbackArticles;
    return source.filter((item) => {
      const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.excerpt && item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
      
      if (!matchSearch) return false;
      if (activeCategory === 'all') return true;

      const cat = (item.category || '').toLowerCase();
      if (activeCategory === 'edukasi') return cat.includes('edukasi') || cat.includes('beasiswa');
      if (activeCategory === 'finansial') return cat.includes('finansial') || cat.includes('cbp') || cat.includes('rupiah');
      if (activeCategory === 'ekonomi') return cat.includes('ekonomi') || cat.includes('umkm') || cat.includes('wirausaha');
      if (activeCategory === 'sosial') return cat.includes('sosial') || cat.includes('lingkungan');
      return true;
    });
  }, [articles, activeCategory, searchQuery]);

  const featured = displayList.length > 0 ? displayList[0] : null;
  const regularList = displayList.length > 1 ? displayList.slice(1) : [];

  return (
    <>
      <Head>
        <title>Warta &amp; Publikasi Resmi | GenBI UPN Veteran Jawa Timur</title>
        <meta 
          name="description" 
          content="Arsip liputan program kerja, kegiatan sosialisasi CBP Rupiah, siaran pers resmi, dan artikel karya mahasiswa penerima Beasiswa Bank Indonesia UPNVJT." 
        />
      </Head>

      <Navbar />

      <main className="min-h-screen bg-[#F8FAFC] text-slate-900 pt-28 pb-24 selection:bg-[#0284C7] selection:text-white">
        {/* Subtle Architectural Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none" />

        <div className="container mx-auto px-6 sm:px-12 max-w-7xl relative z-10 space-y-12">
          
          {/* Breadcrumb Back Button */}
          <div className="pt-2">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-[#0284C7] border border-slate-200/90 text-xs font-bold shadow-xs transition-all group"
            >
              <ArrowLeft size={14} className="text-slate-400 group-hover:text-[#0284C7] group-hover:-translate-x-1 transition-transform" />
              <span>Kembali ke Beranda Utama</span>
            </Link>
          </div>

          {/* Section Header: Clean Executive Design */}
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold text-[#0284C7] uppercase tracking-wider block">
              PUSAT INFORMASI &amp; REDAKSI
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071224] tracking-tight leading-tight">
              Warta &amp; Publikasi Resmi.
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
              Liputan program kerja, agenda pemberdayaan masyarakat, edukasi kebijakan bank sentral, dan rilis karya tulis mahasiswa GenBI UPN &quot;Veteran&quot; Jawa Timur.
            </p>
          </div>

          {/* Filter Bar & Search */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Category Tabs */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {categories.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setActiveCategory(c.key)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeCategory === c.key
                      ? 'bg-[#0284C7] text-white shadow-xs'
                      : 'bg-slate-100/70 text-slate-600 hover:bg-slate-200/70 hover:text-[#071224]'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text"
                placeholder="Cari berita atau kegiatan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284C7] focus:bg-white transition-all font-medium"
              />
            </div>
          </div>

          {/* Featured Article Card */}
          {featured && (
            <div className="group rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-lg shadow-slate-900/5 hover:border-[#0284C7] transition-all">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[420px] bg-[#071224] overflow-hidden">
                  <Image 
                    src={featured.coverImage || "/GenBI Webinar Career.png"}
                    alt={featured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#0284C7] text-white shadow-sm uppercase tracking-wide">
                      {featured.category || "Sorotan Utama"}
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar size={13} className="text-[#0284C7]" />
                        {formatDate(featured.publishedAt || featured.createdAt)}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <User size={13} className="text-[#0284C7]" />
                        {featured.author || "Redaksi GenBI"}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#071224] leading-snug group-hover:text-[#0284C7] transition-colors">
                      {featured.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {featured.excerpt}
                    </p>
                  </div>

                  <Link 
                    href={`/berita/${featured.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs shadow-md shadow-sky-600/20 transition-all w-fit"
                  >
                    <span>Baca Selengkapnya</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Regular Articles Grid */}
          {regularList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {regularList.map((article) => (
                <Link
                  key={article.id}
                  href={`/berita/${article.slug}`}
                  className="group rounded-3xl bg-white border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#0284C7] transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="relative h-48 sm:h-52 w-full bg-[#071224] overflow-hidden">
                      <Image 
                        src={article.coverImage || "/GenBI Webinar Career.png"}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#0284C7] text-white uppercase tracking-wider shadow-xs">
                        {article.category || "Warta"}
                      </span>
                    </div>

                    <div className="p-5 sm:p-6 space-y-2.5">
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                        <span className="inline-flex items-center gap-1">
                          <Calendar size={12} className="text-[#0284C7]" />
                          {formatDate(article.publishedAt || article.createdAt)}
                        </span>
                        <span>•</span>
                        <span>{article.author || "Redaksi GenBI"}</span>
                      </div>

                      <h3 className="text-base font-extrabold text-[#071224] leading-snug line-clamp-2 group-hover:text-[#0284C7] transition-colors">
                        {article.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 sm:px-6 pb-5 pt-0">
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0284C7] group-hover:text-[#0369A1]">
                      <span>Baca artikel</span>
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            displayList.length === 0 && (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
                <BookOpen size={36} className="text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-[#071224]">Tidak ada berita ditemukan</h3>
                <p className="text-xs text-slate-500">Coba ubah kata kunci pencarian atau pilih kategori lain.</p>
              </div>
            )
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<BeritaIndexProps> = async () => {
  try {
    const articles = await db.article.findMany();
    return {
      props: {
        articles: JSON.parse(JSON.stringify(articles)),
      },
    };
  } catch (error) {
    console.error("Error fetching articles for /berita:", error);
    return {
      props: {
        articles: [],
      },
    };
  }
};
