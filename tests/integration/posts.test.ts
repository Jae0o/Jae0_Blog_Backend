import app from 'app';
import request from 'supertest';
import { beforeAll, describe, expect, it } from 'vitest';

import { FIX, IP, loadFixtures } from '../helpers/fixtures';

/** 파일 전용 IP로 rate limit 카운터를 분리(이 파일 요청은 100/분 한참 미만). */
const get = (path: string) => request(app).get(path).set('X-Forwarded-For', IP.posts);

describe('GET /api/posts (M1 공개 글)', () => {
  beforeAll(async () => {
    await loadFixtures();
  });

  it('T-M1-1: 200, 공개 글만 반환 + meta.nextCursor 존재', async () => {
    const res = await get('/api/posts');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data).toHaveLength(FIX.publicPosts.length); // 비공개/draft/deleted 미포함
    res.body.data.forEach((item: { id: string }) => {
      expect(FIX.publicPosts).toContain(item.id);
    });
    expect(res.body.meta).toHaveProperty('nextCursor');
  });

  it('T-M1-2: 목록 항목은 ListItem 필드만 — body 없음, slug/publishedAt/updatedAt 포함', async () => {
    const res = await get('/api/posts');
    const item = res.body.data[0];

    expect(item).not.toHaveProperty('body');
    expect(item).toHaveProperty('slug');
    expect(item).toHaveProperty('publishedAt');
    expect(item).toHaveProperty('updatedAt');
  });

  it('T-M1-3: 공개 글 상세 → 200, body 포함 + meta.related/prev/next', async () => {
    const res = await get('/api/posts/post-pub-3');

    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe('post-pub-3');
    expect(res.body.data.body).toBeDefined();
    expect(res.body.meta).toHaveProperty('related');
    expect(res.body.meta).toHaveProperty('prev');
    expect(res.body.meta).toHaveProperty('next');
  });

  it('T-M1-4~6: 비공개·draft·삭제 글 상세 → 404 NOT_FOUND', async () => {
    for (const slug of [FIX.privatePost, FIX.draftPost, FIX.deletedPost]) {
      const res = await get(`/api/posts/${slug}`);

      expect(res.status).toBe(404);
      expect(res.body.error.code).toBe('NOT_FOUND');
    }
  });

  it('T-M1-8/12: cursor 페이지네이션 — pageSize=2, 마지막 페이지 nextCursor=null', async () => {
    const page1 = await get('/api/posts?pageSize=2');

    expect(page1.status).toBe(200);
    expect(page1.body.data).toHaveLength(2);
    expect(typeof page1.body.meta.nextCursor).toBe('string');

    const page2 = await get(`/api/posts?pageSize=2&cursor=${encodeURIComponent(page1.body.meta.nextCursor)}`);

    expect(page2.status).toBe(200);
    expect(page2.body.data).toHaveLength(1); // 공개 3개 중 마지막 1개
    expect(page2.body.meta.nextCursor).toBeNull();

    // 페이지 간 중복 없음
    const ids1 = page1.body.data.map((p: { id: string }) => p.id);
    const ids2 = page2.body.data.map((p: { id: string }) => p.id);
    expect(ids1).not.toContain(ids2[0]);
  });

  it('이전/다음은 같은 카테고리 내에서만 — frontend의 pub-2는 prev=pub-1, next=null', async () => {
    const res = await get('/api/posts/post-pub-2'); // frontend, 2026-03-02

    expect(res.status).toBe(200);
    expect(res.body.meta.prev?.id).toBe('post-pub-1'); // 같은 frontend, 더 예전
    expect(res.body.meta.next).toBeNull(); // frontend엔 더 최신 공개 글 없음(삭제 글 제외)
  });

  it('다른 카테고리 글은 인접에서 제외 — backend의 pub-3는 prev/next 모두 null', async () => {
    const res = await get('/api/posts/post-pub-3'); // backend 유일 공개 글

    expect(res.status).toBe(200);
    expect(res.body.meta.prev).toBeNull();
    expect(res.body.meta.next).toBeNull();
  });

  it('includeTotal=true → meta.total에 전체 공개 글 수', async () => {
    const res = await get('/api/posts?pageSize=2&includeTotal=true');

    expect(res.status).toBe(200);
    expect(res.body.meta.total).toBe(FIX.publicPosts.length); // 3
  });
});
