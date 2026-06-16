import { describe, expect, it } from 'vitest';

import { encodeCursor } from './encodeCursor';

// M1-01 검증: cursor 인코딩이 base64url 문자열을 생성.
describe('encodeCursor (M1-01)', () => {
  it('필드 배열을 base64url 문자열로 인코딩', () => {
    const cursor = encodeCursor(['2026-01-01T00:00:00Z', 'post-abc']);
    expect(typeof cursor).toBe('string');
    expect(cursor).toMatch(/^[A-Za-z0-9_-]+$/); // base64url 문자만 (+, /, = 없음)
  });
});
