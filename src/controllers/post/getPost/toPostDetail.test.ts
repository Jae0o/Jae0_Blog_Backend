import { Timestamp } from 'firebase-admin/firestore';
import { describe, expect, it } from 'vitest';

import type { Post } from 'interfaces';

import { toPostDetail } from './toPostDetail';

function fakePost(overrides: Partial<Post> = {}): Post {
  return {
    id: 'my-post',
    slug: 'my-post',
    authorId: 'author-1',
    language: 'ko',
    title: '제목',
    body: { type: 'doc' },
    bodySize: 10,
    bodyText: '본문 텍스트',
    keywords: ['react'],
    excerpt: '요약',
    coverImage: null,
    categoryId: 'cat-1',
    categoryName: 'React',
    tagNames: ['typescript'],
    status: 'public',
    metaTitle: null,
    metaDescription: null,
    ogImage: null,
    canonicalUrl: null,
    relatedPostIds: ['other'],
    isPinned: false,
    readingTime: 3,
    wordCount: 100,
    publishedAt: Timestamp.fromMillis(1_700_000_000_000),
    deletedAt: null,
    viewCount: 5,
    createdAt: Timestamp.fromMillis(1_699_000_000_000),
    updatedAt: Timestamp.fromMillis(1_700_500_000_000),
    metadata: null,
    ...overrides,
  };
}

// M1-04 검증: 상세는 body를 포함하되 내부/검색 필드는 제외하고, timestamp는 ISO로 직렬화한다.
describe('toPostDetail (M1-04)', () => {
  it('body를 포함하고 timestamp를 ISO 문자열로 직렬화', () => {
    const detail = toPostDetail(fakePost());

    expect(detail.body).toEqual({ type: 'doc' });
    expect(detail.publishedAt).toBe(new Date(1_700_000_000_000).toISOString());
    expect(detail.createdAt).toBe(new Date(1_699_000_000_000).toISOString());
    expect(detail.updatedAt).toBe(new Date(1_700_500_000_000).toISOString());
  });

  it('내부/검색 전용 필드는 미포함', () => {
    const detail = toPostDetail(fakePost());

    expect('authorId' in detail).toBe(false);
    expect('bodyText' in detail).toBe(false);
    expect('keywords' in detail).toBe(false);
    expect('relatedPostIds' in detail).toBe(false);
    expect('deletedAt' in detail).toBe(false);
    expect('metadata' in detail).toBe(false);
  });

  it('publishedAt이 null이면 null 유지', () => {
    const detail = toPostDetail(fakePost({ publishedAt: null }));

    expect(detail.publishedAt).toBeNull();
  });
});
