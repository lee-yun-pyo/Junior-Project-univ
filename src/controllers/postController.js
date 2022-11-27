import Post from "../models/Post";
import User from "../models/User";
import Comment from "../models/Comment";

export const home = async (req, res) => {
  try {
    const recentPosts = await Post.find({}).sort({ createdAt: "desc" });
    const thumbsupPosts = await Post.find({}).sort({ thumbsup: "desc" });
    const viewsPosts = await Post.find({}).sort({ views: "desc" });
    res.render("home", {
      pageTitle: "Do you know",
      recentPosts,
      thumbsupPosts,
      viewsPosts,
    });
  } catch {
    res.render("server-error");
  }
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate("owner").populate("comments");
  const date = String(post.createdAt).split(" ").slice(1, 4);
  const monthObj = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };
  const month = monthObj[date[0]];
  const compactDate = date[2] + "." + month + "." + date[1] + ".";
  if (!post) {
    res.status(404).render("404", { pageTitle: "" });
  }
  res.render("watch", { pageTitle: "Do you know", post, compactDate });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const post = await Post.findById(id);
  if (!post) {
    res.status(404).render("404", { pageTitle: "" });
  }
  // if (String(post.owner) !== String(_id)) {
  //   return res.status(403).redirect("/");
  // }
  res.render("edit", { pageTitle: "게시글 수정", post });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const {
    body: { title, description },
    file,
  } = req;
  const post = await Post.findById(id);
  if (!post) {
    res.status(404).render("404", { pageTitle: "" });
  }
  // if (String(post.owner) !== String(_id)) {
  //   return res.status(403).redirect("/");
  // }
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
  res.render("search", { pageTitle: "Do you know", posts });
};

export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "글 올리기" });
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
    const newPost = await Post.create({
      imageUrl: file.path,
      title,
      description,
      owner: _id,
    });
    const user = await User.findById(_id);
    user.posts.push(newPost._id);
    user.save();
    res.redirect("/");
  } catch (error) {
    res.render("upload", {
      pageTitle: "글 올리기",
      errorMessage: error._message,
    });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const post = await Post.findById(id);
  const user = await User.findById(_id);
  if (!post) {
    res.status(404).render("404", { pageTitle: "" });
  }
  if (String(post.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Post.findByIdAndDelete(id);
  user.posts.splice(user.posts.indexOf(id), 1);
  user.save();
  res.redirect("/");
};

export const registerView = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    params: { id },
  } = req;
  const post = await Post.findById(id);
  const user = await User.findById(_id);
  if (!post) {
    return res.sendStatus(404);
  }
  user.likePosts.push(post._id); // User data 수정
  post.thumbsup = post.thumbsup + 1; // Post data 수정
  req.session.user.likePosts.push(post._id); // session data 수정
  await post.save();
  await user.save();
  return res.sendStatus(200);
};

export const unRegisterView = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    params: { id },
  } = req;
  const user = await User.findById(_id);
  const post = await Post.findById(id);
  if (!post) {
    return res.sendStatus(404);
  }
  user.likePosts.splice(user.likePosts.indexOf(id), 1); // User data 수정
  post.thumbsup = post.thumbsup - 1; // Post data 수정
  req.session.user.likePosts.splice(
    req.session.user.likePosts.indexOf(post._id), // session data 수정
    1
  );
  await post.save();
  await user.save();
  return res.sendStatus(200);
};

export const viewsRegister = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) {
    return res.sendStatus(404);
  }
  post.views = post.views + 1;
  await post.save();
  return res.sendStatus(200);
};

export const createComment = async (req, res) => {
  const {
    body: { text },
    session: { user },
    params: { id },
  } = req;
  const commentUser = await User.findById(user._id);
  const post = await Post.findById(id);
  if (!post) {
    return res.sendStatus(404);
  }
  const comment = await Comment.create({
    text,
    owner: user._id,
    post: id,
  });
  post.comments.push(comment._id);
  post.save();
  commentUser.comments.push(comment._id);
  commentUser.save();
  return res.status(201).json({ newCommentId: comment._id }); // 201: Created
};

export const deleteComment = async (req, res) => {
  const {
    body: { commentid },
    session: { user },
    params: { id },
  } = req;
  const post = await Post.findById(id);
  if (!post) {
    return res.sendStatus(404);
  }
  const commentUser = await User.findById(user._id);
  const comment = await Comment.findById(commentid);
  if (String(user._id) !== String(comment.owner)) {
    return res.sendStatus(403);
  }
  await Comment.findByIdAndDelete(commentid);
  post.comments.splice(post.comments.indexOf(commentid), 1);
  post.save();
  commentUser.comments.splice(commentUser.comments.indexOf(commentid), 1);
  commentUser.save();
  return res.sendStatus(200);
};

export const updateComment = async (req, res) => {
  const {
    body: { text, commentid },
    session: { user },
  } = req;
  const comment = await Comment.findById(commentid);
  if (String(user._id) !== String(comment.owner)) {
    return res.sendStatus(403);
  }
  await Comment.findByIdAndUpdate(commentid, {
    text,
  });
  return res.sendStatus(200);
};
