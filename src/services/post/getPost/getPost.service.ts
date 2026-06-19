import type { Post } from 'interfaces';
import { PostRepository } from 'repositories';
import { AppError } from 'utils';

import { pickRelated } from './pickRelated';

const RELATED_TARGET = 3;

export interface GetPostResult {
  post: Post;
  related: Post[];
  prev: Post | null;
  next: Post | null;
}

/**
 * 공개 글 상세 조회.
 * 없거나 비공개/draft/삭제면 404. 관련글(relatedPostIds 우선 → 같은 카테고리 보충)과
 * 같은 카테고리 내 publishedAt 기준 인접(이전/다음) 글을 함께 반환한다.
 * publishedAt 또는 categoryId가 없으면 인접 글은 null(카테고리 미지정 글엔 이전/다음 없음).
 */
export async function getPost(slug: string): Promise<GetPostResult> {
  const post = await PostRepository.getBySlug(slug);
  if (!post) throw new AppError(404, 'NOT_FOUND', '글을 찾을 수 없습니다.');

  const resolved = post.relatedPostIds.length > 0 ? await PostRepository.getByIds(post.relatedPostIds) : [];

  let candidates: Post[] = [];
  if (resolved.length < RELATED_TARGET && post.categoryId) {
    candidates = await PostRepository.listPublic({
      categoryId: post.categoryId,
      sort: 'latest',
      pageSize: RELATED_TARGET + resolved.length + 1,
    });
  }

  const related = pickRelated({
    selfId: post.id,
    selfTags: post.tagNames,
    resolved,
    candidates,
    target: RELATED_TARGET,
  });

  const [prev, next] =
    post.publishedAt && post.categoryId
      ? await Promise.all([
          PostRepository.getAdjacent({ publishedAt: post.publishedAt, direction: 'prev', categoryId: post.categoryId }),
          PostRepository.getAdjacent({ publishedAt: post.publishedAt, direction: 'next', categoryId: post.categoryId }),
        ])
      : [null, null];

  return { post, related, prev, next };
}
