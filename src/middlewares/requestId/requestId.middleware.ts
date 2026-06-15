import { randomUUID } from 'node:crypto';

import type { RequestHandler } from 'express';

declare global {
  namespace Express {
    interface Request {
      requestId: string;
    }
  }
}

/** 요청별 고유 id 부여 + 응답 헤더(X-Request-Id). 클라이언트가 보낸 id가 있으면 재사용. */
export const requestId: RequestHandler = (req, res, next) => {
  const id = (req.headers['x-request-id'] as string | undefined) ?? randomUUID();
  
  req.requestId = id;
  res.setHeader('X-Request-Id', id);

  next();
};
