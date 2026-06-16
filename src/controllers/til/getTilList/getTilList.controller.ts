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
 */
async function getTilList(req: Request, res: Response): Promise<void> {
  const { pageSize, cursor } = parsePageParams(req.query);
  const { categoryId, tag, sort } = getTilListQuerySchema.parse(req.query);

  const tils = await TilService.getTilList({ categoryId, tag, sort, pageSize, cursor });

  const nextCursor = tils.length === pageSize ? encodeCursor([tils[tils.length - 1].id]) : null;
  const body: ApiListResponse<TilListItem> = { data: tils.map(toTilListItem), meta: { nextCursor } };

  res.json(body);
}

export { getTilList };
