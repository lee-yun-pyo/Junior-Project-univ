import express from "express";
import { recentPosts } from "../controllers/postController";
import { join } from "../controllers/userController";
const globalRouter = express.Router();

globalRouter.get("/", recentPosts);
globalRouter.get("/join", join);

export default globalRouter;
