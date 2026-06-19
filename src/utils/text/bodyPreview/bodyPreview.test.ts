import { describe, expect, it } from 'vitest';

import { bodyPreview } from './bodyPreview';

describe('bodyPreview', () => {
  it('짧은 본문은 공백만 정규화하고 그대로 반환', () => {
    expect(bodyPreview('짧은   본문\n입니다')).toBe('짧은 본문 입니다');
  });

  it('maxLength를 넘으면 잘라 말줄임표(…)를 붙임', () => {
    const long = 'a'.repeat(200);
    const out = bodyPreview(long, 160);

    expect(out).toHaveLength(161); // 160자 + …
    expect(out.endsWith('…')).toBe(true);
  });

  it('경계값(maxLength와 동일 길이)은 자르지 않음', () => {
    const text = 'a'.repeat(160);

    expect(bodyPreview(text, 160)).toBe(text);
  });
});
