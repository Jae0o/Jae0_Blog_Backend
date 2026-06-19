import app from 'app';
import request from 'supertest';
import { beforeAll, describe, expect, it } from 'vitest';

import { FIX, IP, loadFixtures } from '../helpers/fixtures';

const get = (path: string) => request(app).get(path).set('X-Forwarded-For', IP.tils);

describe('GET /api/tils (M1 공개 TIL)', () => {
  beforeAll(async () => {
    await loadFixtures();
  });

  it('T-M1-5: 200, 공개 TIL만 + meta.nextCursor 존재', async () => {
    const res = await get('/api/tils');

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(FIX.publicTils.length); // 비공개 미포함
    res.body.data.forEach((item: { id: string }) => {
      expect(FIX.publicTils).toContain(item.id);
    });
    expect(res.body.meta).toHaveProperty('nextCursor');
  });

  it('카드 항목은 body·bodyPreview를 포함 (카드 본문 렌더용)', async () => {
    const res = await get('/api/tils');
    const item = res.body.data[0];

    expect(item.body).toBeDefined();
    expect(typeof item.bodyPreview).toBe('string');
  });

  it('공개 TIL 상세 → 200', async () => {
    const res = await get(`/api/tils/${FIX.publicTils[0]}`);

    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(FIX.publicTils[0]);
  });

  it('T-M1-8: 비공개 TIL 상세 → 404 NOT_FOUND', async () => {
    const res = await get(`/api/tils/${FIX.privateTil}`);

    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('NOT_FOUND');
  });
});
