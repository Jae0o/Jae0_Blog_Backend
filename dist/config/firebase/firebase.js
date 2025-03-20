"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("../env/env");
const app_1 = require("firebase/app");
const firebaseConfig = {
    apiKey: env_1.FIREBASE_API_KEY,
    authDomain: env_1.FIREBASE_AUTH_DOMAIN,
    projectId: env_1.FIREBASE_PROJECT_ID,
    storageBucket: env_1.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env_1.FIREBASE_MESSAGING_SENDER_ID,
    appId: env_1.FIREBASE_APP_ID,
    measurementId: env_1.FIREBASE_MEASUREMENT_ID,
    databaseURL: env_1.FIREBASE_DATABASE_URL,
};
const firebaseApp = (0, app_1.initializeApp)(firebaseConfig);
exports.default = firebaseApp;
