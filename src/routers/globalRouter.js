import express from "express";
import {
  home,
  search,
  latest,
  mostview,
  mostlike,
} from "../controllers/postController";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
} from "../controllers/userController";
import { publicOnlyMiddleware } from "../middlewares";
const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter
  .route("/join")
  .all(publicOnlyMiddleware)
  .get(getJoin)
  .post(postJoin);
globalRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
globalRouter.get("/search", search);
globalRouter.get("/latest", latest);
globalRouter.get("/mostlike", mostlike);
globalRouter.get("/mostview", mostview);

export default globalRouter;
