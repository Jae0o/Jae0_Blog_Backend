import { z } from 'zod';

/**
 * GET /api/posts 필터 쿼리 스키마.
 * pageSize/cursor는 utils의 parsePageParams가 담당하므로 여기서는 필터만 검증한다.
 * sort 미지정/이상값은 latest 기본값(이상값은 ZodError → VALIDATION_ERROR).
 * includeTotal=true면 meta.total(전체 공개 글 수, count 집계)을 함께 반환한다(api-spec.md 페이지네이션).
 */
export const getPostListQuerySchema = z.object({
  categorySlug: z.string().optional(),
  tag: z.string().optional(),
  sort: z.enum(['latest', 'oldest']).optional().default('latest'),
  includeTotal: z
    .string()
    .optional()
    .transform((s) => s === 'true'),
});

export type GetPostListQuery = z.infer<typeof getPostListQuerySchema>;
