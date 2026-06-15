import type { RequestHandler } from 'express';

import type { ApiResponse } from 'interfaces';

import type { HealthData } from './health.controller.type';

/** GET /api/health — 파이프라인 헬스체크. */
const getHealth: RequestHandler = (_req, res) => {
  const body: ApiResponse<HealthData> = { data: { status: 'ok', ts: new Date().toISOString() } };

  res.json(body);
};

export { getHealth };
