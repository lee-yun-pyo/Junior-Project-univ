import Post from "../models/Post";

export const home = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.render("home", { pageTitle: "home", posts });
  } catch {
    res.render("server-error");
  }
};

export const watch = (req, res) => {
  const { id } = req.params;
  res.render("watch", { pageTitle: `Watch` });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  res.render("edit", { pageTitle: `Edit` });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  res.redirect(`/posts/${id}`);
};
export const search = (req, res) => res.send("Posts Search");
export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload Post" });
};

export const postUpload = async (req, res) => {
  const { title, description } = req.body;
  await Post.create({
    title,
    description,
    createdAt: Date.now(),
    meta: {
      views: 0,
      thumbsup: 0,
    },
  });
  res.redirect("/");
};

export const deletePost = (req, res) => res.send("Delete Post");
