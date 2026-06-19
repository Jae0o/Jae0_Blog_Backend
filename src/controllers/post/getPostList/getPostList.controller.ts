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
 * 다음 페이지 존재 여부는 pageSize+1 룩어헤드로 판정한다(마지막 빈 페이지 방지).
 * includeTotal=true면 meta.total(전체 공개 글 수)을 함께 반환한다.
 */
async function getPostList(req: Request, res: Response): Promise<void> {
  const { pageSize, cursor } = parsePageParams(req.query);
  const { categorySlug, tag, sort, includeTotal } = getPostListQuerySchema.parse(req.query);

  const fetched = await PostService.getPostList({ categorySlug, tag, sort, pageSize: pageSize + 1, cursor });
  const hasMore = fetched.length > pageSize;
  const items = hasMore ? fetched.slice(0, pageSize) : fetched;
  const nextCursor = hasMore ? encodeCursor([items[items.length - 1].id]) : null;

  const meta: ApiListResponse<PostListItem>['meta'] = { nextCursor };
  if (includeTotal) meta.total = await PostService.countPostList({ categorySlug, tag });

  const body: ApiListResponse<PostListItem> = { data: items.map(toPostListItem), meta };

  res.json(body);
}

export { getPostList };
