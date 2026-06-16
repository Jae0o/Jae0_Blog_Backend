import type { Request, Response } from 'express';

import type { ApiListResponse } from 'interfaces';
import { PostService } from 'services';
import { encodeCursor, parsePageParams } from 'utils';
import { getPostListQuerySchema } from 'validations';

import type { PostListItem } from './getPostList.controller.type';
import { toPostListItem } from './toPostListItem';

/**
 * GET /api/posts — 공개 글 목록.
 * 쿼리 파싱(parsePageParams + 필터 스키마) → service → ListItem 변환 + nextCursor envelope.
 */
async function getPostList(req: Request, res: Response): Promise<void> {
  const { pageSize, cursor } = parsePageParams(req.query);
  const { categorySlug, tag, sort } = getPostListQuerySchema.parse(req.query);

  const posts = await PostService.getPostList({ categorySlug, tag, sort, pageSize, cursor });

  const nextCursor = posts.length === pageSize ? encodeCursor([posts[posts.length - 1].id]) : null;
  const body: ApiListResponse<PostListItem> = { data: posts.map(toPostListItem), meta: { nextCursor } };

  res.json(body);
}

export { getPostList };
