import express from "express";
import {
  addThumbsup,
  cancleThumbsup,
  viewsRegister,
  createComment,
  deleteComment,
  updateComment,
} from "../controllers/postController";

const apiRouter = express.Router();

apiRouter.post("/posts/:id([0-9a-f]{24})/like", addThumbsup);
apiRouter.post("/posts/:id([0-9a-f]{24})/unlike", cancleThumbsup);
apiRouter.post("/posts/:id([0-9a-f]{24})/views", viewsRegister);
apiRouter.post("/posts/:id([0-9a-f]{24})/comment", createComment);
apiRouter.post("/comment/:id([0-9a-f]{24})/update", updateComment);
apiRouter.delete("/comment/:id([0-9a-f]{24})/delete", deleteComment);

export default apiRouter;
