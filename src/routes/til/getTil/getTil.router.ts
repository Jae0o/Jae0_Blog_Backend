import { Router } from 'express';

import { TilController } from 'controllers';
import { asyncHandler } from 'utils';

const getTilRouter = Router();

getTilRouter.get('/:tilId', asyncHandler(TilController.getTil));

export { getTilRouter };
