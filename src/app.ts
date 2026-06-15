import express from 'express';

import { corsMiddleware, errorHandler, logger, notFound, requestId } from 'middlewares';
import { routes } from 'routes';

// Express 앱. listen 호출 X — Vercel은 함수로 import한다(로컬 listen은 server.ts).
const app = express();

// 미들웨어 스택 (conventions.md 순서): requestId → logger → cors → json → … → errorHandler
app.use(requestId);
app.use(logger);
app.use(corsMiddleware);
app.use(express.json({ limit: '1mb' }));

// 도메인 라우트 — `/api` prefix로 마운트
routes.forEach(({ path, router }) => app.use(`/api${path}`, router));

app.use(notFound);
app.use(errorHandler);

export default app;
