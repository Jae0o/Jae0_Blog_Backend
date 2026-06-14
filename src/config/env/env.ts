import { z } from 'zod';

/**
 * 환경변수 검증 스키마.
 * 부팅 시 process.env를 1회 파싱해, 누락 시 즉시 실패시킨다.
 * 출처: .claude/docs/plan/M0-bootstrap/M0-03-env.md
 */
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  PORT: z.coerce.number().default(8080),

  FIREBASE_PROJECT_ID: z.string().min(1),

  FIREBASE_SERVICE_ACCOUNT_JSON: z.string().min(1), // 한 줄 JSON 문자열 — 실제 parse는 M0-04

  ALLOWED_ORIGINS: z
    .string()
    .optional()
    .transform((v) => (v ? v.split(',').map((s) => s.trim()) : [])),

  FIRESTORE_EMULATOR_HOST: z.string().optional(),
  FIREBASE_AUTH_EMULATOR_HOST: z.string().optional(),
  FIREBASE_STORAGE_EMULATOR_HOST: z.string().optional(),
  CRON_SECRET: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ 환경변수 검증 실패 — 다음 변수를 확인하세요:');
  
  for (const issue of parsed.error.issues) {
    console.error(`  • ${issue.path.join('.')}: ${issue.message}`);
  }

  process.exit(1);
}

/** 타입 안전한 환경변수 객체 */
export const env = parsed.data;
export type Env = typeof env;
