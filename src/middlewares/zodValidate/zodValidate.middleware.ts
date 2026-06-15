import type { RequestHandler } from 'express';
import type { ZodType } from 'zod';

type Source = 'body' | 'query' | 'params';

/**
 * 라우트별 zod schema 검증 골격. 실패 시 ZodError를 errorHandler로 forward한다.
 * (Express 5의 req.query는 setter가 없어 재할당하지 않고 검증만 수행)
 */
export const zodValidate =
  (schema: ZodType, source: Source = 'body'): RequestHandler =>
  (req, _res, next) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) return next(result.error);
    
    next();
  };
