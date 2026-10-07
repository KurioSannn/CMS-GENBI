# 🎓 GenBI-Hub — Web Portal & CMS GenBI UPN "Veteran" Jawa Timur

[![Next.js](https://img.shields.io/badge/Next.js-15.x-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.x-61dafb?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat&logo=prisma)](https://www.prisma.io/)
[![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-Latest-f97316?style=flat&logo=lucide)](https://lucide.dev/)

**GenBI-Hub** adalah platform web portal resmi dan Content Management System (CMS) bagi komunitas mahasiswa penerima Beasiswa Bank Indonesia di **Universitas Pembangunan Nasional "Veteran" Jawa Timur (GenBI UPNVJT)** yang dibina oleh **Kantor Perwakilan (KPw) Bank Indonesia Provinsi Jawa Timur**.

---

## 🌟 Fitur Utama

### 🌐 1. Portal Publik (Public Portal)
* **Hero Banner Carousel**: Slider dinamis kegiatan unggulan dan tautan ajakan aksi (CTA).
* **Pojok Edukasi Kebijakan BI**: Literasi Cinta Bangga Paham (CBP) Rupiah, sosialisasi QRIS, dan sistem pembayaran digital.
* **Info Seleksi Beasiswa Bank Indonesia**: Panduan berkas pendaftaran, kriteria IPK, alur seleksi, dan tautan formulir pendaftaran.
* **Struktur Organisasi & Divisi**: Profil Pembina, BPH, dan halaman divisi interaktif lengkap dengan kartu anggota animasi GIF.
* **Portal Berita & Dokumentasi**: Artikel rilis kegiatan organisasi dan opini mahasiswa.
* **Showcase Prestasi (Hall of Fame)**: Rekap capaian juara dan penghargaan anggota/komunitas.
* **Bank Data & Dokumen Unduhan**: Arsip SK Beasiswa resmi, template LPJ, proposal, dan AD/ART dalam format PDF.

### 🛡️ 2. CMS Admin Dashboard (`/admin`)
* **Dashboard Metrik & Ringkasan**: Statistik jumlah data, log aktivitas admin terkini, dan akses cepat.
* **Manajemen Konten Lengkap**: CRUD Banner, Berita/Artikel, Struktur BPH, Divisi & Anggota, Prestasi, Dokumen Arsip, dan Master Kategori.
* **Media Upload Manager**: Pengunggah gambar (WebP/PNG/JPG) dan dokumen PDF dengan kompresi otomatis.
* **Autentikasi Aman**: Login terproteksi cookie JWT HttpOnly, hash password bcrypt, dan Next.js Middleware.

---

## 🚀 Panduan Memulai Cepat (Quick Start)

### 1. Kebutuhan Sistem (Prerequisites)
* **Node.js**: Versi 20.x ke atas
* **NPM**: Versi 10.x ke atas

### 2. Instalasi Dependensi
```bash
git clone -b dev-cms https://github.com/KurioSannn/CMS-GENBI.git
cd CMS-GENBI
npm install
```

### 3. Konfigurasi Environment (`.env`)
Salin file `.env.example` ke `.env`:
```bash
cp .env.example .env
```
Isi konfigurasi `.env`:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="genbi_upnvjt_secret_jwt_key_2026_super_secure"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 4. Setup Database & Seeding Awal
```bash
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts
```

### 5. Menjalankan Server Development
```bash
npm run dev
```
Buka peramban di [http://localhost:3000](http://localhost:3000).

---

## 🔐 Kredensial Default Login Admin
* **URL Login**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
* **Username**: `admin`
* **Password**: `admin123`

---

## 📁 Struktur Direktori Proyek

```text
├── components/          # Komponen UI Reusable (Navbar, Footer, Hero, Cards, dll)
├── data/                # Data referensi & seeding awal
├── lib/
│   ├── controllers/     # Controller & Logika Bisnis (Semua query database di sini)
│   ├── auth.ts          # Utilitas JWT, Cookie, & Hash Password
│   ├── db.ts            # Fallback & Interface Entitas
│   └── prisma.ts        # Prisma Client Singleton
├── pages/
│   ├── admin/           # Halaman CMS Admin Dashboard
│   ├── api/             # API Route Handlers (Auth, Admin CRUD, Upload)
│   ├── berita/          # Halaman Publik Berita & Detail
│   ├── divisi/          # Halaman Publik Detail Divisi
│   └── index.tsx        # Halaman Beranda Publik
├── prisma/
│   ├── schema.prisma    # Skema Database Prisma (MySQL / SQLite)
│   └── seed.ts          # Script Seeding Data Awal GenBI UPNVJT
├── public/              # Aset Statis (Foto anggota, logo, uploads)
└── styles/              # Global Styles & Tailwind CSS
```

---

## 📚 Dokumentasi Teknis Lengkap

* 🤖 [**AGENTS.md**](./AGENTS.md) — Aturan baku dan SOP kerja AI Agent / Developer.
* 📋 [**PRD.md**](./PRD.md) — *Product Requirements Document* resmi GenBI-Hub.
* 🏗️ [**system.md**](./system.md) — Arsitektur sistem dan spesifikasi teknis mendalam.
* 📡 [**frontend-flow-contract.md**](./frontend-flow-contract.md) — Spesifikasi API contracts & UI flow.
* 📝 [**Revision_Prompt.md**](./Revision_Prompt.md) — Master sprint checklist dan prompt pengembangan.
* ⚙️ [**backend/README.md**](./backend/README.md) — Dokumentasi backend & controller.
* 🎨 [**frontend/README.md**](./frontend/README.md) — Dokumentasi komponen antarmuka frontend.

---

## 👥 Tim Pengembang & Kontributor
* **Organisasi**: GenBI Komisariat UPN "Veteran" Jawa Timur
* **Naungan**: Kantor Perwakilan Bank Indonesia Provinsi Jawa Timur
