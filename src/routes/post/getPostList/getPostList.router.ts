import { Router } from 'express';

import { PostController } from 'controllers';
import { asyncHandler } from 'utils';

const getPostListRouter = Router();

getPostListRouter.get('/', asyncHandler(PostController.getPostList));

export { getPostListRouter };
