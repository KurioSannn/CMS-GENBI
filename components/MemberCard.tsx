// components/MemberCard.tsx
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Member } from '@/data/members';
import { BadgeCheck, GraduationCap, Sparkles, ExternalLink } from 'lucide-react';

interface MemberCardProps {
  member: Member;
  index: number;
}

const MemberCard = ({ member, index }: MemberCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      whileHover={{ y: -10 }}
      className="group relative w-full"
    >
      {/* Container Utama */}
      <div className="relative bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm transition-all duration-500 group-hover:shadow-[0_30px_60px_-15px_rgba(11,31,64,0.2)] group-hover:border-yellow-500/50">
        
        {/* IMAGE SECTION - ASPEK RASIO DIKUNCI 3:4 */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-100">
          <Image 
            src={member.imageGif} 
            alt={member.name} 
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            unoptimized
            priority
          />
          
          {/* Overlay Gradient (Halus di bagian bawah agar teks Nama terbaca) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F40]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Floating Badge (Emas) */}
          <div className="absolute top-4 right-4 z-10 scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
            <div className="bg-yellow-500 p-2 rounded-xl shadow-lg shadow-yellow-500/40">
              <BadgeCheck className="w-5 h-5 text-[#0B1F40]" />
            </div>
          </div>
        </div>

        {/* CONTENT SECTION */}
        <div className="relative p-6 text-center">
          {/* Tag Posisi - Minimalis */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-[#0B1F40] px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg border-2 border-white">
            {member.position}
          </div>

          <h3 className="mt-2 text-xl md:text-2xl font-black text-[#0B1F40] leading-tight mb-2 group-hover:text-yellow-600 transition-colors">
            {member.name}
          </h3>

          <div className="flex items-center justify-center gap-2 text-slate-500">
            <GraduationCap size={14} className="text-yellow-500" />
            <span className="text-[11px] font-bold uppercase tracking-tighter italic">
              {member.prodiAngkatan}
            </span>
          </div>

          {/* Decorative bar yang memanjang saat hover */}
          <div className="mt-4 flex justify-center">
             <div className="h-1 w-8 bg-slate-100 rounded-full group-hover:w-20 group-hover:bg-yellow-500 transition-all duration-500" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MemberCard;