import { db } from 'config/firebase';
import type { Post } from 'interfaces';

/** id 배열로 공개 글 일괄 조회 (related용). 입력 순서 유지, 비공개/draft/삭제/없음 제외. */
export async function getByIds(ids: string[]): Promise<Post[]> {
  if (ids.length === 0) return [];

  const refs = ids.map((id) => db.collection('posts').doc(id));
  const snapshots = await db.getAll(...refs);

  return snapshots
    .filter((snap) => snap.exists)
    .map((snap) => ({ ...snap.data(), id: snap.id }) as Post)
    .filter((post) => post.deletedAt === null && post.status === 'public');
}
