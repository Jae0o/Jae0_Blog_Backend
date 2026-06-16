import { z } from 'zod';

/**
 * GET /api/tils 필터 쿼리 스키마.
 * pageSize/cursor는 utils의 parsePageParams가 담당하므로 여기서는 필터만 검증한다.
 * Post와 달리 카테고리는 slug가 아닌 categoryId로 직접 필터한다.
 */
export const getTilListQuerySchema = z.object({
  categoryId: z.string().optional(),
  tag: z.string().optional(),
  sort: z.enum(['latest', 'oldest']).optional().default('latest'),
});

export type GetTilListQuery = z.infer<typeof getTilListQuerySchema>;
