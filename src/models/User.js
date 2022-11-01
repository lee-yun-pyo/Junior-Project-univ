import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true, unique: true },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

const User = mongoose.model("User", userSchema);
export default User;
