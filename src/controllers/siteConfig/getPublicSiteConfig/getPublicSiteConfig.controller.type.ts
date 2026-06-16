/**
 * GET /api/site-config 응답 DTO (공개 필드 화이트리스트).
 * api-spec 명시 8필드만 노출. siteUrl·defaultMetaDescription·customAnalyticsEnabled·updatedAt 등
 * admin/내부 필드는 제외한다.
 */
export interface PublicSiteConfig {
  siteName: string;
  siteDescription: string;
  socialLinks: {
    github: string | null;
    instagram: string | null;
    twitter: string | null;
    mail: string | null;
    rss: string | null;
  };
  authorBio: string | null;
  authorAvatar: string | null;
  footerText: string | null;
  footerLinks: { label: string; url: string }[];
  defaultOgImage: string | null;
}
