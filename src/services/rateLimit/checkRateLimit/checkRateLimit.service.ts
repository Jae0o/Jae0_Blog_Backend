import { RateLimitRepository } from 'repositories';
import { AppError } from 'utils';

import { buildWindowKey } from './buildWindowKey';

export interface CheckRateLimitParams {
  /** SHA256된 클라이언트 IP. */
  ipHashed: string;
  /** 정책 분리용 라우트 키 (예: 'api'). */
  route: string;
  /** window당 허용 횟수. */
  limit: number;
  /** window 길이(초). */
  windowSec: number;
}

/**
 * 현재 window의 카운터를 1 증가시키고 한도를 초과하면 429를 throw한다.
 * 카운터는 Firestore 결정적 doc에 저장되어 서버리스 인스턴스 간 공유된다.
 */
export async function checkRateLimit({ ipHashed, route, limit, windowSec }: CheckRateLimitParams): Promise<void> {
  const { docId, expireAtMs } = buildWindowKey(ipHashed, route, windowSec, Date.now());
  const count = await RateLimitRepository.increment(docId, expireAtMs);

  if (count > limit) {
    throw new AppError(429, 'RATE_LIMITED', '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.');
  }
}
