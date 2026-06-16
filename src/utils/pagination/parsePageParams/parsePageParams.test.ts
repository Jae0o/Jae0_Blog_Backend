import { describe, expect, it } from 'vitest';

import { encodeCursor } from '../encodeCursor';

import { parsePageParams } from './parsePageParams';

// M1-01 검증: pageSize 클램프 / cursor 파싱.
describe('parsePageParams (M1-01)', () => {
  describe('pageSize 클램프', () => {
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

  describe('cursor', () => {
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
