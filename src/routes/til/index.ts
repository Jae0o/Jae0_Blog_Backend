import { Router } from 'express';

import { getTilRouter } from './getTil';
import { getTilListRouter } from './getTilList';

/** `/api/tils` 도메인 라우터. 액션 라우터를 합친다. */
const tilRouter = Router();

tilRouter.use(getTilListRouter);
tilRouter.use(getTilRouter);

export { tilRouter };
