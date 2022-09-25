import express from "express";
import { watch, edit } from "../controllers/postController";

const postRouter = express.Router();

postRouter.get("/watch", watch);
postRouter.get("/edit", edit);

export default postRouter;
