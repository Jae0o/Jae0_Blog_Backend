import { Router } from 'express';

import { getPublicSiteConfigRouter } from './getPublicSiteConfig';

/** `/api/site-config` 도메인 라우터. */
const siteConfigRouter = Router();

siteConfigRouter.use(getPublicSiteConfigRouter);

export { siteConfigRouter };
