/**
 * 시드 스크립트 (M1-09).
 * Emulator/dev에 카테고리·siteConfig·샘플 콘텐츠(공개·비공개·초안 혼합)를 적재한다.
 *
 * 실행: pnpm seed  (= tsx --env-file=.env.development scripts/seed.ts)
 * - .env.development의 FIRESTORE_EMULATOR_HOST 로 admin SDK가 에뮬레이터에 자동 연결된다.
 * - 결정적 docId + set() 이므로 재실행해도 덮어쓰기(중복 없음).
 */
import { Timestamp } from 'firebase-admin/firestore';

import { db } from 'config/firebase';

const now = Timestamp.now();
const at = (iso: string) => Timestamp.fromDate(new Date(iso));

/** 최소 유효 Tiptap 문서 */
const tiptap = (text: string) => ({
  type: 'doc',
  content: [{ type: 'paragraph', content: [{ type: 'text', text }] }],
});

const categories = [
  { slug: 'frontend', name: 'Frontend', hue: 210 },
  { slug: 'backend', name: 'Backend', hue: 150 },
  { slug: 'devops', name: 'DevOps', hue: 30 },
  { slug: 'database', name: 'Database', hue: 270 },
  { slug: 'design', name: 'Design', hue: 330 },
  { slug: 'etc', name: 'Etc', hue: 90 },
].map((c, order) => ({
  id: c.slug,
  name: c.name,
  nameLower: c.name.toLowerCase(),
  slug: c.slug,
  description: null,
  coverImage: null,
  hue: c.hue,
  visibility: 'public' as const,
  order,
  postCount: 0,
  tilCount: 0,
  metaTitle: null,
  metaDescription: null,
  createdAt: now,
  updatedAt: now,
  deletedAt: null,
}));

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
  customAnalyticsEnabled: false,
  updatedAt: now,
};

/** post 공통 필수 필드 */
const postBase = {
  authorId: 'seed-admin',
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
  deletedAt: null,
};

const posts = [
  {
    id: 'hello-world',
    slug: 'hello-world',
    title: '첫 번째 공개 글',
    body: tiptap('공개 글 본문입니다.'),
    bodyText: '공개 글 본문입니다.',
    excerpt: '공개 글 요약',
    categoryId: 'frontend',
    categoryName: 'Frontend',
    tagNames: ['react'],
    status: 'public' as const,
    publishedAt: at('2026-03-01'),
    createdAt: at('2026-03-01'),
    updatedAt: at('2026-03-01'),
    ...postBase,
  },
  {
    id: 'private-note',
    slug: 'private-note',
    title: '비공개 메모',
    body: tiptap('비공개 글 본문입니다.'),
    bodyText: '비공개 글 본문입니다.',
    excerpt: '비공개 글 요약',
    categoryId: 'backend',
    categoryName: 'Backend',
    tagNames: [],
    status: 'private' as const,
    publishedAt: null,
    createdAt: at('2026-03-02'),
    updatedAt: at('2026-03-02'),
    ...postBase,
  },
  {
    id: 'draft-wip',
    slug: 'draft-wip',
    title: '작성 중 초안',
    body: tiptap('초안 본문입니다.'),
    bodyText: '초안 본문입니다.',
    excerpt: '초안 요약',
    categoryId: null,
    categoryName: null,
    tagNames: [],
    status: 'draft' as const,
    publishedAt: null,
    createdAt: at('2026-03-03'),
    updatedAt: at('2026-03-03'),
    ...postBase,
  },
];

/** til 공통 필수 필드 */
const tilBase = {
  authorId: 'seed-admin',
  language: 'ko',
  keywords: [],
  code: null,
  codeLanguage: null,
  imageUrl: null,
  isPinned: false,
  viewCount: 0,
  metadata: null,
  deletedAt: null,
};

const tils = [
  {
    id: 'til-sample-public',
    title: '공개 TIL',
    body: tiptap('오늘 배운 공개 내용.'),
    bodyText: '오늘 배운 공개 내용.',
    categoryId: 'backend',
    categoryName: 'Backend',
    tagNames: ['nodejs'],
    visibility: 'public' as const,
    createdAt: at('2026-04-01'),
    updatedAt: at('2026-04-01'),
    ...tilBase,
  },
  {
    id: 'til-sample-private',
    title: '비공개 TIL',
    body: tiptap('오늘 배운 비공개 내용.'),
    bodyText: '오늘 배운 비공개 내용.',
    categoryId: 'frontend',
    categoryName: 'Frontend',
    tagNames: [],
    visibility: 'private' as const,
    createdAt: at('2026-04-02'),
    updatedAt: at('2026-04-02'),
    ...tilBase,
  },
];

async function seed() {
  const batch = db.batch();

  categories.forEach((c) => batch.set(db.collection('categories').doc(c.id), c));
  batch.set(db.collection('siteConfig').doc('default'), siteConfig);
  posts.forEach((p) => batch.set(db.collection('posts').doc(p.id), p));
  tils.forEach((t) => batch.set(db.collection('tils').doc(t.id), t));

  await batch.commit();

  console.log(
    `✅ 시드 완료 — categories ${categories.length} · siteConfig 1 · posts ${posts.length} · tils ${tils.length}`,
  );
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ 시드 실패:', err);
  process.exit(1);
});
