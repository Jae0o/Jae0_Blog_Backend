import type { Til } from 'interfaces';
import { TilRepository } from 'repositories';
import { AppError } from 'utils';

/** 공개 TIL 상세 조회. 없거나 비공개/삭제면 404. */
export async function getTil(tilId: string): Promise<Til> {
  const til = await TilRepository.getById(tilId);
  if (!til) throw new AppError(404, 'NOT_FOUND', 'TIL을 찾을 수 없습니다.');

  return til;
}
