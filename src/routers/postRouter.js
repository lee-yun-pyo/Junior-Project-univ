import express from "express";
import { see, edit, upload, deletePost } from "../controllers/postController";

const postRouter = express.Router();

postRouter.get("/upload", upload);
postRouter.get("/:id", see);
postRouter.get("/:id/edit", edit);
postRouter.get("/:id/delete", deletePost);

export default postRouter;
