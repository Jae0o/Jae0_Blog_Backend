/**
 * API 응답/에러 envelope 타입.
 * 출처: .claude/docs/reference/conventions.md
 */

/** 단일 응답: { data, meta? } */
export interface ApiResponse<T> {
  data: T;
  meta?: Record<string, unknown>;
}

/** 리스트 응답: cursor 기반 페이지네이션 (nextCursor null = 마지막 페이지) */
export interface ApiListResponse<T> {
  data: T[];
  meta: { nextCursor: string | null };
}

/** 에러 코드 카탈로그 (conventions.md) */
export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'MALFORMED_BODY'
  | 'UNAUTHORIZED'
  | 'INVALID_TOKEN'
  | 'TOKEN_EXPIRED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'RESOURCE_DELETED'
  | 'CONFLICT'
  | 'RULE_VIOLATION'
  | 'RATE_LIMITED'
  | 'INTERNAL_ERROR'
  | 'FIRESTORE_ERROR'
  | 'STORAGE_ERROR';

/** 에러 응답: { error: { code, message, details? } } */
export interface ApiError {
  error: {
    code: ErrorCode;
    message: string;
    details?: unknown;
  };
}
