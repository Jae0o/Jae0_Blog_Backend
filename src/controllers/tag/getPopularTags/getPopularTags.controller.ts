import type { Request, Response } from 'express';

import type { ApiResponse } from 'interfaces';
import { TagService } from 'services';
import { getPopularTagsQuerySchema } from 'validations';

import type { TagListItem } from './getPopularTags.controller.type';
import { toTagListItem } from './toTagListItem';

/**
 * GET /api/tags — 인기 태그 목록.
 * 쿼리(limit/sortBy) 파싱 → service → ListItem 변환. 비페이지네이션이라 meta 없음.
 */
async function getPopularTags(req: Request, res: Response): Promise<void> {
  const { limit, sortBy } = getPopularTagsQuerySchema.parse(req.query);

  const tags = await TagService.getPopularTags({ limit, sortBy });

  const body: ApiResponse<TagListItem[]> = { data: tags.map(toTagListItem) };

  res.json(body);
}

export { getPopularTags };
