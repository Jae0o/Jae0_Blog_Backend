import type { ErrorCode } from 'interfaces';

/**
 * 도메인 HTTP 에러. service/controller에서 throw하면 errorHandler가
 * 표준 envelope({ error: { code, message, details? } })로 변환한다.
 */
export class AppError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: ErrorCode,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = 'AppError';
  }
}
