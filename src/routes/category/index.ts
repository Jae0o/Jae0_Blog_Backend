import { Router } from 'express';

import { getCategoryListRouter } from './getCategoryList';

/** `/api/categories` 도메인 라우터. */
const categoryRouter = Router();

categoryRouter.use(getCategoryListRouter);

export { categoryRouter };
