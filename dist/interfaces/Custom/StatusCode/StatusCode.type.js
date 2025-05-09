"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogStatusCode = void 0;
var BlogStatusCode;
(function (BlogStatusCode) {
    BlogStatusCode[BlogStatusCode["SUCCESS"] = 200] = "SUCCESS";
    BlogStatusCode[BlogStatusCode["CREATED"] = 201] = "CREATED";
    BlogStatusCode[BlogStatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    BlogStatusCode[BlogStatusCode["NOT_FULFILLED"] = 401] = "NOT_FULFILLED";
    BlogStatusCode[BlogStatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    BlogStatusCode[BlogStatusCode["SERVER_ERROR"] = 500] = "SERVER_ERROR";
})(BlogStatusCode || (exports.BlogStatusCode = BlogStatusCode = {}));
