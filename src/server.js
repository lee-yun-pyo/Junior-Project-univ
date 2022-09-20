import express from "express";

const PORT = 4000;

const app = express(); // express() 함수: express application 생성

// request를 listening해야

const handleListening = () => {
  console.log(`server http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
