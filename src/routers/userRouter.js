import express from "express";
import { remove, edit, logout, see } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/edit", edit);
userRouter.get("/delete", remove);
userRouter.get("/logout", logout);
userRouter.get("/:id(\\d+)", see);

export default userRouter;
