"use client";
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, ArrowUpRight, Newspaper } from 'lucide-react';

const GenBINews = () => {
  const featuredNews = {
    title: "Future Scholar Talk: Strategi Jitu Raih Beasiswa Bank Indonesia 2026",
    category: "Edukasi",
    date: "30 Januari 2026",
    author: "Divisi Pendidikan",
    excerpt: "GenBI UPNVJT sukses gelar webinar tips dan trik lolos beasiswa melalui bedah CV serta motivation letter bersama narasumber inspiratif.",
    image: "/GenBI Webinar Career.png", 
    slug: "webinar-career-2026"
  };

  const recentNews = [
    {
      title: "GenBI SCALE: Akselerasi Digitalisasi UMKM Lokal di Kawasan Rungkut",
      date: "25 Januari 2026",
      image: "/GENBI SCALE.png",
      slug: "genbi-scale-rungkut"
    },
    {
      title: "Literasi Pasar Modal: Kolaborasi Strategis GenBI COIN Bersama IDX Surabaya",
      date: "20 Januari 2026",
      image: "/GenBI Coin.png",
      slug: "genbi-coin-literasi"
    },
    {
      title: "GenBI Planters: Tanam Pohon dan Edukasi Lingkungan di SDN Rungkut Mananggal 1",
      date: "15 Januari 2026",
      image: "/Genbi Planters.png",
      slug: "genbi-planters-aksi-hijau"
    },
    {
      title: "BIVENTURE 2025: Menelusuri Jejak Sejarah Keuangan di Museum De Javasche Bank",
      date: "10 Januari 2026",
      image: "/BIVENTURE.png",
      slug: "biventure-sejarah-uang"
    }
  ];

  return (
    <section id="genbi-news" className="py-24 bg-[#F8FAFC]">
      <div className="container mx-auto px-6 max-w-[1400px]">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} className="border-l-8 border-[#EAB308] pl-6">
            <div className="flex items-center gap-2 mb-3">
               <Newspaper size={18} className="text-[#EAB308]" />
               <h2 className="text-sm font-black bg-gradient-to-r from-[#EAB308] to-[#B45309] bg-clip-text text-transparent tracking-[0.3em] uppercase italic">GenBI News</h2>
            </div>
            <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic text-[#0B1F40]">
              Kabar & <span className="bg-gradient-to-r from-[#EAB308] to-[#B45309] bg-clip-text text-transparent px-2">Kegiatan</span>
            </h3>
          </motion.div>
          <Link href="/berita" className="group flex items-center gap-3 text-[#0B1F40] font-black uppercase italic text-sm hover:text-[#EAB308] transition-all">
            Lihat Semua Berita
            <div className="p-2 bg-[#0B1F40] group-hover:bg-[#EAB308] rounded-full text-white"><ArrowRight size={18} /></div>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Featured News - Aspect Ratio Fixed */}
          <motion.div className="lg:col-span-2 group">
            <Link href={`/berita/${featuredNews.slug}`}>
              <div className="relative aspect-video md:h-[600px] w-full rounded-[3rem] overflow-hidden shadow-2xl border border-slate-200 bg-[#0B1F40]">
                <Image 
                  src={featuredNews.image} 
                  alt={featuredNews.title} 
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                  className="group-hover:scale-105 transition-transform duration-1000 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F40] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 p-8 md:p-12 w-full">
                  <span className="px-4 py-1 bg-[#EAB308] text-[#0B1F40] text-[10px] font-black uppercase rounded-full mb-4 inline-block italic">{featuredNews.category}</span>
                  <h4 className="text-2xl md:text-4xl font-black text-white mb-4 uppercase italic leading-tight group-hover:text-[#EAB308] transition-colors">{featuredNews.title}</h4>
                  <p className="text-slate-300 text-sm md:text-base mb-6 line-clamp-2 italic border-l-2 border-[#EAB308] pl-4">{featuredNews.excerpt}</p>
                  <div className="flex items-center gap-4 text-[10px] text-white font-bold uppercase tracking-widest italic">
                    <Calendar size={14} className="text-[#EAB308]" /> {featuredNews.date}
                    <span className="ml-auto flex items-center gap-2">Baca Detail <ArrowUpRight size={16} /></span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Recent News List */}
          <div className="flex flex-col gap-5">
             {recentNews.map((news, index) => (
                <Link href={`/berita/${news.slug}`} key={index}>
                  <motion.div whileHover={{ x: 10 }} className="group flex gap-4 items-center p-4 bg-white rounded-[2rem] shadow-sm hover:shadow-md border border-slate-100 transition-all">
                    <div className="relative w-24 h-24 aspect-square flex-shrink-0 rounded-2xl overflow-hidden bg-slate-200">
                      <Image 
                        src={news.image} 
                        alt={news.title} 
                        fill 
                        style={{ objectFit: 'cover' }}
                        className="transition-transform duration-500 group-hover:scale-110" 
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h5 className="font-black text-[#0B1F40] text-xs uppercase italic leading-snug line-clamp-2 group-hover:text-[#EAB308] transition-colors">{news.title}</h5>
                      <span className="text-[9px] text-slate-400 font-bold uppercase italic flex items-center gap-1">
                        <Calendar size={12} className="text-[#EAB308]" /> {news.date}
                      </span>
                    </div>
                  </motion.div>
                </Link>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenBINews;