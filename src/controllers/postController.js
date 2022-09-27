let videos = [
  {
    name: "OXFORD",
    rating: 4,
    views: 12,
    createdAt: "2 m ago",
    id: 1,
  },
  {
    name: "HARVARD",
    rating: 3,
    views: 12,
    createdAt: "2 h ago",
    id: 2,
  },
  {
    name: "MSU",
    rating: 5,
    views: 55,
    createdAt: "1 m ago",
    id: 3,
  },
];
export const home = (req, res) => {
  res.render("home", { pageTitle: "home", videos });
};
export const watch = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  res.render("watch", { pageTitle: `Watch ${video.name}`, video });
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  res.render("edit", { pageTitle: `Edit: ${video.name}`, video });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  videos[id - 1].name = title;
  res.redirect(`/posts/${id}`);
};
export const search = (req, res) => res.send("Posts Search");
export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload Post" });
};

export const postUpload = (req, res) => {
  const { title } = req.body;
  const video = {
    name: title,
    rating: 0,
    views: 0,
    createdAt: "just now",
    id: 4,
  };
  videos.push(video);
  res.redirect("/");
};

export const deletePost = (req, res) => res.send("Delete Post");
