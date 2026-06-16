import { Timestamp } from 'firebase-admin/firestore';
import { describe, expect, it } from 'vitest';

import type { Til } from 'interfaces';

import { toTilListItem } from './toTilListItem';

function fakeTil(overrides: Partial<Til> = {}): Til {
  return {
    id: 'til-1',
    authorId: 'author-1',
    language: 'ko',
    title: 'TIL 제목',
    body: { type: 'doc' },
    bodyText: '본문 텍스트',
    keywords: ['react'],
    code: 'const a = 1;',
    codeLanguage: 'ts',
    imageUrl: null,
    categoryId: 'cat-1',
    categoryName: 'React',
    tagNames: ['typescript'],
    visibility: 'public',
    isPinned: false,
    deletedAt: null,
    viewCount: 5,
    createdAt: Timestamp.fromMillis(1_699_000_000_000),
    updatedAt: Timestamp.fromMillis(1_700_500_000_000),
    metadata: null,
    ...overrides,
  };
}

// M1-05 검증: 카드 DTO는 code 미리보기를 포함하고, publishedAt은 createdAt으로 매핑하며 본문/내부 필드는 제외한다.
describe('toTilListItem (M1-05)', () => {
  it('publishedAt을 createdAt으로 매핑하고 timestamp를 ISO로 직렬화', () => {
    const item = toTilListItem(fakeTil());

    expect(item.publishedAt).toBe(new Date(1_699_000_000_000).toISOString());
    expect(item.updatedAt).toBe(new Date(1_700_500_000_000).toISOString());
  });

  it('code 미리보기 필드를 포함', () => {
    const item = toTilListItem(fakeTil());

    expect(item.code).toBe('const a = 1;');
    expect(item.codeLanguage).toBe('ts');
  });

  it('본문/내부 전용 필드는 미포함', () => {
    const item = toTilListItem(fakeTil());

    expect('body' in item).toBe(false);
    expect('bodyText' in item).toBe(false);
    expect('keywords' in item).toBe(false);
    expect('authorId' in item).toBe(false);
    expect('deletedAt' in item).toBe(false);
  });

  it('title이 null이면 null 유지', () => {
    const item = toTilListItem(fakeTil({ title: null }));

    expect(item.title).toBeNull();
  });
});
