import { Router } from 'express';

import { getPostRouter } from './getPost';
import { getPostListRouter } from './getPostList';

/** `/api/posts` 도메인 라우터. 액션 라우터를 합친다. */
const postRouter = Router();

postRouter.use(getPostListRouter);
postRouter.use(getPostRouter);

export { postRouter };
