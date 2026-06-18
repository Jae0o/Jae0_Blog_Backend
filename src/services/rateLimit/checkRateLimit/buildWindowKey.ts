export interface WindowKey {
  /** 결정적 doc id: `{ipHashed}_{route}_{windowStart}`. */
  docId: string;
  /** 현재 window의 끝(다음 window 시작) — ms. 첫 write 시 expireAt으로 기록. */
  expireAtMs: number;
}

/**
 * rate limit 카운터의 window/doc id 계산 (순수 함수).
 * windowStart = floor(nowMs / windowMs) → 같은 window 내 호출은 동일 docId,
 * window 경계를 넘으면 docId가 바뀌어 카운터가 리셋된다.
 */
export function buildWindowKey(ipHashed: string, route: string, windowSec: number, nowMs: number): WindowKey {
  const windowMs = windowSec * 1000;
  const windowStart = Math.floor(nowMs / windowMs);

  return {
    docId: `${ipHashed}_${route}_${windowStart}`,
    expireAtMs: (windowStart + 1) * windowMs,
  };
}
