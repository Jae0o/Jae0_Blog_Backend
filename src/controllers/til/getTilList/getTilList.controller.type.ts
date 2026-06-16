/**
 * GET /api/tils 목록 응답 항목 DTO (카드 그리드용).
 * TIL엔 excerpt·slug·publishedAt이 없어, publishedAt은 createdAt으로 매핑한다.
 * body 등 본문 필드는 제외하고 code/imageUrl 미리보기만 포함. timestamp는 ISO 문자열.
 */
export interface TilListItem {
  id: string;
  title: string | null;
  categoryId: string;
  categoryName: string;
  tagNames: string[];
  code: string | null;
  codeLanguage: string | null;
  imageUrl: string | null;
  isPinned: boolean;
  viewCount: number;
  publishedAt: string;
  updatedAt: string;
}
