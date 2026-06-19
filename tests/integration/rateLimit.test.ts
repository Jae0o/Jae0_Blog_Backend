import app from 'app';
import request from 'supertest';
import { describe, expect, it } from 'vitest';

/**
 * rate limit은 IP당 단일 카운터(route='api', 100/60초)다. /api/health 는 fixture가 필요 없고 가벼워
 * 카운터만 검증하기에 적합(미들웨어는 모든 /api 요청에 적용).
 *
 * 카운터 window는 벽시계 기준 floor(now/60초)다. 101회 burst가 window 경계를 넘으면 카운터가 중간에
 * 리셋되어 101회째가 429가 아닐 수 있다(타이밍 flake). → 시도마다 **새 IP**(카운터 fresh)로 burst하고,
 * 그 burst가 한 window 안에 머문 경우에만 단언한다. 경계를 넘었으면 다음 IP로 재시도한다.
 */
const windowOf = () => Math.floor(Date.now() / 60_000);

async function burst(ip: string): Promise<request.Response[]> {
  const results: request.Response[] = [];

  for (let i = 0; i < 101; i++) {
    results.push(await request(app).get('/api/health').set('X-Forwarded-For', ip));
  }

  return results;
}

describe('Rate limit (M1)', () => {
  it('T-M1-13: 동일 IP 101회째 → 429 RATE_LIMITED (직전 100회는 200)', async () => {
    for (let attempt = 0; attempt < 4; attempt++) {
      const ip = `10.10.20.${attempt}`; // 시도마다 fresh 카운터
      const startWindow = windowOf();
      const results = await burst(ip);

      if (windowOf() !== startWindow) continue; // window 경계를 넘었으면 재시도

      expect(results[99].status).toBe(200); // 100회까지 통과
      expect(results[100].status).toBe(429); // 101회째 차단
      expect(results[100].body?.error?.code).toBe('RATE_LIMITED');

      return;
    }

    throw new Error('rate limit burst가 매번 window 경계를 넘었습니다(재시도 4회 초과).');
  }, 60_000);
});
