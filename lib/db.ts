import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { genbiDivisions } from '../data/members';

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface Banner {
  id: number;
  title: string;
  subtitle?: string | null;
  imageUrl: string;
  buttonText?: string | null;
  buttonUrl?: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BphMember {
  id: number;
  name: string;
  category: string; // "PEMBINA" | "KETUA" | "WAKIL" | "SEKRETARIS" | "BENDAHARA"
  position: string;
  imageUrl: string;
  quote?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface DivisionMember {
  id: number;
  divisionId: number;
  name: string;
  role: string;
  prodiAngkatan?: string | null;
  imageUrl: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Division {
  id: number;
  name: string;
  slug: string;
  tagline?: string | null;
  description: string;
  logoUrl?: string | null;
  teamPhotoUrl?: string | null;
  sortOrder: number;
  members: DivisionMember[];
  createdAt: string;
  updatedAt: string;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  author: string;
  status: 'DRAFT' | 'PUBLISHED';
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Achievement {
  id: number;
  title: string;
  recipient: string;
  competition: string;
  badge?: string | null;
  rank: string; // "gold" | "silver" | "bronze"
  year: string;
  imageUrl: string;
  description?: string | null;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentArchive {
  id: number;
  title: string;
  category: string; // "SK" | "LPJ" | "BEASISWA" | "PROPOSAL"
  fileUrl: string;
  fileSize?: string | null;
  description?: string | null;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityLog {
  id: number;
  adminId?: number | null;
  adminName?: string | null;
  action: string;
  description: string;
  ipAddress?: string | null;
  createdAt: string;
}

interface DatabaseSchema {
  adminUsers: AdminUser[];
  banners: Banner[];
  bphMembers: BphMember[];
  divisions: Division[];
  divisionMembers: DivisionMember[];
  articles: Article[];
  achievements: Achievement[];
  documents: DocumentArchive[];
  activityLogs: ActivityLog[];
}

const DB_FILE_PATH = path.join(process.cwd(), 'data', 'genbihub.db.json');

// Inisialisasi Data Default Pertama Kali
function getInitialData(): DatabaseSchema {
  const now = new Date().toISOString();
  const defaultPasswordHash = bcrypt.hashSync('admin123', 10);

  // Initial Divisions & Members from data/members.ts
  let memberIdCounter = 1;
  const initialDivisions: Division[] = [];
  const initialDivisionMembers: DivisionMember[] = [];

  genbiDivisions.forEach((div, dIdx) => {
    const divId = dIdx + 1;
    const currentMembers: DivisionMember[] = [];

    div.members.forEach((m, mIdx) => {
      const memObj: DivisionMember = {
        id: memberIdCounter++,
        divisionId: divId,
        name: m.name,
        role: m.position,
        prodiAngkatan: m.prodiAngkatan,
        imageUrl: m.imageGif,
        sortOrder: mIdx + 1,
        createdAt: now,
        updatedAt: now,
      };
      currentMembers.push(memObj);
      initialDivisionMembers.push(memObj);
    });

    initialDivisions.push({
      id: divId,
      name: div.name,
      slug: div.slug,
      tagline: 'Energi untuk Negeri',
      description: div.description,
      logoUrl: div.logo,
      teamPhotoUrl: null,
      sortOrder: dIdx + 1,
      members: currentMembers,
      createdAt: now,
      updatedAt: now,
    });
  });

  return {
    adminUsers: [
      {
        id: 1,
        username: 'admin',
        email: 'admin@genbiupnvjatim.com',
        passwordHash: defaultPasswordHash,
        name: 'Administrator GenBI',
        role: 'superadmin',
        createdAt: now,
        updatedAt: now,
      },
    ],
    banners: [
      {
        id: 1,
        title: 'Generasi Baru Indonesia',
        subtitle: 'Energi untuk Negeri',
        imageUrl: '/carousel-1.jpg',
        buttonText: 'Jelajahi Profil',
        buttonUrl: '/profil',
        sortOrder: 1,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 2,
        title: 'Dedikasi Untuk Negeri',
        subtitle: 'Berkontribusi Nyata',
        imageUrl: '/corousel-2.jpg',
        buttonText: 'Lihat Kegiatan',
        buttonUrl: '#kegiatan',
        sortOrder: 2,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 3,
        title: 'Frontliner Bank Indonesia',
        subtitle: 'Mengkomunikasikan Kebijakan',
        imageUrl: '/corousel-3.jpg',
        buttonText: 'Baca Berita',
        buttonUrl: '/berita',
        sortOrder: 3,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
    ],
    bphMembers: [
      {
        id: 1,
        name: 'M. Khadik Asrori, S.Kom., M.Kom.',
        category: 'PEMBINA',
        position: 'Pembina GenBI UPN "Veteran" Jawa Timur',
        imageUrl: '/foto profile genbiupnvjt.png',
        quote: 'Generasi Baru Indonesia harus menjadi pionir agen perubahan dan terus memberikan dampak nyata bagi masyarakat luas.',
        instagram: 'https://instagram.com/genbi_upnvjatim',
        linkedin: null,
        sortOrder: 1,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 2,
        name: 'Masyaroh Unafaznil Khoiroh',
        category: 'KETUA',
        position: 'Ketua Umum GenBI UPNVJT 2025/2026',
        imageUrl: '/members/Maysa.gif',
        quote: 'Bersama GenBI, kita wujudkan energi muda yang berdampak bagi negeri.',
        instagram: null,
        linkedin: null,
        sortOrder: 2,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 3,
        name: 'Titis Fajar Nurdansyah',
        category: 'WAKIL',
        position: 'Wakil Ketua Umum GenBI UPNVJT 2025/2026',
        imageUrl: '/members/Fajar.gif',
        sortOrder: 3,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 4,
        name: 'Natasya Maura Amanda Febrianti',
        category: 'SEKRETARIS',
        position: 'Sekretaris I',
        imageUrl: '/members/Natasha.gif',
        sortOrder: 4,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 5,
        name: 'Theressa Marry Christianity',
        category: 'SEKRETARIS',
        position: 'Sekretaris II',
        imageUrl: '/members/There.gif',
        sortOrder: 5,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 6,
        name: 'Verdiansyah Ayus Aprilyan',
        category: 'BENDAHARA',
        position: 'Bendahara Umum',
        imageUrl: '/members/Ayus.gif',
        sortOrder: 6,
        createdAt: now,
        updatedAt: now,
      },
    ],
    divisions: initialDivisions,
    divisionMembers: initialDivisionMembers,
    articles: [
      {
        id: 1,
        title: 'Future Scholar Talk: Strategi Jitu Raih Beasiswa Bank Indonesia 2026',
        slug: 'webinar-career-2026',
        category: 'Edukasi',
        author: 'Divisi Pendidikan',
        excerpt: 'GenBI UPNVJT sukses gelar webinar tips dan trik lolos beasiswa melalui bedah CV serta motivation letter bersama narasumber inspiratif.',
        content: '<p>GenBI UPNVJT sukses menggelar webinar Future Scholar Talk sebagai wadah bimbingan intensif bagi mahasiswa yang berkeinginan meraih Beasiswa Bank Indonesia tahun 2026.</p><p>Acara ini menghadirkan alumni penerima beasiswa dan praktisi yang membagikan strategi kurasi portofolio, penyusunan esai motivasi, hingga simulasi wawancara tatap muka.</p>',
        coverImage: '/GenBI Webinar Career.png',
        status: 'PUBLISHED',
        publishedAt: now,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 2,
        title: 'GenBI SCALE: Akselerasi Digitalisasi UMKM Lokal di Kawasan Rungkut',
        slug: 'genbi-scale-rungkut',
        category: 'Ekonomi Kreatif',
        author: 'Divisi Ekraf',
        excerpt: 'Pendampingan implementasi pembayaran digital QRIS dan strategi pemasaran digital untuk para pelaku usaha kecil di Surabaya.',
        content: '<p>Melalui program unggulan GenBI SCALE, divisi Ekonomi Kreatif terjun langsung mengedukasi dan mendampingi 30+ UMKM di kawasan Rungkut agar siap bertransformasi ke ekosistem digital nasional.</p>',
        coverImage: '/GENBI SCALE.png',
        status: 'PUBLISHED',
        publishedAt: now,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 3,
        title: 'Literasi Pasar Modal: Kolaborasi Strategis GenBI COIN Bersama IDX Surabaya',
        slug: 'genbi-coin-literasi',
        category: 'Keuangan',
        author: 'Divisi Hubeks',
        excerpt: 'Edukasi investasi cerdas dan pengenalan instrumen pasar modal bagi generasi muda agar terhindar dari jebakan investasi bodong.',
        content: '<p>GenBI UPNVJT berkolaborasi bersama Bursa Efek Indonesia (IDX) Kantor Perwakilan Jawa Timur menyelenggarakan kelas edukasi finansial bertajuk GenBI COIN.</p>',
        coverImage: '/GenBI Coin.png',
        status: 'PUBLISHED',
        publishedAt: now,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 4,
        title: 'GenBI Planters: Tanam Pohon dan Edukasi Lingkungan di SDN Rungkut Menanggal 1',
        slug: 'genbi-planters-aksi-hijau',
        category: 'Sosial Lingkungan',
        author: 'Divisi Sosling',
        excerpt: 'Aksi nyata pelestarian lingkungan dan penanaman bibit pohon buah bersama para siswa sekolah dasar.',
        content: '<p>Divisi Sosial Lingkungan GenBI UPNVJT mengajak siswa-siswi SDN Rungkut Menanggal 1 belajar mencintai lingkungan sejak dini melalui penanaman 50 bibit pohon dan workshop pengolahan sampah organik.</p>',
        coverImage: '/Genbi Planters.png',
        status: 'PUBLISHED',
        publishedAt: now,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 5,
        title: 'BIVENTURE 2025: Menelusuri Jejak Sejarah Keuangan di Museum De Javasche Bank',
        slug: 'biventure-sejarah-uang',
        category: 'Kebanksentralan',
        author: 'Divisi Medkom',
        excerpt: 'Mempelajari evolusi sistem moneter dan peran sentral perbankan nasional dalam membangun perekonomian Indonesia.',
        content: '<p>Kunjungan edukatif ke Museum De Javasche Bank Surabaya membuka wawasan mendalam mengenai sejarah rupiah, peran Bank Indonesia dari masa ke masa, serta pentingnya menjaga stabilitas nilai mata uang negara.</p>',
        coverImage: '/BIVENTURE.png',
        status: 'PUBLISHED',
        publishedAt: now,
        createdAt: now,
        updatedAt: now,
      },
    ],
    achievements: [
      {
        id: 1,
        title: '1st Winner Duta Millenial Penggerak CBPR',
        recipient: 'Tim Delegasi GenBI UPNVJT',
        competition: 'KPw. Bank Indonesia Jawa Timur 2024',
        badge: '1st Winner',
        rank: 'gold',
        year: '2024',
        imageUrl: '/prestasi-1.jpg',
        description: 'Juara pertama ajang Duta Millenial Penggerak Cinta Bangga Paham Rupiah se-Jawa Timur.',
        sortOrder: 1,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 2,
        title: 'Juara 2 QRIS Jelajah Budaya Indonesia',
        recipient: 'Kontingen GenBI UPNVJT',
        competition: 'KORWIL Jawa 2025',
        badge: '2nd Place',
        rank: 'silver',
        year: '2025',
        imageUrl: '/prestasi-2.jpg',
        description: 'Peringkat kedua kompetisi QRIS Jelajah Budaya Indonesia tingkat Korwil Jawa.',
        sortOrder: 2,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 3,
        title: 'Juara 2 Konten Cinta Bangga Paham Rupiah',
        recipient: 'Tim Medkom GenBI UPNVJT',
        competition: 'ARFEST 2025',
        badge: '2nd Place',
        rank: 'silver',
        year: '2025',
        imageUrl: '/prestasi-3.jpg',
        description: 'Penghargaan konten kreatif edukasi kebanksentralan pada festival ARFEST 2025.',
        sortOrder: 3,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 4,
        title: '3rd Runner Up Duta CBPR Nasional',
        recipient: 'Delegasi GenBI UPNVJT',
        competition: 'Duta Muda 2025',
        badge: 'Runner Up',
        rank: 'bronze',
        year: '2025',
        imageUrl: '/prestasi-4.jpg',
        description: 'Penghargaan nasional sebagai Duta Muda CBPR Nasional tahun 2025.',
        sortOrder: 4,
        createdAt: now,
        updatedAt: now,
      },
    ],
    documents: [
      {
        id: 1,
        title: 'Buku Panduan Pendaftaran Beasiswa Bank Indonesia 2026',
        category: 'BEASISWA',
        fileUrl: '/panduan-beasiswa-bi-2026.pdf',
        fileSize: '1.8 MB',
        description: 'Panduan persyaratan administratif, kriteria IPK, dan alur seleksi Beasiswa BI 2026.',
        publishedAt: now,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 2,
        title: 'Surat Keputusan (SK) Pengurus GenBI UPNVJT Periode 2025/2026',
        category: 'SK',
        fileUrl: '/sk-pengurus-genbi-2025-2026.pdf',
        fileSize: '840 KB',
        description: 'SK resmi penetapan Pembina, BPH, dan Anggota Divisi GenBI UPN "Veteran" Jawa Timur.',
        publishedAt: now,
        createdAt: now,
        updatedAt: now,
      },
    ],
    activityLogs: [
      {
        id: 1,
        adminName: 'Sistem',
        action: 'INIT',
        description: 'Inisialisasi database awal CMS GenBIHub',
        createdAt: now,
      },
    ],
  };
}

// Helper membaca & menulis database atomic
function readDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_FILE_PATH)) {
      const initial = getInitialData();
      fs.mkdirSync(path.dirname(DB_FILE_PATH), { recursive: true });
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const raw = fs.readFileSync(DB_FILE_PATH, 'utf-8');
    return JSON.parse(raw) as DatabaseSchema;
  } catch (err) {
    console.error('Error reading database file, resetting to initial:', err);
    return getInitialData();
  }
}

function writeDb(data: DatabaseSchema): void {
  try {
    fs.mkdirSync(path.dirname(DB_FILE_PATH), { recursive: true });
    // Write atomic via temp file to prevent corruption
    const tempPath = `${DB_FILE_PATH}.tmp`;
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempPath, DB_FILE_PATH);
  } catch (err) {
    console.error('Error writing database file:', err);
  }
}

// Database Repository Object
export const db = {
  // --- ADMIN USERS ---
  adminUser: {
    findFirst: async (predicate?: (user: AdminUser) => boolean) => {
      const data = readDb();
      return predicate ? data.adminUsers.find(predicate) ?? null : data.adminUsers[0] ?? null;
    },
    findUnique: async ({ username, email, id }: { username?: string; email?: string; id?: number }) => {
      const data = readDb();
      return data.adminUsers.find(u => 
        (username && u.username === username) || 
        (email && u.email === email) || 
        (id && u.id === id)
      ) ?? null;
    },
  },

  // --- BANNERS ---
  banner: {
    findMany: async () => {
      const data = readDb();
      return [...data.banners].sort((a, b) => a.sortOrder - b.sortOrder);
    },
    create: async (input: Omit<Banner, 'id' | 'createdAt' | 'updatedAt'>) => {
      const data = readDb();
      const now = new Date().toISOString();
      const newId = data.banners.length > 0 ? Math.max(...data.banners.map(b => b.id)) + 1 : 1;
      const newBanner: Banner = { ...input, id: newId, createdAt: now, updatedAt: now };
      data.banners.push(newBanner);
      writeDb(data);
      return newBanner;
    },
    update: async (id: number, input: Partial<Banner>) => {
      const data = readDb();
      const idx = data.banners.findIndex(b => b.id === id);
      if (idx === -1) throw new Error('Banner not found');
      data.banners[idx] = { ...data.banners[idx], ...input, updatedAt: new Date().toISOString() };
      writeDb(data);
      return data.banners[idx];
    },
    delete: async (id: number) => {
      const data = readDb();
      data.banners = data.banners.filter(b => b.id !== id);
      writeDb(data);
      return true;
    },
  },

  // --- BPH & PEMBINA ---
  bphMember: {
    findMany: async () => {
      const data = readDb();
      return [...data.bphMembers].sort((a, b) => a.sortOrder - b.sortOrder);
    },
    create: async (input: Omit<BphMember, 'id' | 'createdAt' | 'updatedAt'>) => {
      const data = readDb();
      const now = new Date().toISOString();
      const newId = data.bphMembers.length > 0 ? Math.max(...data.bphMembers.map(m => m.id)) + 1 : 1;
      const newMember: BphMember = { ...input, id: newId, createdAt: now, updatedAt: now };
      data.bphMembers.push(newMember);
      writeDb(data);
      return newMember;
    },
    update: async (id: number, input: Partial<BphMember>) => {
      const data = readDb();
      const idx = data.bphMembers.findIndex(m => m.id === id);
      if (idx === -1) throw new Error('Member not found');
      data.bphMembers[idx] = { ...data.bphMembers[idx], ...input, updatedAt: new Date().toISOString() };
      writeDb(data);
      return data.bphMembers[idx];
    },
    delete: async (id: number) => {
      const data = readDb();
      data.bphMembers = data.bphMembers.filter(m => m.id !== id);
      writeDb(data);
      return true;
    },
  },

  // --- DIVISI & ANGGOTA ---
  division: {
    findMany: async () => {
      const data = readDb();
      return [...data.divisions].sort((a, b) => a.sortOrder - b.sortOrder);
    },
    findBySlug: async (slug: string) => {
      const data = readDb();
      return data.divisions.find(d => d.slug === slug) ?? null;
    },
    findById: async (id: number) => {
      const data = readDb();
      return data.divisions.find(d => d.id === id) ?? null;
    },
    create: async (input: Omit<Division, 'id' | 'members' | 'createdAt' | 'updatedAt'>) => {
      const data = readDb();
      const now = new Date().toISOString();
      const newId = data.divisions.length > 0 ? Math.max(...data.divisions.map(d => d.id)) + 1 : 1;
      const newDiv: Division = { ...input, id: newId, members: [], createdAt: now, updatedAt: now };
      data.divisions.push(newDiv);
      writeDb(data);
      return newDiv;
    },
    update: async (id: number, input: Partial<Division>) => {
      const data = readDb();
      const idx = data.divisions.findIndex(d => d.id === id);
      if (idx === -1) throw new Error('Division not found');
      data.divisions[idx] = { ...data.divisions[idx], ...input, updatedAt: new Date().toISOString() };
      writeDb(data);
      return data.divisions[idx];
    },
    delete: async (id: number) => {
      const data = readDb();
      data.divisions = data.divisions.filter(d => d.id !== id);
      data.divisionMembers = data.divisionMembers.filter(m => m.divisionId !== id);
      writeDb(data);
      return true;
    },
    addMember: async (divisionId: number, memberInput: Omit<DivisionMember, 'id' | 'divisionId' | 'createdAt' | 'updatedAt'>) => {
      const data = readDb();
      const div = data.divisions.find(d => d.id === divisionId);
      if (!div) throw new Error('Division not found');

      const now = new Date().toISOString();
      const newMemId = data.divisionMembers.length > 0 ? Math.max(...data.divisionMembers.map(m => m.id)) + 1 : 1;
      const newMember: DivisionMember = {
        ...memberInput,
        id: newMemId,
        divisionId,
        createdAt: now,
        updatedAt: now,
      };

      data.divisionMembers.push(newMember);
      div.members.push(newMember);
      div.updatedAt = now;
      writeDb(data);
      return newMember;
    },
    updateMember: async (memberId: number, input: Partial<DivisionMember>) => {
      const data = readDb();
      const memIdx = data.divisionMembers.findIndex(m => m.id === memberId);
      if (memIdx === -1) throw new Error('Member not found');
      
      const now = new Date().toISOString();
      data.divisionMembers[memIdx] = { ...data.divisionMembers[memIdx], ...input, updatedAt: now };

      // Update in division object too
      const div = data.divisions.find(d => d.id === data.divisionMembers[memIdx].divisionId);
      if (div) {
        const divMemIdx = div.members.findIndex(m => m.id === memberId);
        if (divMemIdx !== -1) {
          div.members[divMemIdx] = data.divisionMembers[memIdx];
        }
      }

      writeDb(data);
      return data.divisionMembers[memIdx];
    },
    deleteMember: async (memberId: number) => {
      const data = readDb();
      const mem = data.divisionMembers.find(m => m.id === memberId);
      if (!mem) return false;

      data.divisionMembers = data.divisionMembers.filter(m => m.id !== memberId);
      const div = data.divisions.find(d => d.id === mem.divisionId);
      if (div) {
        div.members = div.members.filter(m => m.id !== memberId);
      }
      writeDb(data);
      return true;
    },
  },

  // --- BERITA / ARTIKEL ---
  article: {
    findMany: async (status?: 'DRAFT' | 'PUBLISHED') => {
      const data = readDb();
      let list = [...data.articles];
      if (status) {
        list = list.filter(a => a.status === status);
      }
      return list.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    },
    findBySlug: async (slug: string) => {
      const data = readDb();
      return data.articles.find(a => a.slug === slug) ?? null;
    },
    findById: async (id: number) => {
      const data = readDb();
      return data.articles.find(a => a.id === id) ?? null;
    },
    create: async (input: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>) => {
      const data = readDb();
      const now = new Date().toISOString();
      const newId = data.articles.length > 0 ? Math.max(...data.articles.map(a => a.id)) + 1 : 1;
      const newArticle: Article = {
        ...input,
        id: newId,
        publishedAt: input.publishedAt || now,
        createdAt: now,
        updatedAt: now,
      };
      data.articles.push(newArticle);
      writeDb(data);
      return newArticle;
    },
    update: async (id: number, input: Partial<Article>) => {
      const data = readDb();
      const idx = data.articles.findIndex(a => a.id === id);
      if (idx === -1) throw new Error('Article not found');
      data.articles[idx] = { ...data.articles[idx], ...input, updatedAt: new Date().toISOString() };
      writeDb(data);
      return data.articles[idx];
    },
    delete: async (id: number) => {
      const data = readDb();
      data.articles = data.articles.filter(a => a.id !== id);
      writeDb(data);
      return true;
    },
  },

  // --- PRESTASI ---
  achievement: {
    findMany: async () => {
      const data = readDb();
      return [...data.achievements].sort((a, b) => a.sortOrder - b.sortOrder);
    },
    create: async (input: Omit<Achievement, 'id' | 'createdAt' | 'updatedAt'>) => {
      const data = readDb();
      const now = new Date().toISOString();
      const newId = data.achievements.length > 0 ? Math.max(...data.achievements.map(a => a.id)) + 1 : 1;
      const newAch: Achievement = { ...input, id: newId, createdAt: now, updatedAt: now };
      data.achievements.push(newAch);
      writeDb(data);
      return newAch;
    },
    update: async (id: number, input: Partial<Achievement>) => {
      const data = readDb();
      const idx = data.achievements.findIndex(a => a.id === id);
      if (idx === -1) throw new Error('Achievement not found');
      data.achievements[idx] = { ...data.achievements[idx], ...input, updatedAt: new Date().toISOString() };
      writeDb(data);
      return data.achievements[idx];
    },
    delete: async (id: number) => {
      const data = readDb();
      data.achievements = data.achievements.filter(a => a.id !== id);
      writeDb(data);
      return true;
    },
  },

  // --- DOKUMEN ARSIP ---
  document: {
    findMany: async () => {
      const data = readDb();
      return [...data.documents].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    },
    create: async (input: Omit<DocumentArchive, 'id' | 'createdAt' | 'updatedAt'>) => {
      const data = readDb();
      const now = new Date().toISOString();
      const newId = data.documents.length > 0 ? Math.max(...data.documents.map(d => d.id)) + 1 : 1;
      const newDoc: DocumentArchive = {
        ...input,
        id: newId,
        publishedAt: input.publishedAt || now,
        createdAt: now,
        updatedAt: now,
      };
      data.documents.push(newDoc);
      writeDb(data);
      return newDoc;
    },
    delete: async (id: number) => {
      const data = readDb();
      data.documents = data.documents.filter(d => d.id !== id);
      writeDb(data);
      return true;
    },
  },

  // --- ACTIVITY LOGS ---
  activityLog: {
    findMany: async (limit: number = 20) => {
      const data = readDb();
      return [...data.activityLogs]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, limit);
    },
    create: async (input: { adminId?: number; adminName?: string; action: string; description: string; ipAddress?: string }) => {
      const data = readDb();
      const newId = data.activityLogs.length > 0 ? Math.max(...data.activityLogs.map(l => l.id)) + 1 : 1;
      const newLog: ActivityLog = {
        id: newId,
        adminId: input.adminId ?? null,
        adminName: input.adminName ?? 'Admin',
        action: input.action,
        description: input.description,
        ipAddress: input.ipAddress ?? null,
        createdAt: new Date().toISOString(),
      };
      data.activityLogs.push(newLog);
      writeDb(data);
      return newLog;
    },
  },

  // --- STATS OVERVIEW ---
  getStats: async () => {
    const data = readDb();
    return {
      banners: data.banners.length,
      bphMembers: data.bphMembers.length,
      divisions: data.divisions.length,
      totalMembers: data.divisionMembers.length,
      articles: data.articles.length,
      achievements: data.achievements.length,
      documents: data.documents.length,
    };
  },
};

export default db;
