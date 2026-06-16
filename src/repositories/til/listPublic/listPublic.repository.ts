import type { Query } from 'firebase-admin/firestore';

import { db } from 'config/firebase';
import type { Til } from 'interfaces';

export interface ListPublicTilsParams {
  categoryId?: string;
  tag?: string;
  sort?: 'latest' | 'oldest';
  pageSize: number;
  cursor?: unknown[];
}

/**
 * 공개 TIL 목록 조회 (Firestore 접근만).
 * 필터: deletedAt==null + visibility=='public' (+ categoryId / tag).
 * 정렬: createdAt (latest=DESC, oldest=ASC). cursor는 마지막 문서 id → startAfter(snapshot).
 */
export async function listPublic(params: ListPublicTilsParams): Promise<Til[]> {
  const { categoryId, tag, sort = 'latest', pageSize, cursor } = params;

  let query: Query = db.collection('tils').where('deletedAt', '==', null).where('visibility', '==', 'public');

  if (categoryId) query = query.where('categoryId', '==', categoryId);
  if (tag) query = query.where('tagNames', 'array-contains', tag);

  query = query.orderBy('createdAt', sort === 'oldest' ? 'asc' : 'desc');

  if (cursor) {
    const cursorSnap = await db.collection('tils').doc(String(cursor[0])).get();
    if (cursorSnap.exists) query = query.startAfter(cursorSnap);
  }

  const snapshot = await query.limit(pageSize).get();

  return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as Til);
}
