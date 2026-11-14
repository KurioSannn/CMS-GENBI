# 📘 BUKU PANDUAN TEKNIS & MASTER DOKUMENTASI DESIGN SYSTEM
**GenBI-Hub CMS — Generasi Baru Indonesia (GenBI) Komisariat UPN "Veteran" Jawa Timur**  
*Komunitas Mahasiswa Penerima Beasiswa Bank Indonesia • Binaan Kantor Perwakilan Bank Indonesia Provinsi Jawa Timur*  
*Dokumentasi Resmi Versi 3.0.0 — Edisi Komprehensif Terpadu (Oktober 2026)*

---

## 📑 DAFTAR ISI LENGKAP

1. [BAB 1: Profil Komunitas, Visi Sistem & Identitas Resmi](#bab-1-profil-komunitas-visi-sistem--identitas-resmi)
2. [BAB 2: Arsitektur Teknologi & Tech Stack Lengkap](#bab-2-arsitektur-teknologi--tech-stack-lengkap)
3. [BAB 3: Changelog Detail & Riwayat Pembaruan Seluruh Modul](#bab-3-changelog-detail--riwayat-pembaruan-seluruh-modul)
   - [3.1 Perombakan Halaman Login Pengurus (`/admin/login`)](#31-perombakan-halaman-login-pengurus-adminlogin)
   - [3.2 Mekanisme Sesi & Logout Bebas Stuck](#32-mekanisme-sesi--logout-bebas-stuck)
   - [3.3 Dashboard Overview & Executive Quick Action Hub (`/admin`)](#33-dashboard-overview--executive-quick-action-hub-admin)
   - [3.4 Sentralisasi Struktur & Kepengurusan Divisi (`/admin/divisi`)](#34-sentralisasi-struktur--kepengurusan-divisi-admindivisi)
   - [3.5 Modul Capaian Prestasi 6 Tingkatan Terstandarisasi (`/admin/prestasi`)](#35-modul-capaian-prestasi-6-tingkatan-terstandarisasi-adminprestasi)
   - [3.6 Publikasi Berita dengan Live Preview & Draft Workflow (`/admin/berita`)](#36-publikasi-berita-dengan-live-preview--draft-workflow-adminberita)
   - [3.7 Mesin Ekspor Data CSV / Excel UTF-8 BOM (`lib/export.ts`)](#37-mesin-ekspor-data-csv--excel-utf-8-bom-libexportts)
   - [3.8 Fitur 1-Click Database JSON Backup (`/api/admin/backup`)](#38-fitur-1-click-database-json-backup-apiadminbackup)
4. [BAB 4: Panduan Lengkap Design System (Design Tokens & Typography)](#bab-4-panduan-lengkap-design-system-design-tokens--typography)
   - [4.1 Hierarki & Spesifikasi Tipografi (Plus Jakarta Sans)](#41-hierarki--spesifikasi-tipografi-plus-jakarta-sans)
   - [4.2 Palet Warna & Token Desain Resmi Bank Indonesia](#42-palet-warna--token-desain-resmi-bank-indonesia)
5. [BAB 5: Sistem Ikonografi & Standar Visual Fungsional (Anti-Clutter)](#bab-5-sistem-ikonografi--standar-visual-fungsional-anti-clutter)
6. [BAB 6: Anatomi & Resep Kode Komponen UI Standar](#bab-6-anatomi--resep-kode-komponen-ui-standar)
   - [6.1 Segmented Pill Tabs Navigation](#61-segmented-pill-tabs-navigation)
   - [6.2 Metric Stat Cards dengan Soft Tint Container](#62-metric-stat-cards-dengan-soft-tint-container)
   - [6.3 Form Input Controls & Focus Ring](#63-form-input-controls--focus-ring)
   - [6.4 Action Buttons (Primary Gradient, Secondary Outline, Destructive)](#64-action-buttons-primary-gradient-secondary-outline-destructive)
   - [6.5 Data Tables & Grid List](#65-data-tables--grid-list)
   - [6.6 Modal Dialog & Live Mockup Preview](#66-modal-dialog--live-mockup-preview)
   - [6.7 Integrasi Maskot & Aturan CSS Mask Gradient Fading](#67-integrasi-maskot--aturan-css-mask-gradient-fading)
7. [BAB 7: Arsitektur Backend & Pola Controller (MVC Pattern)](#bab-7-arsitektur-backend--pola-controller-mvc-pattern)
8. [BAB 8: Skema Database Prisma ORM & Model Entitas](#bab-8-skema-database-prisma-orm--model-entitas)
9. [BAB 9: Utilitas Sistem & Helper Functions](#bab-9-utilitas-sistem--helper-functions)
10. [BAB 10: Standar Operasional Pengembang (SOP Developer & Git Rules)](#bab-10-standar-operasional-pengembang-sop-developer--git-rules)

---

## BAB 1: Profil Komunitas, Visi Sistem & Identitas Resmi

### 1.1 Profil Komunitas
**Generasi Baru Indonesia (GenBI)** Komisariat **UPN "Veteran" Jawa Timur** adalah wadah resmi bagi para mahasiswa penerima program Beasiswa Bank Indonesia di lingkungan kampus UPN "Veteran" Jawa Timur (UPNVJT), Surabaya. Komunitas ini berada langsung di bawah bimbingan dan pengawasan **Kantor Perwakilan (KPw) Bank Indonesia Provinsi Jawa Timur**.

### 1.2 3 Pilar Utama Komunitas (Peran Strategis GenBI)
1. **Front Liners**: Menjadi garda terdepan dalam mengomunikasikan dan menyosialisasikan kebijakan-kebijakan bank sentral (Bank Indonesia) kepada masyarakat luas, termasuk literasi **Cinta Bangga Paham (CBP) Rupiah**, digitalisasi pembayaran via **QRIS**, dan stabilitas sistem keuangan.
2. **Change Agents**: Bertindak sebagai agen perubahan yang memberikan dampak sosial positif nyata kepada masyarakat melalui program kerja edukasi, lingkungan hidup, ekonomi kreatif UMKM, dan kesehatan.
3. **Future Leaders**: Wadah pembentukan karakter kepemimpinan, integritas, dan kapasitas kepemimpinan mahasiswa berjiwa *Bela Negara* guna mempersiapkan pemimpin bangsa di masa depan.

### 1.3 Visi & Misi Sistem CMS (GenBI-Hub)
- **Visi**: Menjadi sistem tata kelola digital terpadu yang modern, cepat, aman, dan transparan untuk seluruh kegiatan publikasi informasi, kepengurusan, dan arsip data beasiswa.
- **Prinsip Arsitektur Mutlak**:
  > **"Dynamic by Database, Clean by Controllers, Secure by Middleware, Tailored for Bank Indonesia Scholarship Community."**
  - **Zero Hardcoding**: Tidak boleh ada data statis yang di-*hardcode* di halaman publik (Beranda, Profil, Berita, Divisi, Prestasi). Seluruh data publik **WAJIB** terhubung secara dinamis ke database melalui RESTful API.

---

## BAB 2: Arsitektur Teknologi & Tech Stack Lengkap

GenBI-Hub CMS dibangun menggunakan ekosistem teknologi modern berbasis TypeScript dengan struktur yang kokoh, modular, dan teruji:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           FRONTEND INTERFACE                            │
│  Next.js 15 (Pages Router) + React 19 + TypeScript + Tailwind CSS v3/v4 │
│       Lucide React Icons + Sonner Notifications + Framer Motion         │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │ (HTTP Requests / Form Data)
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      MIDDLEWARE & ROUTE DISPATCHER                      │
│        Next.js Edge Middleware (Cookie Inspection & JWT Verify)         │
│          API Dispatcher Routes (pages/api/* - Request Wrapper)          │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │ (Controller Invocations)
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         BUSINESS CONTROLLERS                            │
│           lib/controllers/* (Auth, Article, Division, Prestasi,         │
│               Category, Document, Backup, Media Processing)             │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │ (Prisma Client Calls)
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        DATA PERSISTENCE & MEDIA                         │
│     Prisma ORM v5/v7+ (SQLite dev.db / MySQL Production Database)       │
│          Sharp & Formidable Media Processing Pipeline (/public/)        │
└─────────────────────────────────────────────────────────────────────────┘
```

### Rincian Modul Teknologi:
1. **Framework Frontend**: Next.js 15 (Pages Router: `pages/`, `pages/admin/*`, `pages/api/*`) dipadukan dengan React 19.
2. **Type Safety**: TypeScript 5 dengan aturan *Strict Type-Safety* (menghindari penggunaan `any`).
3. **Styling & Design System**: Tailwind CSS dengan palet warna resmi Bank Indonesia, didukung font *Plus Jakarta Sans*.
4. **Ikonografi & Notifikasi**: `lucide-react` (ikon berbasis vektor) dan `sonner` (toast interaktif modern).
5. **Database & ORM**: Prisma ORM yang mendukung *SQLite* (`file:./dev.db`) untuk pengembangan lokal dan *MySQL* untuk lingkungan produksi.
6. **Autentikasi**: JSON Web Token (JWT) yang disimpan di *HttpOnly Cookie* terenkripsi (`genbi_admin_token`) diproteksi dengan Next.js `middleware.ts`. Password di-hash menggunakan `bcryptjs` (salt rounds 10).
7. **Pengolahan Media & Upload**: `formidable` untuk multipart/form-data handler dan `sharp` untuk kompresi/optimasi gambar otomatis (WebP/JPEG, batas maksimal 2MB).

---

## BAB 3: Changelog Detail & Riwayat Pembaruan Seluruh Modul

### 3.1 Perombakan Halaman Login Pengurus (`pages/admin/login.tsx`)
- **Latar Belakang Perubahan**:
  Tampilan lama berupa kotak mengambang kecil di tengah layar putih kosong dengan tumpukan ikon dekoratif acak (*AI slop*), menimbulkan kesan sepi (*kosongan*), membingungkan, dan input form yang sempit.
- **Pembaruan Arsitektural**:
  1. **Executive Light Split Layout (50% : 50%)**:
     - **Panel Kiri (Editorial Showcase)**: Background cerah `#F8FAFC` dengan border pembatas rapi, memuat identitas resmi GenBI UPNVJT, logo resmi, headline *"Energi untuk Negeri, Mengabdi Sepenuh Hati"*, dan kartu identitas komunitas.
     - **Panel Kanan (Form Canvas)**: Background putih bersih dengan form login lebar (`max-w-md`), input leluasa (`py-3 px-4 text-sm`), dan tombol aksi solid.
  2. **Logo Resmi GenBI**:
     Mengganti kotak monogram biru huruf "G" dengan gambar logo resmi GenBI (`/favicongenbiupnvj.png`) di panel desktop dan mobile.
  3. **Integrasi Maskot Burung Hantu Transparan (*Artistic Watermark*)**:
     - Aset maskot resmi berjaket GenBI disimpan di `/public/maskot-genbi.png` (transparan penuh / alpha channel bersih).
     - Diposisikan besar (`w-[420px]` s.d. `w-[580px]`) di latar belakang sisi kanan-bawah panel kiri.
     - **CSS Gradient Mask Fading**: Menggunakan `maskImage: linear-gradient(to right, transparent 0%, transparent 20%, black 65%)` dan `opacity-15` s.d. `opacity-20` sehingga area di bawah teks judul dan paragraf **100% bersih tanpa tabrakan garis mata/kacamata maskot**.
  4. **Penyesuaian Kartu Identitas Komunitas**:
     - Menambahkan class `w-fit` agar kartu putih membungkus teks secara presisi tanpa menyisakan ruang kosong aneh di sebelah kanannya.
     - Membagi kalimat secara seimbang:  
       *Baris 1: Wadah dedikasi & kontribusi nyata mahasiswa penerima*  
       *Baris 2: Beasiswa Bank Indonesia di UPN “Veteran” Jawa Timur.*
  5. **Penyederhanaan Istilah & Tombol**:
     - Menghapus badge teknis "CMS" menjadi "Portal Pengurus / Akses Pengurus".
     - Menghapus tanda panah `→` pada tombol login sehingga bertuliskan bersih: **`Masuk ke Dashboard`**.
     - Shortcut akun demo instan: **`Isi Otomatis`** (`admin / admin123`).

---

### 3.2 Mekanisme Sesi & Logout Bebas Stuck (`components/admin/AdminLayout.tsx` & `lib/auth.ts`)
- **Latar Belakang Masalah**:
  Saat pengguna mengklik tombol logout, toast *"Berhasil logout"* muncul tetapi halaman diam di tempat (*stuck*) karena Next.js client-side router (`router.replace`) mempertahankan cache sesi di memori SPA.
- **Penyelesaian Teknis**:
  1. **Header Cookie Expiration Mutlak (`lib/auth.ts`)**:
     ```typescript
     export function clearAuthCookie(res: NextApiResponse) {
       const isProd = process.env.NODE_ENV === 'production';
       res.setHeader(
         'Set-Cookie',
         `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT${isProd ? '; Secure' : ''}`
       );
     }
     ```
  2. **Hard Client Reload (`components/admin/AdminLayout.tsx`)**:
     Fungsi `handleLogout` menggunakan `window.location.href = '/admin/login'` dengan jeda toast 350ms agar seluruh state in-memory dibersihkan total dan browser me-reload status sesi baru secara bersih.
  3. **Indikator Loading**: Tombol logout menampilkan animasi spinner `Loader2` saat proses berlangsung.
  4. **Penyederhanaan Role**: Label profil pengguna di sidebar bawah diubah dari `superadmin` / `Pengelola CMS` menjadi murni **`Admin`**.

---

### 3.3 Dashboard Overview & Executive Quick Action Hub (`pages/admin/index.tsx`)
- **Relokasi Tanggal**: Memindahkan widget tanggal panjang (`📅 [Hari, Tanggal Bulan Tahun]`) dari baris subtitle yang padat ke **Top Header Bar** di samping tombol aksi sebagai pill badge minimalis.
- **Executive Quick Action Hub**: Barisan 5 tombol shortcut aksi produktivitas:
  - 📝 **Tulis Berita**: Membuka modal rilis artikel baru.
  - 🖼️ **Ganti Banner**: Mengelola carousel beranda.
  - 🏆 **Catat Prestasi**: Input raihan juara mahasiswa.
  - 🏷️ **Master Kategori**: Kelola taksonomi artikel & dokumen.
  - 💾 **Backup Database**: Unduh snapshot database JSON instan.
- **4 Metric Cards**: Menampilkan indikator angka total publikasi berita, total kepengurusan, total prestasi, dan arsip dokumen dengan soft-tinted icon container (`Newspaper`, `Users`, `Trophy`, `FileText`).

---

### 3.4 Sentralisasi Struktur & Kepengurusan Divisi (`pages/admin/divisi/index.tsx`)
- **Penyatuan Modul**: Menggabungkan BPH & Pembina dengan 6 Divisi Operasional (EKRAF, HUBEKS, MEDKOM, PENDIDIKAN, PSDM, SOSLING) ke dalam satu rute `/admin/divisi`. Rute lama `/admin/bph` dialihkan otomatis ke `/admin/divisi?tab=BPH`.
- **7-Grid Segmented Pill Cards**: Navigasi tab 7 kolom rapat tanpa horizontal scrollbar. Tab tidak aktif menggunakan background kartu abu-abu (`bg-slate-50 border border-slate-200/90 text-slate-700`) untuk kejelasan klik (*affordance*).
- **CRUD & Ekspor Data**:
  - Modal tambah/edit anggota lengkap dengan input Nama, Jabatan, Prodi, Angkatan, Link Sosial Media, dan Upload Foto/GIF.
  - Modal manajemen Program Kerja (Proker) per divisi.
  - Tombol **Ekspor CSV** untuk mengunduh daftar pengurus aktif per divisi.

---

### 3.5 Modul Capaian Prestasi 6 Tingkatan Terstandarisasi (`pages/admin/prestasi/index.tsx`)
- **6 Tingkatan Prestasi Resmi**:
  1. 🥇 **Juara 1 / Gold** (`gold`): Warna aksen Amber Gold (`#F59E0B`)
  2. 🥈 **Juara 2 / Silver** (`silver`): Warna aksen Slate Silver (`#94A3B8`)
  3. 🥉 **Juara 3 / Bronze** (`bronze`): Warna aksen Orange Bronze (`#EA580C`)
  4. 🎖️ **Harapan / Finalist** (`finalist`): Warna aksen Sky Blue (`#0284C7`)
  5. 🌐 **Delegasi / Duta** (`delegate`): Warna aksen Purple Indigo (`#7C3AED`)
  6. ⭐ **Special Award / Best Speaker** (`special`): Warna aksen Emerald Green (`#059669`)
- **Tab Filter 7 Kolom**: Tab "Semua Prestasi" + 6 kategori prestasi dengan badge counter counter otomatis.
- **Ekspor CSV Prestasi**: File `Rekap_Prestasi_GenBI_UPNVJT.csv` siap buka di Microsoft Excel.
- **Komponen Publik (`components/Prestasi.tsx`)**: Sinkronisasi warna badge pada halaman publik.

---

### 3.6 Publikasi Berita dengan Live Preview & Draft Workflow (`pages/admin/berita/index.tsx`)
- **Modal Editor 2 Mode Interaktif**:
  - `[Form Editor]`: Form input judul, slug otomatis, kategori, author, excerpt, cover image upload, dan rich HTML editor.
  - `[👁️ Live Preview]`: Menampilkan simulasi mockup artikel publik secara instan.
- **Fitur Live Preview**:
  - Badge kategori artikel.
  - Estimasi waktu baca otomatis (*Read Time Calculation* berbasis jumlah kata: `Math.ceil(words / 200)`).
  - Nama penulis dan tanggal rilis bahasa Indonesia.
  - Pratinjau cover image dan format konten HTML.
- **Draft & Publish Workflow**: Memungkinkan pengurus menyimpan draf artikel sebelum dipublikasikan ke publik.
- **Ekspor CSV**: Mengunduh daftar artikel ke `Daftar_Publikasi_Berita_GenBI_UPNVJT.csv`.

---

### 3.7 Mesin Ekspor Data CSV / Excel UTF-8 BOM (`lib/export.ts`)
- **Spesifikasi Fungsi `exportToCsv<T>()`**:
  - Mengonversi data objek JavaScript ke CSV dengan separator koma.
  - **UTF-8 BOM Prefix (`\uFEFF`)**: Menambahkan byte order mark pada payload Blob agar Microsoft Excel di Windows membaca huruf latin khusus, tanda kutip, dan aksen bahasa Indonesia tanpa karakter rusak (*mojibake*).
  - Sanitasi kutip dua (`""`) dan karakter baris baru (*newline escaping*).

---

### 3.8 Fitur 1-Click Database JSON Backup (`pages/api/admin/backup.ts`)
- **Pengambilan Snapshot Lengkap**: Mengambil seluruh entitas database (AdminUser, Banner, Division, DivisionMember, Proker, BphMember, Article, Category, Achievement, DocumentArchive, ActivityLog) dalam satu query Prisma.
- **Response Attachment Header**: Menghasilkan file download JSON otomatis dengan format penamaan berbasis timestamp: `backup_genbi_upnvjt_YYYY-MM-DD_HH-mm-ss.json`.

---

## BAB 4: Panduan Lengkap Design System (Design Tokens & Typography)

### 4.1 Hierarki & Spesifikasi Tipografi (Plus Jakarta Sans)

- **Font Family**: **`Plus Jakarta Sans`**, `ui-sans-serif`, `system-ui`, `-apple-system`, `sans-serif`
- **Karakteristik**: Geometris, modern, tegas, dengan legibilitas tinggi pada berbagai ukuran layar.

```
[ Hero Display 36px/Black ] ─── [ H1 Page Title 24px/Extrabold ] ─── [ Section H2 18px/Bold ]
[ Card Title 14px/Bold ] ────── [ Body Text 13px/Medium ] ────────── [ Meta Badge 10px/Bold Uppercase ]
```

#### Tabel Skala Tipografi Lengkap:

| Nama Token | Font Size | Line Height | Font Weight | Letter Spacing | Tailwind Class | Penggunaan Desain |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Display** | 36px (2.25rem) | 1.2 | Black (900) | `tracking-tight` | `text-3xl xl:text-4xl font-black` | Headline utama halaman login & banner beranda |
| **Page Title (H1)**| 24px (1.5rem) | 1.25 | Extrabold (800) | `tracking-tight` | `text-2xl font-extrabold` | Judul halaman admin & header modal utama |
| **Section Header (H2)**| 18px (1.125rem)| 1.3 | Bold (700) | `tracking-tight` | `text-lg font-bold` | Header card dashboard & judul tabel |
| **Card / Item Title**| 14px (0.875rem)| 1.4 | Bold (700) | Normal | `text-sm font-bold text-slate-900` | Nama pengurus, judul berita, nama proker |
| **Body Text Medium**| 13px (0.8125rem)| 1.5 | Medium (500) | Normal | `text-xs sm:text-sm font-medium` | Paragraf deskripsi, subtitle modal, isi tabel |
| **Body Text Muted** | 12px (0.75rem) | 1.5 | Normal (400) | Normal | `text-xs text-slate-500 font-normal`| Keterangan bantuan, placeholder, footer |
| **Form Label** | 12px (0.75rem) | 1.2 | Bold (700) | Normal | `text-xs font-bold text-slate-700` | Label input form admin |
| **Meta Badge / Pill**| 10px–11px | 1.0 | Bold (700) | `tracking-wider` | `text-[10px] font-bold uppercase` | Tag kategori, pill counter, status publish |

---

### 4.2 Palet Warna & Token Desain Resmi Bank Indonesia

#### Spesifikasi Token Warna & Kode Hex:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      PALET WARNA RESMI BANK INDONESIA                       │
│                                                                             │
│  [ Deep Navy #0B1F40 ]    [ Sky Blue #0284C7 ]    [ Amber Gold #F59E0B ]    │
│     Otoritas Institusi         Aksi Interaktif          Aksen Lambang BI    │
│                                                                             │
│  [ Canvas #F8FAFC ]       [ Card White #FFFFFF ]  [ Neutral Border #E2E8F0 ]│
│     Latar Belakang             Permukaan Kartu         Garis Pembatas       │
│                                                                             │
│  [ Emerald #10B981 ]      [ Warning #F59E0B ]     [ Destructive #EF4444 ]   │
│     Status Published           Status Draft            Aksi Hapus & Error   │
└─────────────────────────────────────────────────────────────────────────────┘
```

| Nama Token | Nilai Hex | Tailwind Class | Semantic Usage |
| :--- | :--- | :--- | :--- |
| **BI Deep Navy** | `#0B1F40` | `bg-[#0B1F40]`, `text-[#0B1F40]` | Logo emblem, tab aktif utama, brand header authority |
| **BI Obsidian Navy** | `#07152B` | `bg-[#07152B]` | Background gelap institusional |
| **Primary Sky Blue** | `#0284C7` (Sky-600) | `bg-[#0284C7]`, `text-[#0284C7]` | Tombol primer, ring fokus input, border aktif, link |
| **Sky Gradient 500** | `#0EA5E9` (Sky-500) | `via-[#0EA5E9]` | Titik tengah gradasi tombol & highlight |
| **Sky Light 400** | `#38BDF8` (Sky-400) | `to-[#38BDF8]`, `text-[#38BDF8]` | Aksen gradasi kanan & badge teks cerah |
| **Amber Gold BI** | `#F59E0B` (Amber-500)| `text-[#F59E0B]`, `bg-amber-500` | Inisial logo GenBI, prestasi Juara 1, warning notice |
| **Canvas Background**| `#F8FAFC` (Slate-50) | `bg-[#F8FAFC]` | Latar belakang seluruh dashboard admin & login page |
| **Card Surface** | `#FFFFFF` | `bg-white` | Latar belakang kartu data, form container, modal pop-up |
| **Border Neutral** | `#E2E8F0` (Slate-200) | `border-slate-200` | Garis pembatas kartu data, input border, table divider |
| **Text Primary** | `#0F172A` (Slate-900) | `text-slate-900` | Teks judul utama, nama entitas, angka statistik |
| **Text Secondary** | `#475569` (Slate-600) | `text-slate-600` | Teks paragraf, subtitle, label interaktif |
| **Text Muted** | `#94A3B8` (Slate-400) | `text-slate-400` | Placeholder input, tanggal sekunder, copyright footer |
| **Success Emerald** | `#10B981` (Emerald-500)| `text-emerald-600`, `bg-emerald-50`| Status Published, tombol Backup Database, badge aktif |
| **Warning Amber** | `#F59E0B` (Amber-500) | `text-amber-600`, `bg-amber-50` | Status Draft, alert pemberitahuan |
| **Destructive Red** | `#EF4444` (Rose-500) | `text-red-600`, `bg-red-50` | Tombol hapus, tombol logout, notifikasi gagal |

---

## BAB 5: Sistem Ikonografi & Standar Visual Fungsional (Anti-Clutter)

### 5.1 Prinsip Penggunaan Ikon
1. **Strictly Functional**: Ikon hanya digunakan jika membantu pemahaman navigasi, status data, atau aksi tombol. Tidak boleh menggunakan ikon dekoratif acak yang menimbulkan polusi visual (*anti-clutter*).
2. **Stroke Width Konsisten**: Menggunakan ketebalan garis standar `1.75px` s.d. `2.0px`.
3. **Standar Ukuran Berdasarkan Konteks**:
   - **Tombol Aksi Mikro**: `size={13}` atau `size={14}`
   - **Form Input Prefix**: `size={16}`
   - **Menu Sidebar & Navigasi**: `size={18}`
   - **Metric Box Container**: `size={20}` s.d. `size={22}`

### 5.2 Inventaris Ikon yang Digunakan (`lucide-react`)

| Komponen Ikon | Nama Ikon Lucide | Konteks & Lokasi Penggunaan |
| :--- | :--- | :--- |
| 📊 Dashboard | `LayoutDashboard` | Menu navigasi Dashboard Overview |
| 📰 Berita | `Newspaper` | Menu Publikasi Berita & icon metric card berita |
| 👥 Pengurus | `Users` | Menu Struktur & Kepengurusan Divisi |
| 🏆 Prestasi | `Trophy` | Menu Capaian Prestasi & metric card prestasi |
| 📄 Dokumen | `FileText` | Menu Arsip Dokumen & metric card dokumen |
| 🖼️ Banner | `Image` (`ImageIcon`) | Menu Banner Carousel Beranda |
| 🏷️ Kategori | `Tag` | Menu Master Kategori taksonomi |
| 📥 Ekspor / Backup| `Download` / `FileSpreadsheet` | Tombol Ekspor CSV & Backup Database |
| ➕ Tambah Data | `Plus` | Tombol Tambah Anggota, Berita, Banner, Prestasi |
| 🚪 Logout Sesi | `LogOut` | Tombol Logout di sidebar bawah |
| 👁️ Reveal Password| `Eye` / `EyeOff` | Toggle visibility input kata sandi |
| 🔄 Loading | `Loader2` | Spinner animasi loading tombol & submit |
| 📅 Kalender | `Calendar` | Widget tanggal di topbar header |

---

## BAB 6: Anatomi & Resep Kode Komponen UI Standar

### 6.1 Segmented Pill Tabs Navigation
Digunakan pada filter kategori prestasi, divisi, dan status berita:
```tsx
<div className="bg-white p-1.5 rounded-2xl border border-slate-200/90 shadow-sm">
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-1.5">
    {tabs.map((tab) => {
      const isActive = activeTab === tab.id;
      return (
        <button
          key={tab.id}
          type="button"
          onClick={() => setActiveTab(tab.id)}
          className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between gap-1.5 ${
            isActive
              ? 'bg-[#0B1F40] text-white shadow-sm'
              : 'bg-slate-50 border border-slate-200/90 text-slate-700 hover:bg-slate-100 hover:text-slate-900 shadow-2xs'
          }`}
        >
          <span className="truncate">{tab.label}</span>
          <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
            isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
          }`}>
            {tab.count}
          </span>
        </button>
      );
    })}
  </div>
</div>
```

---

### 6.2 Metric Stat Cards dengan Soft Tint Container
Digunakan pada ringkasan angka statistik di Dashboard Overview:
```tsx
<div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm flex items-center justify-between gap-4">
  <div className="space-y-1">
    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Publikasi</p>
    <p className="text-2xl font-black text-slate-900">{stats?.totalArticles ?? 0}</p>
    <p className="text-[11px] text-slate-500 font-medium">Artikel &amp; Rilis Berita</p>
  </div>
  <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 text-[#0284C7] flex items-center justify-center shrink-0 shadow-2xs">
    <Newspaper size={22} />
  </div>
</div>
```

---

### 6.3 Form Input Controls & Focus Ring
Digunakan pada seluruh form admin (Login, Berita, Divisi, Prestasi, Banner):
```tsx
<div className="space-y-1.5">
  <label className="block text-xs font-bold text-slate-700">
    Nama Lengkap Pengurus
  </label>
  <input
    type="text"
    required
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="Contoh: Ahmad Fauzi"
    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/15 bg-white font-medium transition-all"
  />
</div>
```

---

### 6.4 Action Buttons (Primary Gradient, Secondary Outline, Destructive)

#### A. Tombol Aksi Utama (Primary Gradient Sky Blue):
```tsx
<button
  type="submit"
  disabled={isLoading}
  className="w-full py-2.5 px-4 bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] hover:from-[#0369A1] hover:to-[#0284C7] text-white font-bold text-xs rounded-xl shadow-sm shadow-sky-500/20 active:scale-[0.99] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
>
  {isLoading ? <Loader2 size={15} className="animate-spin" /> : <span>Simpan Perubahan</span>}
</button>
```

#### B. Tombol Ekspor Data (Secondary White Card):
```tsx
<button
  type="button"
  onClick={handleExport}
  className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-all shadow-2xs flex items-center gap-1.5"
>
  <Download size={13} className="text-slate-400" />
  <span>Ekspor CSV</span>
</button>
```

#### C. Tombol Hapus Data (Destructive Outline):
```tsx
<button
  type="button"
  onClick={() => handleDelete(item.id)}
  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
  title="Hapus Data"
>
  <Trash2 size={15} />
</button>
```

---

### 6.5 Data Tables & Grid List
- Header tabel: `bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider py-3 px-4 border-b border-slate-200`
- Baris tabel: `border-b border-slate-100 hover:bg-slate-50/70 transition-colors py-3 px-4 text-xs text-slate-700`
- Empty State: Wadah terisolasi dengan border putus-putus (`border-dashed border-slate-200 bg-slate-50/50 p-8 rounded-2xl text-center`).

---

### 6.6 Modal Dialog & Live Mockup Preview
- **Backdrop**: `fixed inset-0 bg-slate-900/40 z-50 backdrop-blur-sm flex items-center justify-center p-4`
- **Modal Card**: `bg-white rounded-3xl border border-slate-200/90 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto`
- **Header Modal**: `p-6 border-b border-slate-100 flex items-center justify-between`
- **Footer Modal**: `p-6 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50/50`

---

### 6.7 Integrasi Maskot & Aturan CSS Mask Gradient Fading
```tsx
{/* Large Artistic Watermark Mascot with Gradient Fade */}
<div 
  className="absolute -right-6 xl:-right-10 bottom-0 pointer-events-none select-none z-0 opacity-15 xl:opacity-20 mix-blend-multiply transition-opacity"
  style={{
    maskImage: 'linear-gradient(to right, transparent 0%, transparent 20%, black 65%)',
    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, transparent 20%, black 65%)',
  }}
>
  <img
    src="/maskot-genbi.png"
    alt="Maskot GenBI UPNVJT Watermark"
    className="w-[420px] xl:w-[500px] 2xl:w-[580px] h-auto object-contain -rotate-6"
  />
</div>
```
- **Logika Masking**: `transparent 0%` hingga `transparent 20%` memastikan area teks di sebelah kiri memiliki opasitas mask 0% (bersih total), sementara `black 65%` menampilkan maskot secara penuh di sisi kanan dan bawah.

---

## BAB 7: Arsitektur Backend & Pola Controller (MVC Pattern)

Pemisahan tanggung jawab (*Separation of Concerns*) diterapkan secara ketat:

### 1. Rute API (`pages/api/*` — HTTP Dispatcher)
Bertindak murni sebagai dispatcher HTTP:
- Memeriksa HTTP Method (`req.method === 'GET' | 'POST' | 'PUT' | 'DELETE'`).
- Memeriksa otorisasi token pengguna untuk rute terproteksi (`getAuthUser(req)`).
- Menyerahkan eksekusi logika kepada Controller yang bersangkutan.

### 2. Logika Bisnis (`lib/controllers/*` — Business Logic)
Seluruh query database Prisma dan validasi data terisolasi di controller:

| File Controller | Tanggung Jawab Modul |
| :--- | :--- |
| `auth.controller.ts` | Autentikasi pengurus, verifikasi password bcrypt, set/clear JWT cookie |
| `article.controller.ts` | CRUD artikel, auto-generate slug unik, filter kategori & draft/publish |
| `division.controller.ts` | CRUD 6 divisi operasional, manajemen anggota kepengurusan, & proker |
| `bph.controller.ts` | Manajemen jajaran BPH & Pembina Resmi Bank Indonesia |
| `achievement.controller.ts` | CRUD capaian prestasi 6 tingkatan penghargaan |
| `document.controller.ts` | Manajemen arsip dokumen legalitas & file PDF |
| `category.controller.ts` | Master taksonomi kategori artikel dan dokumen |
| `stats.controller.ts` | Agregasi metrik penghitungan ringkasan dashboard overview |

---

## BAB 8: Skema Database Prisma ORM & Model Entitas

Database dikelola menggunakan **Prisma ORM** (`prisma/schema.prisma`). Seluruh entitas terstruktur sebagai berikut:

```prisma
// 1. Admin User
model AdminUser {
  id           Int           @id @default(autoincrement())
  username     String        @unique
  email        String        @unique
  name         String
  passwordHash String
  role         String        @default("admin") // Role tunggal: admin
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
  activities   ActivityLog[]
}

// 2. Banner Hero Carousel
model Banner {
  id          Int      @id @default(autoincrement())
  title       String
  subtitle    String?
  imageUrl    String
  buttonText  String?
  buttonLink  String?
  isActive    Boolean  @default(true)
  sortOrder   Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// 3. Operational Division
model Division {
  id          Int              @id @default(autoincrement())
  name        String           @unique
  code        String           @unique // EKRAF, HUBEKS, MEDKOM, PENDIDIKAN, PSDM, SOSLING
  slug        String           @unique
  tagline     String?
  description String?
  iconName    String?
  sortOrder   Int              @default(0)
  members     DivisionMember[]
  prokers     Proker[]
  createdAt   DateTime         @default(now())
  updatedAt   DateTime         @updatedAt
}

// 4. Division Member
model DivisionMember {
  id          Int      @id @default(autoincrement())
  divisionId  Int
  name        String
  role        String   // Ketua Divisi, Sekretaris, Anggota, dll.
  major       String?  // Program Studi di UPNVJT
  batch       String?  // Angkatan Kuliah
  photoUrl    String?  // Foto / GIF resmi
  linkedinUrl String?
  instagramUrl String?
  sortOrder   Int      @default(0)
  division    Division @relation(fields: [divisionId], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// 5. Division Program Kerja (Proker)
model Proker {
  id          Int      @id @default(autoincrement())
  divisionId  Int
  name        String
  status      String   @default("UPCOMING") // UPCOMING, ONGOING, COMPLETED
  date        String?  // Jadwal pelaksanaan
  description String?
  sortOrder   Int      @default(0)
  division    Division @relation(fields: [divisionId], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// 6. BPH & Pembina Members
model BphMember {
  id          Int      @id @default(autoincrement())
  name        String
  role        String   // Ketua Komti, Wakil, Sekretaris, Bendahara, Pembina
  category    String   // BPH | PEMBINA
  major       String?
  batch       String?
  photoUrl    String?
  linkedinUrl String?
  instagramUrl String?
  sortOrder   Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// 7. Master Categories
model Category {
  id          Int       @id @default(autoincrement())
  name        String
  slug        String    @unique
  type        String    @default("ARTICLE") // ARTICLE | DOCUMENT | PROKER
  description String?
  sortOrder   Int       @default(0)
  articles    Article[]
  documents   DocumentArchive[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

// 8. Publikasi Berita / Artikel
model Article {
  id          Int       @id @default(autoincrement())
  title       String
  slug        String    @unique
  content     String    // Rich HTML Content
  excerpt     String?
  coverImage  String?
  author      String    @default("GenBI UPNVJT")
  categoryId  Int?
  status      String    @default("PUBLISHED") // DRAFT | PUBLISHED
  publishedAt DateTime  @default(now())
  category    Category? @relation(fields: [categoryId], references: [id], onDelete: SetNull)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

// 9. Capaian Prestasi Mahasiswa
model Achievement {
  id          Int      @id @default(autoincrement())
  title       String
  recipient   String   // Nama mahasiswa pemenang
  rank        String   // gold, silver, bronze, finalist, delegate, special
  event       String   // Nama ajang / kompetisi
  organizer   String?  // Penyelenggara
  year        Int
  imageUrl    String?
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// 10. Arsip Dokumen Resmi
model DocumentArchive {
  id          Int       @id @default(autoincrement())
  title       String
  fileUrl     String    // PDF storage path
  fileSize    String?
  categoryId  Int?
  description String?
  category    Category? @relation(fields: [categoryId], references: [id], onDelete: SetNull)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

// 11. Activity Log
model ActivityLog {
  id          Int       @id @default(autoincrement())
  adminId     Int?
  adminName   String
  action      String    // LOGIN, CREATE_ARTICLE, UPDATE_MEMBER, dll.
  description String?
  ipAddress   String?
  admin       AdminUser? @relation(fields: [adminId], references: [id], onDelete: SetNull)
  createdAt   DateTime  @default(now())
}
```

---

## BAB 9: Utilitas Sistem & Helper Functions

### 9.1 Ekspor CSV dengan Windows UTF-8 BOM Encoding (`lib/export.ts`)
```typescript
export function exportToCsv<T extends Record<string, any>>(
  filename: string,
  columns: { key: keyof T | string; label: string }[],
  data: T[]
) {
  if (!data || data.length === 0) return;

  const headers = columns.map((c) => `"${c.label.replace(/"/g, '""')}"`).join(',');
  const rows = data.map((item) =>
    columns
      .map((col) => {
        const val = item[col.key] ?? '';
        const str = String(val).replace(/"/g, '""');
        return `"${str}"`;
      })
      .join(',')
  );

  const csvContent = '\uFEFF' + [headers, ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
```

### 9.2 Perhitungan Estimasi Waktu Baca (*Read Time Estimation*)
```typescript
export function calculateReadTime(htmlContent: string): number {
  if (!htmlContent) return 1;
  const textOnly = htmlContent.replace(/<[^>]*>/g, ' ');
  const words = textOnly.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200)); // Rata-rata 200 kata/menit
}
```

---

## BAB 10: Standar Operasional Pengembang (SOP Developer & Git Rules)

Berdasarkan aturan baku repositori pada **`AGENTS.md`**, seluruh kontributor dan AI Agent wajib mematuhi aturan berikut:

### 1. Alur Kerja Wajib: AUDIT ➔ PERSETUJUAN ("GAS") ➔ KERJAKAN
1. **AUDIT**: Setiap kali ada permintaan fitur, refaktor, perbaikan bug, atau perubahan kode, Developer/Agent WAJIB melakukan audit terlebih dahulu (analisa kebutuhan, modul terdampak, rencana teknis).
2. **MENUNGGU**: DILARANG melakukan modifikasi, penulisan, atau penghapusan kode sebelum user memberikan konfirmasi / instruksi persetujuan (seperti kata **"GAS"** atau instruksi eksplisit).
3. **KERJAKAN**: Eksekusi perubahan kode HANYA dilakukan setelah user memberikan persetujuan.

### 2. Aturan Git & Branching
- **Dilarang Keras** menjalankan `git commit` atau `git push` secara mandiri tanpa instruksi eksplisit dari user.
- Seluruh pengerjaan dilakukan pada branch **`dev-cms`**.
- Format commit wajib menggunakan *Conventional Commits*:
  - `feat: ...` untuk penambahan fitur baru.
  - `fix: ...` untuk perbaikan bug.
  - `refactor: ...` untuk penataan ulang struktur kode.
  - `docs: ...` untuk pembaruan dokumentasi.
  - `style: ...` untuk penyesuaian styling dan estetika UI.

---
*Dokumentasi ini disusun sebagai standar resmi pengembangan sistem CMS GenBI-Hub UPN "Veteran" Jawa Timur.*
