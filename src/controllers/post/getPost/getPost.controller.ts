import type { Request, Response } from 'express';

import type { ApiResponse } from 'interfaces';
import { PostService } from 'services';

import { toPostListItem } from '../getPostList/toPostListItem';

import type { PostDetail } from './getPost.controller.type';
import { toPostDetail } from './toPostDetail';

/**
 * GET /api/posts/:slug — 공개 글 상세.
 * service → PostDetail 변환 + meta(related/prev/next는 PostListItem 형태) envelope.
 * 없거나 비공개/draft/삭제면 service가 404를 throw한다.
 */
async function getPost(req: Request, res: Response): Promise<void> {
  const { post, related, prev, next } = await PostService.getPost(String(req.params.slug));

  const body: ApiResponse<PostDetail> = {
    data: toPostDetail(post),
    meta: {
      related: related.map(toPostListItem),
      prev: prev ? toPostListItem(prev) : null,
      next: next ? toPostListItem(next) : null,
    },
  };

  res.json(body);
}

export { getPost };
