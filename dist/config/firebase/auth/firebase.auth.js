"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fireAuth = void 0;
const firebase_1 = __importDefault(require("../firebase"));
const auth_1 = require("firebase/auth");
exports.fireAuth = (0, auth_1.getAuth)(firebase_1.default);
