/**
 * GET /api/posts/:slug 상세 응답 DTO.
 * 본문(body)·SEO·표시 필드를 포함하고, 내부/검색 전용 필드
 * (authorId, bodySize, bodyText, keywords, relatedPostIds, deletedAt, metadata)는 제외한다.
 * timestamp는 ISO 문자열로 직렬화(publishedAt만 null 가능).
 */
export interface PostDetail {
  id: string;
  slug: string;
  language: string;
  title: string;
  body: unknown;
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
  isPinned: boolean;
  readingTime: number;
  wordCount: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
}
