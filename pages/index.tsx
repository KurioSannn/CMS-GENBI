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
        <meta name="keywords" content="GenBI UPNVJT, GenBI UPN Jatim, Beasiswa Bank Indonesia, genbi jatim, genbi surabaya, GenBI Indonesia, UPN Veteran Jawa Timur, Garda Terdepan Bangsa, Energi Untuk Negeri, satugenbi, genbi, upnvj, upnvjatim, UPNVJATIM, GenBINews, GenBI UPN Jatim website, website GenBI UPN Jatim, Beasiswa GenBI UPNVJATIM" />
        
        {/* --- 2. OPEN GRAPH (Social Media Preview) --- */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content="GenBI UPNVJT - Official Website" />
        <meta property="og:description" content="Garda terdepan bagi bangsa dalam mendukung kebijakan Bank Indonesia. Wadah kontribusi mahasiswa penerima beasiswa BI di UPNVJT." />
        <meta property="og:image" content={`${siteUrl}/favicongenbiupnvj.png`} />

        {/* --- 3. TWITTER CARD --- */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="GenBI UPNVJT - Energi untuk Negeri" />
        <meta name="twitter:image" content={`${siteUrl}/favicongenbiupnvj.png`} />

        {/* --- 4. SCHEMA ORGANIZATION (Branding Authority) --- */}
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

        {/* --- 5. SCHEMA FAQ (Bahasa yang Lebih Membumi) --- */}
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
                    "text": "Tugas kami adalah memberikan kontribusi nyata bagi masyarakat melalui 7 divisi: Pendidikan, Kesehatan, Lingkungan Hidup, Kewirausahaan, Media Kreatif, Hubungan Masyarakat, dan PSDM."
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