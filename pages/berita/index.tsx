// pages/index.tsx
import Head from 'next/head'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Prestasi from '@/components/Prestasi'
import AboutCarousel from '@/components/AboutCarousel'
import VisiMisi from '@/components/VisiMisi'
import Kegiatan from '@/components/Kegiatan'
import Struktur from '@/components/Struktur'
import CapaianDanTentang from '@/components/CapaianDanTentang'
import GenBINews from '@/components/GenBINews'
import GenBIJoinCTA from '@/components/GenBIJoinCTA'
import GenBIContactFAQ from '@/components/GenBIContactFAQ'
import Footer from '@/components/Footer'

export default function Home() {
  const siteUrl = "https://www.genbiupnvjatim.com"; 

  return (
    <>
      <Head>
        {/* --- 1. PRIMARY SEO (Tegas & Lugas) --- */}
        <title>GenBI UPNVJT - Energi untuk Negeri | Official Website</title>
        <meta name="description" content="GenBI UPNVJATIM - Generasi Baru Indonesia (GenBI) Komisariat Universitas Pembangunan Nasional Veteran Jawa Timur (UPNVJATIM). Kami adalah garda terdepan bagi bangsa dalam mendukung kebijakan Bank Indonesia dan wadah bagi mahasiswa penerima beasiswa BI untuk memberikan kontribusi nyata bagi negeri." />
        <meta name="keywords" content="GenBI UPNVJT, GenBI UPN Jatim, Beasiswa Bank Indonesia, genbi jatim, genbi surabaya, GenBI Indonesia, UPN Veteran Jawa Timur, Garda Terdepan Bangsa, Energi Untuk Negeri, satugenbi, genbi, upnvj, upnvjatim, UPNVJATIM, GenBINews, GenBI UPN Jatim website, website GenBI Jatim, Beasiswa GenBI UPNVJATIM" />
        
        {/* --- 2. OPEN GRAPH (Preview WA, IG, FB) --- */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content="GenBI UPNVJT - Official Website" />
        <meta property="og:description" content="Garda terdepan bagi bangsa dalam mendukung kebijakan Bank Indonesia. Wadah kontribusi mahasiswa penerima beasiswa BI di UPNVJT." />
        <meta property="og:image" content={`${siteUrl}/favicongenbiupnvj.png`} />

        {/* --- 3. TWITTER CARD --- */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="GenBI UPNVJT - Energi untuk Negeri" />
        <meta name="twitter:image" content={`${siteUrl}/favicongenbiupnvj.png`} />

        {/* --- 4. SITEMAP LINK (Penting untuk Logo & Centang) --- */}
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="icon" href="/favicongenbiupnvj.png" />

        {/* --- 5. SCHEMA MARKUP ORGANIZATION (Sitelinks & Authority) --- */}
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

        {/* --- 6. SCHEMA FAQ (Dropdown di Google Search) --- */}
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
                }
              ]
            }),
          }}
        />
      </Head>

      <Navbar />
      
      <main className="overflow-x-hidden"> 
        <Hero />
        <Prestasi />
        <AboutCarousel />
        <VisiMisi />
        <Kegiatan />
        <Struktur />
        <CapaianDanTentang />
        <GenBINews />
        <GenBIJoinCTA />
        <GenBIContactFAQ /> 
      </main>

      <Footer />
    </>
  )
}