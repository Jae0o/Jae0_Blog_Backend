import type { Category } from 'interfaces';
import { CategoryRepository } from 'repositories';

/** 공개 카테고리 목록 조회. 추가 로직 없이 repository에 위임한다(thin pass-through). */
export async function getCategoryList(): Promise<Category[]> {
  return CategoryRepository.listPublic();
}
