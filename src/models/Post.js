import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: Date,
  meta: {
    views: Number,
    thumbsup: Number,
  },
});

const Post = mongoose.model("Post", postSchema);
export default Post;
