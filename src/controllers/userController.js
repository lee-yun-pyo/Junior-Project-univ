import User from "../models/User";

export const getJoin = (req, res) =>
  res.render("join", { pageTitle: "회원 가입" });

export const postJoin = async (req, res) => {
  const { email, password, password2, name } = req.body;
  const pageTitle = "회원 가입";
  const emailExists = await User.exists({ email });
  if (emailExists) {
    return res
      .status(400)
      .render("join", { pageTitle, errorMessage: "이메일이 존재합니다" });
  }
  if (password !== password2) {
    return res
      .status(400)
      .render("join", { pageTitle, errorMessage: "password가 다릅니다" });
  }
  await User.create({
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
