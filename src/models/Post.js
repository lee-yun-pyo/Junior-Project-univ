import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  title: { type: String, required: true, trim: true, maxLength: 50 },
  description: { type: String, required: true, trim: true },
  createdAt: { type: Date, required: true, default: Date.now },
  meta: {
    views: { type: Number, required: true, default: 0 },
    thumbsup: { type: Number, required: true, default: 0 },
  },
  // 사진, 일일조회수, 작성자 아이디
});

const Post = mongoose.model("Post", postSchema);
export default Post;
