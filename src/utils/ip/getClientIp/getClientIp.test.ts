import type { Request } from 'express';
import { describe, expect, it } from 'vitest';

import { getClientIp } from './getClientIp';

// M1-01 검증: 클라이언트 IP 추출.
describe('getClientIp (M1-01)', () => {
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
