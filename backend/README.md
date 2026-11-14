# ⚙️ Backend & API Architecture Documentation — GenBI-Hub

Dokumentasi ini menjelaskan arsitektur backend, lapisan controller, pengelolaan basis data, dan sistem autentikasi pada aplikasi **GenBI-Hub CMS**.

---

## 📂 Struktur Direktori Backend

```text
├── lib/
│   ├── controllers/            # Lapisan Controller & Logika Bisnis Utama
│   │   ├── achievement.controller.ts # CRUD Prestasi & Penghargaan
│   │   ├── article.controller.ts     # CRUD Berita & Artikel
│   │   ├── auth.controller.ts        # Logika Login, Logout, & Session
│   │   ├── banner.controller.ts      # CRUD Hero Carousel Banner
│   │   ├── bph.controller.ts         # CRUD Pembina & BPH
│   │   ├── category.controller.ts    # CRUD Master Kategori Dinamis
│   │   ├── division.controller.ts    # CRUD Divisi & Anggota
│   │   ├── document.controller.ts    # CRUD Arsip Dokumen PDF
│   │   ├── stats.controller.ts       # Agregasi Data Metrik Dashboard
│   │   └── workprogram.controller.ts # CRUD Program Kerja Divisi
│   ├── auth.ts                 # Utilitas JWT Token, Hash Bcrypt, & Cookie
│   ├── db.ts                   # Storage Database Engine & Type Definitions
│   ├── prisma.ts               # Prisma Client Singleton Instance
│   └── utils.ts                # Helper (Slugify, Date Formatter, String Formatter)
├── pages/api/
│   ├── admin/                  # Endpoint API CRUD Admin (Terproteksi)
│   ├── auth/                   # Endpoint Autentikasi (login, logout, me)
│   └── upload/                 # Endpoint Upload Berkas (Formidable + Sharp)
├── prisma/
│   ├── schema.prisma           # Definisi Model Basis Data Prisma
│   └── seed.ts                 # Script Seeding Data Awal GenBI UPNVJT
└── middleware.ts               # Next.js Edge Middleware untuk Proteksi Rute Admin
```

---

## 🔒 1. Sistem Autentikasi & Otorisasi

### A. JWT Token & Cookie
- **Library**: `jsonwebtoken` & `bcryptjs`
- **Masa Berlaku Token**: 7 hari (`7d`)
- **Nama Cookie**: `genbi_admin_token`
- **Atribut Keamanan**: `httpOnly: true`, `sameSite: 'lax'`, `path: '/'`, `secure: process.env.NODE_ENV === 'production'`

### B. Proteksi Middleware (`middleware.ts`)
Setiap request ke URL yang diawali dengan `/admin/*` (kecuali `/admin/login`) diverifikasi keberadaan cookie `genbi_admin_token`-nya. Jika tidak ada, pengguna otomatis dialihkan ke halaman login dengan parameter URL redirect.

---

## 💾 2. Manajemen Basis Data (Prisma ORM)

### Perintah Penting:
* **Generate Client**: `npx prisma generate`
* **Sinkronisasi Skema**: `npx prisma db push` (Development) atau `npx prisma migrate dev` (Production)
* **Jalankan Seeding**: `npx tsx prisma/seed.ts`
* **Prisma Studio (GUI)**: `npx prisma studio`

---

## 📤 3. Subsistem File Upload (`/api/upload`)

1. Menerima payload `multipart/form-data` dengan batas ukuran maksimum:
   - Gambar: **2 MB** (MIME: `image/jpeg`, `image/png`, `image/webp`)
   - Dokumen: **5 MB** (MIME: `application/pdf`)
2. Menggunakan `sharp` untuk mengompresi gambar dan mengubah format ke `WebP` secara otomatis.
3. Menyimpan berkas di `/public/uploads/` dan mengembalikan URL publik `/uploads/<nama-file>.webp`.
