"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogErrorStatus = void 0;
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
var BlogErrorStatus;
(function (BlogErrorStatus) {
    // GetPost
    BlogErrorStatus[BlogErrorStatus["GET_POST_NO_POST_ID"] = 201001] = "GET_POST_NO_POST_ID";
    // GetPostList
    BlogErrorStatus[BlogErrorStatus["GET_POST_LIST_NO_CATEGORY"] = 202001] = "GET_POST_LIST_NO_CATEGORY";
    // GetAllPosts
    BlogErrorStatus[BlogErrorStatus["GET_ALL_POSTS_NO_CURSOR"] = 203001] = "GET_ALL_POSTS_NO_CURSOR";
    // GetOptions
    BlogErrorStatus[BlogErrorStatus["GET_OPTIONS_NO_TYPE"] = 501001] = "GET_OPTIONS_NO_TYPE";
    BlogErrorStatus[BlogErrorStatus["GET_OPTIONS_TYPE_NOT_INVALID"] = 501002] = "GET_OPTIONS_TYPE_NOT_INVALID";
})(BlogErrorStatus || (exports.BlogErrorStatus = BlogErrorStatus = {}));
