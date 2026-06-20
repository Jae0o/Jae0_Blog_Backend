import { FieldValue } from 'firebase-admin/firestore';

import { db } from 'config/firebase';
import type { View, ViewTargetType } from 'interfaces';
import { ViewRepository } from 'repositories';
import { ipHash } from 'utils';

export interface TrackViewParams {
  targetType: ViewTargetType;
  targetId: string;
  ip: string;
  isAdmin: boolean;
}

/**
 * 조회수 증가: views 일자 집계 + posts/tils.viewCount 를 한 트랜잭션으로 갱신.
 * 본인(admin) 방문은 제외. ipHashes는 arrayUnion으로 unique 유지(같은 IP 재호출도 길이 불변).
 */
export async function track({ targetType, targetId, ip, isAdmin }: TrackViewParams): Promise<void> {
  if (isAdmin) return;

  const hash = ipHash(ip);
  const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD (UTC)

  const viewRef = ViewRepository.getRef(targetType, targetId, date);
  const targetRef = ViewRepository.getTargetRef(targetType, targetId);

  await db.runTransaction(async (tx) => {
    const snapshot = await tx.get(viewRef);

    if (!snapshot.exists) {
      tx.set(viewRef, { targetType, targetId, date, count: 1, ipHashes: [hash] } satisfies View);
    } else {
      tx.update(viewRef, { count: FieldValue.increment(1), ipHashes: FieldValue.arrayUnion(hash) });
    }

    tx.update(targetRef, { viewCount: FieldValue.increment(1) });
  });
}
