import type { Tag } from 'interfaces';

import type { TagListItem } from './getPopularTags.controller.type';

/** Tag 엔티티 → 공개 목록 DTO. 표시명·필터키·카운트만, description/synonyms는 제외. */
export function toTagListItem(tag: Tag): TagListItem {
  return {
    id: tag.id,
    displayName: tag.displayName,
    nameLower: tag.nameLower,
    postCount: tag.postCount,
    tilCount: tag.tilCount,
  };
}
