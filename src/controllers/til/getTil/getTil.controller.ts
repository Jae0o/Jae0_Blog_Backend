import type { Request, Response } from 'express';

import type { ApiResponse } from 'interfaces';
import { TilService } from 'services';

import type { TilDetail } from './getTil.controller.type';
import { toTilDetail } from './toTilDetail';

/**
 * GET /api/tils/:tilId — 공개 TIL 상세(Detail Modal용).
 * 없거나 비공개/삭제면 service가 404를 throw한다.
 */
async function getTil(req: Request, res: Response): Promise<void> {
  const til = await TilService.getTil(String(req.params.tilId));

  const body: ApiResponse<TilDetail> = { data: toTilDetail(til) };

  res.json(body);
}

export { getTil };
