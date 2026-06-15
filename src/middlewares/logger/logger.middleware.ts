import type { RequestHandler } from 'express';

/** 응답 완료 시 JSON 한 줄 로그 (method/path/status/durationMs/requestId). */
export const logger: RequestHandler = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    console.log(
      JSON.stringify({
        level: 'info',
        method: req.method,
        path: req.originalUrl,
        status: res.statusCode,
        durationMs: Date.now() - start,
        requestId: req.requestId,
      }),
    );
  });
  next();
};
