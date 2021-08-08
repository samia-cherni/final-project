import express from "express";
import cors from "cors";
import ConnectDB from "./config/ConnectDB.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import postRouter from "./routes/posts.js";
import commentRouter from "./routes/comments.js";
import morgan from 'morgan';
dotenv.config();
const app = express();
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("common"));
app.use(cors());
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", postRouter);
app.use("/api", commentRouter);
ConnectDB();
const PORT = process.env.PORT || 4444;
app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`server running on port:${PORT}`)
);