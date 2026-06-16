import type { Router } from 'express';

import { categoryRouter } from './category';
import { healthRouter } from './health';
import { postRouter } from './post';
import { siteConfigRouter } from './siteConfig';
import { tagRouter } from './tag';
import { tilRouter } from './til';

/** `/api` 하위 라우트 등록 단위. path는 `/api` 뒤에 붙는다. */
export interface Route {
  path: string;
  router: Router;
}

export const routes: Route[] = [
  { path: '/health', router: healthRouter },
  { path: '/posts', router: postRouter },
  { path: '/tils', router: tilRouter },
  { path: '/categories', router: categoryRouter },
  { path: '/tags', router: tagRouter },
  { path: '/site-config', router: siteConfigRouter },
];
