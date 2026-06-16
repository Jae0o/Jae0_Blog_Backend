import type { Post } from 'interfaces';

export interface PickRelatedParams {
  selfId: string;
  selfTags: string[];
  /** relatedPostIds로 해석된 공개 글 (순서 유지). */
  resolved: Post[];
  /** 같은 카테고리 공개 글 후보 (최신순). */
  candidates: Post[];
  target: number;
}

/**
 * 관련글 선별 (순수 함수).
 * relatedPostIds 해석분을 우선 채우고, 부족하면 같은 카테고리 후보를
 * 태그 겹침 많은 순(동률은 후보의 최신순)으로 채워 target개까지 반환한다.
 * 자기 자신·중복은 제외.
 */
export function pickRelated(params: PickRelatedParams): Post[] {
  const { selfId, selfTags, resolved, candidates, target } = params;

  const picked: Post[] = [];
  const used = new Set<string>([selfId]);

  for (const post of resolved) {
    if (picked.length >= target) break;
    if (used.has(post.id)) continue;
    used.add(post.id);
    picked.push(post);
  }

  if (picked.length >= target) return picked;

  const tagSet = new Set(selfTags);
  const overlap = (post: Post): number => post.tagNames.filter((t) => tagSet.has(t)).length;

  const fill = candidates
    .filter((post) => !used.has(post.id))
    .map((post, index) => ({ post, overlap: overlap(post), index }))
    .sort((a, b) => b.overlap - a.overlap || a.index - b.index)
    .slice(0, target - picked.length)
    .map((entry) => entry.post);

  return [...picked, ...fill];
}
