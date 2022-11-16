import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true, unique: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  likePosts: [{ type: mongoose.Schema.Types.ObjectId }],
});

userSchema.pre("save", async function () {
  // post 업로드 시 발생하는 오류 고침
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const User = mongoose.model("User", userSchema);
export default User;
