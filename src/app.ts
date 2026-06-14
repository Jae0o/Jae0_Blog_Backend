import express from 'express';

// Express 앱 (미들웨어/라우터는 M0-05에서 등록). listen 호출 X — Vercel은 함수로 import한다.
const app = express();

export default app;
