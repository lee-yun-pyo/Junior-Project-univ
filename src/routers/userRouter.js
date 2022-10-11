import express from "express";
import { edit, logout, see } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/edit", edit);
userRouter.get("/logout", logout);
userRouter.get("/:id(\\d+)", see);

export default userRouter;
