import { z } from 'zod';

/**
 * GET /api/posts 필터 쿼리 스키마.
 * pageSize/cursor는 utils의 parsePageParams가 담당하므로 여기서는 필터만 검증한다.
 * sort 미지정/이상값은 latest 기본값(이상값은 ZodError → VALIDATION_ERROR).
 */
export const getPostListQuerySchema = z.object({
  categorySlug: z.string().optional(),
  tag: z.string().optional(),
  sort: z.enum(['latest', 'oldest']).optional().default('latest'),
});

export type GetPostListQuery = z.infer<typeof getPostListQuerySchema>;
