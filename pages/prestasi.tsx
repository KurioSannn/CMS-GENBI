// pages/prestasi.tsx
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Prestasi from '@/components/Prestasi'; 
import { motion } from 'framer-motion';

export default function PrestasiPage() {
  return (
    <>
      <Head>
        <title>Prestasi GenBI - UPN Veteran Jawa Timur</title>
      </Head>
      
      <Navbar />
      
      <main className="pt-24 min-h-screen bg-gray-50">
        
        {/* Header Halaman */}
        <section className="bg-[#0B1F40] text-white py-20 relative overflow-hidden">
             {/* Batik Overlay Halus */}
             <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%">
                    <defs>
                    <pattern id="header-parang" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                        <g fill="none" stroke="currentColor" className="text-yellow-500">
                            <path d="M0,30 C15,10 15,50 30,30 C45,10 45,50 60,30" strokeWidth="2" />
                        </g>
                    </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#header-parang)" />
                </svg>
             </div>

             <div className="container mx-auto px-6 text-center relative z-10">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-bold mb-4"
                >
                    Hall of Fame
                </motion.h1>
                <p className="text-yellow-100 text-lg max-w-2xl mx-auto">
                    Jejak langkah prestasi dan kontribusi nyata GenBI UPN "Veteran" Jawa Timur untuk negeri.
                </p>
             </div>
        </section>

        {/* Render Komponen Prestasi */}
        <Prestasi />
        
        {/* Di sini bisa ditambahkan list prestasi lain di masa depan */}

      </main>
      
      <Footer />
    </>
  );
}