import type { RequestHandler } from 'express';

import { env } from 'config/env';

/** env.ALLOWED_ORIGINS 화이트리스트 기반 CORS. 허용 origin에만 헤더 부여, OPTIONS preflight는 204 종료. */
export const corsMiddleware: RequestHandler = (req, res, next) => {
  const origin = req.headers.origin;
  
  if (origin && env.ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  }

  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }

  next();
};
