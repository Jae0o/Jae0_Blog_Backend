import { getByIds } from './getByIds';
import { getBySlug } from './getBySlug';
import { listPublic } from './listPublic';

/** posts Firestore 접근 (공개 read). */
export const PostRepository = { listPublic, getBySlug, getByIds };
