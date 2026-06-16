import type { Til } from 'interfaces';

import type { TilListItem } from './getTilList.controller.type';

/** Til 엔티티 → 카드 목록 DTO. publishedAt은 createdAt으로 매핑, timestamp는 ISO 문자열. */
export function toTilListItem(til: Til): TilListItem {
  return {
    id: til.id,
    title: til.title,
    categoryId: til.categoryId,
    categoryName: til.categoryName,
    tagNames: til.tagNames,
    code: til.code,
    codeLanguage: til.codeLanguage,
    imageUrl: til.imageUrl,
    isPinned: til.isPinned,
    viewCount: til.viewCount,
    publishedAt: til.createdAt.toDate().toISOString(),
    updatedAt: til.updatedAt.toDate().toISOString(),
  };
}
