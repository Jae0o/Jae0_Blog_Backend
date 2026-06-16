import type { Request, Response } from 'express';

import type { ApiResponse } from 'interfaces';
import { SiteConfigService } from 'services';

import type { PublicSiteConfig } from './getPublicSiteConfig.controller.type';
import { toPublicSiteConfig } from './toPublicSiteConfig';

/**
 * GET /api/site-config — 공개 사이트 설정.
 * 화이트리스트 필드만 노출한다(admin/내부 필드 제외). 문서 없으면 service가 404를 throw.
 */
async function getPublicSiteConfig(_req: Request, res: Response): Promise<void> {
  const config = await SiteConfigService.getPublicSiteConfig();

  const body: ApiResponse<PublicSiteConfig> = { data: toPublicSiteConfig(config) };

  res.json(body);
}

export { getPublicSiteConfig };
