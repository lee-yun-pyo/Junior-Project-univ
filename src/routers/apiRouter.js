import express from "express";
import { registerView, unRegisterView } from "../controllers/postController";

const apiRouter = express.Router();

apiRouter.post("/posts/:id([0-9a-f]{24})/like", registerView);
apiRouter.post("/posts/:id([0-9a-f]{24})/unlike", unRegisterView);

export default apiRouter;
