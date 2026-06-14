import app from './app';

// 로컬 전용 진입점 (pnpm dev). 배포(Vercel)는 api/index.ts를 사용한다.
// env 검증은 M0-03에서 도입 — 지금은 process.env 직접 사용(최소).
const PORT = Number(process.env.PORT) || 8080;

app.listen(PORT, () => console.log(`▶ http://localhost:${PORT}`));
