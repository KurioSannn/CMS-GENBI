# Revision_Prompt.md - Master Blueprint & Development Tasks for GenBI-Hub CMS

Dokumen ini adalah **Master Revision Prompt** dan panduan instruksi kerja bagi AI Agent / Tim Developer untuk menyelesaikan seluruh sisa *task backlog* pada sistem **GenBI-Hub CMS (GenBI UPN "Veteran" Jawa Timur)**.

---

## 🎯 Tujuan Utama (Objective)
Menuntaskan transisi sistem dari website statis berbasis hardcoded data menjadi **CMS Dinamis Penuh (Fullstack Next.js + Prisma ORM + Tailwind CSS + Lucide Icons)** yang andal, aman, mudah dikelola oleh pengurus GenBI UPNVJT, serta memenuhi standar pelaporan ke KPw Bank Indonesia Provinsi Jawa Timur.

---

## 📌 Checklist Sprint Eksekusi (Tasks 4 – 9 & Ekstensi)

```markdown
- [ ] Task 06: Database Schema & Migration (Prisma ORM + MySQL/SQLite support)
- [ ] Task 07: Master Kategori Dinamis (Berita, Dokumen, Proker)
- [ ] Task 09: Refactoring Arsitektur Controller (Semua logika query pindah ke lib/controllers/*)
- [ ] Task 08: Kelengkapan CRUD Modul (Banner, Berita, BPH, Divisi, Prestasi, Dokumen, Kategori)
- [ ] Task 04: Perbaikan UI/UX CMS Dashboard (Statistik, Sidebar Aktif, Form Layout, Modal Confirm)
- [ ] Task 05: Pagination & Standarisasi Lucide Icons (Tabel Berita, Dokumen, Anggota)
- [ ] Feature 11: Pojok Edukasi Kebijakan BI (CBP Rupiah & QRIS)
- [ ] Feature 12: Info & Timeline Seleksi Beasiswa Bank Indonesia
- [ ] Feature 13: Monitoring Program Kerja (Proker) Divisi
- [ ] Feature 14: Rich Text Editor (WYSIWYG) untuk Humas / Rilis Berita
```

---

## 📝 Prompt Instruksi Bertahap (Step-by-Step AI Execution Prompt)

### Prompt Tahap 1: Database, Schema & Master Kategori (Task 6 & 7)
```text
"Tolong audit dan perbarui prisma/schema.prisma untuk menambahkan model Master Kategori (Category) dan Program Kerja (WorkProgram). Pastikan skema mendukung koneksi SQLite (dev lokal) dan MySQL (production). Buat file seed database (prisma/seed.ts) agar memuat kategori default (Edukasi, Kebanksentralan, Rilis Proker, SK, LPJ, Beasiswa, Proposal) dan jalankan generate client serta migrasi database."
```

### Prompt Tahap 2: Standardisasi Controller & Logika Backend (Task 9 & 8)
```text
"Pindahkan seluruh query database dan logika bisnis dari file route handler di pages/api/admin/* ke lib/controllers/*. Pastikan semua controller (category.controller.ts, article.controller.ts, banner.controller.ts, bph.controller.ts, division.controller.ts, achievement.controller.ts, document.controller.ts, workprogram.controller.ts) memiliki method standar: getAll, getById, create, update, delete, dan mencatat activityLog secara otomatis."
```

### Prompt Tahap 3: Perbaikan UI Dashboard & Integrasi Lucide Icons (Task 4 & 5)
```text
"Perbaiki tampilan antarmuka CMS di folder pages/admin/*:
1. Perbarui pages/admin/index.tsx dengan kartu metrik ringkasan (Total Artikel, Total Divisi, Total Anggota, Total Prestasi, Dokumen Tersimpan).
2. Standarkan semua icon menggunakan library 'lucide-react' (ganti icon SVG manual atau icon yang rusak).
3. Tambahkan komponen Pagination pada tabel Berita, Dokumen, dan Prestasi agar rapi saat data berjumlah banyak.
4. Tambahkan modal konfirmasi penghapusan (dialog modal) sebelum menghapus data."
```

### Prompt Tahap 4: Fitur Khas Komunitas Beasiswa Bank Indonesia
```text
"Implementasikan modul khusus organisasi GenBI UPNVJT:
1. Modul Pojok Edukasi BI: Kelola konten edukasi Cinta Bangga Paham (CBP) Rupiah dan QRIS.
2. Modul Info Beasiswa BI: Halaman dinamis untuk mengelola alur seleksi beasiswa, syarat berkas IPK/SKTM, dan tautan formulir pendaftaran.
3. Modul Proker Divisi: Tracker status kegiatan per divisi (Direncanakan / Berjalan / Selesai) lengkap dengan PJ kegiatan."
```

---

## ⚠️ Acceptance Criteria (Definisi Selesai)
1. **Tidak Ada Data Hardcoded di Frontend Publik**: Seluruh halaman (`index.tsx`, `berita/`, `divisi/[slug].tsx`) mengambil data riil dari database.
2. **Keamanan Rute Admin**: Akses `/admin/*` otomatis me-redirect ke `/admin/login` jika token JWT cookie tidak valid.
3. **Responsive UI**: Tampilan dashboard admin dan website publik nyaman digunakan di layar HP maupun Desktop.
4. **Clean Code**: Tidak ada error TypeScript (`npm run build` berhasil tanpa fatal error).
