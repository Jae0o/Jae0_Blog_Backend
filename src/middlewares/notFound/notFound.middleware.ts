import type { RequestHandler } from 'express';

import type { ErrorCode } from 'interfaces';

/** 매칭되는 라우트가 없을 때 NOT_FOUND envelope 반환 (라우트 뒤·errorHandler 앞에 마운트). */
export const notFound: RequestHandler = (_req, res) => {
  const code: ErrorCode = 'NOT_FOUND';

  res.status(404).json({ error: { code, message: '요청한 경로를 찾을 수 없습니다.' } });
};
