import type { Query, Timestamp } from 'firebase-admin/firestore';

import { db } from 'config/firebase';
import type { Post } from 'interfaces';

export interface GetAdjacentParams {
  publishedAt: Timestamp;
  direction: 'prev' | 'next';
  /** 같은 카테고리 내에서만 인접 글을 찾는다 (api-spec: 이전/다음=같은 카테고리 시간순). */
  categoryId: string;
}

/**
 * 같은 카테고리 내 publishedAt 기준 인접 공개 글 1건 (상세의 이전/다음).
 * prev = 더 예전 글(publishedAt < X, 가장 가까운 것), next = 더 최신 글(publishedAt > X, 가장 가까운 것).
 * strict 비교라 자기 자신은 자동 제외. 없으면 null.
 */
export async function getAdjacent(params: GetAdjacentParams): Promise<Post | null> {
  const { publishedAt, direction, categoryId } = params;

  let query: Query = db
    .collection('posts')
    .where('deletedAt', '==', null)
    .where('status', '==', 'public')
    .where('categoryId', '==', categoryId);

  query =
    direction === 'prev'
      ? query.where('publishedAt', '<', publishedAt).orderBy('publishedAt', 'desc')
      : query.where('publishedAt', '>', publishedAt).orderBy('publishedAt', 'asc');

  const snapshot = await query.limit(1).get();
  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  return { ...doc.data(), id: doc.id } as Post;
}
