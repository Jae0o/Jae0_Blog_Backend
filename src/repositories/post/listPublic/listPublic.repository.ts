import type { Query } from 'firebase-admin/firestore';

import { db } from 'config/firebase';
import type { Post } from 'interfaces';

export interface ListPublicPostsParams {
  categoryId?: string;
  tag?: string;
  sort?: 'latest' | 'oldest';
  pageSize: number;
  cursor?: unknown[];
}

/**
 * 공개 글 목록 조회 (Firestore 접근만).
 * 필터: deletedAt==null + status=='public' (+ categoryId / tag).
 * 정렬: publishedAt (latest=DESC, oldest=ASC).
 * cursor는 마지막 문서 id 배열 → 해당 문서를 재조회해 startAfter(snapshot)에 전달.
 */
export async function listPublic(params: ListPublicPostsParams): Promise<Post[]> {
  const { categoryId, tag, sort = 'latest', pageSize, cursor } = params;

  let query: Query = db.collection('posts').where('deletedAt', '==', null).where('status', '==', 'public');

  if (categoryId) query = query.where('categoryId', '==', categoryId);
  if (tag) query = query.where('tagNames', 'array-contains', tag);

  query = query.orderBy('publishedAt', sort === 'oldest' ? 'asc' : 'desc');

  if (cursor) {
    const cursorSnap = await db.collection('posts').doc(String(cursor[0])).get();
    if (cursorSnap.exists) query = query.startAfter(cursorSnap);
  }

  const snapshot = await query.limit(pageSize).get();

  return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as Post);
}
