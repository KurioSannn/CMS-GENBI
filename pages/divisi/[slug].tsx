// pages/divisi/[slug].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { genbiDivisions, Division } from '@/data/members';
import MemberCard from '@/components/MemberCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Sparkles, Zap, Users, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';

const DivisionPage = ({ division }: { division: Division }) => {
  if (!division) return <div className="bg-[#050B18] min-h-screen" />;

  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const revealVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen"
      >
        <Head>
          <title>{division.name} | GenBI UPNVJT</title>
          <meta name="description" content={division.description} />
        </Head>
        
        <Navbar isScrolled={isScrolled} />
        
        <main className="bg-white min-h-screen overflow-hidden">
          {/* Hero Section - Navy Gelap Peat #050B18 */}
          <section className="relative pt-40 pb-32 md:pt-56 md:pb-44 bg-[#050B18] text-white overflow-hidden">
            <div className="absolute -top-40 -left-40 w-[800px] h-[800px] bg-yellow-500/5 rounded-full blur-[180px]" />
            
            <div className="container mx-auto px-6 relative z-10 max-w-[1400px]">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center"
              >
                {/* Badge */}
                <motion.div
                  variants={itemVariants}
                  className="mb-12 flex items-center gap-3 px-6 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10"
                >
                  <Zap size={14} className="text-yellow-400" />
                  <span className="text-[10px] font-black text-yellow-400 uppercase tracking-[0.4em] italic">
                    Official Department
                  </span>
                </motion.div>

                {/* Content Row: Logo & Text */}
                <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24 w-full">
                  
                  {/* Bingkai Logo */}
                  <motion.div variants={itemVariants} className="relative">
                    <div className="absolute inset-0 bg-yellow-400/20 blur-[120px] rounded-full scale-150" />
                    <div className="relative w-52 h-52 md:w-64 md:h-64 bg-white rounded-full flex items-center justify-center p-1 shadow-[0_0_60px_rgba(255,255,255,0.1)] border-8 border-white/10 overflow-hidden">
                      <div className="relative w-full h-full rounded-full overflow-hidden">
                        <Image 
                          src={division.logo} 
                          alt={`${division.name} Logo`}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-110"
                          priority
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Judul dengan Gradasi & Perbaikan Ukuran */}
                  <div className="text-center lg:text-left max-w-3xl">
                    <motion.h1 
                      variants={itemVariants}
                      className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tighter leading-[1.1] uppercase italic"
                    >
                      {division.slug === 'pendidikan' ? (
                        // Khusus Divisi Pendidikan: Full Gradasi Emas
                        <span className="bg-gradient-to-r from-yellow-200 via-yellow-500 to-amber-600 bg-clip-text text-transparent drop-shadow-2xl">
                          {division.name}
                        </span>
                      ) : (
                        // Divisi Lain: Kata pertama Putih, sisanya Gradasi Emas
                        <>
                          <span className="text-white">
                            {division.name.split(' ')[0]}
                          </span>
                          <br />
                          <span className="bg-gradient-to-r from-yellow-200 via-yellow-500 to-amber-600 bg-clip-text text-transparent drop-shadow-2xl">
                            {division.name.split(' ').slice(1).join(' ')}
                          </span>
                        </>
                      )}
                    </motion.h1>

                    <motion.div variants={itemVariants} className="flex justify-center lg:justify-start">
                      <p className="text-slate-400 text-lg md:text-xl font-medium italic border-l-4 border-yellow-500/50 pl-6 py-2">
                        "{division.description}"
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* Stats Row */}
                <motion.div
                  variants={itemVariants}
                  className="mt-20 flex flex-wrap justify-center gap-8 md:gap-20 px-12 py-8 bg-white/[0.03] backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-2xl"
                >
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-3 mb-1">
                      <Users className="text-yellow-400" size={24} />
                      <span className="text-4xl md:text-5xl font-black text-white">{division.members.length}</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">Talenta Aktif</span>
                  </div>
                  <div className="hidden md:block w-px h-12 bg-white/10" />
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-3 mb-1">
                      <Calendar className="text-yellow-400" size={24} />
                      <span className="text-4xl md:text-5xl font-black text-white">2025/26</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">Periode Aktif</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Members Section */}
          <section className="py-24 relative bg-white">
            <div className="container mx-auto px-6 relative z-10 max-w-[1400px]">
              
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                variants={revealVariants}
                className="text-center mb-24"
              >
                <div className="inline-flex flex-col items-center">
                  <div className="inline-flex items-center gap-6 px-10 py-5 bg-[#FFF9EB] rounded-full border border-yellow-100 mb-8 shadow-sm">
                    <Sparkles className="text-yellow-500" size={28} />
                    <h2 className="text-4xl md:text-6xl font-black text-[#050B18] tracking-tight">
                      Meet Our <span className="bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">Talents</span>
                    </h2>
                    <Sparkles className="text-yellow-500" size={28} />
                  </div>
                  <p className="text-slate-500 text-lg md:text-2xl italic max-w-3xl text-center leading-relaxed">
                    Sinergi mahasiswa unggulan dalam menggerakkan roda organisasi GenBI UPNVJT.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
                variants={containerVariants}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10"
              >
                {division.members.map((member, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <MemberCard member={member} index={index} />
                  </motion.div>
                ))}
              </motion.div>

            </div>
          </section>
        </main>
        
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = genbiDivisions.map((div) => ({ 
    params: { slug: div.slug } 
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const division = genbiDivisions.find((div) => div.slug === params?.slug);
  if (!division) return { notFound: true };
  return { props: { division } };
};

export default DivisionPage;