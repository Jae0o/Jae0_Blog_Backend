/**
 * OpenAPI 3.0 문서 — 손수 작성한 정적 스펙.
 * 현재 구현된(라이브) 공개 read 엔드포인트 8개만 문서화한다. 진행 현황 가시화가 목적이므로,
 * 마일스톤에서 엔드포인트가 추가되면 이 파일을 함께 갱신한다.
 * 스키마는 각 `src/controllers/{domain}/{action}/{action}.controller.type.ts` DTO를 그대로 반영한다.
 */

/** `{ data }` 단일 응답 래퍼. */
const dataResponse = (ref: string) => ({
  description: 'OK',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        required: ['data'],
        properties: { data: { $ref: `#/components/schemas/${ref}` } },
      },
    },
  },
});

/** `{ data: T[] }` 배열 응답 래퍼 (페이지네이션 없음 — categories·tags). */
const dataArrayResponse = (ref: string) => ({
  description: 'OK',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        required: ['data'],
        properties: { data: { type: 'array', items: { $ref: `#/components/schemas/${ref}` } } },
      },
    },
  },
});

/** `{ data: T[], meta: { nextCursor, total? } }` 커서 페이지네이션 응답 래퍼. */
const listResponse = (ref: string) => ({
  description: 'OK',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        required: ['data', 'meta'],
        properties: {
          data: { type: 'array', items: { $ref: `#/components/schemas/${ref}` } },
          meta: { $ref: '#/components/schemas/ListMeta' },
        },
      },
    },
  },
});

/** 에러 응답 래퍼. */
const errorResponse = (description: string) => ({
  description,
  content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } },
});

/** 공통 커서 페이지네이션 쿼리 파라미터 (parsePageParams 기준). */
const paginationParams = [
  {
    name: 'pageSize',
    in: 'query',
    required: false,
    description: '페이지 크기 (기본 20, 최대 50)',
    schema: { type: 'integer', minimum: 1, maximum: 50, default: 20 },
  },
  {
    name: 'cursor',
    in: 'query',
    required: false,
    description: '다음 페이지 커서 (이전 응답의 meta.nextCursor 값, base64 불투명 토큰)',
    schema: { type: 'string' },
  },
];

const sortParam = {
  name: 'sort',
  in: 'query',
  required: false,
  description: '정렬 순서',
  schema: { type: 'string', enum: ['latest', 'oldest'], default: 'latest' },
};

/** nullable 문자열 단축. */
const nullableString = { type: 'string', nullable: true };

export const openapiDocument = {
  openapi: '3.0.3',
  info: {
    title: 'jae0.dev Blog API',
    version: '1.0.0',
    description:
      '개인 기술 블로그 jae0.dev 백엔드 공개 API.\n\n' +
      '현재 **구현된 M1 공개 read 엔드포인트(8개)** 만 문서화합니다 (진행 현황 스냅샷).\n' +
      '- 모든 응답은 `{ data, meta? }` 봉투를 사용합니다. 에러는 `{ error: { code, message } }`.\n' +
      '- 목록은 커서 기반 페이지네이션(`meta.nextCursor`, null = 마지막 페이지)을 씁니다.\n' +
      '- 비공개/draft/soft-deleted 항목은 공개 응답에서 제외됩니다.\n' +
      '- `/api` 전체에 IP당 100req/분 rate limit이 적용됩니다.',
  },
  servers: [{ url: '/api', description: '현재 오리진의 /api' }],
  tags: [
    { name: 'Health', description: '헬스체크' },
    { name: 'Posts', description: '블로그 게시물 (공개)' },
    { name: 'TILs', description: 'Today I Learned (공개)' },
    { name: 'Categories', description: '카테고리' },
    { name: 'Tags', description: '태그' },
    { name: 'SiteConfig', description: '사이트 설정 (공개 필드)' },
  ],
  paths: {
    '/health': {
      get: {
        tags: ['Health'],
        summary: '파이프라인 헬스체크',
        responses: { '200': dataResponse('HealthData') },
      },
    },
    '/posts': {
      get: {
        tags: ['Posts'],
        summary: '게시물 목록 (카드)',
        parameters: [
          {
            name: 'categorySlug',
            in: 'query',
            required: false,
            description: '카테고리 slug 필터',
            schema: { type: 'string' },
          },
          { name: 'tag', in: 'query', required: false, description: '태그 필터', schema: { type: 'string' } },
          sortParam,
          {
            name: 'includeTotal',
            in: 'query',
            required: false,
            description: 'true이면 meta.total(전체 개수) 포함',
            schema: { type: 'boolean', default: false },
          },
          ...paginationParams,
        ],
        responses: {
          '200': listResponse('PostListItem'),
          '400': errorResponse('VALIDATION_ERROR — 잘못된 쿼리 파라미터'),
        },
      },
    },
    '/posts/{slug}': {
      get: {
        tags: ['Posts'],
        summary: '게시물 상세',
        parameters: [
          {
            name: 'slug',
            in: 'path',
            required: true,
            description: '게시물 slug (문서 ID)',
            schema: { type: 'string' },
          },
        ],
        responses: {
          '200': dataResponse('PostDetail'),
          '404': errorResponse('NOT_FOUND — 없음/비공개/삭제됨'),
        },
      },
    },
    '/tils': {
      get: {
        tags: ['TILs'],
        summary: 'TIL 목록 (카드 그리드)',
        parameters: [
          {
            name: 'categoryId',
            in: 'query',
            required: false,
            description: '카테고리 ID 필터',
            schema: { type: 'string' },
          },
          { name: 'tag', in: 'query', required: false, description: '태그 필터', schema: { type: 'string' } },
          sortParam,
          ...paginationParams,
        ],
        responses: {
          '200': listResponse('TilListItem'),
          '400': errorResponse('VALIDATION_ERROR — 잘못된 쿼리 파라미터'),
        },
      },
    },
    '/tils/{tilId}': {
      get: {
        tags: ['TILs'],
        summary: 'TIL 상세',
        parameters: [
          { name: 'tilId', in: 'path', required: true, description: 'TIL 문서 ID', schema: { type: 'string' } },
        ],
        responses: {
          '200': dataResponse('TilDetail'),
          '404': errorResponse('NOT_FOUND — 없음/비공개/삭제됨'),
        },
      },
    },
    '/categories': {
      get: {
        tags: ['Categories'],
        summary: '카테고리 목록',
        responses: { '200': dataArrayResponse('CategoryListItem') },
      },
    },
    '/tags': {
      get: {
        tags: ['Tags'],
        summary: '인기 태그 목록 (태그 클라우드)',
        parameters: [
          {
            name: 'limit',
            in: 'query',
            required: false,
            description: '반환 개수 (기본 7)',
            schema: { type: 'integer', minimum: 1, default: 7 },
          },
          {
            name: 'sortBy',
            in: 'query',
            required: false,
            description: '정렬 기준',
            schema: { type: 'string', enum: ['postCount', 'recent', 'name'], default: 'postCount' },
          },
        ],
        responses: {
          '200': dataArrayResponse('TagListItem'),
          '400': errorResponse('VALIDATION_ERROR — 잘못된 쿼리 파라미터'),
        },
      },
    },
    '/site-config': {
      get: {
        tags: ['SiteConfig'],
        summary: '공개 사이트 설정',
        responses: { '200': dataResponse('PublicSiteConfig') },
      },
    },
  },
  components: {
    schemas: {
      ListMeta: {
        type: 'object',
        required: ['nextCursor'],
        properties: {
          nextCursor: { type: 'string', nullable: true, description: 'null = 마지막 페이지' },
          total: { type: 'integer', description: '?includeTotal=true일 때만' },
        },
      },
      ApiError: {
        type: 'object',
        required: ['error'],
        properties: {
          error: {
            type: 'object',
            required: ['code', 'message'],
            properties: {
              code: {
                type: 'string',
                enum: [
                  'VALIDATION_ERROR',
                  'MALFORMED_BODY',
                  'UNAUTHORIZED',
                  'INVALID_TOKEN',
                  'TOKEN_EXPIRED',
                  'FORBIDDEN',
                  'NOT_FOUND',
                  'RESOURCE_DELETED',
                  'CONFLICT',
                  'RULE_VIOLATION',
                  'RATE_LIMITED',
                  'INTERNAL_ERROR',
                  'FIRESTORE_ERROR',
                  'STORAGE_ERROR',
                ],
              },
              message: { type: 'string' },
              details: {},
            },
          },
        },
      },
      HealthData: {
        type: 'object',
        required: ['status', 'ts'],
        properties: {
          status: { type: 'string', enum: ['ok'] },
          ts: { type: 'string', format: 'date-time' },
        },
      },
      PostListItem: {
        type: 'object',
        required: [
          'id',
          'slug',
          'title',
          'excerpt',
          'coverImage',
          'categoryName',
          'tagNames',
          'publishedAt',
          'updatedAt',
          'readingTime',
          'viewCount',
          'isPinned',
        ],
        properties: {
          id: { type: 'string' },
          slug: { type: 'string' },
          title: { type: 'string' },
          excerpt: { type: 'string' },
          coverImage: nullableString,
          categoryName: nullableString,
          tagNames: { type: 'array', items: { type: 'string' } },
          publishedAt: { type: 'string', format: 'date-time', nullable: true },
          updatedAt: { type: 'string', format: 'date-time' },
          readingTime: { type: 'integer' },
          viewCount: { type: 'integer' },
          isPinned: { type: 'boolean' },
        },
      },
      PostDetail: {
        type: 'object',
        required: [
          'id',
          'slug',
          'language',
          'title',
          'body',
          'excerpt',
          'coverImage',
          'categoryId',
          'categoryName',
          'tagNames',
          'status',
          'metaTitle',
          'metaDescription',
          'ogImage',
          'canonicalUrl',
          'isPinned',
          'readingTime',
          'wordCount',
          'publishedAt',
          'createdAt',
          'updatedAt',
          'viewCount',
        ],
        properties: {
          id: { type: 'string' },
          slug: { type: 'string' },
          language: { type: 'string' },
          title: { type: 'string' },
          body: { type: 'object', additionalProperties: true, description: 'Tiptap JSON 문서' },
          excerpt: { type: 'string' },
          coverImage: nullableString,
          categoryId: nullableString,
          categoryName: nullableString,
          tagNames: { type: 'array', items: { type: 'string' } },
          status: { type: 'string', enum: ['public', 'private', 'draft'] },
          metaTitle: nullableString,
          metaDescription: nullableString,
          ogImage: nullableString,
          canonicalUrl: nullableString,
          isPinned: { type: 'boolean' },
          readingTime: { type: 'integer' },
          wordCount: { type: 'integer' },
          publishedAt: { type: 'string', format: 'date-time', nullable: true },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
          viewCount: { type: 'integer' },
        },
      },
      TilListItem: {
        type: 'object',
        required: [
          'id',
          'body',
          'bodyPreview',
          'categoryId',
          'categoryName',
          'tagNames',
          'code',
          'codeLanguage',
          'imageUrl',
          'isPinned',
          'viewCount',
          'createdAt',
        ],
        properties: {
          id: { type: 'string' },
          body: { type: 'object', additionalProperties: true, description: 'Tiptap JSON 문서' },
          bodyPreview: { type: 'string' },
          categoryId: { type: 'string' },
          categoryName: { type: 'string' },
          tagNames: { type: 'array', items: { type: 'string' } },
          code: nullableString,
          codeLanguage: nullableString,
          imageUrl: nullableString,
          isPinned: { type: 'boolean' },
          viewCount: { type: 'integer' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      TilDetail: {
        type: 'object',
        required: [
          'id',
          'language',
          'title',
          'body',
          'code',
          'codeLanguage',
          'imageUrl',
          'categoryId',
          'categoryName',
          'tagNames',
          'visibility',
          'isPinned',
          'viewCount',
          'createdAt',
          'updatedAt',
        ],
        properties: {
          id: { type: 'string' },
          language: { type: 'string' },
          title: nullableString,
          body: { type: 'object', additionalProperties: true, description: 'Tiptap JSON 문서' },
          code: nullableString,
          codeLanguage: nullableString,
          imageUrl: nullableString,
          categoryId: { type: 'string' },
          categoryName: { type: 'string' },
          tagNames: { type: 'array', items: { type: 'string' } },
          visibility: { type: 'string', enum: ['public', 'private'] },
          isPinned: { type: 'boolean' },
          viewCount: { type: 'integer' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      CategoryListItem: {
        type: 'object',
        required: ['id', 'name', 'slug', 'description', 'coverImage', 'hue', 'order', 'postCount', 'tilCount'],
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          slug: { type: 'string' },
          description: nullableString,
          coverImage: nullableString,
          hue: { type: 'number' },
          order: { type: 'integer' },
          postCount: { type: 'integer' },
          tilCount: { type: 'integer' },
        },
      },
      TagListItem: {
        type: 'object',
        required: ['id', 'displayName', 'nameLower', 'postCount', 'tilCount'],
        properties: {
          id: { type: 'string' },
          displayName: { type: 'string' },
          nameLower: { type: 'string' },
          postCount: { type: 'integer' },
          tilCount: { type: 'integer' },
        },
      },
      PublicSiteConfig: {
        type: 'object',
        required: [
          'siteName',
          'siteDescription',
          'socialLinks',
          'authorBio',
          'authorAvatar',
          'footerText',
          'footerLinks',
          'defaultOgImage',
        ],
        properties: {
          siteName: { type: 'string' },
          siteDescription: { type: 'string' },
          socialLinks: {
            type: 'object',
            required: ['github', 'instagram', 'twitter', 'mail', 'rss'],
            properties: {
              github: nullableString,
              instagram: nullableString,
              twitter: nullableString,
              mail: nullableString,
              rss: nullableString,
            },
          },
          authorBio: nullableString,
          authorAvatar: nullableString,
          footerText: nullableString,
          footerLinks: {
            type: 'array',
            items: {
              type: 'object',
              required: ['label', 'url'],
              properties: { label: { type: 'string' }, url: { type: 'string' } },
            },
          },
          defaultOgImage: nullableString,
        },
      },
    },
  },
};
