---
globs:
  - src/**/*.ts
  - api/**/*.ts
  - tests/**/*.ts
---

# Folder Structure Rule (authoritative)

전체 사양: `project-init-plan/be/folder-structure.md`. 코드 생성 시 **항상** 따른다.

## 도메인 레이어 — 모두 동일한 nested + 전 레벨 barrel

`routes · controllers · services · repositories · validations · interfaces` 는 **동일 규칙**:

```
{layer}/{domain}/{?sub-domain}/{name}/{name}.{suffix}.ts
+ 모든 레벨에 index.ts barrel  (① 단위 → ② 서브도메인(선택) → ③ 도메인 → 루트 {layer}/index.ts)
```

- `{?sub-domain}`은 **선택** (그룹핑 필요 시에만, 예: command/query).
- 단위 폴더마다 `{name}.{suffix}.ts` + `index.ts`.
- 도메인 `index.ts` = 단위들을 한 객체로 집약 (`PostService = { getPostList, createPost }`).
- 루트 `{layer}/index.ts` = 도메인별 재export.

레이어별 `{suffix}` / 동반 `.type`:

| layer | suffix | `.type` 동반 |
|---|---|---|
| routes | `router` | — |
| controllers | `controller` | `.controller.type.ts` |
| services | `service` | — |
| repositories | `repository` | — |
| validations | `validation` | `.validation.type.ts` |
| interfaces | `type` | (자체가 타입) |

## 인프라 레이어 — concern 기준 (도메인 nesting 아님)

`config · middlewares · utils · constants`. 예: `middlewares/{Name}Middleware/{name}.middleware.ts`, `config/firebase/firebase.ts`.

## 의존성 방향 (단방향)

`routes → controllers → services → repositories → Firestore(config)`.
**DB 접근은 repositories를 통해서만.** services/controllers는 Firestore SDK 직접 호출 금지.

## import

`tsconfig.baseUrl: "src"` → 베어 임포트: `import { PostService } from "services"`. (`@`-alias는 선택)

## 배포 진입 (main과 다름)

- `api/index.ts` = Vercel 진입점 (`import app from "../src/app"; export default app`)
- `src/app.ts` = Express 앱 (미들웨어/라우터, **listen 호출 X**)
- `src/server.ts` = 로컬 전용 (`app.listen`)
- `vercel.json` = `rewrites → /api` (dist 커밋 없음). `builds: dist/app.js` 는 main 전용(수정 안 함).

## 공개/admin

route 레벨에서 분기(`routes/{domain}` 공개 vs admin 단위 + 미들웨어). controllers/services/repositories는 도메인별로 공개·admin 액션 공존.
