"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Mail, Instagram, MapPin, MessageCircle } from 'lucide-react';

const faqs = [
  {
    question: "Apa saja syarat utama pendaftaran Beasiswa Bank Indonesia?",
    answer: "Syarat utama meliputi mahasiswa aktif minimal semester 3, IPK minimal 3.00 (skala 4.00), tidak sedang menerima beasiswa lain, serta aktif dalam organisasi atau kegiatan sosial."
  },
  {
    question: "Apa peran utama komunitas GenBI bagi mahasiswa?",
    answer: "GenBI berperan sebagai Front Liners (mengomunikasikan kebijakan BI), Change Agents (agen perubahan), dan Future Leaders (calon pemimpin masa depan)."
  },
  {
    question: "Kapan pendaftaran periode 2026/2027 dibuka?",
    answer: "Saat ini pendaftaran belum dibuka. Mohon pantau terus akun Instagram resmi kami untuk informasi tanggal pendaftaran dan timeline seleksi terbaru."
  },
  {
    question: "Apakah mahasiswa semester akhir masih boleh mendaftar?",
    answer: "Batas pendaftaran biasanya adalah mahasiswa yang masih memiliki masa studi aktif minimal satu tahun atau tidak sedang menempuh semester akhir saat masa beasiswa berjalan."
  },
  {
    question: "Apa saja tahapan seleksi Beasiswa Bank Indonesia?",
    answer: "Tahapan seleksi terdiri dari seleksi administrasi (berkas), seleksi wawancara oleh pihak Bank Indonesia, dan pengumuman akhir."
  }
];

const GenBIContactFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const contactInfo = [
    { 
      icon: <Mail size={24} />, 
      label: "Email", 
      value: "genbi.upnvjt@gmail.com",
      link: "mailto:genbi.upnvjt@gmail.com"
    },
    { 
      icon: <Instagram size={24} />, 
      label: "Instagram", 
      value: "@genbi_upnvjatim",
      link: "https://www.instagram.com/genbi_upnvjatim/" 
    },
    { 
      icon: <MessageCircle size={24} />, 
      label: "WhatsApp", 
      value: "Chat Sekarang", 
      link: "https://wa.me/62881025134107"
    }
  ];

  return (
    <section id="contact-faq" className="py-24 bg-white relative z-10 overflow-visible">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-16 items-start">
          
          {/* BAGIAN KIRI */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            className="w-full space-y-10"
          >
            <div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-[0.9] mb-6 text-center lg:text-left overflow-visible py-4 text-[#0B1F47]">
                <span className="bg-gradient-to-r from-[#0B1F47] via-[#1a3a6e] to-[#0B1F47] bg-clip-text text-transparent block mb-2 pr-4">
                  Hubungi
                </span>
                <span className="bg-gradient-to-r from-[#EAB308] via-[#FDE68A] to-[#B45309] bg-clip-text text-transparent pr-6">
                  Kami
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {contactInfo.map((item, idx) => (
                <motion.a 
                  key={idx}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  className="group p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-[#EAB308]/50 hover:bg-white hover:shadow-xl transition-all duration-500 text-center flex flex-col items-center"
                >
                  <div className="w-12 h-12 bg-[#0B1F47] text-[#EAB308] rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    {item.icon}
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{item.label}</p>
                  <p className="text-[#0B1F47] font-bold text-xs italic">{item.value}</p>
                </motion.a>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-[#0B1F47] justify-center lg:justify-start">
                <div className="p-2 bg-[#EAB308] rounded-lg shadow-sm">
                  <MapPin size={20} className="text-[#0B1F47]" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">Lokasi Kami</p>
                  <p className="font-bold uppercase tracking-tight">UPN "Veteran" Jawa Timur</p>
                </div>
              </div>
              
              <div className="w-full h-[350px] rounded-[2.5rem] overflow-hidden border-4 border-slate-50 shadow-2xl relative group">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.266224372991!2d112.7876256!3d-7.3304586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fac70e443301%3A0x6b801a6b0c679905!2sUPN%20%22Veteran%22%20Jawa%20Timur!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="transition-all duration-700"
                  title="Peta Lokasi UPN Veteran Jawa Timur"
                ></iframe>
                
                <a 
                  href="https://maps.app.goo.gl/3fTuxEHeD5U2iA8Y9" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute bottom-6 right-6 bg-[#0B1F47] text-white px-6 py-3 rounded-full text-xs font-bold shadow-2xl flex items-center gap-2 hover:bg-[#EAB308] hover:text-[#0B1F47] transition-all z-30"
                >
                  Buka di Peta <MapPin size={14} className="text-[#EAB308]" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* BAGIAN KANAN */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="w-full bg-[#0B1F47] rounded-[3.5rem] p-8 md:p-12 shadow-2xl relative overflow-visible"
          >
            <div className="relative z-10 overflow-visible">
              <h3 className="text-4xl font-black uppercase tracking-tighter mb-10 flex items-center gap-4 italic leading-tight py-4">
                <span className="w-12 h-[3px] bg-[#EAB308] shrink-0"></span>
                <span className="bg-gradient-to-r from-white via-slate-200 to-white bg-clip-text text-transparent">
                  FAQ
                </span>
              </h3>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div 
                    key={index} 
                    className={`rounded-[2rem] transition-all duration-500 border ${
                      openIndex === index ? "bg-white/10 border-[#EAB308]/50 shadow-lg" : "bg-white/5 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <button
                      onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      className="w-full flex items-center justify-between p-6 md:p-7 text-left outline-none focus:outline-none focus:ring-2 focus:ring-[#EAB308]/50"
                    >
                      <span className={`font-bold tracking-tight transition-colors pr-4 text-base md:text-lg ${
                        openIndex === index ? "text-[#EAB308]" : "text-white"
                      }`}>
                        {faq.question}
                      </span>
                      <motion.div
                        animate={{ rotate: openIndex === index ? 180 : 0 }}
                        className={`shrink-0 transition-colors ${openIndex === index ? "text-[#EAB308]" : "text-white/30"}`}
                      >
                        <ChevronDown size={20} />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {openIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                          <div className="px-7 pb-7 text-slate-300 text-sm md:text-base leading-relaxed font-medium italic">
                            <div className="w-full h-[1px] bg-white/10 mb-6" />
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default GenBIContactFAQ;