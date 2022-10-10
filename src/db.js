import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const hanldeError = (error) => console.log("❌ DB error", error);

db.on("error", hanldeError);
db.once("open", handleOpen);
