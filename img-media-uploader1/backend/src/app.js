import express from "express";
import { router as postRouter } from "./routes/post.route.js";
import cors from "cors";

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use('/posts', postRouter);

export { app }