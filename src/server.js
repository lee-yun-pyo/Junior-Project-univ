import "./db";
import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import postRouter from "./routers/postRouter";

const PORT = 4000;
const app = express(); // express() 함수: express application 생성

const logger = morgan("dev");
app.use(logger);

/* pug Setting */
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

/* req.body 가져오기 위한 middleware */
app.use(express.urlencoded({ extended: true }));

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);

const handleListening = () => {
  console.log(`server http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
