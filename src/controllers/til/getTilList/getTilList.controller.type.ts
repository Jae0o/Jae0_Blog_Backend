/**
 * GET /api/tils 목록 응답 항목 DTO (카드 그리드용).
 * api-spec.md(TilListItem) 기준: 카드 본문 렌더 + 모달 즉시 표시를 위해 body·bodyPreview를 포함한다.
 * title·updatedAt은 목록 스펙에 없어 제외, 날짜는 createdAt. bodyText·keywords·authorId 등 내부 필드도 제외.
 * timestamp는 ISO 문자열.
 */
export interface TilListItem {
  id: string;
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
  createdAt: string;
}
