import { Timestamp } from 'firebase-admin/firestore';
import { describe, expect, it } from 'vitest';

import type { Til } from 'interfaces';

import { toTilDetail } from './toTilDetail';

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

// M1-05 검증: 상세는 body/code를 포함하고 timestamp를 ISO로 직렬화한다(엔티티 거의 그대로).
describe('toTilDetail (M1-05)', () => {
  it('body·code를 포함하고 timestamp를 ISO 문자열로 직렬화', () => {
    const detail = toTilDetail(fakeTil());

    expect(detail.body).toEqual({ type: 'doc' });
    expect(detail.code).toBe('const a = 1;');
    expect(detail.createdAt).toBe(new Date(1_699_000_000_000).toISOString());
    expect(detail.updatedAt).toBe(new Date(1_700_500_000_000).toISOString());
  });

  it('내부 필드(authorId·bodyText·keywords·metadata·deletedAt)는 미포함 (PostDetail과 동일 정책)', () => {
    const detail = toTilDetail(fakeTil());

    expect('authorId' in detail).toBe(false);
    expect('bodyText' in detail).toBe(false);
    expect('keywords' in detail).toBe(false);
    expect('metadata' in detail).toBe(false);
    expect('deletedAt' in detail).toBe(false);
  });
});
