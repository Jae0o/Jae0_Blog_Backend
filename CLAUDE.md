# Jae0 Blog — Backend (jae0.dev)

Backend API for the personal tech blog **jae0.dev**. After the design was finalized, this is a **full redesign from 0.0.0** (working branch: `dev`).

---

## 📂 Planning docs (always reference)

Detailed specs live in the sibling folder `project-init-plan/`.

- Relative path: `../project-init-plan/`
- Absolute path: `/Users/jae0/Develop/Blog/project-init-plan/`

> When working in Claude Code, **open `/Users/jae0/Develop/Blog/` as the workspace** so this repo and `project-init-plan` are both visible.

Key documents:

| Doc | Purpose |
|---|---|
| `be/implementation-plan.md` | ★ Milestones M0~M9 + DoD (source of truth for work order) |
| `be/domain-model.md` | Firestore schema (13 collections) |
| `be/api-spec.md` | REST endpoints + middleware + folder structure |
| `be/firestore-rules.md` / `firestore-indexes.md` | Security rules / index specs |
| `be/guide-m4-m6.md` | 🔰 Beginner explainer for M4~M6 (concepts + decided values) |
| `verification/mN-verification.md` | ★ Per-milestone verification criteria (read the rule below) |

---

## Tech stack (confirmed)

- **Runtime/server**: Node.js 20 LTS + Express + TypeScript 5
- **Firebase**: `firebase-admin` SDK (Firestore / Auth / Storage). The client SDK is FE-only.
- **Hosting**: Vercel Serverless (`@vercel/node`). No Dockerfile.
- **Validation/tooling**: Zod (validation), Vitest + supertest, `@firebase/rules-unit-testing`, pnpm, ESLint + Prettier
- **Local**: Firebase Emulator Suite (Firestore/Auth/Storage)

## Confirmed decisions (update the decision log first if changing)

- Firebase project: **`jae0-blog-v2`** (new project, no data migration)
- Repo: **redesign on the existing repo's `dev` branch** (not incremental extension)
- Deploy: **Vercel** — same deployment method as the existing backend `main` branch
- Secrets: Vercel Env Variables (`FIREBASE_SERVICE_ACCOUNT_JSON` as one line + `JSON.parse`)
- slug = **document ID** (no generation logic), reading time = 500 KR chars/min, TIL title = auto from body
- Autosave conflict = last-write-wins, search = simple split tokenization

## Domain essentials

- Firestore (NoSQL), no JOIN → solved with **denormalization + cascade** (Express batch write)
- `posts.status` single enum: `'public' | 'private' | 'draft'`
- TIL uses `visibility: 'public' | 'private'`, category **required**
- All content is **soft-deleted** (`deletedAt`); reads use `where('deletedAt','==',null)`
- Auth: Firebase Auth ID Token + `requireAuth`/`requireAdmin` middleware (auto-refreshes lastLogin once per session)
- View count: simple atomic increment (`FieldValue.increment(1)`)

## Milestone order

```
M0 bootstrap → M1 public read → M2 view tracking → M3 auth + /me
→ M4 Admin CRUD + cascade → M5 bulk + autosave → M6 taxonomy + search
→ M7 logs + analytics + redirects → M8 media → M9 deploy
```
Each milestone's DoD is in `be/implementation-plan.md`. **Currently: starting from M0.**

## Server folder structure (target)

```
src/
  routes/        # HTTP (thin). includes admin/ subtree
  services/      # business logic + cascade + transaction
  repositories/  # Firestore access (other layers touch the DB only through here)
  middleware/    # requireAuth, requireAdmin, rateLimit, logger, errorHandler, requestId
  lib/           # firebase (admin init), slugify, tokenize, readingTime, ipHash, validators (Zod)
  types/         # entities.ts, api.ts
  server.ts
tests/           # unit, integration, rules
firestore/       # firestore.rules, firestore.indexes.json
```

---

## ⚙️ Working rules

### Lean Coding (4 principles)
1. **Think Before Coding** — State assumptions; ask when unsure. Surface multiple interpretations instead of silently picking one.
2. **Simplicity First** — Only what was asked. No speculative abstractions/config/defensive code. If it's overbuilt, rewrite simpler.
3. **Surgical Changes** — Only touch lines tied directly to the request. Don't "improve" adjacent code. Match existing style.
4. **Goal-Driven Execution** — Reduce tasks to "write test → make it pass". State a brief plan for multi-step work.

> The author is a **frontend developer** with limited backend expertise. Explain backend concepts simply and make risky changes carefully.

### ⚠️ Verification rule (most important)
The docs in `project-init-plan/verification/` are the **criteria for checking the implementation**.

- **Do not modify code to fit the verification.** On failure, fix the real bug in the code — do not game the code to pass.
- **Do not modify the verification content.** Do not weaken/remove expected values or conditions to pass. Only if a requirement genuinely changed, update the planning docs first.
- Allowed direction is **code → verification** (verify after implementing) only. **verification → code** is forbidden.
