import type { Til } from 'interfaces';
import { TilRepository } from 'repositories';

export interface GetTilListParams {
  categoryId?: string;
  tag?: string;
  sort: 'latest' | 'oldest';
  pageSize: number;
  cursor?: unknown[];
}

/**
 * 공개 TIL 목록 조회.
 * Post와 달리 categorySlug 해석이 없어 repository에 그대로 위임한다(thin pass-through).
 */
export async function getTilList(params: GetTilListParams): Promise<Til[]> {
  return TilRepository.listPublic(params);
}
