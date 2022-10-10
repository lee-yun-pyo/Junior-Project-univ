import "dotenv/config";
import "./db";
import "./models/Post";
import "./models/User";
import app from "./server";

const PORT = 4000;

const handleListening = () => {
  console.log(`server http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
