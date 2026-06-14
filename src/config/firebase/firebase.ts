import { cert, getApp, getApps, initializeApp, type App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { env } from 'config/env';

/**
 * firebase-admin 싱글톤 초기화.
 * Vercel 서버리스는 인스턴스를 재사용하므로 모듈 로드 시 앱을 1회만 init한다.
 * Emulator host env가 있으면 admin SDK가 host를 자동 인식해 emulator에 연결된다.
 * 출처: .claude/docs/plan/M0-bootstrap/M0-04-firebase-admin.md
 */

/** Emulator host env가 있으면 emulator 모드 */
const isEmulator = Boolean(env.FIRESTORE_EMULATOR_HOST);

/** 콜드스타트 대응 — 이미 init된 앱이 있으면 재사용 (중복 init 방지) */
function getOrCreateApp(): App {
  if (getApps().length > 0) return getApp();

  if (isEmulator) {
    // Emulator: 자격증명 불필요, projectId만으로 init
    console.log(`🔥 firebase-admin: Emulator 모드 (project=${env.FIREBASE_PROJECT_ID})`);
    return initializeApp({ projectId: env.FIREBASE_PROJECT_ID });
  }

  // 프로덕션: service account JSON을 파싱해 cert 자격증명으로 init
  console.log(`🔥 firebase-admin: 프로덕션 모드 (project=${env.FIREBASE_PROJECT_ID})`);
  return initializeApp({
    credential: cert(JSON.parse(env.FIREBASE_SERVICE_ACCOUNT_JSON)),
  });
}

const app = getOrCreateApp();

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
