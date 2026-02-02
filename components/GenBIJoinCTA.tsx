"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, AlertCircle, X, Instagram } from 'lucide-react';

const GenBIJoinCTA = () => {
  // Logic: Ubah ke 'true' jika pendaftaran dibuka
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
        {/* ANIMASI: Kontainer utama bergerak saat scroll */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-[3rem] bg-[#0B1F40] p-10 md:p-20 overflow-hidden shadow-2xl"
        >
          {/* Elemen Dekoratif Gold */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#EAB308]/10 rounded-full -mr-32 -mt-32 blur-[100px]" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
            <div className="max-w-3xl">
              <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.8] mb-8 italic">
                Mari Bergabung <br />
                <span className="text-[#EAB308]">Menjadi Bagian Kami</span>
              </h2>
              <p className="text-slate-300 text-lg md:text-xl font-medium max-w-xl mx-auto lg:mx-0 italic border-l-4 border-yellow-500 pl-6">
                "Jadilah agen perubahan bersama komunitas Beasiswa Bank Indonesia."
              </p>
            </div>

            <div className="flex flex-col gap-4 min-w-[280px]">
              <button
                onClick={() => setShowModal(true)}
                className="group flex items-center justify-center gap-4 px-10 py-5 bg-[#EAB308] text-[#0B1F40] font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-white transition-all shadow-xl active:scale-95"
              >
                Daftar Sekarang
                <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform duration-300" />
              </button>
              <p className="text-slate-400 text-xs text-center font-bold uppercase tracking-[0.3em] italic">
                Periode 2026 / 2027
              </p>
            </div>
          </div>

          {/* Background Dot Pattern */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
          />
        </motion.div>
      </div>

      {/* --- MODAL PENDAFTARAN --- */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-[#0B1F40]/90 backdrop-blur-md"
            />

            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-[3rem] shadow-2xl overflow-hidden p-10 md:p-14"
            >
              <button onClick={() => setShowModal(false)} className="absolute top-8 right-8 text-slate-400 hover:text-[#0B1F40] transition-colors">
                <X size={32} />
              </button>

              {isRegistrationOpen ? (
                <div className="text-left">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-4 bg-green-50 text-green-600 rounded-2xl">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-3xl font-black text-[#0B1F40] uppercase tracking-tighter italic">Syarat Utama</h3>
                  </div>
                  <ul className="space-y-4 mb-10">
                    {requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-4 text-slate-600 font-bold text-sm uppercase">
                        <div className="mt-1.5 w-2 h-2 rounded-full bg-[#EAB308] shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                  <a href="https://beasiswa.bankindonesia.go.id" target="_blank" rel="noopener noreferrer" className="block w-full py-5 bg-[#0B1F40] text-white text-center font-black uppercase tracking-widest rounded-2xl hover:bg-[#EAB308] hover:text-[#0B1F40] transition-all">
                    Buka Portal Pendaftaran
                  </a>
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="flex justify-center mb-8">
                    <div className="p-6 bg-red-50 text-red-500 rounded-full animate-pulse">
                      <AlertCircle size={64} />
                    </div>
                  </div>
                  <h3 className="text-3xl font-black text-[#0B1F40] uppercase tracking-tighter mb-4 italic">Belum Dibuka</h3>
                  <p className="text-slate-500 font-medium mb-10 leading-relaxed italic">
                    Mohon maaf <span className="text-[#0B1F40] font-black">GenBIers</span>, pendaftaran Beasiswa Bank Indonesia untuk saat ini <span className="text-[#0B1F40] font-black underline decoration-yellow-500 underline-offset-4">belum dibuka</span>. Pantau terus informasi terbaru di{" "}
                    <a 
                      href="https://www.instagram.com/genbiupnjatim" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-yellow-600 font-black hover:text-[#0B1F40] transition-colors inline-flex items-center gap-1 underline decoration-yellow-500/30 underline-offset-2"
                    >
                      Instagram kami <Instagram size={16} />
                    </a>.
                  </p>
                  <button onClick={() => setShowModal(false)} className="w-full py-5 bg-slate-100 text-[#0B1F40] font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-slate-200 transition-colors">
                    Tutup Pesan
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GenBIJoinCTA;