import { Router } from 'express';

import { PostController } from 'controllers';
import { asyncHandler } from 'utils';

const getPostRouter = Router();

getPostRouter.get('/:slug', asyncHandler(PostController.getPost));

export { getPostRouter };
