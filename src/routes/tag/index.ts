import { Router } from 'express';

import { getPopularTagsRouter } from './getPopularTags';

/** `/api/tags` 도메인 라우터. */
const tagRouter = Router();

tagRouter.use(getPopularTagsRouter);

export { tagRouter };
