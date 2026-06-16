import type { SiteConfig } from 'interfaces';

import type { PublicSiteConfig } from './getPublicSiteConfig.controller.type';

/**
 * SiteConfig 엔티티 → 공개 DTO. api-spec 화이트리스트 8필드만 추려 노출한다.
 * admin/내부 필드(customAnalyticsEnabled, siteUrl, defaultMetaDescription, updatedAt)는 절대 포함하지 않는다.
 */
export function toPublicSiteConfig(config: SiteConfig): PublicSiteConfig {
  return {
    siteName: config.siteName,
    siteDescription: config.siteDescription,
    socialLinks: config.socialLinks,
    authorBio: config.authorBio,
    authorAvatar: config.authorAvatar,
    footerText: config.footerText,
    footerLinks: config.footerLinks,
    defaultOgImage: config.defaultOgImage,
  };
}
