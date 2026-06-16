import { Router } from 'express';

import { SiteConfigController } from 'controllers';
import { asyncHandler } from 'utils';

const getPublicSiteConfigRouter = Router();

getPublicSiteConfigRouter.get('/', asyncHandler(SiteConfigController.getPublicSiteConfig));

export { getPublicSiteConfigRouter };
