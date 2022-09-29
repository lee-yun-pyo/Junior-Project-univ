import Post from "../models/Post";

export const home = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.render("home", { pageTitle: "home", posts });
  } catch {
    res.render("server-error");
  }
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) {
    res.render("404", { pageTitle: "Not Found" });
  }
  res.render("watch", { pageTitle: post.title, post });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) {
    res.render("404", { pageTitle: "Not Found" });
  }
  res.render("edit", { pageTitle: `Edit`, post });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const post = await Post.exists({ _id: id });
  if (!post) {
    res.render("404", { pageTitle: "Not Found" });
  }
  await Post.findByIdAndUpdate(id, {
    title,
    description,
  });
  res.redirect(`/posts/${id}`);
};
export const search = (req, res) => res.send("Posts Search");
export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload Post" });
};

export const postUpload = async (req, res) => {
  const { title, description } = req.body;
  try {
    await Post.create({
      title,
      description,
    });
    res.redirect("/");
  } catch (error) {
    res.render("upload", {
      pageTitle: "Upload Post",
      errorMessage: error._message,
    });
  }
};

export const deletePost = (req, res) => res.send("Delete Post");
