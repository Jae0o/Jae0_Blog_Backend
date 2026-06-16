import type { Category } from 'interfaces';

import type { CategoryListItem } from './getCategoryList.controller.type';

/** Category 엔티티 → 공개 목록 DTO. 표시·카운트 필드만, 내부/SEO 필드는 제외. */
export function toCategoryListItem(category: Category): CategoryListItem {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description,
    coverImage: category.coverImage,
    hue: category.hue,
    order: category.order,
    postCount: category.postCount,
    tilCount: category.tilCount,
  };
}
