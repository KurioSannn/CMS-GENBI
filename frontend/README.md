# 🎨 Frontend & UI Architecture Documentation — GenBI-Hub

Dokumentasi ini menjelaskan arsitektur antarmuka pengguna (Frontend), hierarki komponen, sistem desain Tailwind CSS, dan alur halaman pada **GenBI-Hub Web Portal & CMS**.

---

## 📂 Struktur Direktori Frontend

```text
├── components/                 # Komponen Antarmuka Reusable
│   ├── AdminLayout.tsx         # Shell Layout Khusus Dashboard CMS (Sidebar + Header)
│   ├── Navbar.tsx              # Navigasi Utama Website Publik
│   ├── Footer.tsx              # Footer Publik dengan Kontak & Logo Bank Indonesia
│   ├── HeroCarousel.tsx        # Banner Bergerak di Halaman Beranda
│   ├── DivisionCard.tsx        # Kartu Interaktif Divisi GenBI UPNVJT
│   ├── MemberCard.tsx          # Kartu Anggota dengan Animasi Foto GIF & Data Prodi
│   ├── ArticleCard.tsx         # Kartu Ringkasan Berita & Artikel
│   ├── AchievementCard.tsx     # Kartu Showcase Prestasi & Medali
│   └── DocumentTable.tsx       # Tabel Arsip Dokumen PDF & Tombol Download
├── pages/
│   ├── _app.tsx                # Custom App Wrapper (Toast Provider, Font, Meta)
│   ├── _document.tsx           # Custom Document (HTML Head, Favicon)
│   ├── index.tsx               # Halaman Beranda Publik
│   ├── profil.tsx              # Halaman Profil GenBI, Pembina & BPH
│   ├── berita/
│   │   ├── index.tsx           # Halaman List Berita & Filter Kategori
│   │   └── [slug].tsx          # Halaman Detail Baca Berita
│   ├── divisi/
│   │   └── [slug].tsx          # Halaman Detail Divisi & Anggota
│   ├── prestasi.tsx            # Halaman Showcase Prestasi
│   ├── dokumen.tsx             # Halaman Bank Data Unduhan PDF
│   ├── beasiswa.tsx            # Halaman Informasi & Timeline Beasiswa BI
│   └── admin/                  # Halaman CMS Admin Dashboard
│       ├── index.tsx           # Dashboard Utama & Ringkasan Statistik
│       ├── login.tsx           # Halaman Form Login Admin
│       ├── banner/             # Manajemen Banner Beranda
│       ├── berita/             # Manajemen Berita & Editor
│       ├── bph/                # Manajemen Struktur BPH & Pembina
│       ├── divisi/             # Manajemen Divisi & Anggota
│       ├── prestasi/           # Manajemen Prestasi Organisasi
│       ├── dokumen/            # Manajemen Arsip Dokumen
│       └── kategori/           # Manajemen Master Kategori
└── styles/
    └── globals.css             # Konfigurasi Font, CSS Variables & Tailwind Directives
```

---

## 🎨 1. Sistem Desain & Standarisasi UI

### A. Palet Warna Resmi GenBI & Bank Indonesia
- **Biru Utama (Bank Indonesia Navy)**: `#0F2C59` / `#1E3E62` (Wibawa, Integritas, Kebanksentralan).
- **Emas / Kuning Aksen (Gold Leadership)**: `#F8B602` / `#E5A91E` (Energi untuk Negeri, Prestasi, Masa Depan).
- **Merah Berani (CBP Rupiah)**: `#DC2626` (Semangat Cinta Bangga Paham Rupiah).
- **Neutral Dark / Light**: Slate-900 / Slate-50 untuk kenyamanan membaca.

### B. Library Icon Resmi
Seluruh icon pada antarmuka publik dan dashboard admin distandarisasi menggunakan pustaka **`lucide-react`**:
```tsx
import { 
  Award, 
  BookOpen, 
  Download, 
  FileText, 
  Layers, 
  LogOut, 
  Plus, 
  Trash2, 
  Users 
} from 'lucide-react';
```

### C. Sistem Notifikasi & Modal
* **Toast Notification**: Menggunakan pustaka **`sonner`** untuk memberikan umpan balik aksi simpan/ubah/hapus data:
  ```tsx
  import { toast } from 'sonner';
  toast.success('Berita berhasil diterbitkan!');
  ```
* **Modal Dialog**: Menggunakan modal konfirmasi custom berbasis Tailwind CSS sebelum melakukan penghapusan data.

---

## 📱 2. Standar Responsivitas & Animasi
* Seluruh tabel di dashboard admin dilengkapi dengan container `overflow-x-auto` agar tetap rapi saat diakses melalui smartphone.
* Kartu anggota menggunakan transisi halus CSS untuk efek *hover zoom* dan *avatar glow*.
