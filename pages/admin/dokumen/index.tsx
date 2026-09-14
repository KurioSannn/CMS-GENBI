import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import AdminLayout from '@/components/admin/AdminLayout';
import FileUpload from '@/components/admin/FileUpload';
import { Plus, Trash2, FileText, ExternalLink, Download, Loader2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { toast } from 'sonner';

interface DocumentArchive {
  id: number;
  title: string;
  category: string;
  fileUrl: string;
  fileSize?: string | null;
  description?: string | null;
  publishedAt: string;
}

export default function AdminDokumenPage() {
  const [documents, setDocuments] = useState<DocumentArchive[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('BEASISWA');
  const [fileUrl, setFileUrl] = useState('');
  const [description, setDescription] = useState('');

  const fetchDocuments = async () => {
    try {
      const res = await fetch('/api/admin/dokumen');
      const json = await res.json();
      if (json.success) setDocuments(json.data);
    } catch (e) {
      toast.error('Gagal mengambil dokumen');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const openCreateModal = () => {
    setTitle('');
    setCategory('BEASISWA');
    setFileUrl('');
    setDescription('');
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !fileUrl) {
      toast.error('Judul dan file dokumen wajib diisi');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/dokumen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          fileUrl,
          fileSize: '1.5 MB',
          description: description || null,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message);

      toast.success('Dokumen berhasil diunggah');
      setModalOpen(false);
      fetchDocuments();
    } catch (err: any) {
      toast.error(err.message || 'Gagal menyimpan');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Hapus dokumen ini dari arsip?')) return;

    try {
      const res = await fetch(`/api/admin/dokumen?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message);

      toast.success('Dokumen dihapus');
      fetchDocuments();
    } catch (e: any) {
      toast.error(e.message || 'Gagal menghapus');
    }
  };

  return (
    <AdminLayout
      title="Arsip Dokumen Resmi & PDF"
      subtitle="Unggah dan kelola panduan beasiswa, SK kepengurusan, dan dokumen publikasi organisasi"
      action={
        <button
          type="button"
          onClick={openCreateModal}
          className="px-4 py-2 bg-[#0B1F40] hover:bg-[#16386e] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Plus size={15} className="text-[#EAB308]" /> Unggah Dokumen PDF
        </button>
      }
    >
      <Head>
        <title>Dokumen Arsip - GenBIHub CMS</title>
      </Head>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-4">Nama Dokumen</th>
                <th className="py-3.5 px-4">Kategori</th>
                <th className="py-3.5 px-4">Ukuran</th>
                <th className="py-3.5 px-4">Tanggal Terbit</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    Memuat daftar dokumen...
                  </td>
                </tr>
              ) : documents.length > 0 ? (
                documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                          PDF
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 truncate max-w-md">{doc.title}</p>
                          {doc.description && (
                            <p className="text-[11px] text-slate-400 truncate max-w-md mt-0.5">{doc.description}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                        {doc.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-mono">{doc.fileSize || '-'}</td>
                    <td className="py-3.5 px-4 text-slate-500">{formatDate(doc.publishedAt)}</td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="Buka / Download"
                        >
                          <Download size={15} />
                        </a>
                        <button
                          type="button"
                          onClick={() => handleDelete(doc.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          title="Hapus"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    Belum ada dokumen yang diunggah
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL FORM */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-1">Unggah Dokumen PDF Baru</h2>
            <p className="text-xs text-slate-400 mb-4">File akan disimpan di penyimpanan lokal VPS</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Judul Dokumen *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Misal: Panduan Pendaftaran Beasiswa BI 2026"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kategori Dokumen *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600 bg-white"
                >
                  <option value="BEASISWA">Panduan Beasiswa BI</option>
                  <option value="SK">Surat Keputusan (SK)</option>
                  <option value="LPJ">Laporan Pertanggungjawaban (LPJ)</option>
                  <option value="PROPOSAL">Proposal Kegiatan</option>
                  <option value="UMUM">Arsip Umum</option>
                </select>
              </div>

              {/* Upload PDF */}
              <FileUpload
                value={fileUrl}
                onChange={setFileUrl}
                scope="dokumen"
                acceptPdf={true}
                label="File Dokumen PDF *"
                helperText="Pilih file PDF (maksimal 20MB)"
              />

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Keterangan Tambahan</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ringkasan isi dokumen..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 text-xs font-bold bg-[#0B1F40] hover:bg-[#16386e] text-white rounded-xl flex items-center gap-1.5 shadow-sm disabled:opacity-50"
                >
                  {saving && <Loader2 size={14} className="animate-spin" />}
                  <span>Simpan Dokumen</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
