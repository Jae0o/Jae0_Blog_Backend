/**
 * Firestore 엔티티 타입 (Phase 1).
 * 출처: .claude/docs/reference/domain-model.md
 *
 * - 모든 timestamp는 Firestore `Timestamp` (serverTimestamp, UTC).
 * - 소프트 삭제: `deletedAt`(미삭제는 null).
 * - Phase 2 필드(seriesId, commentCount 등)와 미사용 컬렉션(Media/View/Redirect/Log)은
 *   해당 마일스톤에서 추가.
 */
import type { Timestamp } from 'firebase-admin/firestore';

/** 모든 문서 공통 타임스탬프 */
export interface BaseEntity {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

/** users/{uid} — 관리자 정보 */
export interface User extends BaseEntity {
  uid: string;
  email: string;
  displayName: string;
  role: 'admin';
  lastLoginAt: Timestamp | null;
  lastLoginIp: string | null;
  themePreference: string | null;
}

/** categories/{categoryId} */
export interface Category extends BaseEntity {
  id: string;
  name: string;
  nameLower: string;
  slug: string;
  description: string | null;
  coverImage: string | null;
  hue: number; // 0~360
  visibility: 'public' | 'private';
  order: number;
  postCount: number;
  tilCount: number;
  metaTitle: string | null;
  metaDescription: string | null;
  deletedAt: Timestamp | null;
}

/** tags/{tagId} */
export interface Tag extends BaseEntity {
  id: string;
  nameLower: string; // 유니크
  displayName: string;
  description: string | null;
  synonyms: string[];
  postCount: number;
  tilCount: number;
}

/** posts/{postId} — Blog 글 (Tiptap JSON) */
export interface Post extends BaseEntity {
  id: string;
  slug: string;
  authorId: string;
  language: string; // 'ko'
  title: string;
  body: unknown; // Tiptap JSON
  bodySize: number;
  bodyText: string;
  keywords: string[];
  excerpt: string;
  coverImage: string | null;
  categoryId: string | null;
  categoryName: string | null;
  tagNames: string[];
  status: 'public' | 'private' | 'draft';
  metaTitle: string | null;
  metaDescription: string | null;
  ogImage: string | null;
  canonicalUrl: string | null;
  relatedPostIds: string[];
  isPinned: boolean;
  readingTime: number;
  wordCount: number;
  publishedAt: Timestamp | null;
  deletedAt: Timestamp | null;
  viewCount: number;
  metadata: Record<string, unknown> | null;
}

/** tils/{tilId} — TIL 카드 */
export interface Til extends BaseEntity {
  id: string;
  authorId: string;
  language: string; // 'ko'
  title: string | null;
  body: unknown; // Tiptap JSON
  bodyText: string;
  keywords: string[];
  code: string | null;
  codeLanguage: string | null;
  imageUrl: string | null;
  categoryId: string; // 필수
  categoryName: string; // 필수
  tagNames: string[];
  visibility: 'public' | 'private'; // status 없음, 기본 'public'
  isPinned: boolean;
  deletedAt: Timestamp | null;
  viewCount: number;
  metadata: Record<string, unknown> | null;
}

/** siteConfig/'default' — 사이트 전역 설정 */
export interface SiteConfig {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  socialLinks: {
    github: string | null;
    instagram: string | null;
    twitter: string | null;
    mail: string | null;
    rss: string | null;
  };
  authorBio: string | null;
  authorAvatar: string | null;
  defaultOgImage: string | null;
  defaultMetaDescription: string | null;
  footerText: string | null;
  footerLinks: { label: string; url: string }[];
  customAnalyticsEnabled: boolean; // admin 전용 — 공개 응답에서 제외(M1-06)
  updatedAt: Timestamp;
}
