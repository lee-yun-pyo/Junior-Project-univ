import User from "../models/User";
import bcrypt from "bcrypt";

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
  try {
    await User.create({
      email,
      password,
      name,
    });
    res.redirect("/login");
  } catch (error) {
    console.log(error);
    res.status(400).render("join", {
      pageTitle,
      errorMessage: error._message,
    });
  }
};
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const pageTitle = "Login";
  // * 이메일 있는지 확인
  // 비번 확인
  const user = await User.findOne({ email }); // 있으면 object 반환 없으면 null
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "이메일 존재 하지 않음",
    });
  }
  const isPassword = await bcrypt.compare(password, user.password); // 맞지 않으면 false 맞 true
  if (!isPassword) {
    return res
      .status(400)
      .render("login", { pageTitle, errorMessage: "password 틀림" });
  }
  return res.redirect("/");
};
export const edit = (req, res) => res.send("User edit");
export const remove = (req, res) => res.send("delete user");
export const logout = (req, res) => res.send("logout");
export const see = (req, res) => res.send("user Seee");
