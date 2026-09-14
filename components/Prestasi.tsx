"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Trophy, Star, Medal } from 'lucide-react';
import type { Achievement } from '@/lib/db';

interface PrestasiProps {
  achievements?: Achievement[];
}

const defaultAchievements = [
  {
    id: 4,
    title: "1st Winner Duta Millenial Penggerak CBPR",
    event: "KPw. Bank Indonesia Jawa Timur 2024",
    image: "/prestasi-1.jpg",
    badge: "1st Winner",
    rank: "gold"
  },
  {
    id: 1,
    title: "Juara 2 QRIS Jelajah Budaya Indonesia",
    event: "KORWIL Jawa 2025",
    image: "/prestasi-2.jpg",
    badge: "2nd Place",
    rank: "silver"
  },
  {
    id: 2,
    title: "Juara 2 Konten Cinta Bangga Paham Rupiah",
    event: "ARFEST 2025",
    image: "/prestasi-3.jpg",
    badge: "2nd Place",
    rank: "silver"
  },
  {
    id: 3,
    title: "3rd Runner Up Duta CBPR Nasional",
    event: "Duta Muda 2025",
    image: "/prestasi-4.jpg",
    badge: "Runner Up",
    rank: "bronze"
  },
];

const Prestasi = ({ achievements }: PrestasiProps) => {
  const displayAchievements = achievements && achievements.length > 0
    ? achievements.map(a => ({
        id: a.id,
        title: a.title,
        event: a.competition,
        image: a.imageUrl,
        badge: a.badge || a.rank,
        rank: a.rank,
      }))
    : defaultAchievements;

  const getBadgeColor = (rank: string) => {
    switch (rank) {
      case 'gold': return 'bg-yellow-500 text-white border-yellow-300';
      case 'silver': return 'bg-gray-400 text-white border-gray-300';
      case 'bronze': return 'bg-orange-500 text-white border-orange-300';
      default: return 'bg-blue-500 text-white';
    }
  };

  return (
    <section className="py-24 relative overflow-hidden text-white">
      {/* === BACKGROUND IMAGE === */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/prestasi-bg.jpg" 
          alt="GenBI Prestasi Background"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0B1F40]/40 mix-blend-multiply"></div> 
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F40] via-transparent to-transparent opacity-70"></div>
      </div>

      <div className="container mx-auto px-6 relative z-20">
        {/* HEADER SECTION */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 text-yellow-300 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md shadow-lg"
          >
            <Trophy size={14} className="text-yellow-300" />
            Hall of Fame
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-[0.9] mb-6 drop-shadow-2xl"
          >
            <span className="bg-gradient-to-r from-white via-slate-200 to-white bg-clip-text text-transparent block mb-2">
                GenBI 
            </span>
            <span className="bg-gradient-to-r from-[#EAB308] via-[#FDE68A] to-[#B45309] bg-clip-text text-transparent px-2">
                Berprestasi
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-white/90 max-w-2xl mx-auto text-lg drop-shadow-md font-medium italic"
          >
            Bukti nyata dedikasi dan kompetensi anggota GenBI UPNVJT dalam berbagai ajang kompetisi regional maupun nasional.
          </motion.p>
        </div>

        {/* GRID PRESTASI */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayAchievements.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
              className="group relative h-[420px] rounded-2xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-yellow-500/30 transition-all duration-500 border border-white/20 backdrop-blur-sm"
            >
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-400 z-20 rounded-2xl transition-colors duration-300"></div>

              <Image 
                src={item.image} 
                alt={item.title} 
                fill
                style={{ objectFit: 'cover' }}
                className="group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F40] via-[#0B1F40]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

              <div className="absolute top-4 right-4 z-20">
                <div className={`${getBadgeColor(item.rank)} text-xs font-bold px-3 py-1 rounded-md shadow-lg flex items-center gap-1.5 border-b-2`}>
                  <Medal size={14} />
                  {item.badge}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 p-6 w-full z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="w-12 h-1 bg-yellow-400 mb-3 rounded-full opacity-100"></div>
                
                <h3 className="text-white font-bold text-lg leading-snug mb-2 group-hover:text-yellow-300 transition-colors duration-300 line-clamp-3 drop-shadow-md">
                  {item.title}
                </h3>
                
                <div className="flex items-center gap-2 text-gray-200 text-xs font-medium border-t border-white/20 pt-3 mt-2">
                  <Star size={12} className="text-yellow-400" />
                  <span className="uppercase tracking-wider italic">{item.event}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Prestasi;