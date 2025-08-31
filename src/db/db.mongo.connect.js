import { connect } from "mongoose";
import config from "../config/config.js";

export const connectDB = async () => {
  try {
    await connect(
      String(
        config.MONGO_URI
      )
    ).then(() => console.log("Database connected!"));
  } catch (error) {
    console.log("DB connected error: ", error);
  }
};
