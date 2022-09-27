import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/MyProject");

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const hanldeError = (error) => console.log("❌ DB error", error);

db.on("error", hanldeError);
db.once("open", handleOpen);
