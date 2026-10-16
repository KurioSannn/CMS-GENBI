import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GenBINews from '@/components/GenBINews';
import db, { Article } from '@/lib/db';

interface BeritaIndexPageProps {
  articles: Article[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const articles = await db.article.findMany('PUBLISHED');

  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles)),
    },
  };
};

export default function BeritaIndexPage({ articles }: BeritaIndexPageProps) {
  const siteUrl = "https://www.genbiupnvjatim.com";

  return (
    <>
      <Head>
        <title>Berita & Kegiatan - GenBI UPNVJT</title>
        <meta name="description" content="Kumpulan berita, kegiatan, dan kontribusi nyata Generasi Baru Indonesia (GenBI) UPN 'Veteran' Jawa Timur untuk bangsa." />
        <meta property="og:title" content="Berita & Kegiatan - GenBI UPNVJT" />
        <meta property="og:url" content={`${siteUrl}/berita`} />
        
        {/* Schema khusus artikel agar Google lebih cepat mengindeks berita */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsMediaOrganization",
              "name": "GenBI News UPNVJT",
              "url": `${siteUrl}/berita`,
              "parentOrganization": {
                "@type": "Organization",
                "name": "GenBI UPNVJT"
              }
            })
          }}
        />
      </Head>

      <Navbar />

      <main className="pt-24 min-h-screen bg-[#F8FAFC]">
        <div className="container mx-auto px-4 py-8">
          <GenBINews articles={articles} /> 
        </div>
      </main>

      <Footer />
    </>
  );
}