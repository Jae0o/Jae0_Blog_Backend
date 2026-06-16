import { describe, expect, it } from 'vitest';

import { encodeCursor } from '../encodeCursor';

import { decodeCursor } from './decodeCursor';

// M1-01 검증: encode→decode 왕복 동일 / 잘못된 cursor 거부.
describe('decodeCursor (M1-01)', () => {
  it('encode → decode 왕복이 원본 문자열 배열과 동일', () => {
    const fields = ['2026-01-01T00:00:00Z', 'post-abc'];
    expect(decodeCursor(encodeCursor(fields))).toEqual(fields);
  });

  it('encode → decode 왕복이 숫자/혼합 배열과 동일', () => {
    const fields = [123, 'mixed', true, null];
    expect(decodeCursor(encodeCursor(fields))).toEqual(fields);
  });

  it('디코딩 불가 문자열은 throw', () => {
    expect(() => decodeCursor('!!!not-base64-json!!!')).toThrow();
  });

  it('배열이 아닌 값(JSON 숫자)은 throw', () => {
    const notArray = Buffer.from('42').toString('base64url'); // 디코딩 시 숫자 42
    expect(() => decodeCursor(notArray)).toThrow();
  });
});
