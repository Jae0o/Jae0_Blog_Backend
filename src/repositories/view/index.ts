import { getRef } from './getRef';
import { getTargetRef } from './getTargetRef';
import { viewDocId } from './viewDocId';

/** views Firestore 접근 (M2 트래킹). */
export const ViewRepository = { viewDocId, getRef, getTargetRef };
