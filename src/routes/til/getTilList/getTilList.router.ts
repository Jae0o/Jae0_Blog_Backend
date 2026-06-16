import { Router } from 'express';

import { TilController } from 'controllers';
import { asyncHandler } from 'utils';

const getTilListRouter = Router();

getTilListRouter.get('/', asyncHandler(TilController.getTilList));

export { getTilListRouter };
