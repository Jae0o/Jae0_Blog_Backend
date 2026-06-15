import { afterAll, describe, expect, it } from 'vitest';

import { db } from 'config/firebase';

// T-M0-5: firebase-admin이 emulator Firestore에 연결돼 write/read 되는지 확인.
// ⚠️ Firebase Emulator가 기동된 상태에서 실행해야 한다(FIRESTORE_EMULATOR_HOST 사용).
describe('firebase-admin ↔ Emulator (T-M0-5)', () => {
  const ref = db.collection('_smoke').doc('m0-08');

  afterAll(async () => {
    await ref.delete();
  });

  it('emulator Firestore에 write→read 시 동일 값 반환', async () => {
    await ref.set({ ok: true, label: 'm0-08' });

    const snap = await ref.get();

    expect(snap.exists).toBe(true);
    expect(snap.data()?.ok).toBe(true);
    expect(snap.data()?.label).toBe('m0-08');
  });
});
