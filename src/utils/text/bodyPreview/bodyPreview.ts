/**
 * 본문 미리보기 생성.
 * TIL 카드 그리드는 본문 텍스트 일부를 보여준다(api-spec.md `TilListItem.bodyPreview`).
 * bodyText의 공백을 정규화하고 maxLength를 넘으면 잘라 말줄임표(…)를 붙인다.
 */

/** 카드 미리보기 기본 길이(글자). M1 보강 결정값 — 카드 1~3줄 분량 기준. */
const DEFAULT_PREVIEW_LENGTH = 160;

export function bodyPreview(bodyText: string, maxLength: number = DEFAULT_PREVIEW_LENGTH): string {
  const normalized = bodyText.replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxLength) return normalized;

  return `${normalized.slice(0, maxLength).trimEnd()}…`;
}
