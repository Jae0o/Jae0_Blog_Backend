/** base64url(JSON) 문자열 → 필드값 배열. 디코딩 실패/배열 아님이면 throw. */
export function decodeCursor(cursor: string): unknown[] {
  let parsed: unknown;
  try {
    parsed = JSON.parse(Buffer.from(cursor, 'base64url').toString('utf8'));
  } catch {
    throw new Error('cursor를 디코딩할 수 없습니다.');
  }
  if (!Array.isArray(parsed)) throw new Error('cursor 형식이 올바르지 않습니다.');

  return parsed;
}
