import { Timestamp } from 'firebase-admin/firestore';
import { describe, expect, it } from 'vitest';

import type { SiteConfig } from 'interfaces';

import { toPublicSiteConfig } from './toPublicSiteConfig';

function fakeSiteConfig(overrides: Partial<SiteConfig> = {}): SiteConfig {
  return {
    siteName: 'jae0.dev',
    siteDescription: '개인 기술 블로그',
    siteUrl: 'https://jae0.dev',
    socialLinks: { github: 'gh', instagram: null, twitter: null, mail: null, rss: null },
    authorBio: 'FE 개발자',
    authorAvatar: null,
    defaultOgImage: null,
    defaultMetaDescription: '기본 메타',
    footerText: '© jae0',
    footerLinks: [{ label: 'GitHub', url: 'https://github.com' }],
    customAnalyticsEnabled: true,
    updatedAt: Timestamp.fromMillis(1_700_000_000_000),
    ...overrides,
  };
}

// M1-11 검증: 공개 응답은 화이트리스트 8필드만, admin/내부 필드는 절대 포함하지 않는다.
describe('toPublicSiteConfig (M1-06 / M1-11)', () => {
  it('화이트리스트 8필드만 노출', () => {
    const result = toPublicSiteConfig(fakeSiteConfig());

    expect(Object.keys(result).sort()).toEqual(
      [
        'siteName',
        'siteDescription',
        'socialLinks',
        'authorBio',
        'authorAvatar',
        'footerText',
        'footerLinks',
        'defaultOgImage',
      ].sort(),
    );
  });

  it('admin/내부 필드는 미포함', () => {
    const result = toPublicSiteConfig(fakeSiteConfig());

    expect('customAnalyticsEnabled' in result).toBe(false);
    expect('siteUrl' in result).toBe(false);
    expect('defaultMetaDescription' in result).toBe(false);
    expect('updatedAt' in result).toBe(false);
  });
});
