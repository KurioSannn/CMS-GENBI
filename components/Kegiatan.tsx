"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { BookOpen, Leaf, Lightbulb, TrendingUp, Landmark, HeartHandshake, GraduationCap, Sparkles } from 'lucide-react';

const Kegiatan = () => {
    const kegiatanList = [
        { 
            title: "Future Scholar Talk", 
            desc: "Kegiatan daring Future Scholar Talk yang ditujukan bagi mahasiswa UPN Veteran Jawa Timur semester 4 dan 6 untuk memberikan strategi kunci lolos seleksi Beasiswa Bank Indonesia melalui persiapan berkas administrasi dan sesi berbagi pengalaman inspiratif bersama para awardee.", 
            img: "/GenBI Webinar Career.png",
            icon: <GraduationCap size={22} />,
            tag: "Edukasi"
        },
        { 
            title: "GenBI SCALE", 
            desc: "Workshop pengembangan usaha yang dilaksanakan di Rungkut untuk para pelaku UMKM lokal dengan tujuan mendorong digitalisasi bisnis serta berbagi insight strategis guna meningkatkan daya saing ekonomi kreatif di era digital melalui kolaborasi nyata.", 
            img: "/GENBI SCALE.png",
            icon: <TrendingUp size={22} />,
            tag: "Ekonomi"
        },
        { 
            title: "GenBI COIN", 
            desc: "Program edukasi literasi saham yang berkolaborasi dengan IDX Surabaya dan PT Kiwoom Sekuritas bagi mahasiswa GenBI guna memberikan pemahaman mendalam mengenai dinamika pasar modal dan praktik investasi yang bijak untuk masa depan finansial.", 
            img: "/GenBI Coin.png",
            icon: <Landmark size={22} />,
            tag: "Finansial"
        },
        { 
            title: "GenBI Planters", 
            desc: "Aksi lingkungan bertema Satu Pot Tumbuh Bersama yang digelar di SDN Rungkut Mananggal 1 untuk mengajak siswa mengenal pentingnya merawat pohon dan menumbuhkan kepedulian terhadap kelestarian bumi sejak usia dini melalui aktivitas menanam interaktif.", 
            img: "/Genbi Planters.png",
            icon: <Leaf size={22} />,
            tag: "Lingkungan"
        },
        { 
            title: "BIVENTURE 2025", 
            desc: "Kegiatan eksplorasi sejarah keuangan di Museum De Javasche Bank Surabaya bagi para peserta rekrutmen untuk mengupas tuntas cerita di balik mata uang Rupiah serta kebijakan Bank Indonesia melalui pengalaman belajar lapangan yang ikonik dan edukatif.", 
            img: "/BIVENTURE.png",
            icon: <Sparkles size={22} />,
            tag: "Budaya"
        },
        { 
            title: "GenBI EPT", 
            desc: "Pelatihan intensif English Proficiency Test Preparation yang dilaksanakan di Ruang Bromo Gedung Rektorat bagi seluruh anggota GenBI UPNVJT guna membedah trik jitu serta meningkatkan kompetensi bahasa Inggris dalam menghadapi standar tes internasional.", 
            img: "/GenBI ept.png",
            icon: <BookOpen size={22} />,
            tag: "Skill"
        },
        { 
            title: "GenBI SHINE Part 2", 
            desc: "Program edukasi kesehatan di UPTD Kampung Anak Negeri yang difokuskan untuk membangun kebiasaan hidup sehat bagi anak-anak melalui sosialisasi bahaya penyakit cacingan serta praktik tata cara mencuci tangan yang benar dalam kehidupan sehari-hari.", 
            img: "/GenBI Shine Part 2.png",
            icon: <HeartHandshake size={22} />,
            tag: "Kesehatan"
        },
        { 
            title: "GenBI SHINE Part 1", 
            desc: "Inisiasi edukasi finansial Divisi Pendidikan melalui tema Belajar Rupiah Sejak Dini untuk memperkenalkan konsep Cinta Bangga Paham (CBP) Rupiah kepada anak-anak agar mereka mampu mengelola keuangan dengan cerdas dan bijak di masa depan.", 
            img: "/GenBI Shine Part 1.png",
            icon: <Lightbulb size={22} />,
            tag: "Finansial"
        },
    ];

    return (
        <section id="program-divisi" className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-8 max-w-[1400px]">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl"
                    >
                        <span className="text-[#EAB308] font-black tracking-[0.4em] uppercase text-xs mb-5 block italic border-l-4 border-[#EAB308] pl-4">
                            Aksi Nyata Kami
                        </span>

                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] italic">
                            <span className="text-[#0B1F40] block">Program</span>
                            <span className="bg-gradient-to-r from-[#EAB308] via-[#FDE68A] to-[#B45309] bg-clip-text text-transparent drop-shadow-sm px-1">
                                Unggulan
                            </span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="hidden lg:block text-[#0B1F40]/10 font-black text-8xl italic select-none"
                    >
                        08
                    </motion.div>
                </div>

                {/* Grid Kegiatan */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-20">
                    {kegiatanList.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: "-50px" }}
                            transition={{ delay: (index % 4) * 0.1, duration: 0.6 }}
                            className="group flex flex-col"
                        >
                            <div className="relative h-[420px] rounded-[3rem] overflow-hidden shadow-2xl bg-[#0B1F40] mb-8">
                                <Image
                                    src={item.img}
                                    alt={item.title}
                                    fill
                                    className="object-cover opacity-85 group-hover:scale-110 transition-transform duration-1000 ease-out grayscale-[10%] group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F40] via-transparent to-transparent opacity-90"></div>

                                <div className="absolute top-8 left-8">
                                    <span className="px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black rounded-full uppercase tracking-[0.2em] italic shadow-xl">
                                        {item.tag}
                                    </span>
                                </div>

                                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                                    <div className="mb-6 w-12 h-12 rounded-2xl bg-[#EAB308] flex items-center justify-center text-[#0B1F40] shadow-xl">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-3xl font-black uppercase tracking-tighter italic leading-none bg-gradient-to-r from-[#EAB308] via-[#FDE68A] to-[#B45309] bg-clip-text text-transparent">
                                        {item.title}
                                    </h3>
                                </div>
                            </div>

                            <div className="px-4">
                                <p className="text-slate-500 text-[13px] font-bold leading-relaxed italic border-l-4 border-slate-100 group-hover:border-[#EAB308] pl-6 transition-all duration-500">
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Kegiatan;
