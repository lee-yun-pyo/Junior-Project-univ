import Post from "../models/Post";
import User from "../models/User";

export const home = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: "desc" });
    res.render("home", { pageTitle: "home", posts });
  } catch {
    res.render("server-error");
  }
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate("owner");
  if (!post) {
    res.status(404).render("404", { pageTitle: "Not Found" });
  }
  res.render("watch", { pageTitle: post.title, post });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) {
    res.status(404).render("404", { pageTitle: "Not Found" });
  }
  res.render("edit", { pageTitle: `Edit`, post });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const {
    body: { title, description },
    file,
  } = req;
  const post = await Post.findById(id);
  if (!post) {
    res.status(404).render("404", { pageTitle: "Not Found" });
  }
  await Post.findByIdAndUpdate(id, {
    imageUrl: file ? file.path : post.imageUrl,
    title,
    description,
  });
  res.redirect(`/posts/${id}`);
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let posts = [];
  if (keyword) {
    posts = await Post.find({
      title: {
        $regex: new RegExp(keyword, "i"),
      },
    });
  }
  res.render("search", { pageTitle: "Search Post", posts });
};

export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload Post" });
};

export const postUpload = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { title, description },
    file,
  } = req;
  try {
    await Post.create({
      imageUrl: file.path,
      title,
      description,
      owner: _id,
    });
    res.redirect("/");
  } catch (error) {
    res.render("upload", {
      pageTitle: "Upload Post",
      errorMessage: error._message,
    });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  await Post.findByIdAndDelete(id);
  res.redirect("/");
};
