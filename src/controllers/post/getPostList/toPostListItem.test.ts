import { Timestamp } from 'firebase-admin/firestore';
import { describe, expect, it } from 'vitest';

import type { Post } from 'interfaces';

import { toPostListItem } from './toPostListItem';

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
    keywords: [],
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
    relatedPostIds: [],
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

// M1-03 검증: ListItem이 SEO 필드를 ISO로 포함하고 본문 필드는 제외(M1-2).
describe('toPostListItem (M1-03)', () => {
  it('SEO 필드(slug·publishedAt·updatedAt)를 ISO 문자열로 포함', () => {
    const item = toPostListItem(fakePost());

    expect(item.slug).toBe('my-post');
    expect(item.publishedAt).toBe(new Date(1_700_000_000_000).toISOString());
    expect(item.updatedAt).toBe(new Date(1_700_500_000_000).toISOString());
  });

  it('body 등 본문/엔티티 전용 필드는 미포함', () => {
    const item = toPostListItem(fakePost());

    expect('body' in item).toBe(false);
    expect('bodyText' in item).toBe(false);
    expect('status' in item).toBe(false);
  });

  it('publishedAt이 null이면 null 유지', () => {
    const item = toPostListItem(fakePost({ publishedAt: null }));

    expect(item.publishedAt).toBeNull();
  });
});
