import type { Til } from 'interfaces';

import type { TilDetail } from './getTil.controller.type';

/** Til 엔티티 → 상세 DTO. Timestamp는 ISO 문자열로 직렬화(deletedAt은 null 가능). */
export function toTilDetail(til: Til): TilDetail {
  return {
    id: til.id,
    authorId: til.authorId,
    language: til.language,
    title: til.title,
    body: til.body,
    bodyText: til.bodyText,
    keywords: til.keywords,
    code: til.code,
    codeLanguage: til.codeLanguage,
    imageUrl: til.imageUrl,
    categoryId: til.categoryId,
    categoryName: til.categoryName,
    tagNames: til.tagNames,
    visibility: til.visibility,
    isPinned: til.isPinned,
    viewCount: til.viewCount,
    metadata: til.metadata,
    createdAt: til.createdAt.toDate().toISOString(),
    updatedAt: til.updatedAt.toDate().toISOString(),
    deletedAt: til.deletedAt ? til.deletedAt.toDate().toISOString() : null,
  };
}
