import type { Tag } from 'interfaces';
import { TagRepository } from 'repositories';

export interface GetPopularTagsParams {
  limit: number;
  sortBy: 'postCount' | 'recent' | 'name';
}

/** 인기 태그 목록 조회. 추가 로직 없이 repository에 위임한다(thin pass-through). */
export async function getPopularTags(params: GetPopularTagsParams): Promise<Tag[]> {
  return TagRepository.list(params);
}
