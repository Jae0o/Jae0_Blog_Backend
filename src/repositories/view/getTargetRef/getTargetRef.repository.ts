import type { DocumentReference } from 'firebase-admin/firestore';

import { db } from 'config/firebase';
import type { ViewTargetType } from 'interfaces';

const TARGET_COLLECTION: Record<ViewTargetType, string> = { post: 'posts', til: 'tils' };

/** 트래킹 대상(posts/{id} | tils/{id}) 문서 ref. */
export function getTargetRef(targetType: ViewTargetType, targetId: string): DocumentReference {
  return db.collection(TARGET_COLLECTION[targetType]).doc(targetId);
}
