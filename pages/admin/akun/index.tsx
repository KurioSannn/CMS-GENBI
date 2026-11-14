import React, { useState } from 'react';
import Head from 'next/head';
import AdminLayout from '@/components/admin/AdminLayout';
import { KeyRound, Loader2, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/utils';

const MIN_PASSWORD_LENGTH = 8;

export default function AdminAkunPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Semua kolom wajib diisi');
      return;
    }
    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      toast.error(`Password baru minimal ${MIN_PASSWORD_LENGTH} karakter`);
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Konfirmasi password baru tidak sama');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || 'Gagal mengubah password');
      }

      toast.success('Password berhasil diubah');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, 'Gagal mengubah password'));
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284C7]/30';

  return (
    <AdminLayout
      title="Akun & Password"
      subtitle="Ubah password akun admin yang sedang digunakan. Gunakan kombinasi yang kuat dan unik."
    >
      <Head>
        <title>Akun & Password - GenBIHub Admin</title>
      </Head>

      <div className="max-w-lg bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center">
            <KeyRound size={18} />
          </div>
          <div>
            <h2 className="font-extrabold text-sm text-slate-900">Ubah Password</h2>
            <p className="text-[11px] text-slate-500">Minimal {MIN_PASSWORD_LENGTH} karakter.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5" htmlFor="current-password">
              Password Lama
            </label>
            <input
              id="current-password"
              type={showPassword ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={inputClass}
              autoComplete="current-password"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5" htmlFor="new-password">
              Password Baru
            </label>
            <input
              id="new-password"
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={inputClass}
              autoComplete="new-password"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5" htmlFor="confirm-password">
              Konfirmasi Password Baru
            </label>
            <input
              id="confirm-password"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={inputClass}
              autoComplete="new-password"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 hover:text-slate-800"
            >
              {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
              {showPassword ? 'Sembunyikan' : 'Tampilkan'} password
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] text-white text-xs font-bold shadow-sm shadow-sky-500/25 disabled:opacity-60"
            >
              {saving && <Loader2 size={14} className="animate-spin" />}
              Simpan Password
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
