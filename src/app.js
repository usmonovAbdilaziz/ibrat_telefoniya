import cors from 'cors'
import express from "express";
import config from "./config/config.js";
import cookieParser from "cookie-parser";
import userRouter from './routes/user.router.js'
import leadRouter from './routes/lead.router.js'
import callRouter from './routes/call.router.js'
import authRouter from './routes/signin.router.js'
import cilentRouter from './routes/cilent.router.js'
import { connectDB } from "./db/db.mongo.connect.js";


const PORT = Number(config.PORT)
const app = express();

app.use(express.json());

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log("Server running on port", PORT));
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });
app.use(cors())
app.use(cookieParser())
app.use('/api/v1/user',userRouter)
app.use('/api/v1/auth',authRouter)
app.use("/api/v1/call", callRouter);
app.use("/api/v1/lead", leadRouter);
app.use("/api/v1/cilent", cilentRouter);
