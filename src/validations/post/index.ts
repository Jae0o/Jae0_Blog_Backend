import getAllPostsValidation from "./getAllPosts/getAllPosts.validation";
import getPostValidation from "./getPost/getPost.validation";
import getPostListValidation from "./getPostList/getPostList.validation";

const PostValidation = {
  getPost: getPostValidation,
  getPostList: getPostListValidation,
  getAllPosts: getAllPostsValidation,
};

export default PostValidation;
