/**
 * @description Error Rules
 *
 * @enum 10XXXX : Common Error
 * @enum 20XXXX : Post Error
 *
 *
 */
export enum BlogErrorStatus {
  // GET POST
  GET_POST_NO_POST_ID = 203001,
}

export interface BlogError {
  code: BlogErrorStatus;
}
