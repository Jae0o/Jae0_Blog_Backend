import type { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * async route 핸들러를 감싸 reject를 errorHandler로 전달한다.
 * (Express 5는 자동 전파하나, 명시적 래핑으로 일관성 유지)
 */
export const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>): RequestHandler =>
  (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);
