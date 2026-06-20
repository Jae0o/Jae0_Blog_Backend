import type { ViewTargetType } from 'interfaces';

/** 결정적 view doc id: `${type}_${targetId}_${date}` (예: post_abc_2026-06-14). */
export function viewDocId(targetType: ViewTargetType, targetId: string, date: string): string {
  return `${targetType}_${targetId}_${date}`;
}
