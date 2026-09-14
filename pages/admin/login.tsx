import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Lock, User, ArrowRight, Loader2, Sparkles, ShieldCheck } from 'lucide-react';
import { Toaster, toast } from 'sonner';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error('Harap isi username dan password');
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
        throw new Error(json.message || 'Login gagal');
      }

      toast.success('Login berhasil! Mengalihkan...');
      setTimeout(() => {
        router.push('/admin');
      }, 600);
    } catch (err: any) {
      toast.error(err.message || 'Kredensial tidak valid');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login Administrator - GenBIHub CMS</title>
      </Head>
      <Toaster richColors position="top-center" />

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#0B1F40] to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background glow accents */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-white/20 relative z-10 backdrop-blur-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0B1F40] text-[#EAB308] font-black text-2xl shadow-lg mb-4">
              G
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-xs text-slate-500 mt-1">
              GenBI UPN "Veteran" Jawa Timur • Sistem Manajemen Konten
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Username / Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all bg-slate-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Kata Sandi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all bg-slate-50/50"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-[#0B1F40] hover:bg-[#142f5c] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-950/20 transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin text-[#EAB308]" />
                    <span>Memverifikasi...</span>
                  </>
                ) : (
                  <>
                    <span>Masuk ke Dashboard</span>
                    <ArrowRight size={18} className="text-[#EAB308]" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Info Box */}
          <div className="mt-8 p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <p className="text-[11px] text-slate-500 font-medium">
              Kredensial Bawaan: <span className="font-bold text-slate-800">admin</span> / <span className="font-bold text-slate-800">admin123</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
