// pages/berita/index.tsx
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import GenBINews from '@/components/GenBINews'
import GenBIJoinCTA from '@/components/GenBIJoinCTA'
import Head from 'next/head'

export default function BeritaPage() {
  return (
    <>
      <Head>
        <title>Arsip Berita | GenBI UPNVJT</title>
      </Head>
      <Navbar isScrolled={true} />
      <main className="pt-20"> 
        {/* Kita panggil lagi komponennya di sini sebagai konten utama halaman berita */}
        <GenBINews />
        <GenBIJoinCTA />
      </main>
      <Footer />
    </>
  )
}