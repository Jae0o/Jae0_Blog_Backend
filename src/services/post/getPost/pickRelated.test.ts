import { Timestamp } from 'firebase-admin/firestore';
import { describe, expect, it } from 'vitest';

import type { Post } from 'interfaces';

import { pickRelated } from './pickRelated';

function fakePost(id: string, overrides: Partial<Post> = {}): Post {
  return {
    id,
    slug: id,
    authorId: 'author-1',
    language: 'ko',
    title: id,
    body: { type: 'doc' },
    bodySize: 10,
    bodyText: '본문',
    keywords: [],
    excerpt: '요약',
    coverImage: null,
    categoryId: 'cat-1',
    categoryName: 'React',
    tagNames: [],
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
    viewCount: 0,
    createdAt: Timestamp.fromMillis(1_699_000_000_000),
    updatedAt: Timestamp.fromMillis(1_700_500_000_000),
    metadata: null,
    ...overrides,
  };
}

// M1-04 검증: 관련글은 relatedPostIds를 우선 반영하고, 부족분은 태그 겹침 순으로 채운다.
describe('pickRelated (M1-04)', () => {
  it('relatedPostIds 해석분을 순서대로 우선 채운다', () => {
    const related = pickRelated({
      selfId: 'self',
      selfTags: [],
      resolved: [fakePost('r1'), fakePost('r2')],
      candidates: [fakePost('c1')],
      target: 3,
    });

    expect(related.map((p) => p.id)).toEqual(['r1', 'r2', 'c1']);
  });

  it('부족분은 태그 겹침 많은 후보 우선, 동률은 후보 최신순으로 채운다', () => {
    const related = pickRelated({
      selfId: 'self',
      selfTags: ['react', 'ts'],
      resolved: [],
      candidates: [
        fakePost('c-none', { tagNames: ['css'] }),
        fakePost('c-two', { tagNames: ['react', 'ts'] }),
        fakePost('c-one-a', { tagNames: ['react'] }),
        fakePost('c-one-b', { tagNames: ['ts'] }),
      ],
      target: 3,
    });

    expect(related.map((p) => p.id)).toEqual(['c-two', 'c-one-a', 'c-one-b']);
  });

  it('자기 자신·중복은 제외하고 target 개수로 절단한다', () => {
    const related = pickRelated({
      selfId: 'self',
      selfTags: [],
      resolved: [fakePost('self'), fakePost('r1'), fakePost('r1')],
      candidates: [fakePost('r1'), fakePost('c1'), fakePost('c2')],
      target: 3,
    });

    expect(related.map((p) => p.id)).toEqual(['r1', 'c1', 'c2']);
  });
});
