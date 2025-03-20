"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fireStore = void 0;
const firebase_1 = __importDefault(require("../firebase"));
const firestore_1 = require("firebase/firestore");
exports.fireStore = (0, firestore_1.getFirestore)(firebase_1.default);
