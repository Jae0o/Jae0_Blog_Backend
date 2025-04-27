"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostList = void 0;
const _config_1 = require("../../../config/index.js");
const firestore_1 = require("firebase/firestore");
const getPostList = async ({ category }) => {
    const queryRef = (0, firestore_1.query)((0, firestore_1.collection)(_config_1.fireStore, "posts"), (0, firestore_1.where)("category", "==", category));
    const res = await (0, firestore_1.getDocs)(queryRef);
    const result = [];
    res.forEach(doc => {
        if (!doc.exists()) {
            return;
        }
        result.push(doc.data());
    });
    return result;
};
exports.getPostList = getPostList;
