import { z } from 'zod';

/**
 * cursor 기반 페이지네이션 유틸.
 * 규칙: .claude/docs/reference/conventions.md (pageSize default 20 / max 50, startAfter 기반)
 *
 * cursor = Firestore startAfter에 넣을 정렬 필드값 배열을 base64url(JSON)로 직렬화한 문자열.
 * (firebase-admin 타입에 의존하지 않도록 snapshot이 아닌 필드값 배열을 받는다.)
 */

const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 50;

/** 정렬 필드값 배열 → base64url(JSON) 문자열. */
export function encodeCursor(fields: unknown[]): string {
  return Buffer.from(JSON.stringify(fields)).toString('base64url');
}

/** base64url(JSON) 문자열 → 필드값 배열. 디코딩 실패/배열 아님이면 throw. */
export function decodeCursor(cursor: string): unknown[] {
  let parsed: unknown;
  try {
    parsed = JSON.parse(Buffer.from(cursor, 'base64url').toString('utf8'));
  } catch {
    throw new Error('cursor를 디코딩할 수 없습니다.');
  }
  if (!Array.isArray(parsed)) throw new Error('cursor 형식이 올바르지 않습니다.');

  return parsed;
}

const pageParamsSchema = z.object({
  // pageSize는 검증 실패(throw)가 아니라 조용한 보정: 누락/0/음수/NaN → default, 초과 → max로 클램프.
  pageSize: z
    .string()
    .optional()
    .transform((s) => {
      const n = Number(s);
      if (!s || Number.isNaN(n) || n < 1) return DEFAULT_PAGE_SIZE;
      return Math.min(Math.floor(n), MAX_PAGE_SIZE);
    }),
  // cursor만 검증 대상: 디코딩 불가 시 ZodError → errorHandler가 VALIDATION_ERROR로 변환.
  cursor: z
    .string()
    .optional()
    .refine((c) => c === undefined || isDecodable(c), { message: '유효하지 않은 cursor입니다.' })
    .transform((c) => (c === undefined ? undefined : decodeCursor(c))),
});

function isDecodable(cursor: string): boolean {
  try {
    decodeCursor(cursor);

    return true;
  } catch {
    return false;
  }
}

export type PageParams = z.infer<typeof pageParamsSchema>;

/** req.query → { pageSize, cursor }. 잘못된 cursor는 ZodError를 던진다. */
export function parsePageParams(query: unknown): PageParams {
  return pageParamsSchema.parse(query);
}
