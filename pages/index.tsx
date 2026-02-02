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
  // Ganti URL ini dengan domain asli kamu nanti (misal: genbiupnvjt.com)
  const siteUrl = "http://localhost:3000"; 

  return (
    <>
      <Head>
        {/* --- PRIMARY SEO --- */}
        <title>GenBI UPNVJT - Energi untuk Negeri | Official Website</title>
        <meta name="description" content="Website resmi Generasi Baru Indonesia (GenBI) UPN 'Veteran' Jawa Timur. Komunitas mahasiswa penerima beasiswa Bank Indonesia." />
        <meta name="keywords" content="GenBI, GenBI UPNVJT, UPN Veteran Jawa Timur, Beasiswa Bank Indonesia, Bank Indonesia, Energi Untuk Negeri" />
        
        {/* --- OPEN GRAPH (WA, IG, FB PREVIEW) --- */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content="GenBI UPNVJT - Energi untuk Negeri" />
        <meta property="og:description" content="Official Website GenBI UPN 'Veteran' Jawa Timur. Garda terdepan komunikasi kebijakan Bank Indonesia." />
        <meta property="og:image" content={`${siteUrl}/favicongenbiupnvj.png`} />

        {/* --- TWITTER CARD --- */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="GenBI UPNVJT - Energi untuk Negeri" />
        <meta name="twitter:image" content={`${siteUrl}/favicongenbiupnvj.png`} />

        {/* --- SCHEMA MARKUP (Agar muncul menu sitelinks di Google) --- */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "GenBI UPNVJT",
              "url": siteUrl,
              "logo": `${siteUrl}/favicongenbiupnvj.png`,
              "sameAs": [
                "https://www.instagram.com/genbiupnjatim"
              ]
            })
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