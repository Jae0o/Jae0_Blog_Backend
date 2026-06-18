import { FieldValue, Timestamp } from 'firebase-admin/firestore';

import { db } from 'config/firebase';

/** rateLimits 카운터 doc 형태 (인프라 전용 — 도메인 엔티티 아님). */
interface RateLimitDoc {
  count: number;
  expireAt: Timestamp;
}

/**
 * 결정적 doc `rateLimits/{docId}`의 카운터를 1 증가시키고 증가 후 값을 반환한다.
 * transaction으로 read→write를 묶어 인스턴스 간 경쟁에도 정확히 센다.
 * 첫 write 시 `expireAt`을 기록한다 (만료 doc 정리는 M9 Cron 책임).
 */
export async function increment(docId: string, expireAtMs: number): Promise<number> {
  const ref = db.collection('rateLimits').doc(docId);

  return db.runTransaction(async (tx) => {
    const snapshot = await tx.get(ref);

    if (!snapshot.exists) {
      tx.set(ref, { count: 1, expireAt: Timestamp.fromMillis(expireAtMs) } satisfies RateLimitDoc);
      return 1;
    }

    const next = (snapshot.data() as RateLimitDoc).count + 1;
    tx.update(ref, { count: FieldValue.increment(1) });
    return next;
  });
}
