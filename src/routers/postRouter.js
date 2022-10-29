import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
  deletePost,
} from "../controllers/postController";
import { protectorMiddleware } from "../middlewares";

const postRouter = express.Router();

postRouter
  .route("/upload")
  .all(protectorMiddleware)
  .get(getUpload)
  .post(postUpload);
postRouter.get("/:id([0-9a-f]{24})", watch);
postRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(postEdit);
postRouter
  .route("/:id([0-9a-f]{24})/delete")
  .all(protectorMiddleware)
  .get(deletePost);

export default postRouter;
