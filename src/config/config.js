import { config } from "dotenv";
config();
export default {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  TOKEN_ACCESS_KEY: process.env.TOKEN_ACCESS_KEY,
  TOKEN_ACCESS_TIME: process.env.TOKEN_ACCESS_TIME,
  TOKEN_REFRESH_KEY: process.env.TOKEN_REFRESH_KEY,
  TOKEN_REFRESH_TIME: process.env.TOKEN_REFRESH_TIME,
};
