import { describe, expect, it } from 'vitest';

import { decodeCursor, encodeCursor, parsePageParams } from 'utils';

// M1-01 검증: cursor 왕복 동일 / pageSize 클램프 / 잘못된 cursor 거부.
describe('pagination util (M1-01)', () => {
  describe('encodeCursor → decodeCursor 왕복', () => {
    it('문자열 배열 왕복이 원본과 동일', () => {
      const fields = ['2026-01-01T00:00:00Z', 'post-abc'];
      expect(decodeCursor(encodeCursor(fields))).toEqual(fields);
    });

    it('숫자/혼합 배열 왕복이 원본과 동일', () => {
      const fields = [123, 'mixed', true, null];
      expect(decodeCursor(encodeCursor(fields))).toEqual(fields);
    });
  });

  describe('decodeCursor 거부', () => {
    it('디코딩 불가 문자열은 throw', () => {
      expect(() => decodeCursor('!!!not-base64-json!!!')).toThrow();
    });

    it('배열이 아닌 값(JSON 숫자)은 throw', () => {
      const notArray = Buffer.from('42').toString('base64url'); // 디코딩 시 숫자 42
      expect(() => decodeCursor(notArray)).toThrow();
    });
  });

  describe('parsePageParams — pageSize 클램프', () => {
    it('999는 50으로 클램프', () => {
      expect(parsePageParams({ pageSize: '999' }).pageSize).toBe(50);
    });

    it('0·음수·누락·NaN은 default(20)', () => {
      expect(parsePageParams({ pageSize: '0' }).pageSize).toBe(20);
      expect(parsePageParams({ pageSize: '-5' }).pageSize).toBe(20);
      expect(parsePageParams({}).pageSize).toBe(20);
      expect(parsePageParams({ pageSize: 'abc' }).pageSize).toBe(20);
    });

    it('범위 내 값은 그대로', () => {
      expect(parsePageParams({ pageSize: '10' }).pageSize).toBe(10);
    });
  });

  describe('parsePageParams — cursor', () => {
    it('유효한 cursor는 디코드된 배열로 반환', () => {
      const cursor = encodeCursor(['2026-01-01', 'abc']);
      expect(parsePageParams({ cursor }).cursor).toEqual(['2026-01-01', 'abc']);
    });

    it('cursor 누락 시 undefined', () => {
      expect(parsePageParams({}).cursor).toBeUndefined();
    });

    it('잘못된 cursor는 throw (→ VALIDATION_ERROR)', () => {
      expect(() => parsePageParams({ cursor: '!!!bad!!!' })).toThrow();
    });
  });
});
