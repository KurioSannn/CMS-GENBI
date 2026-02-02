"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Youtube, Mail, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0B1F47] text-white relative overflow-hidden border-t border-white/5">
      {/* Dekorasi Cahaya Halus */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#EAB308]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 text-center md:text-left">
          
          {/* Column 1: Brand & Identity */}
          <div className="lg:col-span-1 space-y-8 flex flex-col items-center md:items-start">
            <Link href="/" className="group">
              <div className="flex flex-col items-center md:items-start gap-6 transition-transform duration-300 group-hover:scale-105">
                <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-white/10 shadow-2xl shadow-black/20">
                  <Image 
                    src="/Logo GenBI UPN.png" 
                    alt="GenBI Logo" 
                    width={50} 
                    height={50} 
                    className="drop-shadow-md object-contain" 
                  />
                  <div className="w-[1px] h-8 bg-slate-200"></div> 
                  <Image 
                    src="/BankIndonesia.png" 
                    alt="Bank Indonesia Logo" 
                    width={120} 
                    height={50} 
                    className="drop-shadow-md object-contain" 
                  />
                </div>

                <div>
                  <h3 className="font-black text-2xl tracking-tighter uppercase leading-none">
                    GenBI <br />
                    <span className="text-[#EAB308]">UPNVJT</span>
                  </h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mt-2 text-center md:text-left">
                    Energi untuk Negeri
                  </p>
                </div>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs italic text-center md:text-left">
              "Komunitas penerima beasiswa Bank Indonesia di UPN 'Veteran' Jawa Timur yang berdedikasi menjadi agen perubahan bagi negeri."
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-black text-xs uppercase tracking-[0.3em] text-[#EAB308] mb-8">Eksplorasi</h4>
            <ul className="space-y-4">
              {[
                { name: 'Tentang Kami', href: '#tentang-kami' },
                { name: 'Visi & Misi', href: '#visi-misi' },
                { name: 'Program Unggulan', href: '#program-divisi' },
                { name: 'Struktur Organisasi', href: '#struktur-organisasi' }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-slate-400 hover:text-white transition-all duration-300 flex items-center gap-2 group text-sm font-bold uppercase tracking-wider">
                    <span className="w-0 group-hover:w-4 h-[1px] bg-[#EAB308] transition-all"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-black text-xs uppercase tracking-[0.3em] text-[#EAB308] mb-8">Koneksi</h4>
            <div className="space-y-4 w-full max-w-[240px]">
              <a href="mailto:genbi.upnvjt@gmail.com" className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-[#EAB308]/50 hover:bg-white/10 transition-all group">
                <Mail size={18} className="text-[#EAB308]" />
                <span className="text-[10px] font-bold text-slate-300 break-all uppercase tracking-tighter text-left italic">genbi.upnvjt@gmail.com</span>
              </a>
              <a href="https://www.upnjatim.ac.id" target="_blank" className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-[#EAB308]/50 hover:bg-white/10 transition-all group">
                <Globe size={18} className="text-[#EAB308]" />
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter text-left italic">upnvjatim.ac.id</span>
              </a>
            </div>
          </div>

          {/* Column 4: Social Media */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className="font-black text-xs uppercase tracking-[0.3em] text-[#EAB308] mb-8 md:text-right">Ikuti Kami</h4>
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/genbi_upnvjatim/" target="_blank" className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-xl border border-white/10 text-white hover:bg-[#EAB308] hover:text-[#0B1F47] transition-all duration-500 shadow-lg">
                <Instagram size={24} />
              </a>
              <a href="https://youtube.com/@genbiupnvjt" target="_blank" className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-xl border border-white/10 text-white hover:bg-[#EAB308] hover:text-[#0B1F47] transition-all duration-500 shadow-lg">
                <Youtube size={24} />
              </a>
            </div>
            <div className="mt-8 text-right hidden md:block">
               <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] italic">Official Community Partner Of</p>
               <p className="text-[#EAB308] text-[10px] font-black uppercase tracking-[0.2em] mt-1 italic">Bank Indonesia</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-center md:text-left italic">
            &copy; 2025 GenBI UPNVJT. <span className="text-slate-400 italic">All rights reserved.</span>
          </p>
          <div className="flex gap-8">
            <a 
              href="https://id.scribd.com/document/688727432/Generasi-Baru-Bank-Indonesia-GENBI" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-[#EAB308] transition-colors italic"
            >
              Pedoman Komunitas
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;