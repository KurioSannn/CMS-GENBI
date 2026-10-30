import Head from 'next/head'
import type { GetServerSideProps } from 'next'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Prestasi from '@/components/Prestasi'
import AboutCarousel from '@/components/AboutCarousel'
import VisiMisi from '@/components/VisiMisi'
import Kegiatan from '@/components/Kegiatan'
import GenBIContactFAQ from '@/components/GenBIContactFAQ'
import Footer from '@/components/Footer'
import { db, Banner, Achievement, Article, Division } from '@/lib/db'

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
}

export default function Home({
  banners,
  achievements,
  articles,
  divisions,
  stats,
}: HomeProps) {
  const siteUrl = "https://www.genbiupnvjatim.com";

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
                "availableLanguage": ["Indonesian", "English"]
              },
              "sameAs": [
                "https://www.instagram.com/genbi_upnvjatim/"
              ]
            })
          }}
        />

        {/* --- 5. SCHEMA FAQ --- */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Apa itu GenBI UPNVJT?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "GenBI UPNVJT adalah komunitas mahasiswa penerima beasiswa Bank Indonesia di UPN Veteran Jawa Timur yang bertugas menjadi garda terdepan bagi bangsa dalam mendukung kebijakan bank sentral."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Apa tugas utama GenBI UPNVJT?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Tugas kami adalah memberikan kontribusi nyata bagi masyarakat melalui 7 divisi strategis: Pendidikan, Kesehatan, Lingkungan Hidup, Kewirausahaan, Media Kreatif, Hubungan Masyarakat, dan PSDM."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Dimana saya bisa melihat struktur organisasi GenBI UPNVJT?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Seluruh struktur kepengurusan dan profil tiap departemen dapat dilihat langsung pada bagian Struktur Organisasi di website resmi kami."
                  }
                }
              ]
            }),
          }}
        />

        <link rel="icon" href="/favicongenbiupnvj.png" />
      </Head>

      <Navbar />
      
      {/* 
        URUTAN PENEMPATAN PERSIS MENGIKUTI LANDING PAGE ASLI:
        1. Hero
        2. Prestasi
        3. AboutCarousel (Tentang Kami)
        4. VisiMisi
        5. Kegiatan (Program Unggulan)
        6. Struktur (7 Divisi)
        7. CapaianDanTentang (Sejarah & Metrik)
        8. GenBINews (Warta Redaksi)
        9. GenBIJoinCTA
        10. GenBIContactFAQ
      */}
      <main className="overflow-x-hidden bg-[#FFFFFF]"> 
        <Hero banners={banners} />
        <Prestasi achievements={achievements} />
        <AboutCarousel stats={stats} />
        <VisiMisi />
        <Kegiatan articles={articles} />
        <GenBIContactFAQ />
      </main>

      <Footer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    // Ensure clean transparent building asset is generated
    try {
      const fs = await import('fs');
      const path = await import('path');
      const destPng = path.join(process.cwd(), 'public', 'upn-cutout.png');
      const src1 = 'C:/Users/ASUS TUF/.gemini/antigravity/brain/e5fd991e-fc28-4671-b399-ad57ff4f33c2/upn_cutout_1793348301801.jpg';
      const src2 = 'C:/Users/ASUS TUF/.gemini/antigravity/brain/e5fd991e-fc28-4671-b399-ad57ff4f33c2/upn_cutout_perspective_1793348330059.jpg';
      const chosenSrc = fs.existsSync(src1) ? src1 : fs.existsSync(src2) ? src2 : null;

      if (chosenSrc && !fs.existsSync(destPng)) {
        const sharp = (await import('sharp')).default;
        const image = sharp(chosenSrc);
        const { data, info } = await image
          .ensureAlpha()
          .raw()
          .toBuffer({ resolveWithObject: true });

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          if (r > 230 && g > 230 && b > 230) {
            data[i + 3] = 0; // make white transparent
          }
        }

        await sharp(data, {
          raw: {
            width: info.width,
            height: info.height,
            channels: 4,
          },
        })
          .png()
          .toFile(destPng);
      }

      const madingSrc = 'C:/Users/ASUS TUF/.gemini/antigravity/brain/e5fd991e-fc28-4671-b399-ad57ff4f33c2/.user_uploaded/media_1793352160885_64ad822d.png';
      const madingDest = path.join(process.cwd(), 'public', 'mading-beasiswa-posters.png');
      if (fs.existsSync(madingSrc)) {
        fs.copyFileSync(madingSrc, madingDest);
      }
    } catch (e) {
      // Non-blocking asset fallback
    }

    const [allBanners, achievements, articles, divisions, stats] = await Promise.all([
      db.banner.findMany(),
      db.achievement.findMany(),
      db.article.findMany('PUBLISHED'),
      db.division.findMany(),
      db.getStats(),
    ]);

    const activeBanners = allBanners.filter((b) => b.isActive);

    return {
      props: {
        banners: JSON.parse(JSON.stringify(activeBanners)),
        achievements: JSON.parse(JSON.stringify(achievements)),
        articles: JSON.parse(JSON.stringify(articles)),
        divisions: JSON.parse(JSON.stringify(divisions)),
        stats: JSON.parse(JSON.stringify(stats)),
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
