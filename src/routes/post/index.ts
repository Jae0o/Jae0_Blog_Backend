import { Router } from 'express';

import { getPostListRouter } from './getPostList';

/** `/api/posts` 도메인 라우터. 액션 라우터를 합친다(M1-04 상세 라우터가 이후 합류). */
const postRouter = Router();

postRouter.use(getPostListRouter);

export { postRouter };
