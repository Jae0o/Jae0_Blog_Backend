import { db } from 'config/firebase';
import type { Category } from 'interfaces';

/**
 * slug로 카테고리 단건 조회 (글 목록의 categorySlug→categoryId 해석용).
 * slug는 사실상 유니크 → 단일 equality 쿼리(복합인덱스 불필요) 후 deletedAt은 in-memory 체크.
 * visibility는 체크하지 않음 — 카테고리 페이지 노출 제어일 뿐 글 필터와 무관(domain-model).
 */
export async function getBySlug(slug: string): Promise<Category | null> {
  const snapshot = await db.collection('categories').where('slug', '==', slug).limit(1).get();
  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  const category = { ...doc.data(), id: doc.id } as Category;
  if (category.deletedAt !== null) return null;

  return category;
}
