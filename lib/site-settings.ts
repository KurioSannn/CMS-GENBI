export interface SiteStatItem {
  label: string;
  value: number;
  suffix: string;
  sub: string;
  isFloat?: boolean;
}

export interface SitePosterItem {
  id: number;
  src: string;
  title: string;
}

export interface SiteFaqItem {
  question: string;
  answer: string;
}

export interface SiteSettings {
  popup: {
    enabled: boolean;
    badge: string;
    title: string;
    highlight: string;
    ctaText: string;
  };
  about: {
    tagline: string;
    description: string;
    prokerCount: number;
    activeMemberCount: number;
    virtualTourUrl: string;
    profileHeroImage: string;
  };
  stats: SiteStatItem[];
  historyParagraphs: string[];
  recruitment: {
    isOpen: boolean;
    badge: string;
    modalTitle: string;
    noticeText: string;
    detailUrl: string;
    formUrl: string;
    contactPerson: string;
    requirements: string[];
    posters: SitePosterItem[];
  };
  faqs: SiteFaqItem[];
  contact: {
    email: string;
    instagramHandle: string;
    instagramUrl: string;
    whatsappLabel: string;
    whatsappUrl: string;
    youtubeUrl: string;
    locationLabel: string;
    mapsLink: string;
    mapsEmbedUrl: string;
  };
  footer: {
    copyrightText: string;
    guideLabel: string;
    guideUrl: string;
  };
  updatedAt: string;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  popup: {
    enabled: true,
    badge: 'GenBI 2026 Open',
    title: 'Beasiswa Bank Indonesia',
    highlight: 'Resmi Dibuka!',
    ctaText: 'Daftar Sekarang Melalui Website',
  },
  about: {
    tagline: 'GenBI UPNVJT Hub',
    description:
      'Komunitas mahasiswa penerima Beasiswa Bank Indonesia yang berdedikasi membangun negeri melalui inovasi dan aksi nyata.',
    prokerCount: 35,
    activeMemberCount: 74,
    virtualTourUrl: 'http://upnjatim.ac.id/vtour/',
    profileHeroImage: '/foto profile genbiupnvjt.png',
  },
  stats: [
    { label: 'ANGGOTA AKTIF', value: 100, suffix: '+', sub: 'MAHASISWA TERPILIH' },
    { label: 'PROKER TERLAKSANA', value: 50, suffix: '+', sub: 'TAHUNAN' },
    { label: 'IPK RATA-RATA', value: 3.75, suffix: '', sub: 'PRESTASI AKADEMIK', isFloat: true },
  ],
  historyParagraphs: [
    'Generasi Baru Indonesia (GenBI) resmi didirikan pada tanggal 11 November 2011. Komunitas ini lahir atas inisiasi Bank Indonesia sebagai wadah bagi para mahasiswa terpilih penerima beasiswa Bank Indonesia yang tersebar di seluruh pelosok negeri.',
    '"GenBI tidak hanya sekadar kelompok penerima bantuan finansial, melainkan sebuah laboratorium kepemimpinan yang dibentuk untuk mengasah jiwa sosial dan kompetensi mahasiswa guna mempersiapkan pemimpin bangsa di masa depan."',
    'Di lingkungan UPN "Veteran" Jawa Timur, GenBI terus bertransformasi menjadi energi progresif yang aktif dalam mendukung program kerja Bank Indonesia dan pengabdian masyarakat.',
  ],
  recruitment: {
    isOpen: true,
    badge: 'Official Recruitment 2026',
    modalTitle: 'Join GenBI 2026',
    noticeText:
      'PENTING: Berkas fisik WAJIB dikumpulkan di BAKK UPNVJT pada 6 April 2026 (09.00 - 12.00 WIB). Harap membawa dokumen Check List Seleksi Administrasi.',
    detailUrl: 'https://www.instagram.com/p/DWZII3Rk12q/?img_index=6',
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfVe-pLgMyRKDCza5GABvOF2P8-8jlygDLxMqqBfIqegpR2Bg/viewform',
    contactPerson: 'CP: Fajar (+62 857-8403-1260)',
    requirements: [
      'Mahasiswa aktif minimal semester 3',
      'IPK Minimal 3.00 (Skala 4.00)',
      'Tidak sedang menerima beasiswa lain',
      'Aktif dalam organisasi atau kegiatan sosial',
      'Bersedia berperan aktif dalam komunitas GenBI',
    ],
    posters: [
      {
        id: 1,
        src: '/Pembukaan seleksi GenBI UPN “Veteran” Jawa Timur resmi di (1).webp',
        title: 'Jadwal Seleksi',
      },
      {
        id: 2,
        src: '/Pembukaan seleksi GenBI UPN “Veteran” Jawa Timur resmi di (3).webp',
        title: 'Poster Utama',
      },
      {
        id: 3,
        src: '/Pembukaan seleksi GenBI UPN “Veteran” Jawa Timur resmi di (2).webp',
        title: 'Kriteria Studi',
      },
    ],
  },
  faqs: [
    {
      question: 'Apa saja syarat utama pendaftaran Beasiswa Bank Indonesia?',
      answer:
        'Syarat utama meliputi mahasiswa aktif minimal semester 3, IPK minimal 3.00 (skala 4.00), tidak sedang menerima beasiswa lain, serta aktif dalam organisasi atau kegiatan sosial.',
    },
    {
      question: 'Apa peran utama komunitas GenBI bagi mahasiswa?',
      answer:
        'GenBI berperan sebagai Front Liners (mengomunikasikan kebijakan BI), Change Agents (agen perubahan), dan Future Leaders (calon pemimpin masa depan).',
    },
    {
      question: 'Kapan pendaftaran periode 2026/2027 dibuka?',
      answer:
        'Saat ini pendaftaran belum dibuka. Mohon pantau terus akun Instagram resmi kami untuk informasi tanggal pendaftaran dan timeline seleksi terbaru.',
    },
    {
      question: 'Apakah mahasiswa semester akhir masih boleh mendaftar?',
      answer:
        'Batas pendaftaran biasanya adalah mahasiswa yang masih memiliki masa studi aktif minimal satu tahun atau tidak sedang menempuh semester akhir saat masa beasiswa berjalan.',
    },
    {
      question: 'Apa saja tahapan seleksi Beasiswa Bank Indonesia?',
      answer:
        'Tahapan seleksi terdiri dari seleksi administrasi (berkas), seleksi wawancara oleh pihak Bank Indonesia, dan pengumuman akhir.',
    },
  ],
  contact: {
    email: 'genbi.upnvjt@gmail.com',
    instagramHandle: '@genbi_upnvjatim',
    instagramUrl: 'https://www.instagram.com/genbi_upnvjatim/',
    whatsappLabel: 'Chat Sekarang',
    whatsappUrl: 'https://wa.me/62881025134107',
    youtubeUrl: 'https://youtube.com/@genbiupnvjt',
    locationLabel: 'UPN "Veteran" Jawa Timur',
    mapsLink: 'https://maps.app.goo.gl/3fTuxEHeD5U2iA8Y9',
    mapsEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.266224372991!2d112.7876256!3d-7.3304586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fac70e443301%3A0x6b801a6b0c679905!2sUPN%20%22Veteran%22%20Jawa%20Timur!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid',
  },
  footer: {
    copyrightText: '© 2025 GenBI UPNVJT.',
    guideLabel: 'Pedoman Komunitas',
    guideUrl: 'https://id.scribd.com/document/688727432/Generasi-Baru-Bank-Indonesia-GENBI',
  },
  updatedAt: '2026-01-01T00:00:00.000Z',
};

export function mergeSiteSettings(partial?: Partial<SiteSettings> | null): SiteSettings {
  if (!partial) return DEFAULT_SITE_SETTINGS;
  return {
    popup: { ...DEFAULT_SITE_SETTINGS.popup, ...(partial.popup || {}) },
    about: { ...DEFAULT_SITE_SETTINGS.about, ...(partial.about || {}) },
    stats: Array.isArray(partial.stats) ? partial.stats : DEFAULT_SITE_SETTINGS.stats,
    historyParagraphs: Array.isArray(partial.historyParagraphs)
      ? partial.historyParagraphs
      : DEFAULT_SITE_SETTINGS.historyParagraphs,
    recruitment: {
      ...DEFAULT_SITE_SETTINGS.recruitment,
      ...(partial.recruitment || {}),
      requirements: Array.isArray(partial.recruitment?.requirements)
        ? partial.recruitment!.requirements
        : DEFAULT_SITE_SETTINGS.recruitment.requirements,
      posters: Array.isArray(partial.recruitment?.posters)
        ? partial.recruitment!.posters
        : DEFAULT_SITE_SETTINGS.recruitment.posters,
    },
    faqs: Array.isArray(partial.faqs) ? partial.faqs : DEFAULT_SITE_SETTINGS.faqs,
    contact: { ...DEFAULT_SITE_SETTINGS.contact, ...(partial.contact || {}) },
    footer: { ...DEFAULT_SITE_SETTINGS.footer, ...(partial.footer || {}) },
    updatedAt: partial.updatedAt || DEFAULT_SITE_SETTINGS.updatedAt,
  };
}
