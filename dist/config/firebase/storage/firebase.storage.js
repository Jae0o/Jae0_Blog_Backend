"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fireStorage = void 0;
const storage_1 = require("@firebase/storage");
const firebase_1 = __importDefault(require("../firebase"));
exports.fireStorage = (0, storage_1.getStorage)(firebase_1.default);
