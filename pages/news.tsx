import Head from 'next/head'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
// Import komponen daftar berita kamu jika sudah ada
import GenBINews from '@/components/GenBINews' 

export default function NewsPage() {
  const siteUrl = "https://www.genbiupnvjatim.com";

  return (
    <>
      <Head>
        <title>GenBI News - Berita Terkini GenBI UPNVJT</title>
        <meta name="description" content="Kumpulan berita, kegiatan, dan kontribusi nyata Generasi Baru Indonesia (GenBI) UPN 'Veteran' Jawa Timur untuk bangsa." />
        <meta property="og:title" content="GenBI News - Energi Untuk Negeri" />
        <meta property="og:url" content={`${siteUrl}/news`} />
        
        {/* Schema khusus artikel agar Google lebih cepat mengindeks berita */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsMediaOrganization",
              "name": "GenBI News UPNVJT",
              "url": `${siteUrl}/news`,
              "parentOrganization": {
                "@type": "Organization",
                "name": "GenBI UPNVJT"
              }
            })
          }}
        />
      </Head>

      <Navbar />

      <main className="pt-20 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-4xl font-bold text-center mb-4 text-blue-900">GenBI News</h1>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Dokumentasi seluruh rangkaian kegiatan dan aksi nyata kami sebagai garda terdepan bagi bangsa.
          </p>
          
          {/* Memanggil komponen berita yang sudah kamu punya */}
          <GenBINews /> 
        </div>
      </main>

      <Footer />
    </>
  )
}