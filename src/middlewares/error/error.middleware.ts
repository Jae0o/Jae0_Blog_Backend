import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

import type { ErrorCode } from 'interfaces';
import { AppError } from 'utils';

/** 표준 에러 envelope 전송 헬퍼. */
function send(
  res: Parameters<ErrorRequestHandler>[2],
  status: number,
  code: ErrorCode,
  message: string,
  details?: unknown,
): void {
  res.status(status).json({ error: { code, message, ...(details ? { details } : {}) } });
}

/**
 * 최종 catch — 에러를 { error: { code, message, details? } } envelope로 변환한다.
 * 출처: .claude/docs/reference/conventions.md (에러 카탈로그)
 */
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  // service/controller가 throw한 도메인 HTTP 에러
  if (err instanceof AppError) {
    return send(res, err.status, err.code, err.message, err.details);
  }

  // zodValidate가 forward한 검증 실패
  if (err instanceof ZodError) {
    const fields = Object.fromEntries(err.issues.map((i) => [i.path.join('.'), i.message]));
    return send(res, 400, 'VALIDATION_ERROR', '요청 값 검증에 실패했습니다.', { fields });
  }

  // express.json: 잘못된 JSON 본문
  if (err?.type === 'entity.parse.failed') {
    return send(res, 400, 'MALFORMED_BODY', '요청 본문 JSON을 파싱할 수 없습니다.');
  }

  // express.json: 본문 크기 초과(1MB) — 카탈로그에 413 전용 코드가 없어 VALIDATION_ERROR로 매핑
  if (err?.type === 'entity.too.large') {
    return send(res, 413, 'VALIDATION_ERROR', '요청 본문이 너무 큽니다 (최대 1MB).');
  }

  console.error(JSON.stringify({ level: 'error', requestId: req.requestId, message: String(err?.message ?? err) }));
  return send(res, 500, 'INTERNAL_ERROR', '서버 내부 오류가 발생했습니다.');
};
