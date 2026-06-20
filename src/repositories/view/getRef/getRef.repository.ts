import type { DocumentReference } from 'firebase-admin/firestore';

import { db } from 'config/firebase';
import type { ViewTargetType } from 'interfaces';

import { viewDocId } from '../viewDocId';

/** views/{type_id_date} 문서 ref. */
export function getRef(targetType: ViewTargetType, targetId: string, date: string): DocumentReference {
  return db.collection('views').doc(viewDocId(targetType, targetId, date));
}
