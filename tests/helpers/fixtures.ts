/**
 * M1-10 통합 테스트용 공유 fixture.
 *
 * verification(m1-verification.md) "사전 준비"가 요구하는 데이터(공개 post ≥3·비공개 1·draft 1·
 * 삭제 1·공개 til ≥2·비공개 1)를 admin SDK로 적재한다. M1-09 시드는 이 최소치에 미달하므로 시드 대신 사용.
 *
 * - **set-only 멱등**: clear하지 않는다. 여러 테스트 파일이 병렬로 beforeAll에서 호출해도 동일 docId에
 *   동일 값을 덮어쓸 뿐이라 파일 간 race가 없다. 각 파일은 전체 fixture를 쓰므로 자기 테스트엔 항상 완전한 데이터.
 * - 결정적 카운트 단언을 위해 **fresh 에뮬레이터**에서 실행한다(`firebase emulators:exec`가 매 실행 보장).
 */
import { Timestamp } from 'firebase-admin/firestore';

import { db } from 'config/firebase';

const at = (iso: string) => Timestamp.fromDate(new Date(iso));
const now = Timestamp.now();

/** 최소 유효 Tiptap 문서 */
const doc = (text: string) => ({
  type: 'doc',
  content: [{ type: 'paragraph', content: [{ type: 'text', text }] }],
});

/** 테스트 파일별 고유 IP — rate limit 카운터(IP당 단일 카운터)를 파일 간 분리한다. */
export const IP = {
  posts: '10.10.0.1',
  tils: '10.10.0.2',
  meta: '10.10.0.3',
  rateLimit: '10.10.0.9',
} as const;

/** 단언에 쓰는 fixture docId 모음. */
export const FIX = {
  publicPosts: ['post-pub-1', 'post-pub-2', 'post-pub-3'], // publishedAt 오름차순(=목록 DESC의 역순)
  privatePost: 'post-private',
  draftPost: 'post-draft',
  deletedPost: 'post-deleted',
  publicTils: ['til-pub-1', 'til-pub-2'],
  privateTil: 'til-private',
  publicCategories: ['frontend', 'backend'], // order 0,1
  hiddenCategories: ['secret-cat', 'deleted-cat'], // private / soft-deleted → 목록 제외
} as const;

const postBase = {
  authorId: 'fixture-admin',
  language: 'ko',
  bodySize: 200,
  keywords: [],
  coverImage: null,
  metaTitle: null,
  metaDescription: null,
  ogImage: null,
  canonicalUrl: null,
  relatedPostIds: [],
  isPinned: false,
  readingTime: 1,
  wordCount: 50,
  viewCount: 0,
  metadata: null,
  deletedAt: null as Timestamp | null,
};

const posts = [
  {
    id: 'post-pub-1',
    slug: 'post-pub-1',
    title: '공개 글 1',
    body: doc('공개 1'),
    bodyText: '공개 1',
    excerpt: '공개 1 요약',
    categoryId: 'frontend',
    categoryName: 'Frontend',
    tagNames: ['react', 'typescript'],
    status: 'public' as const,
    publishedAt: at('2026-03-01'),
    createdAt: at('2026-03-01'),
    updatedAt: at('2026-03-01'),
    ...postBase,
  },
  {
    id: 'post-pub-2',
    slug: 'post-pub-2',
    title: '공개 글 2',
    body: doc('공개 2'),
    bodyText: '공개 2',
    excerpt: '공개 2 요약',
    categoryId: 'frontend',
    categoryName: 'Frontend',
    tagNames: ['react'],
    status: 'public' as const,
    publishedAt: at('2026-03-02'),
    createdAt: at('2026-03-02'),
    updatedAt: at('2026-03-02'),
    ...postBase,
  },
  {
    id: 'post-pub-3',
    slug: 'post-pub-3',
    title: '공개 글 3',
    body: doc('공개 3'),
    bodyText: '공개 3',
    excerpt: '공개 3 요약',
    categoryId: 'backend',
    categoryName: 'Backend',
    tagNames: ['nodejs'],
    status: 'public' as const,
    publishedAt: at('2026-03-03'),
    createdAt: at('2026-03-03'),
    updatedAt: at('2026-03-03'),
    ...postBase,
  },
  {
    id: 'post-private',
    slug: 'post-private',
    title: '비공개 글',
    body: doc('비공개'),
    bodyText: '비공개',
    excerpt: '비공개 요약',
    categoryId: 'backend',
    categoryName: 'Backend',
    tagNames: [],
    status: 'private' as const,
    publishedAt: null,
    createdAt: at('2026-03-04'),
    updatedAt: at('2026-03-04'),
    ...postBase,
  },
  {
    id: 'post-draft',
    slug: 'post-draft',
    title: '초안 글',
    body: doc('초안'),
    bodyText: '초안',
    excerpt: '초안 요약',
    categoryId: null,
    categoryName: null,
    tagNames: [],
    status: 'draft' as const,
    publishedAt: null,
    createdAt: at('2026-03-05'),
    updatedAt: at('2026-03-05'),
    ...postBase,
  },
  {
    id: 'post-deleted',
    slug: 'post-deleted',
    title: '삭제된 글',
    body: doc('삭제'),
    bodyText: '삭제',
    excerpt: '삭제 요약',
    categoryId: 'frontend',
    categoryName: 'Frontend',
    tagNames: [],
    status: 'public' as const,
    publishedAt: at('2026-03-06'),
    createdAt: at('2026-03-06'),
    updatedAt: at('2026-03-06'),
    ...postBase,
    deletedAt: at('2026-03-07'),
  },
];

const tilBase = {
  authorId: 'fixture-admin',
  language: 'ko',
  keywords: [],
  code: null,
  codeLanguage: null,
  imageUrl: null,
  isPinned: false,
  viewCount: 0,
  metadata: null,
  deletedAt: null as Timestamp | null,
};

const tils = [
  {
    id: 'til-pub-1',
    title: '공개 TIL 1',
    body: doc('til 1'),
    bodyText: 'til 1',
    categoryId: 'backend',
    categoryName: 'Backend',
    tagNames: ['nodejs'],
    visibility: 'public' as const,
    createdAt: at('2026-04-01'),
    updatedAt: at('2026-04-01'),
    ...tilBase,
  },
  {
    id: 'til-pub-2',
    title: '공개 TIL 2',
    body: doc('til 2'),
    bodyText: 'til 2',
    categoryId: 'frontend',
    categoryName: 'Frontend',
    tagNames: [],
    visibility: 'public' as const,
    createdAt: at('2026-04-02'),
    updatedAt: at('2026-04-02'),
    ...tilBase,
  },
  {
    id: 'til-private',
    title: '비공개 TIL',
    body: doc('til 비공개'),
    bodyText: 'til 비공개',
    categoryId: 'frontend',
    categoryName: 'Frontend',
    tagNames: [],
    visibility: 'private' as const,
    createdAt: at('2026-04-03'),
    updatedAt: at('2026-04-03'),
    ...tilBase,
  },
];

const categoryBase = {
  description: null,
  coverImage: null,
  metaTitle: null,
  metaDescription: null,
  postCount: 0,
  tilCount: 0,
  createdAt: now,
  updatedAt: now,
};

const categories = [
  {
    id: 'frontend',
    name: 'Frontend',
    nameLower: 'frontend',
    slug: 'frontend',
    hue: 210,
    visibility: 'public' as const,
    order: 0,
    deletedAt: null,
    ...categoryBase,
  },
  {
    id: 'backend',
    name: 'Backend',
    nameLower: 'backend',
    slug: 'backend',
    hue: 150,
    visibility: 'public' as const,
    order: 1,
    deletedAt: null,
    ...categoryBase,
  },
  {
    id: 'secret-cat',
    name: 'Secret',
    nameLower: 'secret',
    slug: 'secret-cat',
    hue: 30,
    visibility: 'private' as const,
    order: 2,
    deletedAt: null,
    ...categoryBase,
  },
  {
    id: 'deleted-cat',
    name: 'Deleted',
    nameLower: 'deleted',
    slug: 'deleted-cat',
    hue: 90,
    visibility: 'public' as const,
    order: 3,
    deletedAt: at('2026-05-01'),
    ...categoryBase,
  },
];

const tagBase = { description: null, synonyms: [] as string[], createdAt: now, updatedAt: now };

// 결합 카운트(postCount+tilCount): react 6 > nodejs 5 > typescript 1 → 빈도순 단언이 결정적.
const tags = [
  { id: 'react', nameLower: 'react', displayName: 'React', postCount: 5, tilCount: 1, ...tagBase },
  { id: 'nodejs', nameLower: 'nodejs', displayName: 'Node.js', postCount: 2, tilCount: 3, ...tagBase },
  { id: 'typescript', nameLower: 'typescript', displayName: 'TypeScript', postCount: 1, tilCount: 0, ...tagBase },
];

const siteConfig = {
  siteName: 'jae0.dev',
  siteDescription: 'Jae0의 기술 블로그',
  siteUrl: 'https://jae0.dev',
  socialLinks: {
    github: 'https://github.com/jae0',
    instagram: null,
    twitter: null,
    mail: 'jae0o153@gmail.com',
    rss: 'https://jae0.dev/rss.xml',
  },
  authorBio: '프론트엔드 개발자 Jae0',
  authorAvatar: null,
  defaultOgImage: null,
  defaultMetaDescription: 'jae0.dev — 개인 기술 블로그',
  footerText: '© 2026 jae0.dev',
  footerLinks: [],
  customAnalyticsEnabled: true, // admin 전용 — 공개 응답에서 제외되는지 검증
  updatedAt: now,
};

/** 전체 fixture를 batch로 적재(set-only 멱등). 에뮬레이터 외 실행은 차단. */
export async function loadFixtures(): Promise<void> {
  if (!process.env.FIRESTORE_EMULATOR_HOST) {
    throw new Error('loadFixtures는 에뮬레이터에서만 실행해야 합니다(FIRESTORE_EMULATOR_HOST 미설정).');
  }

  const batch = db.batch();
  categories.forEach((c) => batch.set(db.collection('categories').doc(c.id), c));
  tags.forEach((t) => batch.set(db.collection('tags').doc(t.id), t));
  posts.forEach((p) => batch.set(db.collection('posts').doc(p.id), p));
  tils.forEach((t) => batch.set(db.collection('tils').doc(t.id), t));
  batch.set(db.collection('siteConfig').doc('default'), siteConfig);
  await batch.commit();
}
