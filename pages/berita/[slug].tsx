// pages/berita/[slug].tsx
import { useRouter } from 'next/router'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Head from 'next/head'

export default function DetailBerita() {
  const router = useRouter()
  const { slug } = router.query

  return (
    <>
      <Head>
        <title>Berita - {slug} | GenBI UPNVJT</title>
      </Head>
      <Navbar isScrolled={true} />
      <main className="container mx-auto px-6 py-32">
        <h1 className="text-4xl font-bold text-secondary-navy uppercase">
          {slug?.toString().replace(/-/g, ' ')}
        </h1>
        <div className="mt-8 prose prose-lg max-w-none text-gray-600">
          <p>Halaman berita untuk: {slug}</p>
          {/* Di sini nanti tempat isi konten berita lengkap Anda */}
        </div>
      </main>
      <Footer />
    </>
  )
}