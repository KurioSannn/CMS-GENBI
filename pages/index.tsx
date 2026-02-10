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
        {/* --- 1. PRIMARY SEO (Optimized Keywords) --- */}
        <title>GenBI UPNVJT - Energi untuk Negeri | Official Website</title>
        <meta name="description" content="Website resmi Generasi Baru Indonesia (GenBI) UPN 'Veteran' Jawa Timur. Komunitas mahasiswa penerima beasiswa Bank Indonesia yang berdedikasi menjadi garda terdepan komunikasi kebijakan bank sentral." />
        <meta name="keywords" content="GenBI UPNVJT, GenBI UPN Jatim, Beasiswa Bank Indonesia, Bank Indonesia Surabaya, Energi Untuk Negeri, Generasi Baru Indonesia, UPN Veteran Jawa Timur" />
        
        {/* --- 2. OPEN GRAPH (Social Media Authority) --- */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content="GenBI UPNVJT - Official Website" />
        <meta property="og:description" content="Garda terdepan komunikasi kebijakan Bank Indonesia. Wadah pengembangan diri mahasiswa penerima beasiswa BI." />
        <meta property="og:image" content={`${siteUrl}/favicongenbiupnvj.png`} />

        {/* --- 3. TWITTER CARD --- */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="GenBI UPNVJT - Energi untuk Negeri" />
        <meta name="twitter:image" content={`${siteUrl}/favicongenbiupnvj.png`} />

        {/* --- 4. SCHEMA ORGANIZATION (Sitelinks & Search Branding) --- */}
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

        {/* --- 5. SCHEMA FAQ (Memicu Dropdown FAQ di Google Search) --- */}
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
                    "text": "GenBI UPNVJT (Generasi Baru Indonesia UPN 'Veteran' Jawa Timur) adalah komunitas mahasiswa penerima beasiswa Bank Indonesia yang berperan sebagai agen perubahan dan garda terdepan komunikasi kebijakan Bank Indonesia."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Apa saja divisi di GenBI UPNVJT?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "GenBI UPNVJT memiliki 7 divisi strategis: Pendidikan, Kesehatan, Lingkungan Hidup, Kewirausahaan, Media Kreatif, Hubungan Masyarakat, dan Pengembangan Sumber Daya Manusia (PSDM)."
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