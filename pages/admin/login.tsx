import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Toaster, toast } from 'sonner';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error('Harap masukkan username dan kata sandi');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Kredensial tidak valid');
      }

      toast.success('Login berhasil! Mengalihkan ke Dashboard...');
      setTimeout(() => {
        window.location.href = '/admin';
      }, 350);
    } catch (err: any) {
      toast.error(err.message || 'Username atau kata sandi salah');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickFill = () => {
    setUsername('admin');
    setPassword('admin123');
    toast.info('Akun admin default telah terisi');
  };

  return (
    <>
      <Head>
        <title>Masuk Pengurus - GenBIHub Admin</title>
      </Head>
      <Toaster richColors position="top-right" />

      <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-white font-sans antialiased text-slate-800">
        {/* ================= LEFT EDITORIAL SHOWCASE (50% DESKTOP) ================= */}
        <div className="hidden lg:flex lg:col-span-6 xl:col-span-6 bg-[#F8FAFC] border-r border-slate-200/90 flex-col justify-between p-12 xl:p-16 min-h-screen relative overflow-hidden">
          {/* Top Brand Logo */}
          <div className="flex items-center gap-3 relative z-10">
            <img
              src="/favicongenbiupnvj.png"
              alt="Logo GenBI UPNVJT"
              className="w-10 h-10 object-contain shrink-0"
            />
            <div>
              <span className="font-extrabold text-slate-900 text-base tracking-tight flex items-center gap-1.5">
                GenBI<span className="text-[#0284C7]">Hub</span>
              </span>
              <p className="text-xs text-slate-500 font-medium">UPN "Veteran" Jawa Timur</p>
            </div>
          </div>

          {/* Center Elegant Statement */}
          <div className="my-auto py-8 max-w-sm xl:max-w-md space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200/80 text-xs font-semibold text-slate-600 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#0284C7]" />
              <span>Portal Tata Kelola &amp; Informasi Resmi</span>
            </div>

            <h1 className="text-3xl xl:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              Energi untuk Negeri,{' '}
              <span className="text-[#0284C7]">Mengabdi Sepenuh Hati.</span>
            </h1>

            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Sistem manajemen konten terintegrasi untuk mendukung publikasi berita, capaian prestasi mahasiswa,
              arsip dokumen resmi, dan tata kelola struktur organisasi GenBI UPNVJT.
            </p>

            {/* Community Identity Banner */}
            <div className="w-fit p-4 rounded-2xl bg-white/95 backdrop-blur-xs border border-slate-200/90 shadow-xs space-y-1 mt-6">
              <p className="text-xs font-bold text-slate-900">
                Komisariat UPN &ldquo;Veteran&rdquo; Jawa Timur
              </p>
              <p className="text-xs text-slate-500 font-normal leading-relaxed">
                Wadah dedikasi &amp; kontribusi nyata mahasiswa penerima <br />
                Beasiswa Bank Indonesia di UPN &ldquo;Veteran&rdquo; Jawa Timur.
              </p>
            </div>
          </div>

          {/* Large Artistic Watermark Mascot with Gradient Fade */}
          <div 
            className="absolute -right-6 xl:-right-10 bottom-0 pointer-events-none select-none z-0 opacity-15 xl:opacity-20 mix-blend-multiply transition-opacity"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, transparent 20%, black 65%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 20%, black 65%)',
            }}
          >
            <img
              src="/maskot-genbi.png"
              alt="Maskot GenBI UPNVJT Watermark"
              className="w-[420px] xl:w-[500px] 2xl:w-[580px] h-auto object-contain -rotate-6"
            />
          </div>

          {/* Bottom Clean Footer */}
          <div className="text-xs text-slate-400 font-medium relative z-10">
            #SatuGenBI • Komunitas Penerima Beasiswa Bank Indonesia
          </div>
        </div>

        {/* ================= RIGHT EXPANDED FORM CANVAS (50% DESKTOP) ================= */}
        <div className="col-span-1 lg:col-span-6 xl:col-span-6 bg-white p-6 sm:p-12 xl:p-20 flex flex-col justify-between min-h-screen">
          {/* Top Bar Navigation */}
          <div className="flex items-center justify-between w-full">
            {/* Mobile Brand Logo */}
            <div className="lg:hidden flex items-center gap-2.5">
              <img
                src="/favicongenbiupnvj.png"
                alt="Logo GenBI UPNVJT"
                className="w-8 h-8 object-contain shrink-0"
              />
              <span className="font-extrabold text-slate-900 text-sm">
                GenBI<span className="text-[#0284C7]">Hub</span>
              </span>
            </div>

            <Link
              href="/"
              className="ml-auto inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-xs font-semibold transition-colors shadow-2xs"
            >
              <span>← Kembali ke Website</span>
            </Link>
          </div>

          {/* Center Spacious Form Container */}
          <div className="my-auto py-10 w-full max-w-md mx-auto space-y-7">
            <div className="space-y-2">
              <span className="inline-block px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-bold tracking-wider uppercase border border-slate-200/60">
                Akses Pengurus
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Masuk ke Akun Pengurus
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed font-normal">
                Gunakan akun resmi pengurus Anda untuk mengakses panel pengurus.
              </p>
            </div>

            {/* Form with Comfortable Inputs */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Username / ID Pengurus
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username akun..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/15 bg-white transition-all font-medium"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700">
                    Kata Sandi
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-xs font-semibold text-slate-500 hover:text-[#0284C7] transition-colors"
                  >
                    {showPassword ? 'Sembunyikan' : 'Tampilkan'}
                  </button>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/15 bg-white transition-all font-medium"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-sm rounded-xl shadow-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2 active:scale-[0.99]"
                >
                  {isLoading ? 'Memverifikasi Kredensial...' : 'Masuk ke Dashboard'}
                </button>
              </div>
            </form>

            {/* Quick Demo Fill Helper */}
            <div className="pt-5 border-t border-slate-100 flex items-center justify-between gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
              <div className="text-slate-600 text-xs">
                Akun demo: <span className="font-bold text-slate-900">admin / admin123</span>
              </div>
              <button
                type="button"
                onClick={handleQuickFill}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs transition-colors shadow-2xs"
              >
                Isi Otomatis
              </button>
            </div>
          </div>

          {/* Bottom Footer */}
          <footer className="text-center py-2 text-xs text-slate-400">
            © {new Date().getFullYear()} Generasi Baru Indonesia • UPN "Veteran" Jawa Timur
          </footer>
        </div>
      </div>
    </>
  );
}
