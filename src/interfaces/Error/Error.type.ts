/**
 * @description Error Rules
 *
 * @enum 10XXXX : Common Error
 *
 * @enum 20XXXX : Post Error
 * * @enum 2010XX : GetPost Error
 * * @enum 2020XXXX : GetPostList Error
 * * @enum 2030XXXX : GetAllPosts Error
 *
 */
export enum BlogErrorStatus {
  // GetPost
  GET_POST_NO_POST_ID = 201001,

  // GetPostList
  GET_POST_LIST_NO_CATEGORY = 202001,

  // GetAllPosts
  GET_ALL_POSTS_NO_CURSOR = 203001,
}

export interface BlogError {
  code: BlogErrorStatus;
}
