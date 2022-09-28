import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  meta: {
    views: { type: Number, required: true, default: 0 },
    thumbsup: { type: Number, required: true, default: 0 },
  },
});

const Post = mongoose.model("Post", postSchema);
export default Post;
