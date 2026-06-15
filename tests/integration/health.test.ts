import request from 'supertest';
import { describe, expect, it } from 'vitest';

import app from 'app';

// 부트스트랩 파이프라인 통합 검증 (m0-verification: T-M0-1,2,3,4,6).
// app은 firebase-admin을 init하지 않으므로 emulator 없이 동작한다.
describe('GET /api/health 파이프라인', () => {
  it('T-M0-1: 200 + { data: { status: "ok", ts } }', async () => {
    const res = await request(app).get('/api/health');

    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe('ok');
    expect(typeof res.body.data.ts).toBe('string');
  });

  it('T-M0-6: 응답에 X-Request-Id 헤더', async () => {
    const res = await request(app).get('/api/health');

    expect(res.headers['x-request-id']).toBeTruthy();
  });

  it('T-M0-2: 없는 경로 → 404 NOT_FOUND', async () => {
    const res = await request(app).get('/unknown-route');

    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('NOT_FOUND');
  });

  it('T-M0-3: 잘못된 JSON 본문 → 400 MALFORMED_BODY', async () => {
    const res = await request(app).post('/api/health').set('Content-Type', 'application/json').send('{');

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('MALFORMED_BODY');
  });

  it('T-M0-4: 1MB 초과 본문 → 413', async () => {
    const oversized = JSON.stringify({ blob: 'x'.repeat(1024 * 1024 + 100) });
    const res = await request(app).post('/api/health').set('Content-Type', 'application/json').send(oversized);

    expect(res.status).toBe(413);
  });
});
