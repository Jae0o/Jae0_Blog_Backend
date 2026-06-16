import { getById } from './getById';
import { listPublic } from './listPublic';

/** tils Firestore 접근 (공개 read). */
export const TilRepository = { listPublic, getById };
