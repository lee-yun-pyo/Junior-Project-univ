export const home = (req, res) => res.render("home", { pageTitle: "home" });
export const see = (req, res) => res.render("watch", { pageTitle: "See" });
export const edit = (req, res) => res.send("edit post");
export const search = (req, res) => res.send("Posts Search");
export const upload = (req, res) => res.send("Upload Post");
export const deletePost = (req, res) => res.send("Delete Post");
