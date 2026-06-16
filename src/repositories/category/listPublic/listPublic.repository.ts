import { db } from 'config/firebase';
import type { Category } from 'interfaces';

/** 공개 카테고리 목록. deletedAt==null + visibility=='public', order ASC. */
export async function listPublic(): Promise<Category[]> {
  const snapshot = await db
    .collection('categories')
    .where('deletedAt', '==', null)
    .where('visibility', '==', 'public')
    .orderBy('order', 'asc')
    .get();

  return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as Category);
}
