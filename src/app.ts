import express from 'express';

import { corsMiddleware, errorHandler, logger, requestId } from 'middlewares';

// Express 앱. listen 호출 X — Vercel은 함수로 import한다(로컬 listen은 server.ts).
const app = express();

// 미들웨어 스택 (conventions.md 순서): requestId → logger → cors → json → … → errorHandler
app.use(requestId);
app.use(logger);
app.use(corsMiddleware);
app.use(express.json({ limit: '1mb' }));

// 라우트는 M0-08+ 에서 errorHandler 앞에 마운트한다.
app.use(errorHandler);

export default app;
