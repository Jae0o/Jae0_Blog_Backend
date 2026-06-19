/**
 * GET /api/tils 목록 응답 항목 DTO (카드 그리드용).
 * api-spec.md(TilListItem) 기준: 카드 본문 렌더 + 모달 즉시 표시를 위해 body·bodyPreview를 포함한다.
 * TIL엔 slug·publishedAt이 없어 publishedAt은 createdAt으로 매핑(M1-05 결정, FE 날짜 계약).
 * bodyText·keywords·authorId 등 내부 필드는 제외. timestamp는 ISO 문자열.
 */
export interface TilListItem {
  id: string;
  title: string | null;
  body: unknown;
  bodyPreview: string;
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
