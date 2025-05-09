import getAllPostsController from "./getAllPosts/getAllPosts.controller";
import getPostController from "./getPost/getPost.controller";
import getPostListController from "./getPostList/getPostList.controller";

const PostController = {
  getAllPosts: getAllPostsController,
  getPostList: getPostListController,
  getPost: getPostController,
};

export default PostController;
