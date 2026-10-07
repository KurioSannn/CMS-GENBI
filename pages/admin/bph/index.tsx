import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AdminBphRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/divisi?tab=BPH');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-xs text-slate-400 font-bold">
      Mengalihkan ke Struktur & Kepengurusan...
    </div>
  );
}
