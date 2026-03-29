"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, AlertCircle, X, FileText, ExternalLink, Phone, Instagram, Globe, Sparkles } from 'lucide-react';
import Image from 'next/image';

const GenBIJoinCTA = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Nama file spesifik sesuai database/folder public Anda
  const posters = [
    {
      id: 1,
      src: "/Pembukaan seleksi GenBI UPN “Veteran” Jawa Timur resmi di (1).webp",
      title: "Jadwal Seleksi"
    },
    {
      id: 2,
      src: "/Pembukaan seleksi GenBI UPN “Veteran” Jawa Timur resmi di (3).webp",
      title: "Poster Utama"
    },
    {
      id: 3,
      src: "/Pembukaan seleksi GenBI UPN “Veteran” Jawa Timur resmi di (2).webp",
      title: "Kriteria Studi"
    }
  ];

  const requirements = [
    "Mahasiswa aktif minimal semester 3",
    "IPK Minimal 3.00 (Skala 4.00)",
    "Tidak sedang menerima beasiswa lain",
    "Aktif dalam organisasi atau kegiatan sosial",
    "Bersedia berperan aktif dalam komunitas GenBI"
  ];

  return (
    <section id="join-cta-section" className="py-24 bg-white relative z-50 block overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-[3rem] bg-[#0B1F40] p-8 md:p-16 lg:p-20 overflow-hidden shadow-2xl border border-white/5"
        >
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-500/10 rounded-full -mr-64 -mt-64 blur-[120px]" />
          
          <div className="relative z-10">
            {/* --- TOP HEADER SECTION --- */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left mb-20">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-500/10 rounded-full border border-yellow-500/20 mb-6">
                  <Sparkles size={14} className="text-yellow-500" />
                  <span className="text-yellow-500 text-[10px] font-black uppercase tracking-[0.2em] italic">Official Recruitment 2026</span>
                </div>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8 italic">
                  Energy For <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-amber-600">The Nation.</span>
                </h2>
                <div className="inline-flex items-center gap-3 bg-red-600/20 border border-red-600/30 px-5 py-3 rounded-2xl">
                    <AlertCircle size={18} className="text-red-500 shrink-0" />
                    <p className="text-red-200 text-xs md:text-sm font-bold italic leading-tight">
                        Pendaftaran resmi HANYA melalui Instagram @genbi_upnvjatim & Website Resmi.
                    </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 min-w-[300px]">
                <button
                  onClick={() => setShowModal(true)}
                  className="group relative flex items-center justify-center gap-4 px-10 py-6 bg-yellow-500 text-[#0B1F40] font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-white transition-all shadow-[0_15px_30px_-10px_rgba(234,179,8,0.4)] active:scale-95 overflow-hidden"
                >
                  <span className="relative z-10">Daftar Sekarang</span>
                  <ArrowRight size={22} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>
                <div className="flex flex-wrap justify-center gap-4 mt-2">
                    <a href="https://www.instagram.com/genbi_upnvjatim" target="_blank" className="text-slate-400 hover:text-yellow-500 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest italic transition-colors">
                        <Instagram size={14} /> Instagram
                    </a>
                    <a href="#" className="text-slate-400 hover:text-yellow-500 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest italic transition-colors">
                        <Globe size={14} /> Website
                    </a>
                </div>
              </div>
            </div>

            {/* --- RESPONSIVE PHOTO GALLERY --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                {posters.map((poster) => (
                    <motion.div
                        key={poster.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: poster.id * 0.1 }}
                        whileHover={{ y: -12 }}
                        className="group relative"
                    >
                        <div className="relative aspect-[3/4] w-full rounded-[2.5rem] overflow-hidden border-4 border-white/10 shadow-2xl transition-all duration-500 group-hover:border-yellow-500/50">
                            <Image 
                                src={poster.src} 
                                alt={poster.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F40]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute bottom-8 left-8 right-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                <p className="text-yellow-500 text-[10px] font-black uppercase tracking-widest italic mb-1">Official Poster</p>
                                <h4 className="text-white text-lg font-black uppercase italic tracking-tighter leading-none">{poster.title}</h4>
                            </div>
                        </div>
                        {/* Decorative Shadow Blur */}
                        <div className="absolute -inset-1 bg-yellow-500/20 rounded-[2.6rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                    </motion.div>
                ))}
            </div>
          </div>

          {/* Background Dot Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
          />
        </motion.div>
      </div>

      {/* --- MODAL (TETAP SAMA NAMUN DISESUAIKAN) --- */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-[#0B1F40]/95 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden p-8 md:p-12 max-h-[90vh] overflow-y-auto border border-white/20"
            >
              <button onClick={() => setShowModal(false)} className="absolute top-8 right-8 text-slate-400 hover:text-red-500 transition-colors">
                <X size={32} />
              </button>

              <div className="text-left">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-green-50 text-green-600 rounded-2xl">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-3xl font-black text-[#0B1F40] uppercase tracking-tighter italic">Join GenBI 2026</h3>
                </div>

                <div className="bg-[#0B1F40] p-6 rounded-3xl mb-10 border-l-8 border-yellow-500 shadow-xl">
                  <p className="text-white text-xs md:text-sm font-bold leading-relaxed italic">
                    <span className="text-yellow-500 uppercase tracking-widest">PENTING:</span> Berkas fisik WAJIB dikumpulkan di <span className="text-yellow-500">BAKK UPNVJT</span> pada <span className="underline decoration-yellow-500 underline-offset-4">6 April 2026 (09.00 - 12.00 WIB)</span>. Harap membawa dokumen Check List Seleksi Administrasi.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-10 mb-8">
                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest italic">Kriteria Utama</h4>
                    <ul className="space-y-4">
                      {requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-4 text-slate-700 font-bold text-[10px] uppercase italic leading-tight">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-500 shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col gap-4">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest italic">Portal Link</h4>
                    <a href="https://www.instagram.com/p/DWZII3Rk12q/?img_index=6" target="_blank" className="flex items-center justify-between p-5 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 rounded-2xl text-white shadow-lg shadow-pink-500/20 hover:scale-[1.02] transition-all group">
                        <div className="flex items-center gap-3">
                            <Instagram size={20} />
                            <span className="text-[10px] font-black uppercase tracking-widest italic">Detail Seleksi</span>
                        </div>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSfVe-pLgMyRKDCza5GABvOF2P8-8jlygDLxMqqBfIqegpR2Bg/viewform" target="_blank" className="flex items-center justify-between p-5 bg-[#0B1F40] rounded-2xl text-white hover:bg-yellow-500 hover:text-[#0B1F40] transition-all group shadow-xl shadow-blue-900/10">
                        <div className="flex items-center gap-3">
                            <FileText size={20} />
                            <span className="text-[10px] font-black uppercase tracking-widest italic">Google Form</span>
                        </div>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-6 border-t border-slate-100 pt-8">
                    <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-full border border-slate-100 italic">
                        <Phone size={14} className="text-yellow-600" />
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">CP: Fajar (+62 857-8403-1260)</span>
                    </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GenBIJoinCTA;