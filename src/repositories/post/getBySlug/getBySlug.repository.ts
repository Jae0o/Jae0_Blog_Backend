import { db } from 'config/firebase';
import type { Post } from 'interfaces';

/** 공개 글 상세 (slug=문서ID). 비공개/draft/삭제/없음이면 null. */
export async function getBySlug(slug: string): Promise<Post | null> {
  const snapshot = await db.collection('posts').doc(slug).get();
  if (!snapshot.exists) return null;

  const post = { ...snapshot.data(), id: snapshot.id } as Post;
  if (post.deletedAt !== null || post.status !== 'public') return null;

  return post;
}
