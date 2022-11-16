import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import postRouter from "./routers/postRouter";
import { localsMiddlewares } from "./middlewares";
import apiRouter from "./routers/apiRouter";

const app = express(); // express() 함수: express application 생성

const logger = morgan("dev");
app.use(logger);

/* pug Setting middlewares */
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

/* req.body 가져오기 위한 middleware */
app.use(express.urlencoded({ extended: true }));

/* session 처리 middleware */
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URL,
    }), // mongoDB에 session 저장
  })
);

app.use(localsMiddlewares);
app.use("/", globalRouter);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/api", apiRouter);

export default app;
