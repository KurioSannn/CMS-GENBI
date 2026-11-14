# system.md — System Architecture & Technical Specification

> **GenBI-Hub — Next-Generation Web Portal & Content Management System**  
> **Target Organisasi**: Komunitas Mahasiswa Penerima Beasiswa Bank Indonesia (GenBI UPN "Veteran" Jawa Timur)  
> **Tech Stack**: Next.js 15 (Pages Router) + React 19 + TypeScript + Prisma ORM + Tailwind CSS + Lucide Icons  

---

# 1. Arsitektur Tingkat Tinggi (High-Level Architecture)

GenBI-Hub dirancang dengan pola **Monolithic Fullstack Modern** yang memadukan server-side rendering, API handler serverless, lapisan controller terstruktur, dan ORM type-safe:

```mermaid
flowchart TD
    Client["Client Browser (Mobile / Desktop)"]
    
    subgraph Edge["Edge / Next.js Middleware Layer"]
        MW["middleware.ts<br/>(Cek Cookie 'genbi_admin_token')"]
    end

    subgraph Presentation["Presentation Layer (Pages & Components)"]
        PublicPages["Pages Publik<br/>(index.tsx, berita, divisi, dll)"]
        AdminPages["Pages Admin CMS<br/>(pages/admin/*)"]
        UIComponents["Reusable Components<br/>(components/*, Lucide Icons)"]
    end

    subgraph APILayer["API Gateway Layer (pages/api/*)"]
        AuthRoute["/api/auth/* (login, logout, me)"]
        AdminRoute["/api/admin/* (banner, berita, bph, dll)"]
        UploadRoute["/api/upload (Formidable + Sharp)"]
    end

    subgraph ServiceLayer["Business Logic & Service Layer (lib/*)"]
        Controllers["Controllers (lib/controllers/*)<br/>- ArticleController<br/>- DivisionController<br/>- BphController<br/>- AchievementController<br/>- DocumentController<br/>- CategoryController<br/>- BannerController<br/>- StatsController"]
        AuthService["Auth & Security (lib/auth.ts)"]
    end

    subgraph DataAccess["Data Access Layer"]
        PrismaClient["Prisma ORM Client Singleton (lib/prisma.ts)"]
        DBFallback["DB Storage Engine (lib/db.ts)"]
    end

    subgraph Storage["Database & File System"]
        DB[("Database Engine<br/>(MySQL / SQLite)")]
        DiskStorage["Public Upload Storage<br/>(/public/uploads/*)"]
    end

    Client -->|Permintaan Halaman| MW
    MW -->|Rute Publik| PublicPages
    MW -->|Rute Admin Valid| AdminPages
    
    PublicPages & AdminPages --> UIComponents
    AdminPages -->|AJAX Fetch / SWR| APILayer
    PublicPages -->|getServerSideProps / Fetch| Controllers

    AuthRoute & AdminRoute --> Controllers
    UploadRoute --> Controllers
    Controllers --> AuthService
    Controllers --> PrismaClient & DBFallback
    UploadRoute --> DiskStorage

    PrismaClient --> DB
```

---

# 2. Skema Basis Data & Relasi Entitas (Database ERD)

```mermaid
erDiagram
    AdminUser ||--o{ ActivityLog : creates
    Division ||--o{ DivisionMember : contains
    Division ||--o{ WorkProgram : executes
    Category ||--o{ Article : classifies
    Category ||--o{ DocumentArchive : classifies

    AdminUser {
        int id PK
        string username UK
        string email UK
        string passwordHash
        string name
        string role
        datetime createdAt
        datetime updatedAt
    }

    ActivityLog {
        int id PK
        int adminId FK
        string action
        string description
        string ipAddress
        datetime createdAt
    }

    Banner {
        int id PK
        string title
        string subtitle
        string imageUrl
        string buttonText
        string buttonUrl
        int sortOrder
        boolean isActive
        datetime createdAt
    }

    BphMember {
        int id PK
        string name
        string category
        string position
        string imageUrl
        string quote
        string instagram
        string linkedin
        int sortOrder
        datetime createdAt
    }

    Division {
        int id PK
        string name
        string slug UK
        string tagline
        string description
        string logoUrl
        string teamPhotoUrl
        int sortOrder
        datetime createdAt
    }

    DivisionMember {
        int id PK
        int divisionId FK
        string name
        string role
        string prodiAngkatan
        string imageUrl
        int sortOrder
        datetime createdAt
    }

    Category {
        int id PK
        string name
        string slug UK
        string type
        string description
        int sortOrder
        datetime createdAt
    }

    Article {
        int id PK
        string title
        string slug UK
        string excerpt
        string content
        string coverImage
        string category
        string author
        string status
        datetime publishedAt
        datetime createdAt
    }

    Achievement {
        int id PK
        string title
        string recipient
        string competition
        string badge
        string rank
        string year
        string imageUrl
        string description
        int sortOrder
        datetime createdAt
    }

    DocumentArchive {
        int id PK
        string title
        string category
        string fileUrl
        string fileSize
        string description
        datetime publishedAt
        datetime createdAt
    }

    WorkProgram {
        int id PK
        int divisionId FK
        string title
        string slug UK
        string description
        string personInCharge
        string status
        datetime startDate
        datetime endDate
        string targetAudience
        string budget
        datetime createdAt
    }
```

---

# 3. Arsitektur Keamanan & Autentikasi

### A. Alur Autentikasi JWT Cookie
1. **Login Request**: Admin mengirim kredensial (`username` + `password`) ke `POST /api/auth/login`.
2. **Password Verification**: `auth.controller.ts` memverifikasi hash password menggunakan `bcrypt.compareSync()`.
3. **Token Issuance**: Server membuat JSON Web Token (JWT) yang memuat payload `{ id, username, name, role }` dengan masa berlaku 7 hari.
4. **HttpOnly Cookie**: Token dikirim ke browser dalam cookie berlabel `genbi_admin_token` dengan flag `HttpOnly`, `SameSite=Lax`, dan `Path=/`.
5. **Route Protection**: `middleware.ts` memeriksa keberadaan cookie pada setiap request ke `/admin/*` (kecuali `/admin/login`).

### B. Audit Trail / Activity Logger
Setiap mutasi data penting (tambah berita, ubah susunan BPH, unggah dokumen) secara otomatis memanggil `activityLog.create()` untuk mencatat nama admin, jenis tindakan, dan deskripsi perubahan.

---

# 4. Arsitektur File Upload & Media Storage

- **Parser**: Modul `formidable` menerima upload berkas `multipart/form-data`.
- **Image Optimization**: Berkas gambar diproses menggunakan pustaka `sharp` untuk:
  - Konversi format ke `WebP` (ukuran lebih ringan hingga 70% tanpa mengurangi ketajaman).
  - Pembatasan dimensi maksimum (maksimal lebar 1920px untuk banner, 800px untuk foto anggota).
- **Directory Sanitization**: Berkas disimpan di `/public/uploads/` dengan penamaan berbasis timestamp acak untuk mencegah tabrakan nama file (*collision*).

---

# 5. Pola Desain Controller (`lib/controllers/*`)

Seluruh API route diwajibkan menerapkan pola **Single Responsibility Controller**:
* **Input Validation**: Memvalidasi field wajib dan tipe data sebelum masuk ke database.
* **Auto Slug Generator**: Menghasilkan slug URL yang SEO-friendly dan unik secara otomatis.
* **Database Query**: Melakukan pemanggilan operasi CRUD terisolasi melalui Prisma ORM.
* **Error Propagation**: Menghasilkan error message berbahasa Indonesia yang jelas untuk ditangkap oleh frontend.
