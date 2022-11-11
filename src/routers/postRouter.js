import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
  deletePost,
} from "../controllers/postController";
import { protectorMiddleware, uploadFiles } from "../middlewares";

const postRouter = express.Router();

postRouter
  .route("/upload")
  .all(protectorMiddleware)
  .get(getUpload)
  .post(uploadFiles.single("image"), postUpload);
postRouter.get("/:id([0-9a-f]{24})", watch);
postRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(uploadFiles.single("image"), postEdit);
postRouter
  .route("/:id([0-9a-f]{24})/delete")
  .all(protectorMiddleware)
  .get(deletePost);

export default postRouter;
