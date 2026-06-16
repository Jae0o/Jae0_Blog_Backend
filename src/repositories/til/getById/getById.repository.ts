import { db } from 'config/firebase';
import type { Til } from 'interfaces';

/** 공개 TIL 상세. 비공개/삭제/없음이면 null. */
export async function getById(tilId: string): Promise<Til | null> {
  const snapshot = await db.collection('tils').doc(tilId).get();
  if (!snapshot.exists) return null;

  const til = { ...snapshot.data(), id: snapshot.id } as Til;
  if (til.deletedAt !== null || til.visibility !== 'public') return null;

  return til;
}
