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

  // 2. Banner Hero Carousel
  const bannerCount = await prisma.banner.count();
  if (bannerCount === 0) {
    const banners = [
      {
        title: 'Generasi Baru Indonesia',
        subtitle: 'Energi untuk Negeri',
        imageUrl: '/carousel-1.jpg',
        buttonText: 'Jelajahi Profil',
        buttonUrl: '/profil',
        sortOrder: 1,
        isActive: true,
      },
      {
        title: 'Dedikasi Untuk Negeri',
        subtitle: 'Berkontribusi Nyata',
        imageUrl: '/corousel-2.jpg',
        buttonText: 'Lihat Kegiatan',
        buttonUrl: '#kegiatan',
        sortOrder: 2,
        isActive: true,
      },
      {
        title: 'Frontliner Bank Indonesia',
        subtitle: 'Mengkomunikasikan Kebijakan',
        imageUrl: '/corousel-3.jpg',
        buttonText: 'Baca Berita',
        buttonUrl: '/berita',
        sortOrder: 3,
        isActive: true,
      },
    ];

    for (const b of banners) {
      await prisma.banner.create({ data: b });
    }
    console.log('✅ Seeded 3 Banner Hero slides');
  }

  // 3. Pembina & BPH
  const bphCount = await prisma.bphMember.count();
  if (bphCount === 0) {
    await prisma.bphMember.create({
      data: {
        name: 'M. Khadik Asrori, S.Kom., M.Kom.',
        category: 'PEMBINA',
        position: 'Pembina GenBI UPN "Veteran" Jawa Timur',
        imageUrl: '/foto profile genbiupnvjt.png',
        quote: 'Generasi Baru Indonesia harus menjadi pionir agen perubahan dan terus memberikan dampak nyata bagi masyarakat luas.',
        sortOrder: 1,
      },
    });

    const bphMembers = [
      { name: 'Masyaroh Unafaznil Khoiroh', category: 'KETUA', position: 'Ketua Umum GenBI UPNVJT 2025/2026', imageUrl: '/members/Maysa.gif', sortOrder: 2 },
      { name: 'Titis Fajar Nurdansyah', category: 'WAKIL', position: 'Wakil Ketua Umum GenBI UPNVJT 2025/2026', imageUrl: '/members/Fajar.gif', sortOrder: 3 },
      { name: 'Natasya Maura Amanda Febrianti', category: 'SEKRETARIS', position: 'Sekretaris I', imageUrl: '/members/Natasha.gif', sortOrder: 4 },
      { name: 'Theressa Marry Christianity', category: 'SEKRETARIS', position: 'Sekretaris II', imageUrl: '/members/There.gif', sortOrder: 5 },
      { name: 'Verdiansyah Ayus Aprilyan', category: 'BENDAHARA', position: 'Bendahara Umum', imageUrl: '/members/Ayus.gif', sortOrder: 6 },
    ];

    for (const m of bphMembers) {
      await prisma.bphMember.create({ data: m });
    }
    console.log('✅ Seeded Pembina & BPH Members');
  }

  // 4. Divisi & Anggota dari data/members.ts
  const divisionCount = await prisma.division.count();
  if (divisionCount === 0) {
    let divOrder = 1;
    for (const div of genbiDivisions) {
      const createdDiv = await prisma.division.create({
        data: {
          name: div.name,
          slug: div.slug,
          description: div.description,
          logoUrl: div.logo,
          sortOrder: divOrder++,
        },
      });

      let memOrder = 1;
      for (const m of div.members) {
        await prisma.divisionMember.create({
          data: {
            divisionId: createdDiv.id,
            name: m.name,
            role: m.position,
            prodiAngkatan: m.prodiAngkatan,
            imageUrl: m.imageGif,
            sortOrder: memOrder++,
          },
        });
      }
    }
    console.log(`✅ Seeded ${genbiDivisions.length} Divisi beserta seluruh anggotanya`);
  }

  // 5. Berita dari GenBINews.tsx
  const articleCount = await prisma.article.count();
  if (articleCount === 0) {
    const articles = [
      {
        title: 'Future Scholar Talk: Strategi Jitu Raih Beasiswa Bank Indonesia 2026',
        slug: 'webinar-career-2026',
        category: 'Edukasi',
        author: 'Divisi Pendidikan',
        excerpt: 'GenBI UPNVJT sukses gelar webinar tips dan trik lolos beasiswa melalui bedah CV serta motivation letter bersama narasumber inspiratif.',
        content: '<p>GenBI UPNVJT sukses menggelar webinar Future Scholar Talk sebagai wadah bimbingan intensif bagi mahasiswa yang berkeinginan meraih Beasiswa Bank Indonesia tahun 2026.</p><p>Acara ini menghadirkan alumni penerima beasiswa dan praktisi yang membagikan strategi kurasi portofolio, penyusunan esai motivasi, hingga simulasi wawancara tatap muka.</p>',
        coverImage: '/GenBI Webinar Career.png',
        status: 'PUBLISHED',
      },
      {
        title: 'GenBI SCALE: Akselerasi Digitalisasi UMKM Lokal di Kawasan Rungkut',
        slug: 'genbi-scale-rungkut',
        category: 'Ekonomi Kreatif',
        author: 'Divisi Ekraf',
        excerpt: 'Pendampingan implementasi pembayaran digital QRIS dan strategi pemasaran digital untuk para pelaku usaha kecil di Surabaya.',
        content: '<p>Melalui program unggulan GenBI SCALE, divisi Ekonomi Kreatif terjun langsung mengedukasi dan mendampingi 30+ UMKM di kawasan Rungkut agar siap bertransformasi ke ekosistem digital nasional.</p>',
        coverImage: '/GENBI SCALE.png',
        status: 'PUBLISHED',
      },
      {
        title: 'Literasi Pasar Modal: Kolaborasi Strategis GenBI COIN Bersama IDX Surabaya',
        slug: 'genbi-coin-literasi',
        category: 'Keuangan',
        author: 'Divisi Hubeks',
        excerpt: 'Edukasi investasi cerdas dan pengenalan instrumen pasar modal bagi generasi muda agar terhindar dari jebakan investasi bodong.',
        content: '<p>GenBI UPNVJT berkolaborasi bersama Bursa Efek Indonesia (IDX) Kantor Perwakilan Jawa Timur menyelenggarakan kelas edukasi finansial bertajuk GenBI COIN.</p>',
        coverImage: '/GenBI Coin.png',
        status: 'PUBLISHED',
      },
      {
        title: 'GenBI Planters: Tanam Pohon dan Edukasi Lingkungan di SDN Rungkut Menanggal 1',
        slug: 'genbi-planters-aksi-hijau',
        category: 'Sosial Lingkungan',
        author: 'Divisi Sosling',
        excerpt: 'Aksi nyata pelestarian lingkungan dan penanaman bibit pohon buah bersama para siswa sekolah dasar.',
        content: '<p>Divisi Sosial Lingkungan GenBI UPNVJT mengajak siswa-siswi SDN Rungkut Menanggal 1 belajar mencintai lingkungan sejak dini melalui penanaman 50 bibit pohon dan workshop pengolahan sampah organik.</p>',
        coverImage: '/Genbi Planters.png',
        status: 'PUBLISHED',
      },
      {
        title: 'BIVENTURE 2025: Menelusuri Jejak Sejarah Keuangan di Museum De Javasche Bank',
        slug: 'biventure-sejarah-uang',
        category: 'Kebanksentralan',
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

  // 6. Prestasi dari Prestasi.tsx
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

  // 7. Dokumen Arsip Awal
  const docCount = await prisma.documentArchive.count();
  if (docCount === 0) {
    const docs = [
      {
        title: 'Buku Panduan Pendaftaran Beasiswa Bank Indonesia 2026',
        category: 'BEASISWA',
        fileUrl: '/panduan-beasiswa-bi-2026.pdf',
        fileSize: '1.8 MB',
        description: 'Panduan persyaratan administratif, kriteria IPK, dan alur seleksi Beasiswa BI 2026.',
      },
      {
        title: 'Surat Keputusan (SK) Pengurus GenBI UPNVJT Periode 2025/2026',
        category: 'SK',
        fileUrl: '/sk-pengurus-genbi-2025-2026.pdf',
        fileSize: '840 KB',
        description: 'SK resmi penetapan Pembina, BPH, dan Anggota Divisi GenBI UPN "Veteran" Jawa Timur.',
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
