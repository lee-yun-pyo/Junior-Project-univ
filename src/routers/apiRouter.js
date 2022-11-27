import express from "express";
import {
  registerView,
  unRegisterView,
  viewsRegister,
  createComment,
  deleteComment,
} from "../controllers/postController";

const apiRouter = express.Router();

apiRouter.post("/posts/:id([0-9a-f]{24})/like", registerView);
apiRouter.post("/posts/:id([0-9a-f]{24})/unlike", unRegisterView);
apiRouter.post("/posts/:id([0-9a-f]{24})/views", viewsRegister);
apiRouter.post("/posts/:id([0-9a-f]{24})/comment", createComment);
apiRouter.delete("/comment/:id([0-9a-f]{24})/delete", deleteComment);

export default apiRouter;
