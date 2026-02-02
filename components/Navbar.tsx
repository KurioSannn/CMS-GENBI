"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Newspaper, ArrowRight, Home, User, Target, Grid, LayoutGrid, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // --- INTERPOLASI NILAI (Dijalankan di GPU, No Delay) ---
  const headerBg = useTransform(scrollY, [0, 50], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.9)"]);
  const headerBlur = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(20px)"]);
  const navHeight = useTransform(scrollY, [0, 50], ["100px", "70px"]);
  const shadowOpacity = useTransform(scrollY, [0, 50], ["0px 0px 0px rgba(0,0,0,0)", "0px 10px 30px rgba(0,0,0,0.05)"]);
  
  // Warna Teks & Ikon (Interpolasi String)
  const textColor = useTransform(scrollY, [0, 50], ["#FFFFFF", "#0B1F40"]);

  const [isScrolled, setIsScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navLinks = [
    { href: "/", label: "BERANDA", icon: <Home size={20} /> },
    { href: "/profil", label: "PROFIL", icon: <User size={20} /> },
    { href: "#visi&misi", label: "VISI & MISI", icon: <Target size={20} /> },
    { href: "#program-divisi", label: "PROGRAM", icon: <Grid size={20} /> },
    { href: "#struktur-organisasi", label: "STRUKTUR", icon: <LayoutGrid size={20} /> },
    { href: "#genbi-news", label: "GENBI NEWS", isSpecial: true, icon: <Newspaper size={20} /> }, 
  ];

  // State untuk hover pada setiap link
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <>
      <motion.header 
        style={{ 
          backgroundColor: headerBg, 
          backdropFilter: headerBlur, 
          height: navHeight,
          boxShadow: shadowOpacity 
        }}
        className="fixed top-0 left-0 w-full z-[100] flex items-center transition-none border-b border-transparent"
      >
        <div className="container mx-auto px-8 flex justify-between items-center">
          
          {/* LOGO (Font & Jarak Sesuai Foto) */}
          <Link href="/" className="flex items-center gap-4 group relative z-[110]">
            <div className="relative w-12 h-12 transition-transform duration-500 group-hover:scale-110">
              <Image src="/LogoBI.png" alt="Logo" fill className="object-contain" priority />
            </div>
            <motion.div style={{ color: textColor }} className="flex flex-col">
              <span className="font-black text-2xl tracking-tighter uppercase leading-none">
                GENBI
              </span>
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-[#EAB308]">
                UPNVJT
              </span>
            </motion.div>
          </Link>
          
          {/* DESKTOP MENU - Efek Hover Warna Berubah */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <motion.div 
                key={link.label} 
                style={{ color: link.isSpecial ? "#0B1F40" : textColor }}
                className="relative"
              >
                <Link 
                  href={link.href} 
                  className={`relative group flex items-center gap-2 transition-all duration-300 ${
                    link.isSpecial 
                    ? 'px-6 py-2 bg-[#EAB308] rounded-full shadow-lg hover:bg-[#0B1F40] hover:text-white' 
                    : ''
                  }`}
                  onMouseEnter={() => setHoveredLink(link.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {/* Font Italic, Black, Uppercase, dan Tracking sesuai referensi foto */}
                  <motion.span 
                    className="italic font-black text-[11px] uppercase tracking-[0.15em] relative z-10 whitespace-nowrap leading-none"
                    animate={{
                      color: hoveredLink === link.label 
                        ? (link.isSpecial ? '#FFFFFF' : '#EAB308')
                        : (link.isSpecial ? '#0B1F40' : textColor.get())
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {link.label}
                  </motion.span>
                  
                  {/* Icon untuk special link */}
                  {link.isSpecial && (
                    <motion.div
                      animate={{
                        color: hoveredLink === link.label ? '#FFFFFF' : '#0B1F40'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Newspaper size={14} className="relative z-10" />
                    </motion.div>
                  )}
                  
                  {/* Underline animation untuk non-special links */}
                  {!link.isSpecial && (
                    <motion.div 
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#EAB308] rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ 
                        scaleX: hoveredLink === link.label ? 1 : 0 
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                  )}
                  
                  {/* Background glow effect untuk non-special links */}
                  {!link.isSpecial && hoveredLink === link.label && (
                    <motion.div 
                      className="absolute inset-0 bg-[#EAB308]/10 rounded-lg -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* HAMBURGER MENU BUTTON */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="lg:hidden relative z-[110] w-12 h-12 flex flex-col justify-center items-center rounded-xl bg-[#0B1F40] shadow-xl overflow-hidden active:scale-90 transition-transform"
            onMouseEnter={() => setHoveredLink('menu')}
            onMouseLeave={() => setHoveredLink(null)}
          >
            <motion.div 
              className="relative w-6 h-5 flex flex-col justify-between items-center"
              animate={{
                color: hoveredLink === 'menu' ? '#FFFFFF' : '#EAB308'
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.span 
                animate={{ 
                  rotate: isMenuOpen ? 45 : 0, 
                  y: isMenuOpen ? 9 : 0,
                  backgroundColor: hoveredLink === 'menu' ? '#FFFFFF' : '#EAB308'
                }} 
                className="w-6 h-[3px] rounded-full" 
              />
              <motion.span 
                animate={{ 
                  opacity: isMenuOpen ? 0 : 1, 
                  x: isMenuOpen ? 20 : 0,
                  backgroundColor: hoveredLink === 'menu' ? '#FFFFFF' : '#EAB308'
                }} 
                className="w-6 h-[3px] rounded-full" 
              />
              <motion.span 
                animate={{ 
                  rotate: isMenuOpen ? -45 : 0, 
                  y: isMenuOpen ? -9 : 0,
                  backgroundColor: hoveredLink === 'menu' ? '#FFFFFF' : '#EAB308'
                }} 
                className="w-6 h-[3px] rounded-full" 
              />
            </motion.div>
          </button>
        </div>
      </motion.header>

      {/* MOBILE OVERLAY - Efek Hover juga di Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 250 }}
            className="fixed inset-0 z-[90] bg-[#0B1F40] lg:hidden flex flex-col pt-32 px-8"
          >
             <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#EAB308] rounded-full blur-[150px]" />
             </div>

             <nav className="relative z-10 space-y-3">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + (idx * 0.05) }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link 
                      href={link.href} 
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center justify-between p-6 rounded-[2rem] border transition-all duration-300 relative group ${
                        link.isSpecial 
                        ? 'bg-[#EAB308] border-[#EAB308] text-[#0B1F40]' 
                        : 'bg-white/5 border-white/10 text-white'
                      }`}
                      onMouseEnter={() => setHoveredLink(`mobile-${link.label}`)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      {/* Background glow effect on hover */}
                      {!link.isSpecial && (
                        <motion.div 
                          className="absolute inset-0 bg-white/10 rounded-[2rem] opacity-0 group-hover:opacity-100"
                          transition={{ duration: 0.3 }}
                        />
                      )}
                      
                      <div className="flex items-center gap-4 font-black italic uppercase tracking-tight text-lg relative z-10">
                        <motion.div 
                          className={`p-2 rounded-xl ${link.isSpecial ? 'bg-[#0B1F40]/10 text-[#0B1F40]' : 'bg-white/10 text-[#EAB308]'} transition-colors duration-300`}
                          animate={{
                            backgroundColor: hoveredLink === `mobile-${link.label}` && !link.isSpecial
                              ? 'rgba(234, 179, 8, 0.3)'
                              : link.isSpecial 
                                ? 'rgba(11, 31, 64, 0.1)' 
                                : 'rgba(255, 255, 255, 0.1)'
                          }}
                        >
                          <motion.div
                            animate={{
                              scale: hoveredLink === `mobile-${link.label}` ? 1.1 : 1
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            {link.icon}
                          </motion.div>
                        </motion.div>
                        
                        <motion.span
                          className="transition-colors duration-300"
                          animate={{
                            color: hoveredLink === `mobile-${link.label}` && !link.isSpecial
                              ? '#EAB308'
                              : link.isSpecial 
                                ? '#0B1F40' 
                                : '#FFFFFF'
                          }}
                        >
                          {link.label}
                        </motion.span>
                      </div>
                      
                      <motion.div
                        className={`transition-colors duration-300 ${link.isSpecial ? 'text-[#0B1F40]' : 'text-[#EAB308] opacity-50'}`}
                        animate={{
                          x: hoveredLink === `mobile-${link.label}` ? 5 : 0,
                          opacity: hoveredLink === `mobile-${link.label}` ? 1 : (link.isSpecial ? 1 : 0.5)
                        }}
                      >
                        <ChevronRight size={20} />
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
             </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;