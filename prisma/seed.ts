import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { genbiDivisions } from '../data/members';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting GenBIHub Database Seeding...');

  // 1. Admin Default
  const existingAdmin = await prisma.adminUser.findUnique({
    where: { username: 'admin' },
  });

  if (!existingAdmin) {
    const passwordHash = bcrypt.hashSync('admin123', 10);
    await prisma.adminUser.create({
      data: {
        username: 'admin',
        email: 'admin@genbiupnvjatim.com',
        name: 'Administrator GenBI',
        passwordHash,
        role: 'superadmin',
      },
    });
    console.log('✅ Created default admin: admin / admin123');
  }

  // 2. Master Kategori (Berita, Dokumen, Proker)
  const categoryCount = await prisma.category.count();
  if (categoryCount === 0) {
    const initialCategories = [
      { name: 'Edukasi BI & CBP Rupiah', slug: 'edukasi-bi', type: 'ARTICLE', description: 'Literasi kebijakan Bank Indonesia, Cinta Bangga Paham Rupiah, dan QRIS.', sortOrder: 1 },
      { name: 'Sosial Lingkungan', slug: 'sosial-lingkungan', type: 'ARTICLE', description: 'Aksi peduli lingkungan, penanaman pohon, dan bakti sosial masyarakat.', sortOrder: 2 },
      { name: 'Ekonomi Kreatif & UMKM', slug: 'ekonomi-kreatif', type: 'ARTICLE', description: 'Digitalisasi UMKM dan kewirausahaan mahasiswa.', sortOrder: 3 },
      { name: 'Rilis Kegiatan & Proker', slug: 'rilis-kegiatan', type: 'ARTICLE', description: 'Dokumentasi dan berita pelaksanaan kegiatan divisi.', sortOrder: 4 },
      { name: 'Opini & Artikel Anggota', slug: 'opini-anggota', type: 'ARTICLE', description: 'Karya tulis, gagasan, dan opini mahasiswa penerima beasiswa.', sortOrder: 5 },
      
      { name: 'SK & Surat Keputusan', slug: 'sk-resmi', type: 'DOCUMENT', description: 'Surat Keputusan Rektor & Bank Indonesia mengenai penerima beasiswa dan pengurus.', sortOrder: 1 },
      { name: 'Laporan Pertanggungjawaban (LPJ)', slug: 'lpj-divisi', type: 'DOCUMENT', description: 'Arsip LPJ kegiatan program kerja per divisi.', sortOrder: 2 },
      { name: 'Panduan Beasiswa BI', slug: 'panduan-beasiswa', type: 'DOCUMENT', description: 'Buku panduan pendaftaran, kriteria IPK, dan berkas seleksi beasiswa.', sortOrder: 3 },
      { name: 'Template & Format Proposal', slug: 'template-proposal', type: 'DOCUMENT', description: 'Template baku proposal kegiatan dan pengajuan sponsorship.', sortOrder: 4 },
      { name: 'AD/ART & Tata Tertib', slug: 'ad-art', type: 'DOCUMENT', description: 'Anggaran Dasar dan Anggaran Rumah Tangga organisasi GenBI.', sortOrder: 5 },
    ];

    for (const cat of initialCategories) {
      await prisma.category.create({ data: cat });
    }
    console.log('✅ Seeded 10 Master Categories');
  }

  // 3. Banner Hero Carousel
  const bannerCount = await prisma.banner.count();
  if (bannerCount === 0) {
    const banners = [
      {
        title: 'Generasi Baru Indonesia',
        subtitle: 'Energi untuk Negeri — Komisariat UPN "Veteran" Jawa Timur',
        imageUrl: '/carousel-1.jpg',
        buttonText: 'Jelajahi Profil',
        buttonUrl: '/profil',
        sortOrder: 1,
        isActive: true,
      },
      {
        title: 'Frontliner Bank Indonesia',
        subtitle: 'Mengkomunikasikan Kebijakan CBP Rupiah & Ekosistem QRIS',
        imageUrl: '/corousel-2.jpg',
        buttonText: 'Baca Berita',
        buttonUrl: '/berita',
        sortOrder: 2,
        isActive: true,
      },
      {
        title: 'Dedikasi Nyata untuk Masyarakat',
        subtitle: 'Aksi Nyata Sosling, GenBI Mengajar, dan Pemberdayaan UMKM',
        imageUrl: '/corousel-3.jpg',
        buttonText: 'Lihat Divisi',
        buttonUrl: '#divisi',
        sortOrder: 3,
        isActive: true,
      },
    ];

    for (const b of banners) {
      await prisma.banner.create({ data: b });
    }
    console.log('✅ Seeded 3 Banner Hero slides');
  }

  // 4. Pembina & BPH
  const bphCount = await prisma.bphMember.count();
  if (bphCount === 0) {
    const bphMembers = [
      {
        name: 'Dr. Ir. Pembina Kemahasiswaan, M.T.',
        category: 'PEMBINA',
        position: 'Pembina GenBI UPN "Veteran" Jawa Timur',
        imageUrl: '/upn.jpeg',
        quote: 'Teruslah berkarya dan jadilah energi penggerak generasi muda bangsa.',
        instagram: 'https://instagram.com/upnveteranjawatimur',
        linkedin: 'https://linkedin.com',
        sortOrder: 1,
      },
      {
        name: 'Ketua Umum GenBI',
        category: 'KETUA',
        position: 'Ketua Umum GenBI UPNVJT Periode 2025/2026',
        imageUrl: '/members/Raka.gif',
        quote: 'Sinergi, Inovasi, dan Dedikasi tanpa henti untuk Negeri.',
        instagram: 'https://instagram.com/genbiupnvjatim',
        linkedin: 'https://linkedin.com',
        sortOrder: 2,
      },
      {
        name: 'Wakil Ketua GenBI',
        category: 'WAKIL',
        position: 'Wakil Ketua Umum GenBI UPNVJT',
        imageUrl: '/members/Farid.gif',
        quote: 'Mengabdi dengan hati, berprestasi untuk negeri.',
        instagram: 'https://instagram.com/genbiupnvjatim',
        linkedin: 'https://linkedin.com',
        sortOrder: 3,
      },
      {
        name: 'Sekretaris Umum',
        category: 'SEKRETARIS',
        position: 'Sekretaris Umum GenBI UPNVJT',
        imageUrl: '/members/salsabila.gif',
        quote: 'Tertib administrasi untuk organisasi yang transparan dan profesional.',
        instagram: 'https://instagram.com/genbiupnvjatim',
        linkedin: 'https://linkedin.com',
        sortOrder: 4,
      },
      {
        name: 'Bendahara Umum',
        category: 'BENDAHARA',
        position: 'Bendahara Umum GenBI UPNVJT',
        imageUrl: '/members/Caroline Febrianty.gif',
        quote: 'Akuntabilitas finansial penopang keberlanjutan karya.',
        instagram: 'https://instagram.com/genbiupnvjatim',
        linkedin: 'https://linkedin.com',
        sortOrder: 5,
      },
    ];

    for (const b of bphMembers) {
      await prisma.bphMember.create({ data: b });
    }
    console.log('✅ Seeded 5 Pembina & BPH');
  }

  // 5. Divisi & Anggota dari data/members.ts
  const divisionCount = await prisma.division.count();
  if (divisionCount === 0) {
    for (let i = 0; i < genbiDivisions.length; i++) {
      const div = genbiDivisions[i];
      const createdDiv = await prisma.division.create({
        data: {
          name: div.name,
          slug: div.slug,
          tagline: 'Energi untuk Negeri',
          description: div.description,
          logoUrl: div.image,
          teamPhotoUrl: div.image,
          sortOrder: i + 1,
        },
      });

      for (let j = 0; j < div.members.length; j++) {
        const m = div.members[j];
        await prisma.divisionMember.create({
          data: {
            divisionId: createdDiv.id,
            name: m.name,
            role: m.position,
            prodiAngkatan: m.prodiAngkatan,
            imageUrl: m.imageGif,
            sortOrder: j + 1,
          },
        });
      }
    }
    console.log(`✅ Seeded ${genbiDivisions.length} Divisi beserta seluruh anggota`);
  }

  // 6. Berita & Artikel
  const articleCount = await prisma.article.count();
  if (articleCount === 0) {
    const articles = [
      {
        title: 'Diseminasi CBP Rupiah & QRIS: Edukasi Finansial Interaktif Bersama KPw BI Jatim',
        slug: 'diseminasi-cbp-rupiah-qris-jatim',
        category: 'Edukasi BI & CBP Rupiah',
        author: 'Divisi Kominfo',
        excerpt: 'Sosialisasi Cinta, Bangga, dan Paham Rupiah serta implementasi pembayaran digital QRIS menyasar ratusan mahasiswa baru UPNVJT.',
        content: '<p>Generasi Baru Indonesia (GenBI) Komisariat UPN "Veteran" Jawa Timur sukses menggelar kegiatan diseminasi Cinta Bangga Paham (CBP) Rupiah dan edukasi sistem pembayaran digital QRIS bekerja sama dengan Kantor Perwakilan Bank Indonesia Provinsi Jawa Timur.</p><p>Kegiatan ini bertujuan menanamkan rasa cinta pada rupiah sebagai simbol kedaulatan negara, bangga menggunakan rupiah dalam setiap transaksi domestik, serta paham dalam mengelola rupiah secara bijak.</p>',
        coverImage: '/sosling.jpg',
        status: 'PUBLISHED',
      },
      {
        title: 'GenBI SCALE: Akselerasi Digitalisasi UMKM Lokal di Kawasan Rungkut Surabaya',
        slug: 'genbi-scale-rungkut',
        category: 'Ekonomi Kreatif & UMKM',
        author: 'Divisi Ekraf',
        excerpt: 'Pendampingan implementasi pembayaran digital QRIS dan strategi pemasaran digital untuk para pelaku usaha kecil di Surabaya.',
        content: '<p>Melalui program unggulan GenBI SCALE, divisi Ekonomi Kreatif terjun langsung mengedukasi dan mendampingi 30+ UMKM di kawasan Rungkut agar siap bertransformasi ke ekosistem digital nasional.</p>',
        coverImage: '/GENBI SCALE.png',
        status: 'PUBLISHED',
      },
      {
        title: 'Literasi Pasar Modal: Kolaborasi Strategis GenBI COIN Bersama IDX Surabaya',
        slug: 'genbi-coin-literasi',
        category: 'Edukasi BI & CBP Rupiah',
        author: 'Divisi Hubeks',
        excerpt: 'Edukasi investasi cerdas dan pengenalan instrumen pasar modal bagi generasi muda agar terhindar dari jebakan investasi bodong.',
        content: '<p>GenBI UPNVJT berkolaborasi bersama Bursa Efek Indonesia (IDX) Kantor Perwakilan Jawa Timur menyelenggarakan kelas edukasi finansial bertajuk GenBI COIN.</p>',
        coverImage: '/GenBI Coin.png',
        status: 'PUBLISHED',
      },
      {
        title: 'GenBI Planters: Aksi Tanam Pohon dan Edukasi Lingkungan di SDN Rungkut Menanggal 1',
        slug: 'genbi-planters-aksi-hijau',
        category: 'Sosial Lingkungan',
        author: 'Divisi Sosling',
        excerpt: 'Aksi nyata pelestarian lingkungan dan penanaman bibit pohon buah bersama para siswa sekolah dasar.',
        content: '<p>Divisi Sosial Lingkungan GenBI UPNVJT mengajak siswa-siswi SDN Rungkut Menanggal 1 belajar mencintai lingkungan sejak dini melalui penanaman 50 bibit pohon dan workshop pengolahan sampah organik.</p>',
        coverImage: '/Genbi Planters.png',
        status: 'PUBLISHED',
      },
      {
        title: 'BIVENTURE: Menelusuri Jejak Sejarah Keuangan di Museum De Javasche Bank Surabaya',
        slug: 'biventure-sejarah-uang',
        category: 'Edukasi BI & CBP Rupiah',
        author: 'Divisi Medkom',
        excerpt: 'Mempelajari evolusi sistem moneter dan peran sentral perbankan nasional dalam membangun perekonomian Indonesia.',
        content: '<p>Kunjungan edukatif ke Museum De Javasche Bank Surabaya membuka wawasan mendalam mengenai sejarah rupiah, peran Bank Indonesia dari masa ke masa, serta pentingnya menjaga stabilitas nilai mata uang negara.</p>',
        coverImage: '/BIVENTURE.png',
        status: 'PUBLISHED',
      },
    ];

    for (const a of articles) {
      await prisma.article.create({ data: a });
    }
    console.log('✅ Seeded 5 Berita GenBI');
  }

  // 7. Prestasi & Penghargaan
  const achCount = await prisma.achievement.count();
  if (achCount === 0) {
    const achievements = [
      {
        title: '1st Winner Duta Millenial Penggerak CBPR',
        recipient: 'Tim Delegasi GenBI UPNVJT',
        competition: 'KPw. Bank Indonesia Jawa Timur 2024',
        badge: '1st Winner',
        rank: 'gold',
        year: '2024',
        imageUrl: '/prestasi-1.jpg',
        description: 'Juara pertama ajang Duta Millenial Penggerak Cinta Bangga Paham Rupiah se-Jawa Timur.',
        sortOrder: 1,
      },
      {
        title: 'Juara 2 QRIS Jelajah Budaya Indonesia',
        recipient: 'Kontingen GenBI UPNVJT',
        competition: 'KORWIL Jawa 2025',
        badge: '2nd Place',
        rank: 'silver',
        year: '2025',
        imageUrl: '/prestasi-2.jpg',
        description: 'Peringkat kedua kompetisi QRIS Jelajah Budaya Indonesia tingkat Korwil Jawa.',
        sortOrder: 2,
      },
      {
        title: 'Juara 2 Konten Cinta Bangga Paham Rupiah',
        recipient: 'Tim Medkom GenBI UPNVJT',
        competition: 'ARFEST 2025',
        badge: '2nd Place',
        rank: 'silver',
        year: '2025',
        imageUrl: '/prestasi-3.jpg',
        description: 'Penghargaan konten kreatif edukasi kebanksentralan pada festival ARFEST 2025.',
        sortOrder: 3,
      },
      {
        title: '3rd Runner Up Duta CBPR Nasional',
        recipient: 'Delegasi GenBI UPNVJT',
        competition: 'Duta Muda 2025',
        badge: 'Runner Up',
        rank: 'bronze',
        year: '2025',
        imageUrl: '/prestasi-4.jpg',
        description: 'Penghargaan nasional sebagai Duta Muda CBPR Nasional tahun 2025.',
        sortOrder: 4,
      },
    ];

    for (const a of achievements) {
      await prisma.achievement.create({ data: a });
    }
    console.log('✅ Seeded 4 Prestasi Organisasi');
  }

  // 8. Dokumen Arsip Awal
  const docCount = await prisma.documentArchive.count();
  if (docCount === 0) {
    const docs = [
      {
        title: 'Buku Panduan Pendaftaran Beasiswa Bank Indonesia 2026',
        category: 'Panduan Beasiswa BI',
        fileUrl: '/panduan-beasiswa-bi-2026.pdf',
        fileSize: '1.8 MB',
        description: 'Panduan persyaratan administratif, kriteria IPK, dan alur seleksi Beasiswa BI 2026.',
      },
      {
        title: 'Surat Keputusan (SK) Pengurus GenBI UPNVJT Periode 2025/2026',
        category: 'SK & Surat Keputusan',
        fileUrl: '/sk-pengurus-genbi-2025-2026.pdf',
        fileSize: '840 KB',
        description: 'SK resmi penetapan Pembina, BPH, dan Anggota Divisi GenBI UPN "Veteran" Jawa Timur.',
      },
      {
        title: 'Template Format Laporan Pertanggungjawaban (LPJ) Divisi',
        category: 'Laporan Pertanggungjawaban (LPJ)',
        fileUrl: '/template-lpj-divisi.pdf',
        fileSize: '420 KB',
        description: 'Format baku penyusunan LPJ kegiatan untuk pelaporan ke KPw Bank Indonesia.',
      },
    ];

    for (const d of docs) {
      await prisma.documentArchive.create({ data: d });
    }
    console.log('✅ Seeded Dokumen Arsip');
  }

  console.log('✨ All GenBIHub data seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
