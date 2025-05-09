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
 * @enum 50XXXX : Option Error
 * * @enum 5010XX : GetOptions Error
 */
export enum BlogErrorStatus {
  // GetPost
  GET_POST_NO_POST_ID = 201001,

  // GetPostList
  GET_POST_LIST_NO_CATEGORY = 202001,
  GET_POST_LIST_CATEGORY_NOT_INVALID = 202002,

  // GetAllPosts
  GET_ALL_POSTS_NO_CURSOR = 203001,

  // GetOptions
  GET_OPTIONS_NO_TYPE = 501001,
  GET_OPTIONS_TYPE_NOT_INVALID = 501002,
}

export interface BlogError {
  code: BlogErrorStatus;
}
