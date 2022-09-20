import express from "express";

const PORT = 4000;

const app = express(); // express() 함수: express application 생성

// request를 listening해야

const handleHome = (req, res) => {
  return res.end(); // request를 받으면 응답을 해줘야함
};

const handleLogin = (req, res) => {
  return res.send("Login start");
};

app.get("/", handleHome); // app한테 "/" 경로로 get request를 보낸다면 callback 함수 실행
app.get("/login", handleLogin);

const handleListening = () => {
  console.log(`server http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
