import express from "express";
import { recentPosts, search } from "../controllers/postController";
import { join, login } from "../controllers/userController";
const globalRouter = express.Router();

globalRouter.get("/", recentPosts);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.get("/search", search);

export default globalRouter;
