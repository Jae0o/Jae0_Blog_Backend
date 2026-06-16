import type { Post } from 'interfaces';
import { CategoryRepository, PostRepository } from 'repositories';

export interface GetPostListParams {
  categorySlug?: string;
  tag?: string;
  sort: 'latest' | 'oldest';
  pageSize: number;
  cursor?: unknown[];
}

/**
 * 공개 글 목록 조회.
 * categorySlug가 오면 categoryId로 해석(미존재 → 빈 목록)한 뒤 repository에 위임한다.
 */
export async function getPostList(params: GetPostListParams): Promise<Post[]> {
  const { categorySlug, tag, sort, pageSize, cursor } = params;

  let categoryId: string | undefined;
  if (categorySlug) {
    const category = await CategoryRepository.getBySlug(categorySlug);
    if (!category) return [];
    categoryId = category.id;
  }

  return PostRepository.listPublic({ categoryId, tag, sort, pageSize, cursor });
}
