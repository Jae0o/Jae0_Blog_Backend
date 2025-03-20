"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _config_1 = require("../../../config/index.js");
const firestore_1 = require("firebase/firestore");
const getOptions = async ({ type }) => {
    const queryRef = (0, firestore_1.doc)(_config_1.fireStore, "options", type);
    const res = await (0, firestore_1.getDoc)(queryRef);
    if (res.exists()) {
        return res.data().list;
    }
    throw new Error(`get ${type} options failed`);
};
exports.default = getOptions;
