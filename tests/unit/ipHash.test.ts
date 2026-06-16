import type { Request } from 'express';
import { describe, expect, it } from 'vitest';

import { getClientIp, ipHash } from 'utils';

// M1-01 검증: 결정적 SHA256 해시 / 클라이언트 IP 추출.
describe('ipHash util (M1-01)', () => {
  describe('ipHash', () => {
    it('동일 입력은 항상 동일한 64자 hex', () => {
      const a = ipHash('1.2.3.4');
      const b = ipHash('1.2.3.4');
      expect(a).toBe(b);
      expect(a).toMatch(/^[0-9a-f]{64}$/);
    });

    it('다른 입력은 다른 해시', () => {
      expect(ipHash('1.2.3.4')).not.toBe(ipHash('5.6.7.8'));
    });
  });

  describe('getClientIp', () => {
    const fakeReq = (headers: Record<string, string | undefined>, ip?: string): Request =>
      ({ headers, ip }) as unknown as Request;

    it('x-forwarded-for의 첫 IP를 사용', () => {
      const req = fakeReq({ 'x-forwarded-for': '1.1.1.1, 2.2.2.2' }, '9.9.9.9');
      expect(getClientIp(req)).toBe('1.1.1.1');
    });

    it('x-forwarded-for 없으면 req.ip로 fallback', () => {
      const req = fakeReq({}, '9.9.9.9');
      expect(getClientIp(req)).toBe('9.9.9.9');
    });
  });
});
