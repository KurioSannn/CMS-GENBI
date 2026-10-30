"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowRight, 
  ArrowUpRight, 
  ChevronDown
} from 'lucide-react';

const criteria = [
  {
    num: "01",
    tag: "SYARAT SEMESTER",
    title: "Mahasiswa Semester 3 & 5",
    desc: "Terdaftar aktif jenjang Sarjana (S1) di lingkungan kampus UPN \"Veteran\" Jawa Timur pada fakultas yang ditentukan.",
  },
  {
    num: "02",
    tag: "PRESTASI AKADEMIK",
    title: "Standar IPK ≥ 3.00",
    desc: "Memiliki prestasi akademis yang konsisten dan tidak sedang menerima ikatan beasiswa dari instansi lain.",
  },
  {
    num: "03",
    tag: "KOMITMEN & KARAKTER",
    title: "Jiwa Kepemimpinan Bela Negara",
    desc: "Aktif dalam kepanitiaan/organisasi dan bersedia mendedikasikan waktu dalam program pengabdian masyarakat Bank Indonesia.",
  },
];

const faqs = [
  {
    num: "01",
    question: "Apa syarat utama pendaftaran Beasiswa Bank Indonesia di UPNVJT?",
    answer: "Syarat utama meliputi mahasiswa aktif jenjang Sarjana (S1) minimal semester 3 atau 5, telah menyelesaikan minimal 40 SKS, memiliki Indeks Prestasi Kumulatif (IPK) minimal 3.00 (skala 4.00), tidak sedang menerima beasiswa dari lembaga lain, serta aktif dalam kegiatan organisasi kemahasiswaan atau kepanitiaan sosial.",
  },
  {
    num: "02",
    question: "Apa saja tahapan seleksi Beasiswa Bank Indonesia?",
    answer: "Tahapan seleksi terdiri dari 2 fase utama: Tahap 1 Administrasi dan Berkas (pemberkasan form A1, esai motivasi, surat rekomendasi, dan transkrip nilai) yang disaring oleh pihak universitas/kemahasiswaan; dan Tahap 2 Wawancara Tatap Muka langsung bersama tim penilai dari Kantor Perwakilan Bank Indonesia Provinsi Jawa Timur.",
  },
  {
    num: "03",
    question: "Apa hak dan kewajiban setelah dinyatakan lolos menjadi awardee GenBI?",
    answer: "Awardee berhak menerima dana beasiswa penuh sesuai ketentuan Bank Indonesia per semester serta pembinaan kapasitas kepemimpinan. Sebagai kewajiban, penerima beasiswa otomatis tergabung dalam komunitas GenBI UPNVJT dan wajib berpartisipasi aktif dalam program kerja divisi untuk mengedukasi masyarakat.",
  },
  {
    num: "04",
    question: "Bagaimana cara mendapatkan bimbingan atau tips seleksi dari GenBI UPNVJT?",
    answer: "Setiap menjelang pembukaan rekrutmen beasiswa, Divisi Pendidikan GenBI UPNVJT menyelenggarakan webinar Future Scholar Talk dan klinik bedah esai beasiswa secara gratis untuk mendampingi calon pendaftar.",
  },
  {
    num: "05",
    question: "Apakah mahasiswa penerima beasiswa instansi lain diperbolehkan mendaftar?",
    answer: "Tidak diperkenankan. Pendaftar tidak sedang menerima beasiswa atau ikatan dinas dari instansi, yayasan, korporasi, maupun lembaga pemerintah lain demi memastikan azas pemerataan kesempatan bagi seluruh mahasiswa.",
  },
  {
    num: "06",
    question: "Dokumen apa saja yang wajib dipersiapkan untuk seleksi tahap administrasi?",
    answer: "Berkas wajib meliputi Formulir Biodata A1 resmi Bank Indonesia, fotokopi KTP & KTM aktif, Transkrip Nilai resmi (IPK minimal 3.00), Surat Rekomendasi Fakultas/Rektorat, Surat Pernyataan Bebas Beasiswa Lain, motivation letter (esai komitmen), serta sertifikat prestasi atau keaktifan organisasi pendukung.",
  },
];

const GenBIContactFAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="beasiswa-faq" className="py-24 sm:py-32 bg-[#F8FAFC] text-slate-900 border-b border-slate-200 relative overflow-hidden">
      
      {/* Background Architectural Subtle Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-sky-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-12 max-w-7xl relative z-10 space-y-16 sm:space-y-20">
        
        {/* Section Header: Strictly 2 Lines Without Badges or Slop */}
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[#071224] leading-tight">
            <span className="block">Penerimaan Beasiswa Bank Indonesia</span>
            <span className="block mt-1 text-[#0284C7] whitespace-normal sm:whitespace-nowrap">
              Siap mengabdi, penggerak perubahan bangsa.
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal pt-1 max-w-2xl mx-auto">
            Program beasiswa tahunan Bank Indonesia bagi mahasiswa berprestasi UPN &quot;Veteran&quot; Jawa Timur untuk mengasah kepemimpinan, integritas, dan kontribusi nyata bagi ibu pertiwi.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <Link
              href="/berita"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs sm:text-sm tracking-wide shadow-md shadow-sky-600/20 transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              <span>Info &amp; Panduan Seleksi</span>
              <ArrowRight size={15} />
            </Link>

            <a
              href="https://www.instagram.com/genbi_upnvjatim/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-[#071224] border border-slate-300 font-semibold text-xs sm:text-sm tracking-wide shadow-xs transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              <span>Instagram Resmi</span>
              <ArrowUpRight size={15} className="text-[#0284C7]" />
            </a>
          </div>
        </div>

        {/* 3 Criteria Cards (Clean Modern Typography + 3D Tactile Badges) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {criteria.map((item, idx) => {
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#0284C7] transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Top Bar: 3D Badge + Category Tag */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold tracking-wider text-[#0284C7] uppercase bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100">
                      {item.tag}
                    </span>

                    {/* 3D Tactile Token Badge */}
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-b from-[#0284C7] to-[#0369A1] text-white flex items-center justify-center font-black text-sm tracking-tight shadow-md shadow-sky-600/30 border-t border-sky-300/40 transform group-hover:scale-105 transition-transform">
                      {item.num}
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#071224] leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ Accordion Suite (Centered, Clean & Fully Balanced) */}
        <div className="max-w-4xl mx-auto space-y-8 pt-4">
          
          <div className="text-center space-y-2 border-b border-slate-200 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7] block">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#071224] tracking-tight">
              Pertanyaan yang Sering Diajukan
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
              Informasi lengkap seputar kriteria, syarat administrasi, dan alur seleksi Beasiswa Bank Indonesia di UPN &quot;Veteran&quot; Jawa Timur.
            </p>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-[#0284C7]/50 transition-all overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="text-xs font-bold text-[#0284C7] shrink-0">
                        {faq.num}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[#071224] leading-snug">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#0284C7]' : ''}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/40">
                      <p className="pl-7">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default GenBIContactFAQ;
