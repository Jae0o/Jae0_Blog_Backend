import type { Request, Response } from 'express';

import type { ApiListResponse } from 'interfaces';
import { TilService } from 'services';
import { encodeCursor, parsePageParams } from 'utils';
import { getTilListQuerySchema } from 'validations';

import type { TilListItem } from './getTilList.controller.type';
import { toTilListItem } from './toTilListItem';

/**
 * GET /api/tils — 공개 TIL 카드 목록.
 * 쿼리 파싱(parsePageParams + 필터 스키마) → service → ListItem 변환 + nextCursor envelope.
 * 다음 페이지 존재 여부는 pageSize+1 룩어헤드로 판정한다(마지막 빈 페이지 방지).
 */
async function getTilList(req: Request, res: Response): Promise<void> {
  const { pageSize, cursor } = parsePageParams(req.query);
  const { categoryId, tag, sort } = getTilListQuerySchema.parse(req.query);

  const fetched = await TilService.getTilList({ categoryId, tag, sort, pageSize: pageSize + 1, cursor });
  const hasMore = fetched.length > pageSize;
  const items = hasMore ? fetched.slice(0, pageSize) : fetched;
  const nextCursor = hasMore ? encodeCursor([items[items.length - 1].id]) : null;

  const body: ApiListResponse<TilListItem> = { data: items.map(toTilListItem), meta: { nextCursor } };

  res.json(body);
}

export { getTilList };
