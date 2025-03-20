"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _config_1 = require("../../../config/index.js");
const firestore_1 = require("firebase/firestore");
const getAllPosts = async ({ cursor }) => {
    let queryRef;
    if (cursor) {
        queryRef = (0, firestore_1.query)((0, firestore_1.collection)(_config_1.fireStore, "posts"), (0, firestore_1.orderBy)("createAt", "desc"), (0, firestore_1.startAfter)(cursor), (0, firestore_1.limit)(4));
    }
    else {
        queryRef = (0, firestore_1.query)((0, firestore_1.collection)(_config_1.fireStore, "posts"), (0, firestore_1.orderBy)("createAt", "desc"), (0, firestore_1.limit)(4));
    }
    const res = await (0, firestore_1.getDocs)(queryRef).catch(() => {
        throw Error("Failed to fetch posts list all");
    });
    const result = [];
    res.forEach(doc => {
        if (doc.exists()) {
            result.push(doc.data());
        }
    });
    return result;
};
exports.default = getAllPosts;
