<!-- BEGIN inject-claude-rule: lean-coding-rule -->
# Lean Coding Rules

Behavioral guidelines to reduce common LLM coding mistakes.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.
<!-- END inject-claude-rule: lean-coding-rule -->

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
| `be/api-spec.md` | REST endpoints + middleware |
| `be/folder-structure.md` | ★ Repo root + Vercel deploy mapping + src layer structure (authoritative) |
| `be/firestore-rules.md` / `firestore-indexes.md` | Security rules / index specs |
| `be/guide-m4-m6.md` | 🔰 Beginner explainer for M4~M6 (concepts + decided values) |
| `verification/mN-verification.md` | ★ Per-milestone verification criteria (read the rule below) |

A **granular, per-task breakdown** of each milestone (one file per step, with its own "검증" gate) is mirrored locally at `.claude/docs/plan/MN-*/` (gitignored). Work through `.claude/docs/plan/MN-*/README.md` → numbered task files in order. Use these for execution; use the sibling `project-init-plan/` for the authoritative spec.

---

## Commands

> ⚠️ Not scaffolded yet — there is **no `package.json` or `src/`** on `dev`. These scripts are created in **M0-01** (`.claude/docs/plan/M0-bootstrap/M0-01-project-init.md`). Until then, no command runs.

Once M0-01 lands (pnpm + tsx + Vitest):

```bash
pnpm dev      # tsx watch src/server.ts — local server, auto-connects to Firebase Emulator
pnpm build    # tsc
pnpm test     # vitest (all tests)
pnpm lint     # eslint .            (pnpm lint:fix to autofix)
pnpm format   # prettier --write .  (auto-sorts imports via @trivago plugin)

pnpm test <path>                    # run a single test file
pnpm test -t "<name>"               # run tests matching a name
firebase emulators:start            # Firestore/Auth/Storage emulators (or use pnpm dev)
```

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

> Authoritative spec: `project-init-plan/be/folder-structure.md` (repo root + Vercel deploy mapping + full src tree).
> Rule (auto-loaded): `.claude/rules/folder-structure.md`. Full spec: `project-init-plan/be/folder-structure.md`.
> Convention: barrels + co-located `.type.ts` + a `repositories/` layer. **Every domain layer** (routes/controllers/services/repositories/validations/interfaces) uses the SAME nesting `{domain}/{?sub-domain}/{name}/{name}.{suffix}.ts` with a barrel `index.ts` at every level (suffix: router/controller/service/repository/validation/type). Imports are bare via `baseUrl: src` (`import { PostService } from "services"`).
> Deploy (per `.claude/docs/reference/deployment.md`, NOT main's dist approach): `vercel.json` `rewrites → /api`; `api/index.ts` = Vercel entry (`export default app`); `src/app.ts` = Express app (no listen); `src/server.ts` = local listen. No `dist` commit.

```
api/index.ts      # Vercel entry: import app from "../src/app"; export default app
src/
  app.ts          # Express app (mounts /api, middleware/routes) — NO app.listen
  server.ts       # local listen only (import app from "./app")
  config/         # env + firebase-admin init (singleton) + emulator
  routes/         # routers (index = Routes[]) + admin/ subtree
  controllers/    # HTTP handlers (thin). feature/action nesting + .type.ts
  services/       # business logic + cascade + transaction
  repositories/   # ★ Firestore access ONLY — other layers touch the DB only through here
  validations/    # Zod request schemas
  middlewares/    # requireAuth, requireAdmin, rateLimit, logger, error, requestId
  interfaces/     # shared types (entities, api)
  utils/          # tokenize, readingTime, ipHash (slug = doc ID, so no slugify)
  constants/
tests/            # unit, integration, rules (Vitest)
firestore/        # firestore.rules, firestore.indexes.json
scripts/seed.ts   # seed (6 categories + admin + samples)
```
Dependency direction (one-way): `routes → controllers → services → repositories → Firestore (via config)`.

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
