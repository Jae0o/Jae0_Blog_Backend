/**
 * cursor 인코딩.
 * cursor = Firestore startAfter에 넣을 정렬 필드값 배열을 base64url(JSON)로 직렬화한 문자열.
 * (firebase-admin 타입에 의존하지 않도록 snapshot이 아닌 필드값 배열을 받는다.)
 */

/** 정렬 필드값 배열 → base64url(JSON) 문자열. */
export function encodeCursor(fields: unknown[]): string {
  return Buffer.from(JSON.stringify(fields)).toString('base64url');
}
