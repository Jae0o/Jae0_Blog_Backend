import type { RequestHandler } from 'express';

import { RateLimitService } from 'services';
import { asyncHandler, getClientIp, ipHash } from 'utils';

interface RateLimitOptions {
  /** window당 허용 횟수. */
  limit: number;
  /** window 길이(초). 기본 60(분 단위). */
  windowSec?: number;
}

/**
 * 라우트별 정책을 주입하는 rate limit 미들웨어 factory.
 *
 * 카운터를 Firestore에 두는 이유: Vercel 서버리스 함수는 요청마다 다른 인스턴스에서
 * 실행될 수 있어 in-memory 카운터(express-rate-limit 등)는 인스턴스 간 공유되지 않는다.
 * 결정적 doc에 저장해야 인스턴스 간 한도를 공유할 수 있다.
 *
 * route 키는 mount 경로(req.baseUrl)에서 도출한다. Firestore doc id에 '/'를 쓸 수 없어 제거한다.
 */
export function rateLimit({ limit, windowSec = 60 }: RateLimitOptions): RequestHandler {
  return asyncHandler(async (req, res, next) => {
    const ipHashed = ipHash(getClientIp(req));
    const route = req.baseUrl.replace(/\//g, '') || 'root';

    await RateLimitService.checkRateLimit({ ipHashed, route, limit, windowSec });
    next();
  });
}
