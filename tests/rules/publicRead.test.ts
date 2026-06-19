import {
  type RulesTestEnvironment,
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} from '@firebase/rules-unit-testing';
import { Timestamp, doc, getDoc, setDoc } from 'firebase/firestore';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterAll, beforeAll, describe, it } from 'vitest';

/**
 * Firestore 보안 Rules 검증 (M1-14~16).
 * admin SDK는 Rules를 우회하므로 Rules 검증은 반드시 클라이언트 SDK(@firebase/rules-unit-testing)로 한다.
 * 통합 테스트(admin SDK, project=jae0-blog-v2) fixture와 섞이지 않도록 **별도 projectId**로 격리한다.
 */
const PROJECT_ID = 'jae0-blog-rules-test';
const deletedAt = Timestamp.fromDate(new Date('2026-05-01'));

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: PROJECT_ID,
    firestore: {
      rules: readFileSync(resolve(process.cwd(), 'firestore/firestore.rules'), 'utf8'),
      host: 'localhost',
      port: 8080,
    },
  });

  // Rules 우회 컨텍스트로 검증 대상 문서를 심는다.
  await testEnv.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore();
    await setDoc(doc(db, 'posts/public-post'), { status: 'public', deletedAt: null, title: '공개' });
    await setDoc(doc(db, 'posts/private-post'), { status: 'private', deletedAt: null });
    await setDoc(doc(db, 'posts/draft-post'), { status: 'draft', deletedAt: null });
    await setDoc(doc(db, 'posts/deleted-post'), { status: 'public', deletedAt });
    await setDoc(doc(db, 'tils/public-til'), { visibility: 'public', deletedAt: null });
    await setDoc(doc(db, 'tils/private-til'), { visibility: 'private', deletedAt: null });
    await setDoc(doc(db, 'rateLimits/existing'), { count: 1 });
  });
});

afterAll(async () => {
  await testEnv.cleanup();
});

describe('Firestore Rules — 익명 공개 read (M1)', () => {
  it('T-M1-9: 익명이 공개 post·til read 허용', async () => {
    const db = testEnv.unauthenticatedContext().firestore();

    await assertSucceeds(getDoc(doc(db, 'posts/public-post')));
    await assertSucceeds(getDoc(doc(db, 'tils/public-til')));
  });

  it('T-M1-10: 익명의 비공개·draft·삭제 post read 거부', async () => {
    const db = testEnv.unauthenticatedContext().firestore();

    await assertFails(getDoc(doc(db, 'posts/private-post')));
    await assertFails(getDoc(doc(db, 'posts/draft-post')));
    await assertFails(getDoc(doc(db, 'posts/deleted-post')));
    await assertFails(getDoc(doc(db, 'tils/private-til')));
  });

  it('T-M1-11: 익명 write 거부 (posts·tils·rateLimits)', async () => {
    const db = testEnv.unauthenticatedContext().firestore();

    await assertFails(setDoc(doc(db, 'posts/hacked'), { status: 'public' }));
    await assertFails(setDoc(doc(db, 'tils/hacked'), { visibility: 'public' }));
    await assertFails(setDoc(doc(db, 'rateLimits/hacked'), { count: 999 }));
  });
});
