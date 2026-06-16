import type { Router } from 'express';

import { healthRouter } from './health';
import { postRouter } from './post';

/** `/api` 하위 라우트 등록 단위. path는 `/api` 뒤에 붙는다. */
export interface Route {
  path: string;
  router: Router;
}

export const routes: Route[] = [
  { path: '/health', router: healthRouter },
  { path: '/posts', router: postRouter },
];
