/**
 * GET /api/posts 목록 응답 항목 DTO.
 * slug·publishedAt·updatedAt 필수(FE sitemap/RSS 계약). body 등 본문 필드는 포함하지 않는다.
 * timestamp는 ISO 문자열로 직렬화.
 */
export interface PostListItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  categoryName: string | null;
  tagNames: string[];
  publishedAt: string | null;
  updatedAt: string;
  readingTime: number;
  viewCount: number;
  isPinned: boolean;
}
