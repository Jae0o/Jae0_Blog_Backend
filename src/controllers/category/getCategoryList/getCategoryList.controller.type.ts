/**
 * GET /api/categories 응답 항목 DTO.
 * 표시·카운트 필드만 노출하고, 내부(nameLower/visibility/deletedAt)·SEO(metaTitle/metaDescription)·timestamp는 제외한다.
 */
export interface CategoryListItem {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  coverImage: string | null;
  hue: number;
  order: number;
  postCount: number;
  tilCount: number;
}
