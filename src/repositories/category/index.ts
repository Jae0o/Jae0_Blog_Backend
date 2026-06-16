import { getBySlug } from './getBySlug';
import { listPublic } from './listPublic';

/** categories Firestore 접근 (공개 read). */
export const CategoryRepository = { listPublic, getBySlug };
