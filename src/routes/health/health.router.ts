import { Router } from 'express';

import { HealthController } from 'controllers';

const healthRouter = Router();

healthRouter.get('/', HealthController.getHealth);

export { healthRouter };
