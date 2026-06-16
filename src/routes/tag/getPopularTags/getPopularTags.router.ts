import { Router } from 'express';

import { TagController } from 'controllers';
import { asyncHandler } from 'utils';

const getPopularTagsRouter = Router();

getPopularTagsRouter.get('/', asyncHandler(TagController.getPopularTags));

export { getPopularTagsRouter };
