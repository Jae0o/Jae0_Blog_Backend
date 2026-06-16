/**
 * GET /api/tags 응답 항목 DTO (태그 클라우드용).
 * 표시명·필터키·카운트만 노출하고, description·synonyms·timestamp는 제외한다.
 */
export interface TagListItem {
  id: string;
  displayName: string;
  nameLower: string;
  postCount: number;
  tilCount: number;
}
