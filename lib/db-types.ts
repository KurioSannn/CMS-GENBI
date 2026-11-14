import type { SiteSettings } from './site-settings';

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

export interface Category {
  id: number;
  name: string;
  slug: string;
  type: string; // "ARTICLE" | "DOCUMENT"
  description?: string | null;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface DatabaseSchema {
  adminUsers: AdminUser[];
  banners: Banner[];
  bphMembers: BphMember[];
  divisions: Division[];
  divisionMembers: DivisionMember[];
  categories: Category[];
  articles: Article[];
  achievements: Achievement[];
  documents: DocumentArchive[];
  activityLogs: ActivityLog[];
  siteSettings?: SiteSettings;
}
