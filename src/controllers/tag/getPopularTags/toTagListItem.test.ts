import { Timestamp } from 'firebase-admin/firestore';
import { describe, expect, it } from 'vitest';

import type { Tag } from 'interfaces';

import { toTagListItem } from './toTagListItem';

function fakeTag(overrides: Partial<Tag> = {}): Tag {
  return {
    id: 'typescript',
    nameLower: 'typescript',
    displayName: 'TypeScript',
    description: 'TS 태그',
    synonyms: ['ts'],
    postCount: 5,
    tilCount: 3,
    createdAt: Timestamp.fromMillis(1_699_000_000_000),
    updatedAt: Timestamp.fromMillis(1_700_000_000_000),
    ...overrides,
  };
}

// M1-06 검증: 표시명·필터키·카운트만 노출하고 description/synonyms/timestamp는 제외한다.
describe('toTagListItem (M1-06)', () => {
  it('표시명·필터키·카운트를 포함', () => {
    const item = toTagListItem(fakeTag());

    expect(item).toEqual({
      id: 'typescript',
      displayName: 'TypeScript',
      nameLower: 'typescript',
      postCount: 5,
      tilCount: 3,
    });
  });

  it('description/synonyms/timestamp 필드는 미포함', () => {
    const item = toTagListItem(fakeTag());

    expect('description' in item).toBe(false);
    expect('synonyms' in item).toBe(false);
    expect('createdAt' in item).toBe(false);
    expect('updatedAt' in item).toBe(false);
  });
});
