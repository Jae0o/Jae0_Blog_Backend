/**
 * GET /api/tils/:tilId 상세 응답 DTO (Detail Modal용).
 * Til 엔티티를 거의 그대로 노출하되 Timestamp(createdAt/updatedAt/deletedAt)만 ISO 문자열로 직렬화한다.
 */
export interface TilDetail {
  id: string;
  authorId: string;
  language: string;
  title: string | null;
  body: unknown;
  bodyText: string;
  keywords: string[];
  code: string | null;
  codeLanguage: string | null;
  imageUrl: string | null;
  categoryId: string;
  categoryName: string;
  tagNames: string[];
  visibility: 'public' | 'private';
  isPinned: boolean;
  viewCount: number;
  metadata: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
