import { config } from "dotenv";

config();

export const {
  PORT,
  DEV_LOG,

  // Firebase
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_DATABASE_URL,
  FIREBASE_ADMIN_USER_ID,
} = process.env;
