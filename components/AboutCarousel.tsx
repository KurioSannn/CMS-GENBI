"use client";
import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Compass, Shield, Users, Layers, Award, Landmark } from 'lucide-react';

interface AboutProps {
  stats?: {
    articles: number;
    achievements: number;
    divisions: number;
    members: number;
    documents: number;
  };
}

const AnimatedNumber = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { damping: 40, stiffness: 100 });
  const display = useTransform(spring, (latest) => Math.round(latest).toLocaleString() + suffix);

  useEffect(() => {
    if (isInView) motionVal.set(value);
    else motionVal.set(0);
  }, [isInView, value, motionVal]);

  return (
    <motion.span ref={ref} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#071224]">
      {display}
    </motion.span>
  );
};

const AboutCarousel: React.FC<AboutProps> = ({ stats }) => {
  const VIRTUAL_TOUR_URL = "http://upnjatim.ac.id/vtour/";

  const kpis = [
    {
      num: stats?.members || 50,
      suffix: "+",
      code: "01",
      title: "Mahasiswa Terpilih",
      desc: "Awardee aktif hasil seleksi ketat Bank Indonesia",
    },
    {
      num: stats?.divisions || 7,
      suffix: "",
      code: "02",
      title: "Divisi Strategis",
      desc: "Departemen spesifik penggerak program kerja",
    },
    {
      num: stats?.achievements || 30,
      suffix: "+",
      code: "03",
      title: "Rekam Prestasi",
      desc: "Penghargaan tingkat regional dan nasional",
    },
    {
      num: 10000,
      suffix: "+",
      code: "04",
      title: "Penerima Manfaat",
      desc: "Masyarakat dan UMKM binaan CBP & QRIS",
    },
  ];

  return (
    <section id="tentang-kami" className="py-24 bg-[#F8FAFC] text-slate-900 border-b border-slate-200">
      <div className="container mx-auto px-6 sm:px-12 max-w-7xl space-y-16">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#071224] leading-tight">
            Komitmen berbakti <br />
            <span className="text-[#0284C7]">Dedikasi nyata tanpa henti.</span>
          </h2>
        </div>

        {/* Nogogeni #welcome-to-nogogeni Style Split Stage (Top Aligned) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start pt-2">
          
          {/* Left Column: 3D Floating Building Cutout (Pure Clean Building - No Text Below) */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-start [perspective:1200px]">
            <div className="relative w-full h-[400px] sm:h-[460px] lg:h-[490px] transform md:hover:[transform:translateY(-6px)_scale(1.02)] transition-all duration-700 ease-out group">
              <Image
                src="/upn-cutout.png"
                alt="Gedung Rektorat Kampus Bela Negara UPN Veteran Jawa Timur"
                fill
                priority
                className="object-contain object-top drop-shadow-[0_20px_35px_rgba(7,18,36,0.3)] filter"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/upn.jpeg';
                }}
              />
            </div>
            {/* Real 3D Ground Floor Shadow */}
            <div className="w-[85%] h-6 bg-radial from-slate-900/35 via-slate-900/10 to-transparent rounded-full blur-md -mt-2 pointer-events-none" />
          </div>

          {/* Right Column: Antasena Editorial Narrative */}
          <div className="lg:col-span-7 space-y-6 pt-1">
            <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
              <p>
                <strong>Generasi Baru Indonesia (GenBI)</strong> didirikan secara resmi pada <strong>11 November 2011</strong> atas inisiatif <strong>Bank Indonesia</strong> sebagai wadah pengembangan kepemimpinan bagi mahasiswa berprestasi penerima Beasiswa Bank Indonesia di seluruh perguruan tinggi tanah air.
              </p>
              <p>
                Di <strong>UPN &quot;Veteran&quot; Jawa Timur</strong>, GenBI Komisariat UPNVJT bertransformasi menjadi laboratorium kepemimpinan yang memadukan wawasan kebanksentralan nasional dengan nilai-nilai luhur <strong>Karakter Bela Negara</strong>: disiplin, integritas, pengabdian, dan cinta tanah air.
              </p>
              <p>
                Melalui sinergi 7 departemen kepengurusan, kami beroperasi secara terarah dan terukur dalam memperluas literasi <em>Cinta Bangga Paham (CBP) Rupiah</em>, mempercepat akselerasi inklusi keuangan digital <em>QRIS</em> bagi pelaku UMKM di Jawa Timur, serta menghadirkan program sosial berdampak langsung bagi masyarakat.
              </p>
            </div>

            <div className="pt-2 space-y-4">
              <Link
                href="/tentang"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#071224] text-white hover:bg-[#0284C7] text-xs font-bold uppercase tracking-wider transition-colors shadow-md transform hover:-translate-y-0.5 active:scale-95 w-fit"
              >
                <span>Tentang Kami &amp; Struktur Pengurus</span>
                <ArrowUpRight size={15} />
              </Link>

              {/* Minimal Campus Credential Directly Beneath Button (2x Larger) */}
              <div className="space-y-1 pt-2">
                <p className="text-2xl sm:text-3xl font-black text-[#071224] tracking-tight leading-tight">
                  UPN &quot;Veteran&quot; Jawa Timur
                </p>
                <p className="text-sm sm:text-base text-slate-500 font-bold uppercase tracking-widest">
                  Kampus Bela Negara
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Minimalist Pure Clean Metrics (No Busy Boxes, Pure Typography) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-12 border-t border-slate-200">
          {kpis.map((k) => (
            <div key={k.code} className="space-y-1.5">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#071224]">
                <AnimatedNumber value={k.num} suffix={k.suffix} />
              </div>
              <h4 className="text-sm sm:text-base font-bold text-slate-800">
                {k.title}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                {k.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutCarousel;
