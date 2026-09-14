import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import db, { Article } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import { Calendar, User, ArrowLeft, Share2, Tag } from 'lucide-react';

interface DetailBeritaProps {
  article: Article | null;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string;
  const article = await db.article.findBySlug(slug);

  if (!article) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      article,
    },
  };
};

export default function DetailBerita({ article }: DetailBeritaProps) {
  if (!article) return null;

  const siteUrl = 'https://www.genbiupnvjatim.com';
  const pageUrl = `${siteUrl}/berita/${article.slug}`;

  return (
    <>
      <Head>
        <title>{article.title} - GenBI UPNVJT</title>
        <meta name="description" content={article.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={article.coverImage.startsWith('http') ? article.coverImage : `${siteUrl}${article.coverImage}`} />
        <meta property="og:url" content={pageUrl} />
      </Head>

      <Navbar isScrolled={true} />

      <main className="min-h-screen bg-slate-50 pt-28 pb-20">
        <article className="container mx-auto px-4 max-w-4xl">
          {/* Back link */}
          <div className="mb-6">
            <Link
              href="/#genbi-news"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#0B1F40] transition-colors"
            >
              <ArrowLeft size={16} /> Kembali ke Berita
            </Link>
          </div>

          {/* Article Header */}
          <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 bg-[#EAB308] text-[#0B1F40] text-[11px] font-black uppercase rounded-full tracking-wider">
                {article.category}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Calendar size={14} className="text-[#EAB308]" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <User size={14} className="text-[#EAB308]" />
                <span>{article.author}</span>
              </div>
            </div>

            <h1 className="text-2xl md:text-4xl font-black text-[#0B1F40] tracking-tight leading-snug">
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="text-slate-600 text-sm md:text-base border-l-4 border-[#EAB308] pl-4 italic bg-slate-50/80 p-3 rounded-r-xl">
                {article.excerpt}
              </p>
            )}

            {/* Featured Image */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-md">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Content */}
            <div
              className="prose prose-slate max-w-none pt-4 text-slate-700 leading-relaxed prose-headings:text-[#0B1F40] prose-headings:font-black prose-p:my-4 prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}