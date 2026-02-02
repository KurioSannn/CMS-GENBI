// data/members.ts

export interface Member {
  name: string;
  position: string;
  prodiAngkatan: string;
  imageGif: string;
}

export interface Division {
  name: string;
  slug: string;
  logo: string; // Path ke logo divisi di folder public
  description: string;
  members: Member[];
}

// Data Foto Tim dan Profil Utama
export const genbiPhotos = {
  profileMain: "/foto profile genbiupnvjt.png",
  teams: [
    { name: "BPH", src: "/BPH ALL TEAM.png" },
    { name: "HUBEKS", src: "/HUBEKS ALL TEAM.png" },
    { name: "MEDKOM", src: "/Medkom ALL TEAM.png" },
    { name: "SOSLING", src: "/SOSLING ALL TEAM.png" },
    { name: "PSDM", src: "/PSDM ALL TEAM.png" },
    { name: "PENDIDIKAN", src: "/Pendidikan ALL TEAM.png" },
    { name: "EKRAF", src: "/EKRAF ALL TEAM.png" },
  ]
};

// Data Seluruh Divisi dan Anggota
export const genbiDivisions: Division[] = [
  {
    name: "Badan Pengurus Harian (BPH)",
    slug: "bph",
    logo: "/bph.png",
    description: "Inti kepemimpinan dan penggerak organisasi GenBI UPNVJT.",
    members: [
      { name: "Masyaroh Unafaznil Khoiroh", position: "Ketua Umum", prodiAngkatan: "Hukum '22", imageGif: "/members/Maysa.gif" },
      { name: "Titis Fajar Nurdansyah", position: "Wakil Ketua Umum", prodiAngkatan: "Informatika '22", imageGif: "/members/Fajar.gif" },
      { name: "Natasya Maura Amanda Febrianti", position: "Sekretaris I", prodiAngkatan: "Ilmu Sosial dan Ilmu Politik '22", imageGif: "/members/Natasha.gif" },
      { name: "Theressa Marry Christianity", position: "Sekretaris II", prodiAngkatan: "Informatika '23", imageGif: "/members/There.gif" },
      { name: "Verdiansyah Ayus Aprilyan", position: "Bendahara", prodiAngkatan: "Informatika '22", imageGif: "/members/Ayus.gif" },
    ],
  },
  {
    name: "Ekonomi Kreatif (EKRAF)",
    slug: "ekraf",
    logo: "/Ekraf.png",
    description: "Mengembangkan potensi ekonomi kreatif anggota dan masyarakat.",
    members: [
      { name: "Chelya Indi Kholliah", position: "Kepala Divisi", prodiAngkatan: "Administrasi Publik '22", imageGif: "/members/kak chelya.gif" },
      { name: "Adhistya Ayu Andriani", position: "Staff", prodiAngkatan: "Administrasi Bisnis '22", imageGif: "/members/Adhista AYU.gif" },
      { name: "Mareta Salsa Mariolah", position: "Staff", prodiAngkatan: "Manajemen '22", imageGif: "/members/Mareta Salsa.gif" },
      { name: "Noviyanti Puspita", position: "Staff", prodiAngkatan: "Ekonomi Pembangunan '22", imageGif: "/members/Noviyanti Pusvita.gif" },
      { name: "Abel Dwi Pratiwi", position: "Staff", prodiAngkatan: "Akuntansi '23", imageGif: "/members/Abel Dwi Pratiwi.gif" },
      { name: "Helvyyana Wulandari", position: "Staff", prodiAngkatan: "Akuntansi '22", imageGif: "/members/helviyyana wulandari.gif" },
      { name: "Muhamad Yusuf Arohman", position: "Staff", prodiAngkatan: "Informatika '23", imageGif: "/members/Muhammad Yusuf.gif" },
    ],
  },
// data/members.ts (Bagian Hubeks yang diperbarui)

{
  name: "Hubungan Eksternal",
  slug: "hubeks",
  logo: "/Hubeks.png",
  description: "Membangun relasi strategis dan memperluas jaringan kolaborasi GenBI UPNVJT.",
  members: [
    { name: "Rikza Hakal Siraji", position: "Kepala Divisi", prodiAngkatan: "Informatika '22", imageGif: "/members/mas rikza.gif" },
    { name: "Bagas Aji Dariansyah", position: "Staff", prodiAngkatan: "Hukum '22", imageGif: "/members/bagas aji.gif" },
    { 
      name: "Berliana Mohamad Maqin", 
      position: "Staff", 
      prodiAngkatan: "Ekonomi Pembangunan '23", 
      imageGif: "/members/berlian.gif" 
    },
    { name: "Rayhan Ahmad Mikai", position: "Staff", prodiAngkatan: "Ekonomi Pembangunan '22", imageGif: "/members/reyhan.gif" },
    { name: "Senja Nurmala", position: "Staff", prodiAngkatan: "Administrasi Publik '22", imageGif: "/members/senja.gif" },
        { name: "Khairum Ummah Sipayung", position: "Staff", prodiAngkatan: "Ilmu Komunikasi '22", imageGif: "/members/Khairum.gif" },
    { 
      name: "Yunita Anggraini Seyawati", 
      position: "Staff", 
      prodiAngkatan: "Akuntansi '22", 
      imageGif: "/members/yunita.gif" 
    },
  ],
},
  {
    name: "Media dan Komunikasi (MEDKOM)",
    slug: "medkom",
    logo: "/Medkom.png",
    description: "Bertanggung jawab atas branding dan publikasi GenBI.",
    members: [
      { name: "Nurul Izzah", position: "Kepala Divisi", prodiAngkatan: "Sistem Informasi '22", imageGif: "/members/Icha.gif" },
      { name: "Aniswatin Putri Mufajar", position: "Staff", prodiAngkatan: "Ekonomi Pembangunan '22", imageGif: "/members/Aniswatin Putri.gif" },
      { name: "Cipta Hening Aliflah Cheilla Paramitha Rizky Selaksa Sa", position: "Staff", prodiAngkatan: "Manajemen '22", imageGif: "/members/Cipta Hening.gif" },
      { name: "Muhammad Rakha Syallendra", position: "Staff", prodiAngkatan: "Informatika '23", imageGif: "/members/Raka.gif" },
      { name: "Ifan Zamroni", position: "Staff", prodiAngkatan: "Manajemen '23", imageGif: "/members/Ifan.gif" },
      { name: "Muffichatur Rofiah", position: "Staff", prodiAngkatan: "Informatika '23", imageGif: "/members/Muflih.gif" },
      { name: "Dimas Rafi Parama Putra", position: "Staff", prodiAngkatan: "Akuntansi '22", imageGif: "/members/Dimas .gif" },
    ],
  },
  {
    name: "Pendidikan",
    slug: "pendidikan",
    logo: "/Pendidikan.png",
    description: "Meningkatkan literasi dan pengetahuan anggota dan masyarakat.",
    members: [
      { name: "Diana Theresia Klau", position: "Kepala Divisi", prodiAngkatan: "Hubungan Internasional '22", imageGif: "/members/dianaklau.gif" },
      { name: "Agika Rahmah Putri", position: "Staff", prodiAngkatan: "Ilmu Komunikasi '22", imageGif: "/members/agika.gif" },
      { name: "Ahmad Nurrafir Affitsani", position: "Staff", prodiAngkatan: "Administrasi Bisnis '22", imageGif: "/members/nurrafi.gif" },
      { name: "M. Farid Dwi Prasetyo", position: "Staff", prodiAngkatan: "Agroteknologi '22", imageGif: "/members/Farid.gif" },
      { name: "Chesta Surya Ebertha", position: "Staff", prodiAngkatan: "Ilmu Sosial dan Ilmu Politik '22", imageGif: "/members/chesta.gif" },
      { name: "Dian Maharani", position: "Staff", prodiAngkatan: "Informatika '22", imageGif: "/members/dianmaharani.gif" },
      { name: "Pregiwa Nirmalasar", position: "Staff", prodiAngkatan: "Ilmu Sosial dan Ilmu Politik '22", imageGif: "/members/pregiwa.gif" },
      { name: "Salsablia Ilmi Romadhoni", position: "Staff", prodiAngkatan: "Agribisnis '22", imageGif: "/members/salsabila.gif" },
    ],
  },
  {
    name: "Pengembangan Sumber Daya Manusia (PSDM)",
    slug: "psdm",
    logo: "/PSDM.png",
    description: "Fokus pada peningkatan kualitas dan potensi anggota GenBI.",
    members: [
      { name: "Rifais Aflaha Makasabat", position: "Kepala Divisi", prodiAngkatan: "Hubungan Internasional '22", imageGif: "/members/Rifals Aflaha.gif" },
      { name: "Cecila Putri Oktaviani", position: "Staff", prodiAngkatan: "Administrasi Bisnis '22", imageGif: "/members/Cecilia Yuandhika.gif" },
      { name: "Yasita Nursiva", position: "Staff", prodiAngkatan: "Informatika '22", imageGif: "/members/Yasita.gif" },
      { name: "Adelia Yuandhika", position: "Staff", prodiAngkatan: "Informatika '22", imageGif: "/members/Adelia Yuandhika.gif" },
      { name: "Caroline February", position: "Staff", prodiAngkatan: "Sistem Informasi '23", imageGif: "/members/Caroline Febrianty.gif" },
      { name: "Ghaniya Azzahra Zen", position: "Staff", prodiAngkatan: "Akuntansi '22", imageGif: "/members/Ghaniya Azzahra Zen.gif" },
      { name: "Reno Alfa Reza", position: "Staff", prodiAngkatan: "Informatika '23", imageGif: "/members/Reno Alfa Reza.gif" },
      { name: "Mohammad Reza Ar Rizky", position: "Staff", prodiAngkatan: "Agroteknologi '22", imageGif: "/members/Muhammad Reza Ar Rizky.gif" },
    ],
  },
  {
    name: "Sosial dan Lingkungan (SOSLING)",
    slug: "sosling",
    logo: "/Sosling.png",
    description: "Fokus pada kegiatan sosial dan kepedulian lingkungan.",
    members: [
      { name: "Valiza Eka Putri", position: "Kepala Divisi", prodiAngkatan: "Administrasi Bisnis '22", imageGif: "/members/Valiza Eka.gif" },
      { name: "Nadya Nur Ramadhan", position: "Staff", prodiAngkatan: "Akuntansi '22", imageGif: "/members/Nadya Ramadhani.gif" },
      { name: "Venosa Putri Mirayudha", position: "Staff", prodiAngkatan: "Agribisnis '22", imageGif: "/members/Venosa Putri.gif" },
      { name: "Afriia Dwi Afrianti", position: "Staff", prodiAngkatan: "Ilmu Sosial dan Ilmu Politik '23", imageGif: "/members/Afrilia Dwi Arifianti.gif" },
      { name: "Arli Rada Candra", position: "Staff", prodiAngkatan: "Agroteknologi '22", imageGif: "/members/Aril Rada Candra.gif" },
      { name: "Galuh Sahirah", position: "Staff", prodiAngkatan: "Akuntansi '23", imageGif: "/members/Galuh Sahirah.gif" },
      { name: "Haura Taqiya Azza Nabila", position: "Staff", prodiAngkatan: "Sistem Informasi '23", imageGif: "/members/Haura Taqiya.gif" },
      { name: "Lidia Patricia Manullang", position: "Staff", prodiAngkatan: "Ilmu Sosial dan Ilmu Politik '22", imageGif: "/members/Lidia Patricia.gif" },
    ],
  },
];