import type { Request, Response } from 'express';

import type { ApiResponse } from 'interfaces';
import { CategoryService } from 'services';

import type { CategoryListItem } from './getCategoryList.controller.type';
import { toCategoryListItem } from './toCategoryListItem';

/**
 * GET /api/categories — 공개 카테고리 목록(order ASC).
 * 비페이지네이션 목록이라 meta 없이 data 배열만 반환한다.
 */
async function getCategoryList(_req: Request, res: Response): Promise<void> {
  const categories = await CategoryService.getCategoryList();

  const body: ApiResponse<CategoryListItem[]> = { data: categories.map(toCategoryListItem) };

  res.json(body);
}

export { getCategoryList };
