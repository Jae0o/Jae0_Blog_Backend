import { db } from 'config/firebase';
import type { SiteConfig } from 'interfaces';

/** 사이트 설정 단건 조회. 공개 필드 stripping(customAnalyticsEnabled 등 제외)은 controller(M1-06). */
export async function get(id = 'default'): Promise<SiteConfig | null> {
  const snapshot = await db.collection('siteConfig').doc(id).get();
  if (!snapshot.exists) return null;

  return snapshot.data() as SiteConfig;
}
