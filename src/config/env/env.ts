import { config } from "dotenv";

config();

export const { PORT, DEV_LOG } = process.env;
