import { createHash } from 'node:crypto';

/**
 * IP 해시 (M2 view 트래킹과 공용).
 * 원본 IP를 저장하지 않고 SHA256 hex(64자)로만 보관한다.
 */

/** IP 문자열 → SHA256 hex(64자). 동일 입력 → 항상 동일 출력. */
export function ipHash(ip: string): string {
  return createHash('sha256').update(ip).digest('hex');
}
