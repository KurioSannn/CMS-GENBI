import { useMemo, useState } from 'react';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import db, { Category, DocumentArchive, SiteSettings } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  FileText,
  Download,
  ExternalLink,
  Search,
  FolderOpen,
  Calendar,
  HardDrive,
} from 'lucide-react';

interface DokumenPageProps {
  documents: DocumentArchive[];
  categories: Category[];
  settings?: SiteSettings;
}

export const getServerSideProps: GetServerSideProps<DokumenPageProps> = async () => {
  const [documents, categories, settings] = await Promise.all([
    db.document.findMany(),
    db.category.findMany('DOCUMENT'),
    db.siteSettings.get(),
  ]);

  return {
    props: {
      documents: JSON.parse(JSON.stringify(documents)),
      categories: JSON.parse(JSON.stringify(categories)),
      settings: JSON.parse(JSON.stringify(settings)),
    },
  };
};

export default function DokumenPage({ documents, categories, settings }: DokumenPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categoryOptions = useMemo(() => {
    const unique = new Set<string>();
    documents.forEach((doc) => {
      if (doc.category) unique.add(doc.category);
    });
    categories.forEach((cat) => {
      if (cat.name) unique.add(cat.name);
    });
    return ['ALL', ...Array.from(unique)];
  }, [documents, categories]);

  const filteredDocuments = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return documents.filter((doc) => {
      const matchesCategory =
        selectedCategory === 'ALL' ||
        doc.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesQuery =
        !q ||
        doc.title.toLowerCase().includes(q) ||
        (doc.description || '').toLowerCase().includes(q) ||
        doc.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [documents, searchQuery, selectedCategory]);

  return (
    <>
      <Head>
        <title>Arsip Dokumen & Panduan - GenBI UPN Veteran Jawa Timur</title>
        <meta
          name="description"
          content="Pusat unduhan dokumen resmi, SK kepengurusan, LPJ, template proposal, dan panduan Beasiswa Bank Indonesia GenBI UPNVJT."
        />
      </Head>

      <Navbar isScrolled={true} />

      <main className="pt-[70px] min-h-screen bg-[#F8FAFC]">
        {/* Hero Header */}
        <section className="bg-[#0B1F40] text-white py-16 md:py-20 relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#EAB308] text-xs font-bold uppercase tracking-widest mb-5"
            >
              <FolderOpen size={14} /> Pusat Arsip Resmi
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-3xl md:text-5xl font-black tracking-tight mb-4"
            >
              Dokumen &amp; Panduan GenBI
            </motion.h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Akses dokumen resmi organisasi, Surat Keputusan (SK), panduan pendaftaran Beasiswa Bank Indonesia, serta template administrasi GenBI UPN &quot;Veteran&quot; Jawa Timur.
            </p>
          </div>
        </section>

        {/* Filter & Search Section */}
        <section className="container mx-auto px-6 py-10 max-w-6xl">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-8 space-y-4">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari judul dokumen, panduan beasiswa, SK..."
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-[#0B1F40] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#EAB308]/40 focus:border-[#EAB308]"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categoryOptions.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#0B1F40] text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat === 'ALL' ? 'Semua Kategori' : cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Document Grid */}
          {filteredDocuments.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
              <FileText size={40} className="mx-auto text-slate-300 mb-3" />
              <h2 className="text-lg font-bold text-[#0B1F40] mb-1">
                Dokumen tidak ditemukan
              </h2>
              <p className="text-sm text-slate-500">
                Belum ada dokumen yang sesuai dengan kata kunci atau kategori yang dipilih.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocuments.map((doc) => (
                <motion.article
                  key={doc.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-[#EAB308]/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-bold uppercase tracking-wider">
                        {doc.category}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-[#0B1F40]/5 text-[#0B1F40] flex items-center justify-center">
                        <FileText size={18} />
                      </div>
                    </div>

                    <h3 className="text-base font-extrabold text-[#0B1F40] leading-snug mb-2">
                      {doc.title}
                    </h3>

                    {doc.description && (
                      <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                        {doc.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar size={13} />
                        {formatDate(doc.publishedAt)}
                      </span>
                      {doc.fileSize && (
                        <span className="inline-flex items-center gap-1">
                          <HardDrive size={13} />
                          {doc.fileSize}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#0B1F40] hover:bg-[#133266] text-white text-xs font-bold transition-colors"
                      >
                        <ExternalLink size={14} /> Buka
                      </a>
                      <a
                        href={doc.fileUrl}
                        download
                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#EAB308] hover:bg-amber-400 text-[#0B1F40] text-xs font-bold transition-colors"
                        title="Unduh Dokumen"
                      >
                        <Download size={14} /> Unduh
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer settings={settings} />
    </>
  );
}
