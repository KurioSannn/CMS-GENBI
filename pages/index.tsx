import Head from 'next/head';
import type { GetServerSideProps } from 'next';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Prestasi from '@/components/Prestasi';
import AboutCarousel from '@/components/AboutCarousel';
import VisiMisi from '@/components/VisiMisi';
import Kegiatan from '@/components/Kegiatan';
import GenBIContactFAQ from '@/components/GenBIContactFAQ';
import Footer from '@/components/Footer';
import { db, Banner, Achievement, Article, Division } from '@/lib/db';
import type { SiteSettings } from '@/lib/site-settings';

interface HomeProps {
  banners: Banner[];
  achievements: Achievement[];
  articles: Article[];
  divisions: Division[];
  stats: {
    articles: number;
    achievements: number;
    divisions: number;
    members: number;
    documents: number;
  };
  settings?: SiteSettings;
}

export default function Home({
  banners,
  achievements,
  articles,
  stats,
  settings,
}: HomeProps) {
  const siteUrl = "https://www.genbiupnvjatim.com";
  const instagramUrl =
    settings?.contact?.instagramUrl || "https://www.instagram.com/genbi_upnvjatim/";

  const faqEntities =
    settings?.faqs && settings.faqs.length > 0
      ? settings.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer,
          },
        }))
      : [
          {
            "@type": "Question",
            "name": "Apa itu GenBI UPNVJT?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "GenBI UPNVJT adalah komunitas mahasiswa penerima beasiswa Bank Indonesia di UPN Veteran Jawa Timur yang bertugas menjadi garda terdepan bagi bangsa dalam mendukung kebijakan bank sentral.",
            },
          },
          {
            "@type": "Question",
            "name": "Apa tugas utama GenBI UPNVJT?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Tugas kami adalah memberikan kontribusi nyata bagi masyarakat melalui divisi strategis: Pendidikan, Sosial & Lingkungan, Ekonomi Kreatif, Media & Komunikasi, Hubungan Eksternal, dan PSDM.",
            },
          },
          {
            "@type": "Question",
            "name": "Dimana saya bisa melihat struktur organisasi GenBI UPNVJT?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Seluruh struktur kepengurusan dan profil tiap departemen dapat dilihat langsung pada halaman Tentang Kami & Struktur Pengurus di website resmi kami.",
            },
          },
        ];

  return (
    <>
      <Head>
        {/* --- 1. PRIMARY SEO --- */}
        <title>GenBI UPNVJT - Energi untuk Negeri | Official Website</title>
        <meta
          name="description"
          content="GenBI UPNVJATIM - Generasi Baru Indonesia (GenBI) Komisariat Universitas Pembangunan Nasional Veteran Jawa Timur (UPNVJATIM). Kami adalah garda terdepan bagi bangsa dalam mendukung kebijakan Bank Indonesia dan wadah bagi mahasiswa penerima beasiswa BI untuk memberikan kontribusi nyata bagi negeri."
        />
        <meta
          name="keywords"
          content="GenBI UPNVJT, GenBI UPN Jatim, Beasiswa Bank Indonesia, genbi jatim, genbi surabaya, GenBI Indonesia, UPN Veteran Jawa Timur, Garda Terdepan Bangsa, Energi Untuk Negeri, satugenbi, genbi, upnvj, upnvjatim, UPNVJATIM, GenBINews, GenBI UPN Jatim website, website GenBI UPN Jatim, Beasiswa GenBI UPNVJATIM"
        />

        {/* --- 2. OPEN GRAPH --- */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content="GenBI UPNVJT - Energi untuk Negeri | Official Website" />
        <meta property="og:description" content="Garda terdepan bagi bangsa dalam mendukung kebijakan Bank Indonesia. Wadah kontribusi mahasiswa penerima beasiswa BI di UPNVJT." />
        <meta property="og:image" content={`${siteUrl}/favicongenbiupnvj.png`} />

        {/* --- 3. TWITTER CARD --- */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="GenBI UPNVJT - Energi untuk Negeri" />
        <meta name="twitter:image" content={`${siteUrl}/favicongenbiupnvj.png`} />

        {/* --- 4. SCHEMA ORGANIZATION --- */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "GenBI UPNVJT",
              "alternateName": "Generasi Baru Indonesia UPN Veteran Jawa Timur",
              "url": siteUrl,
              "logo": `${siteUrl}/favicongenbiupnvj.png`,
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "official",
                "areaServed": "ID",
                "availableLanguage": ["Indonesian", "English"],
              },
              "sameAs": [instagramUrl],
            }),
          }}
        />

        {/* --- 5. SCHEMA FAQ --- */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqEntities,
            }),
          }}
        />

        <link rel="icon" href="/favicongenbiupnvj.png" />
      </Head>

      <Navbar />

      <main className="overflow-x-hidden bg-[#FFFFFF]">
        <Hero banners={banners} />
        <Prestasi achievements={achievements} />
        <AboutCarousel stats={stats} settings={settings} />
        <VisiMisi />
        <Kegiatan articles={articles} />
        <GenBIContactFAQ settings={settings} />
      </main>

      <Footer settings={settings} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const [allBanners, achievements, articles, divisions, rawStats, settings] = await Promise.all([
      db.banner.findMany(),
      db.achievement.findMany(),
      db.article.findMany('PUBLISHED'),
      db.division.findMany(),
      db.getStats(),
      db.siteSettings.get(),
    ]);

    const activeBanners = allBanners.filter((b) => b.isActive);

    return {
      props: {
        banners: JSON.parse(JSON.stringify(activeBanners)),
        achievements: JSON.parse(JSON.stringify(achievements)),
        articles: JSON.parse(JSON.stringify(articles)),
        divisions: JSON.parse(JSON.stringify(divisions)),
        stats: {
          articles: rawStats.articles,
          achievements: rawStats.achievements,
          divisions: rawStats.divisions,
          members: rawStats.totalMembers,
          documents: rawStats.documents,
        },
        settings: JSON.parse(JSON.stringify(settings)),
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps (Home):", error);
    return {
      props: {
        banners: [],
        achievements: [],
        articles: [],
        divisions: [],
        stats: {
          articles: 0,
          achievements: 0,
          divisions: 0,
          members: 0,
          documents: 0,
        },
      },
    };
  }
};
