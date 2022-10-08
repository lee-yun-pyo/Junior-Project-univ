import User from "../models/User";

export const getJoin = (req, res) =>
  res.render("join", { pageTitle: "회원 가입" });

export const postJoin = async (req, res) => {
  const { username, email, password, name } = req.body;
  await User.create({
    username,
    email,
    password,
    name,
  });
  res.redirect("/login");
};
export const edit = (req, res) => res.send("User edit");
export const login = (req, res) => res.send("user login");
export const remove = (req, res) => res.send("delete user");
export const logout = (req, res) => res.send("logout");
export const see = (req, res) => res.send("user Seee");
