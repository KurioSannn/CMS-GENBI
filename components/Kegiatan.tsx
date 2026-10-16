"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Leaf, Lightbulb, TrendingUp, Landmark, HeartHandshake, GraduationCap, Sparkles } from 'lucide-react';
import type { Article } from '@/lib/db';

interface KegiatanProps {
  articles?: Article[];
}

const getCategoryIcon = (category?: string) => {
  const cat = (category || '').toLowerCase();
  if (cat.includes('edukasi') || cat.includes('pendidikan')) return <GraduationCap size={22} />;
  if (cat.includes('ekonomi') || cat.includes('bisnis')) return <TrendingUp size={22} />;
  if (cat.includes('uang') || cat.includes('finansial') || cat.includes('pasar modal') || cat.includes('keuangan')) return <Landmark size={22} />;
  if (cat.includes('lingkungan') || cat.includes('sosial')) return <Leaf size={22} />;
  if (cat.includes('kesehatan')) return <HeartHandshake size={22} />;
  if (cat.includes('skill') || cat.includes('pelatihan')) return <BookOpen size={22} />;
  return <Sparkles size={22} />;
};

const defaultKegiatanList = [
  { 
    title: "Future Scholar Talk", 
    desc: "Strategi kunci lolos seleksi Beasiswa Bank Indonesia melalui persiapan berkas administrasi dan sesi berbagi pengalaman inspiratif bersama para awardee.", 
    img: "/GenBI Webinar Career.png",
    icon: <GraduationCap size={22} />,
    tag: "Edukasi",
    slug: "webinar-career-2026"
  },
  { 
    title: "GenBI SCALE", 
    desc: "Workshop pengembangan usaha untuk UMKM lokal guna mendorong digitalisasi bisnis dan daya saing ekonomi kreatif.", 
    img: "/GENBI SCALE.png",
    icon: <TrendingUp size={22} />,
    tag: "Ekonomi",
    slug: "genbi-scale-rungkut"
  },
  { 
    title: "GenBI COIN", 
    desc: "Edukasi literasi saham dan pasar modal berkolaborasi bersama IDX Surabaya untuk pemahaman investasi cerdas.", 
    img: "/GenBI Coin.png",
    icon: <Landmark size={22} />,
    tag: "Finansial",
    slug: "genbi-coin-literasi"
  },
  { 
    title: "GenBI Planters", 
    desc: "Aksi lingkungan penanaman pohon dan edukasi kepedulian terhadap kelestarian bumi sejak usia dini bersama siswa sekolah dasar.", 
    img: "/Genbi Planters.png",
    icon: <Leaf size={22} />,
    tag: "Lingkungan",
    slug: "genbi-planters-aksi-hijau"
  },
  { 
    title: "BIVENTURE 2025", 
    desc: "Eksplorasi sejarah keuangan di Museum De Javasche Bank Surabaya untuk mempelajari kebijakan Bank Indonesia dan evolusi Rupiah.", 
    img: "/BIVENTURE.png",
    icon: <Sparkles size={22} />,
    tag: "Budaya",
    slug: "biventure-sejarah-uang"
  },
  { 
    title: "GenBI EPT", 
    desc: "Pelatihan intensif English Proficiency Test Preparation bagi anggota GenBI guna meningkatkan kompetensi bahasa internasional.", 
    img: "/GenBI ept.png",
    icon: <BookOpen size={22} />,
    tag: "Skill",
    slug: "genbi-ept"
  },
];

const Kegiatan = ({ articles }: KegiatanProps) => {
  const dynamicItems = articles && articles.length > 0
    ? articles.slice(0, 8).map(art => ({
        title: art.title,
        desc: art.excerpt || art.title,
        img: art.coverImage || '/placeholder-news.jpg',
        icon: getCategoryIcon(art.category),
        tag: art.category || 'Program',
        slug: art.slug,
      }))
    : defaultKegiatanList;

  return (
    <section id="program-divisi" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-8 max-w-[1400px]">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="text-[#EAB308] font-black tracking-[0.4em] uppercase text-xs mb-5 block italic border-l-4 border-[#EAB308] pl-4">
              Aksi Nyata Kami
            </span>

            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] italic">
              <span className="text-[#0B1F40] block">Program</span>
              <span className="bg-gradient-to-r from-[#EAB308] via-[#FDE68A] to-[#B45309] bg-clip-text text-transparent drop-shadow-sm px-1">
                Unggulan
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block text-[#0B1F40]/10 font-black text-8xl italic select-none"
          >
            {String(dynamicItems.length).padStart(2, '0')}
          </motion.div>
        </div>

        {/* Grid Kegiatan */}
        {dynamicItems.length === 0 ? (
          <div className="text-center py-16 text-slate-400 font-medium italic">
            Belum ada program kegiatan yang dipublikasikan.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-20">
            {dynamicItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ delay: (index % 4) * 0.1, duration: 0.6 }}
                className="group flex flex-col"
              >
                <Link href={`/berita/${item.slug}`} className="block">
                  <div className="relative h-[420px] rounded-[3rem] overflow-hidden shadow-2xl bg-[#0B1F40] mb-8 cursor-pointer border border-slate-100 group-hover:border-[#EAB308]/40 transition-colors">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover opacity-85 group-hover:scale-110 transition-transform duration-1000 ease-out grayscale-[10%] group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F40] via-transparent to-transparent opacity-90"></div>

                    <div className="absolute top-8 left-8">
                      <span className="px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black rounded-full uppercase tracking-[0.2em] italic shadow-xl">
                        {item.tag}
                      </span>
                    </div>

                    <div className="absolute inset-0 p-10 flex flex-col justify-end">
                      <div className="mb-6 w-12 h-12 rounded-2xl bg-[#EAB308] flex items-center justify-center text-[#0B1F40] shadow-xl group-hover:rotate-6 transition-transform">
                        {item.icon}
                      </div>
                      <h3 className="text-2xl font-black uppercase tracking-tighter italic leading-snug bg-gradient-to-r from-[#EAB308] via-[#FDE68A] to-[#B45309] bg-clip-text text-transparent line-clamp-2">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </Link>

                <div className="px-4">
                  <p className="text-slate-500 text-[13px] font-bold leading-relaxed italic border-l-4 border-slate-100 group-hover:border-[#EAB308] pl-6 transition-all duration-500 line-clamp-3">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Kegiatan;
