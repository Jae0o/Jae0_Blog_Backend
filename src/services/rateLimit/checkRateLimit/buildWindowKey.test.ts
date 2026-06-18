import { describe, expect, it } from 'vitest';

import { buildWindowKey } from './buildWindowKey';

const IP = 'a'.repeat(64);
const ROUTE = 'api';
const WINDOW_SEC = 60;

describe('buildWindowKey', () => {
  it('docId가 `{ipHashed}_{route}_{windowStart}` 포맷이다', () => {
    // nowMs = 90_000ms → windowStart = floor(90000 / 60000) = 1
    const { docId } = buildWindowKey(IP, ROUTE, WINDOW_SEC, 90_000);
    expect(docId).toBe(`${IP}_${ROUTE}_1`);
  });

  it('같은 window 안의 두 시각은 동일한 docId를 만든다', () => {
    const a = buildWindowKey(IP, ROUTE, WINDOW_SEC, 60_000);
    const b = buildWindowKey(IP, ROUTE, WINDOW_SEC, 119_999);
    expect(a.docId).toBe(b.docId);
  });

  it('window 경계를 넘으면 docId가 달라진다 (카운터 리셋)', () => {
    const a = buildWindowKey(IP, ROUTE, WINDOW_SEC, 119_999);
    const b = buildWindowKey(IP, ROUTE, WINDOW_SEC, 120_000);
    expect(a.docId).not.toBe(b.docId);
  });

  it('expireAtMs는 현재 window의 끝(다음 window 시작)이다', () => {
    const { expireAtMs } = buildWindowKey(IP, ROUTE, WINDOW_SEC, 90_000);
    expect(expireAtMs).toBe(120_000);
  });
});
