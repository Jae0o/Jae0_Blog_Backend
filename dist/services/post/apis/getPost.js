"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _config_1 = require("../../../config/index.js");
const firestore_1 = require("firebase/firestore");
const getPost = async ({ postId }) => {
    const queryRef = (0, firestore_1.doc)(_config_1.fireStore, "posts", postId);
    const res = await (0, firestore_1.getDoc)(queryRef);
    if (!res.exists()) {
        throw new Error("get post Error");
    }
    return res.data();
};
exports.default = getPost;
