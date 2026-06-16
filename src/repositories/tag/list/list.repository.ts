import { db } from 'config/firebase';
import type { Tag } from 'interfaces';

export interface ListTagsParams {
  limit?: number;
  sortBy?: 'postCount' | 'recent' | 'name';
}

const DEFAULT_TAG_LIMIT = 7;

/**
 * 태그 목록 조회. tags는 soft-delete 대상이 아님(deletedAt 필터 없음).
 * - 'postCount'(default): 인기순. 결합 카운트 필드가 없어 전체 fetch 후 (postCount+tilCount) DESC in-memory 정렬.
 * - 'recent': createdAt DESC. 'name': nameLower ASC.
 */
export async function list(params: ListTagsParams = {}): Promise<Tag[]> {
  const { limit = DEFAULT_TAG_LIMIT, sortBy = 'postCount' } = params;

  if (sortBy === 'recent') {
    const snapshot = await db.collection('tags').orderBy('createdAt', 'desc').limit(limit).get();
    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as Tag);
  }

  if (sortBy === 'name') {
    const snapshot = await db.collection('tags').orderBy('nameLower', 'asc').limit(limit).get();
    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as Tag);
  }

  const snapshot = await db.collection('tags').get();
  const tags = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as Tag);
  tags.sort((a, b) => b.postCount + b.tilCount - a.postCount - a.tilCount);

  return tags.slice(0, limit);
}
