import { z } from 'zod';

import { decodeCursor } from '../decodeCursor';

/**
 * 쿼리 파라미터 파싱.
 * 규칙: .claude/docs/reference/conventions.md (pageSize default 20 / max 50, startAfter 기반)
 */

const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 50;

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
