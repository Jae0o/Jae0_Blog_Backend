import type { Post } from 'interfaces';

import type { PostDetail } from './getPost.controller.type';

/** Post 엔티티 → 상세 응답 DTO. body는 포함, 내부/검색 필드는 제외, timestamp는 ISO 문자열로. */
export function toPostDetail(post: Post): PostDetail {
  return {
    id: post.id,
    slug: post.slug,
    language: post.language,
    title: post.title,
    body: post.body,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
    categoryId: post.categoryId,
    categoryName: post.categoryName,
    tagNames: post.tagNames,
    status: post.status,
    metaTitle: post.metaTitle,
    metaDescription: post.metaDescription,
    ogImage: post.ogImage,
    canonicalUrl: post.canonicalUrl,
    isPinned: post.isPinned,
    readingTime: post.readingTime,
    wordCount: post.wordCount,
    publishedAt: post.publishedAt ? post.publishedAt.toDate().toISOString() : null,
    createdAt: post.createdAt.toDate().toISOString(),
    updatedAt: post.updatedAt.toDate().toISOString(),
    viewCount: post.viewCount,
  };
}
