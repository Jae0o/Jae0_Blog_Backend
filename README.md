# Jae0 Blog — Backend

개인 기술 블로그 **[jae0.dev](https://jae0.dev)** 의 백엔드 API. Express + Firebase Admin SDK 기반,
Vercel Serverless로 배포한다.

## 스택

Node 20 LTS · TypeScript 5 · Express 5 · firebase-admin · Zod · Vitest · pnpm
(로컬: Firebase Emulator Suite)

## 사전 준비

- Node 20 LTS, pnpm
- Firebase CLI (`firebase emulators:start` 용)
- 의존성 설치: `pnpm install`

## 환경변수

`.env.example` 를 `.env.development` 로 복사한 뒤 값을 채운다.

```bash
cp .env.example .env.development
```

- `FIREBASE_PROJECT_ID` — Firebase 프로젝트 ID (`jae0-blog-v2`)
- `FIREBASE_SERVICE_ACCOUNT_JSON` — 서비스 계정 키 JSON 한 줄. 로컬 Emulator만 쓸 땐 `{}` 로 충분
- `ALLOWED_ORIGINS` — CORS 허용 origin (쉼표 구분)
- `FIRESTORE_EMULATOR_HOST` / `FIREBASE_AUTH_EMULATOR_HOST` / `FIREBASE_STORAGE_EMULATOR_HOST`
  — 로컬 Emulator 전용 (⚠️ 배포 환경에는 설정하지 않는다)

## 실행

```bash
firebase emulators:start   # Firestore/Auth/Storage 에뮬레이터 (별도 터미널)
pnpm dev                   # tsx watch — 로컬 서버 (http://localhost:8000)

pnpm test                  # vitest (전체)
pnpm build                 # tsc 타입체크
pnpm lint                  # eslint .   (pnpm lint:fix 로 자동수정)
pnpm format                # prettier --write .
```

헬스체크: `curl http://localhost:8000/api/health` → `{"data":{"status":"ok","ts":...}}`

## 폴더 구조

```
api/index.ts      # Vercel 진입점 (src/app export)
src/
  app.ts          # Express 앱 (미들웨어/라우트, listen 없음)
  server.ts       # 로컬 listen 전용
  config/         # env(Zod 검증) + firebase-admin 초기화
  routes/         # 라우터 (index = Routes[]) + admin 하위
  controllers/    # HTTP 핸들러 (얇게)
  services/       # 비즈니스 로직 + cascade/트랜잭션
  repositories/   # Firestore 접근 전용
  validations/    # Zod 요청 스키마
  middlewares/    # requireAuth, requireAdmin, rateLimit, logger, error, requestId
  interfaces/     # 공유 타입
  utils/  constants/
tests/            # unit · integration · rules (Vitest)
firestore/        # firestore.rules, firestore.indexes.json, storage.rules
```

의존성 방향: `routes → controllers → services → repositories → Firestore (config)`.

## 배포

`main` push → Vercel Production 자동 배포. 진입점은 `api/index.ts`, 라우팅은 `vercel.json` 의
`rewrites → /api`. Vercel Env에 위 환경변수를 등록한다(emulator host 제외).
