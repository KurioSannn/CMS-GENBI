"use client";
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 40 }, [
    Autoplay({ delay: 6000, stopOnInteraction: false })
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const slides = [
    {
      id: 1,
      image: "/carousel-1.jpg",
      title: "Generasi Baru Indonesia",
      subtitle: "Energi untuk Negeri",
      desc: "Komunitas penerima beasiswa Bank Indonesia yang siap menjadi agen perubahan dan pemimpin masa depan."
    },
    {
      id: 2,
      image: "/corousel-2.jpg",
      title: "Dedikasi Untuk Negeri",
      subtitle: "Berkontribusi Nyata",
      desc: "Mengabdi kepada masyarakat melalui program sosial, pendidikan, dan pengembangan ekonomi kreatif."
    },
    {
      id: 3,
      image: "/corousel-3.jpg",
      title: "Frontliner Bank Indonesia",
      subtitle: "Mengkomunikasikan Kebijakan",
      desc: "Menjadi garda terdepan dalam menyampaikan kebijakan Bank Indonesia kepada masyarakat luas."
    },
  ];

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="beranda" className="relative h-screen w-full overflow-hidden bg-[#0B1F40]">
      
      {/* Container Carousel */}
      <div className="h-full w-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div key={slide.id} className="relative h-full w-full flex-[0_0_100%]">
              
              {/* 1. LAYER GAMBAR UTAMA */}
              <div className="relative h-full w-full">
                <Image 
                  src={slide.image} 
                  alt={slide.title} 
                  fill
                  style={{ objectFit: 'cover' }}
                  priority={index === 0}
                  className="brightness-[0.85]"
                />
              </div>

              {/* 2. LAYER GRADIENT OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F40] via-[#0B1F40]/50 to-transparent opacity-90"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F40] via-transparent to-transparent opacity-80"></div>

              {/* Note: Layer Batik Parang telah dihapus dari sini */}

              {/* 3. KONTEN TEKS */}
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-6 pt-20">
                  <div className="max-w-3xl">
                    
                    {/* Subtitle Pill */}
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                      className="mb-6"
                    >
                        <span className="inline-flex items-center gap-2 py-1.5 px-4 border border-yellow-400/30 rounded-full bg-yellow-500/10 backdrop-blur-md text-yellow-400 font-bold tracking-widest uppercase text-xs md:text-sm">
                          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></span>
                          {slide.subtitle}
                        </span>
                    </motion.div>

                    {/* Judul Utama */}
                    <motion.h1 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                      className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
                    >
                      {slide.title}
                    </motion.h1>

                    {/* Deskripsi */}
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                      className="text-lg md:text-xl text-gray-200 mb-10 max-w-xl leading-relaxed font-light"
                    >
                      {slide.desc}
                    </motion.p>

                    {/* Tombol CTA */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.8 }}
                    >
                        <a href="#tentang-kami" className="group inline-flex items-center gap-3 px-8 py-4 bg-yellow-500 text-[#0B1F40] font-bold rounded-full hover:bg-white transition-all shadow-lg shadow-yellow-500/20 hover:shadow-white/20 transform hover:-translate-y-1">
                            Jelajahi Kami
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
                        </a>
                    </motion.div>

                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Indikator Dots */}
      <div className="absolute bottom-10 left-0 w-full flex justify-center gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi && emblaApi.scrollTo(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === selectedIndex 
                ? 'w-12 bg-yellow-400 shadow-lg shadow-yellow-400/50' 
                : 'w-3 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>

    </section>
  );
};

export default Hero;