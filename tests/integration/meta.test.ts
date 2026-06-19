import app from 'app';
import request from 'supertest';
import { beforeAll, describe, expect, it } from 'vitest';

import { FIX, IP, loadFixtures } from '../helpers/fixtures';

const get = (path: string) => request(app).get(path).set('X-Forwarded-For', IP.meta);

describe('GET /api/categories · /tags · /site-config (M1 메타)', () => {
  beforeAll(async () => {
    await loadFixtures();
  });

  it('T-M1-6/9: categories — 공개+notDeleted만, order ASC', async () => {
    const res = await get('/api/categories');

    expect(res.status).toBe(200);
    expect(res.body.data.map((c: { id: string }) => c.id)).toEqual(FIX.publicCategories); // [frontend, backend] order 0,1
    // 비공개/삭제 카테고리는 제외
    const ids = res.body.data.map((c: { id: string }) => c.id);
    FIX.hiddenCategories.forEach((hidden) => expect(ids).not.toContain(hidden));
  });

  it('T-M1-10: tags — 빈도순(postCount+tilCount DESC), 최대 7', async () => {
    const res = await get('/api/tags?limit=7');

    expect(res.status).toBe(200);
    expect(res.body.data.length).toBeLessThanOrEqual(7);
    // react(6) > nodejs(5) > typescript(1)
    expect(res.body.data.map((t: { id: string }) => t.id)).toEqual(['react', 'nodejs', 'typescript']);
  });

  it('T-M1-7/11: site-config — 공개 필드만, admin 필드 미포함', async () => {
    const res = await get('/api/site-config');

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty('siteName');
    expect(res.body.data).toHaveProperty('socialLinks');
    expect(res.body.data).toHaveProperty('footerLinks');
    // admin/내부 필드는 절대 노출되지 않음
    expect(res.body.data).not.toHaveProperty('customAnalyticsEnabled');
    expect(res.body.data).not.toHaveProperty('siteUrl');
    expect(res.body.data).not.toHaveProperty('defaultMetaDescription');
    expect(res.body.data).not.toHaveProperty('updatedAt');
  });
});
