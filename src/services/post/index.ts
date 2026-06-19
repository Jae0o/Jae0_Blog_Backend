import { getPost } from './getPost';
import { countPostList, getPostList } from './getPostList';

/** post 도메인 서비스 (비즈니스 로직). */
export const PostService = { getPostList, countPostList, getPost };
