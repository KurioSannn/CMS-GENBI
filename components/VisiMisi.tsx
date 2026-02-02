import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Eye, Target, Sparkles, Briefcase, Handshake, CheckSquare, Feather, ShieldCheck, Award, Zap, TrendingUp, Users } from 'lucide-react';

const VisiMisi = () => {
  
  // Data Misi S.O.L.I.D dengan gradient colors
  const misiSOLID = useMemo(() => [
    { 
      icon: Handshake, 
      title: "Satukan Tujuan", 
      subtitle: "S - Synergy",
      desc: "Membangun visi bersama seluruh anggota GenBI untuk menciptakan sinergi yang kuat dan harmonis.", 
      gradient: "from-yellow-400 to-yellow-600"
    },
    { 
      icon: Briefcase, 
      title: "Optimalkan Sumber Daya", 
      subtitle: "O - Optimize",
      desc: "Mengelola potensi anggota dan aset organisasi secara maksimal untuk hasil terbaik.", 
      gradient: "from-yellow-500 to-amber-600"
    },
    { 
      icon: CheckSquare, 
      title: "Laksanakan Program", 
      subtitle: "L - Launch",
      desc: "Berfokus pada kegiatan yang memberi manfaat langsung dan nyata bagi masyarakat.", 
      gradient: "from-amber-400 to-yellow-600"
    },
    { 
      icon: Feather, 
      title: "Inspirasi Berkelanjutan", 
      subtitle: "I - Inspire",
      desc: "Menjadi sumber semangat dan contoh positif bagi lingkungan sekitar.", 
      gradient: "from-yellow-400 to-amber-500"
    },
    { 
      icon: ShieldCheck, 
      title: "Dedikasi Tanpa Batas", 
      subtitle: "D - Dedication",
      desc: "Berkomitmen penuh untuk kemajuan organisasi dan kesejahteraan masyarakat.", 
      gradient: "from-yellow-500 to-yellow-700"
    },
  ], []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <section 
      id="visi-misi" 
      className="py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-white relative overflow-hidden"
      aria-label="Visi dan Misi GenBI UPN Veteran Jawa Timur"
    >
      
      {/* Enhanced Animated Background Patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs with motion */}
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 -left-20 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-20 -right-20 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl"
        />
        
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.5, 0],
              y: [0, -100],
              x: [0, Math.random() * 50 - 25]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
            className="absolute w-1 h-1 bg-yellow-400/40 rounded-full"
            style={{
              left: `${10 + i * 10}%`,
              top: `${20 + (i % 3) * 30}%`
            }}
          />
        ))}
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #0B1F40 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10 max-w-7xl">
        
        {/* Header Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="text-center mb-20"
        >
          
          {/* Animated Badge */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-6 py-2.5 mb-6 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full shadow-lg shadow-yellow-500/30 cursor-default"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-4 h-4 text-white" />
            </motion.div>
            <span className="text-white font-black text-sm tracking-widest uppercase">
              Lead. Inspire. Impact.
            </span>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-4 h-4 text-white" />
            </motion.div>
          </motion.div>
          
          {/* Section Label */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.05, borderColor: 'rgba(250, 204, 21, 0.5)' }}
            className="inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full bg-white shadow-lg border-2 border-yellow-400/30 transition-colors duration-300"
          >
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <span className="text-[#0B1F40] font-bold text-sm tracking-wider uppercase">
              Visi & Misi Kami
            </span>
          </motion.div>
          
          {/* Main Heading */}
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-[#0B1F40] mb-6 tracking-tight leading-tight"
          >
            Komitmen untuk{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Masa Depan
              </span>
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -bottom-2 left-0 right-0 h-3 bg-yellow-400/30 -rotate-1 rounded-full origin-left"
              />
            </span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Bersama membangun generasi emas yang berintegritas, berdampak, dan menginspirasi
          </motion.p>
        </motion.div>

        {/* Visi Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-[#0B1F40] via-[#0d2850] to-[#0B1F40] relative rounded-3xl shadow-2xl shadow-blue-900/20 p-10 md:p-14 lg:p-16 overflow-hidden"
          >
            
            {/* Decorative Elements */}
            <motion.div 
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl"
            />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
            
            {/* Animated Particles */}
            <div className="absolute inset-0 opacity-30">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.7
                  }}
                  className={`absolute w-2 h-2 bg-yellow-400 rounded-full`}
                  style={{
                    top: `${20 + i * 30}%`,
                    left: `${10 + i * 25}%`
                  }}
                />
              ))}
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <motion.div 
                  whileHover={{ rotate: 6, scale: 1.1 }}
                  className="relative"
                >
                  <motion.div 
                    animate={{ opacity: [0.5, 0.75, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-yellow-400 rounded-2xl blur-xl"
                  />
                  <div className="relative p-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl shadow-xl">
                    <Eye className="w-12 h-12 text-white" strokeWidth={2.5} />
                  </div>
                </motion.div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-2 h-2 bg-yellow-400 rounded-full"
                    />
                    <span className="text-yellow-400 text-sm font-bold uppercase tracking-widest">Our Vision</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">Visi</h2>
                </div>
              </div>
              
              {/* Vision Text */}
              <motion.div 
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-colors duration-300"
              >
                <p className="text-white text-xl md:text-2xl font-medium leading-relaxed">
                  Menjadikan GenBI UPN Veteran Jawa Timur sebagai wadah generasi muda yang{' '}
                  <span className="font-black text-yellow-400">unggul, berkarakter, dan memberi inspirasi</span>
                  ; sekaligus sebagai{' '}
                  <span className="font-black text-yellow-400">
                    gerakan anak muda yang sadar, peduli, dan aktif membawa perubahan baik bagi masyarakat.
                  </span>
                </p>
              </motion.div>
              
              {/* Decorative Line */}
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="mt-8 flex items-center gap-3 origin-left"
              >
                <Award className="w-6 h-6 text-yellow-400" />
                <div className="flex-1 h-px bg-gradient-to-r from-yellow-400 via-yellow-400/50 to-transparent"></div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* SECTION DIVIDER - Premium Design */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="relative py-16 mb-24"
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/5 to-transparent"></div>
          
          {/* Main Divider Line with Ornaments */}
          <div className="relative flex items-center justify-center">
            {/* Left Ornament */}
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 15 }}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/30"
              >
                <TrendingUp className="w-6 h-6 text-white" strokeWidth={2.5} />
              </motion.div>
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-20 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full origin-left"
              />
            </motion.div>
            
            {/* Center Ornament */}
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative mx-6"
            >
              {/* Glow Effect */}
              <motion.div 
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-yellow-400/20 blur-2xl rounded-full"
              />
              
              {/* Main Badge */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="relative bg-white rounded-2xl shadow-2xl shadow-yellow-500/20 p-6 border-4 border-yellow-400/30"
              >
                <div className="flex items-center gap-3">
                  {/* Left Icon */}
                  <div className="p-2 bg-gradient-to-br from-[#0B1F40] to-blue-900 rounded-lg">
                    <Eye className="w-5 h-5 text-yellow-400" strokeWidth={2.5} />
                  </div>
                  
                  {/* Divider Dots */}
                  <div className="flex gap-1.5">
                    {[0, 0.2, 0.4].map((delay, i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay }}
                        className={`w-1.5 h-1.5 bg-yellow-${400 + i * 100} rounded-full`}
                      />
                    ))}
                  </div>
                  
                  {/* Center Text */}
                  <div className="px-4 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full">
                    <span className="text-white font-black text-sm uppercase tracking-widest">S.O.L.I.D</span>
                  </div>
                  
                  {/* Divider Dots */}
                  <div className="flex gap-1.5">
                    {[0.6, 0.4, 0.2].map((delay, i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay }}
                        className={`w-1.5 h-1.5 bg-yellow-${600 - i * 100} rounded-full`}
                      />
                    ))}
                  </div>
                  
                  {/* Right Icon */}
                  <div className="p-2 bg-gradient-to-br from-[#0B1F40] to-blue-900 rounded-lg">
                    <Target className="w-5 h-5 text-yellow-400" strokeWidth={2.5} />
                  </div>
                </div>
                
                {/* Bottom Accent */}
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full"
                />
              </motion.div>
              
              {/* Floating Particles */}
              {[[-2, -2], [-2, 2, 0.5]].map(([top, right, delay = 0], i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay }}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                  style={{ 
                    top: top > 0 ? 'auto' : `${Math.abs(top) * 0.5}rem`,
                    bottom: top > 0 ? `${top * 0.5}rem` : 'auto',
                    right: `${right * 0.5}rem`
                  }}
                />
              ))}
            </motion.div>
            
            {/* Right Ornament */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2"
            >
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-20 h-1 bg-gradient-to-l from-yellow-400 to-yellow-500 rounded-full origin-right"
              />
              <motion.div
                whileHover={{ scale: 1.1, rotate: -15 }}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/30"
              >
                <Users className="w-6 h-6 text-white" strokeWidth={2.5} />
              </motion.div>
            </motion.div>
          </div>
          
          {/* Decorative Text Below */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-8"
          >
            <p className="text-[#0B1F40] font-bold text-sm uppercase tracking-widest">
              Lima Pilar Misi Kami
            </p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="w-16 h-0.5 bg-gradient-to-r from-transparent to-yellow-400 rounded-full origin-right"
              />
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="w-16 h-0.5 bg-gradient-to-l from-transparent to-yellow-400 rounded-full origin-left"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Misi Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            whileHover={{ borderColor: 'rgba(250, 204, 21, 0.4)' }}
            className="bg-white relative rounded-3xl shadow-2xl shadow-gray-300/50 p-10 md:p-14 lg:p-16 overflow-hidden border-4 border-yellow-400/20 transition-all duration-500"
          >
            
            {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600"></div>
            <motion.div 
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.05, 0.1, 0.05]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-20 -right-20 w-80 h-80 bg-yellow-400/5 rounded-full blur-3xl"
            />
            
            {/* Content */}
            <div className="relative z-10">
              
              {/* Header */}
              <div className="flex items-center gap-4 mb-12">
                <motion.div 
                  whileHover={{ rotate: -6, scale: 1.1 }}
                  className="relative"
                >
                  <motion.div 
                    animate={{ opacity: [0.5, 0.75, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-yellow-400 rounded-2xl blur-xl"
                  />
                  <div className="relative p-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl shadow-xl">
                    <Target className="w-12 h-12 text-white" strokeWidth={2.5} />
                  </div>
                </motion.div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-2 h-2 bg-yellow-400 rounded-full"
                    />
                    <span className="text-yellow-600 text-sm font-bold uppercase tracking-widest">Our Mission</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-[#0B1F40]">
                    Misi{' '}
                    <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                      S.O.L.I.D
                    </span>
                  </h2>
                </div>
              </div>
              
              {/* Mission Cards Grid */}
              <div className="grid gap-6 md:gap-8">
                {misiSOLID.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={`misi-${index}`}
                      custom={index}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                      variants={cardVariants}
                      whileHover={{ 
                        y: -8, 
                        boxShadow: '0 20px 25px -5px rgba(250, 204, 21, 0.1), 0 10px 10px -5px rgba(250, 204, 21, 0.04)',
                        borderColor: 'rgba(250, 204, 21, 0.5)'
                      }}
                      className="relative bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-2xl p-6 md:p-8 border-2 border-gray-100 transition-all duration-500"
                    >
                      
                      {/* Number Badge */}
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 12 }}
                        className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-lg flex items-center justify-center"
                      >
                        <span className="text-white font-black text-lg">{index + 1}</span>
                      </motion.div>
                      
                      <div className="flex items-start gap-6">
                        
                        {/* Icon */}
                        <motion.div 
                          whileHover={{ scale: 1.1, rotate: 3 }}
                          className="relative flex-shrink-0"
                        >
                          <motion.div 
                            animate={{ opacity: [0.5, 0.75, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                            className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-2xl blur-md`}
                          />
                          <div className={`relative p-4 bg-gradient-to-br ${item.gradient} rounded-2xl shadow-lg`}>
                            <IconComponent className="w-8 h-8 text-white" strokeWidth={2.5} />
                          </div>
                        </motion.div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="mb-3">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-2xl md:text-3xl font-black text-[#0B1F40]">
                                {item.title}
                              </h3>
                            </div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400/10 rounded-full border border-yellow-400/20">
                              <motion.div 
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.15 }}
                                className="w-1.5 h-1.5 bg-yellow-400 rounded-full"
                              />
                              <span className="text-yellow-700 text-xs font-bold uppercase tracking-wider">
                                {item.subtitle}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                      
                      {/* Hover Accent Line */}
                      <motion.div 
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent origin-center"
                      />
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Bottom Decorative Element */}
              <div className="mt-12 flex items-center justify-center gap-2">
                {[0, 0.2, 0.4].map((delay, i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay }}
                    className={`w-2 h-2 bg-yellow-${400 + i * 100} rounded-full`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default VisiMisi;