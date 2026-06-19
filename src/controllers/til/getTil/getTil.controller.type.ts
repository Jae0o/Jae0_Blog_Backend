/**
 * GET /api/tils/:tilId 상세 응답 DTO (Detail Modal용).
 * PostDetail과 동일한 공개 노출 정책: authorId·bodyText·keywords·metadata·deletedAt 등
 * 내부 필드는 제외한다. Timestamp(createdAt/updatedAt)는 ISO 문자열로 직렬화.
 */
export interface TilDetail {
  id: string;
  language: string;
  title: string | null;
  body: unknown;
  code: string | null;
  codeLanguage: string | null;
  imageUrl: string | null;
  categoryId: string;
  categoryName: string;
  tagNames: string[];
  visibility: 'public' | 'private';
  isPinned: boolean;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}
