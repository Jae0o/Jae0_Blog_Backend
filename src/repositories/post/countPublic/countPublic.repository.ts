import type { Query } from 'firebase-admin/firestore';

import { db } from 'config/firebase';

export interface CountPublicPostsParams {
  categoryId?: string;
  tag?: string;
}

/**
 * 공개 글 개수 (Firestore count 집계).
 * 필터는 listPublic과 동일(deletedAt==null + status=='public' (+ categoryId / tag)).
 * count()는 정렬/limit이 없어 기존 인덱스의 prefix로 처리된다.
 */
export async function countPublic(params: CountPublicPostsParams = {}): Promise<number> {
  const { categoryId, tag } = params;

  let query: Query = db.collection('posts').where('deletedAt', '==', null).where('status', '==', 'public');

  if (categoryId) query = query.where('categoryId', '==', categoryId);
  if (tag) query = query.where('tagNames', 'array-contains', tag);

  const snapshot = await query.count().get();

  return snapshot.data().count;
}
