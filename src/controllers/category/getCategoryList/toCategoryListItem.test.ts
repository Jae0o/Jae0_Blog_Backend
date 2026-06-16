import { Timestamp } from 'firebase-admin/firestore';
import { describe, expect, it } from 'vitest';

import type { Category } from 'interfaces';

import { toCategoryListItem } from './toCategoryListItem';

function fakeCategory(overrides: Partial<Category> = {}): Category {
  return {
    id: 'cat-1',
    name: 'React',
    nameLower: 'react',
    slug: 'react',
    description: 'React 글',
    coverImage: null,
    hue: 200,
    visibility: 'public',
    order: 1,
    postCount: 3,
    tilCount: 2,
    metaTitle: 'meta',
    metaDescription: 'meta desc',
    deletedAt: null,
    createdAt: Timestamp.fromMillis(1_699_000_000_000),
    updatedAt: Timestamp.fromMillis(1_700_000_000_000),
    ...overrides,
  };
}

// M1-06 검증: 표시·카운트 필드(hue 포함)만 노출하고 내부/SEO 필드는 제외한다.
describe('toCategoryListItem (M1-06)', () => {
  it('표시·카운트 필드를 포함(hue 포함)', () => {
    const item = toCategoryListItem(fakeCategory());

    expect(item).toEqual({
      id: 'cat-1',
      name: 'React',
      slug: 'react',
      description: 'React 글',
      coverImage: null,
      hue: 200,
      order: 1,
      postCount: 3,
      tilCount: 2,
    });
  });

  it('내부/SEO/timestamp 필드는 미포함', () => {
    const item = toCategoryListItem(fakeCategory());

    expect('nameLower' in item).toBe(false);
    expect('visibility' in item).toBe(false);
    expect('metaTitle' in item).toBe(false);
    expect('metaDescription' in item).toBe(false);
    expect('deletedAt' in item).toBe(false);
    expect('createdAt' in item).toBe(false);
    expect('updatedAt' in item).toBe(false);
  });
});
