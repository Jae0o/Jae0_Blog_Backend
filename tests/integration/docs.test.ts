import app from 'app';
import request from 'supertest';
import { describe, expect, it } from 'vitest';

// 현재 구현된 공개 read 엔드포인트 8개가 OpenAPI 문서에 모두 노출되는지 검증.
// app은 firebase-admin을 init하지 않으므로 emulator 없이 동작한다.
const EXPECTED_PATHS = [
  '/health',
  '/posts',
  '/posts/{slug}',
  '/tils',
  '/tils/{tilId}',
  '/categories',
  '/tags',
  '/site-config',
];

describe('GET /api/docs (OpenAPI)', () => {
  it('openapi.json: 200 + 3.0 문서 + 구현된 8개 경로', async () => {
    const res = await request(app).get('/api/docs/openapi.json');

    expect(res.status).toBe(200);
    expect(res.body.openapi).toMatch(/^3\.0/);
    expect(Object.keys(res.body.paths).sort()).toEqual([...EXPECTED_PATHS].sort());
  });

  it('docs 페이지: 200 + Swagger UI HTML (openapi.json 참조)', async () => {
    const res = await request(app).get('/api/docs');

    expect(res.status).toBe(200);
    expect(res.text).toContain('swagger-ui');
    expect(res.text).toContain('/api/docs/openapi.json');
  });
});
