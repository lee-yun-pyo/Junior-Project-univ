import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
  deletePost,
} from "../controllers/postController";

const postRouter = express.Router();

postRouter.route("/upload").get(getUpload).post(postUpload);
postRouter.get("/:id", watch);
postRouter.route("/:id/edit").get(getEdit).post(postEdit);
postRouter.get("/:id/delete", deletePost);

export default postRouter;
