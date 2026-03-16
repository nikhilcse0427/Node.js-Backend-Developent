import express from "express";
import { router as postRouter } from "./routes/post.route.js";

const app = express();


app.use(express.json());

app.use('/posts', postRouter);

export { app }