import type { SiteConfig } from 'interfaces';
import { SiteConfigRepository } from 'repositories';
import { AppError } from 'utils';

/** 사이트 설정 조회. 문서가 없으면 404(공개 필드 stripping은 controller). */
export async function getPublicSiteConfig(): Promise<SiteConfig> {
  const config = await SiteConfigRepository.get();
  if (!config) throw new AppError(404, 'NOT_FOUND', '사이트 설정을 찾을 수 없습니다.');

  return config;
}
