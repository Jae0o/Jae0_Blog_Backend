import type { Post } from 'interfaces';

import type { PostListItem } from './getPostList.controller.type';

/** Post 엔티티 → 목록 응답 DTO. timestamp는 ISO 문자열로, 본문 필드는 제외. */
export function toPostListItem(post: Post): PostListItem {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
    categoryName: post.categoryName,
    tagNames: post.tagNames,
    publishedAt: post.publishedAt ? post.publishedAt.toDate().toISOString() : null,
    updatedAt: post.updatedAt.toDate().toISOString(),
    readingTime: post.readingTime,
    viewCount: post.viewCount,
    isPinned: post.isPinned,
  };
}
