import { Router } from 'express';

import { CategoryController } from 'controllers';
import { asyncHandler } from 'utils';

const getCategoryListRouter = Router();

getCategoryListRouter.get('/', asyncHandler(CategoryController.getCategoryList));

export { getCategoryListRouter };
