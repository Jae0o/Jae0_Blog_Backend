import type { Request } from 'express';

/** 클라이언트 IP 추출: x-forwarded-for 첫 IP → 없으면 req.ip. */
export function getClientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];

  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  const first = raw?.split(',')[0]?.trim();

  return first || req.ip || '';
}
