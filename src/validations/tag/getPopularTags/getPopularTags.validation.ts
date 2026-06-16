import { z } from 'zod';

const DEFAULT_TAG_LIMIT = 7;

/**
 * GET /api/tags 쿼리 스키마.
 * limit은 검증 실패가 아니라 조용한 보정(누락/0/음수/NaN → 7). sortBy 이상값만 ZodError.
 */
export const getPopularTagsQuerySchema = z.object({
  limit: z
    .string()
    .optional()
    .transform((s) => {
      const n = Number(s);
      if (!s || Number.isNaN(n) || n < 1) return DEFAULT_TAG_LIMIT;
      return Math.floor(n);
    }),
  sortBy: z.enum(['postCount', 'recent', 'name']).optional().default('postCount'),
});

export type GetPopularTagsQuery = z.infer<typeof getPopularTagsQuerySchema>;
