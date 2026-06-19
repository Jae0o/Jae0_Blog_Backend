import type { Til } from 'interfaces';

import type { TilDetail } from './getTil.controller.type';

/** Til 엔티티 → 상세 DTO. 내부 필드(authorId·bodyText·keywords·metadata·deletedAt)는 제외, Timestamp는 ISO 문자열. */
export function toTilDetail(til: Til): TilDetail {
  return {
    id: til.id,
    language: til.language,
    title: til.title,
    body: til.body,
    code: til.code,
    codeLanguage: til.codeLanguage,
    imageUrl: til.imageUrl,
    categoryId: til.categoryId,
    categoryName: til.categoryName,
    tagNames: til.tagNames,
    visibility: til.visibility,
    isPinned: til.isPinned,
    viewCount: til.viewCount,
    createdAt: til.createdAt.toDate().toISOString(),
    updatedAt: til.updatedAt.toDate().toISOString(),
  };
}
