import { describe, expect, it } from 'vitest';

import { ipHash } from './ipHash';

// M1-01 검증: 결정적 SHA256 해시.
describe('ipHash (M1-01)', () => {
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
