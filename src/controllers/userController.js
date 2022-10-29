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
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};
export const getEdit = (req, res) => {
  res.render("edit-profile", { pageTitle: "Edit Profile" });
};
export const postEdit = async (req, res) => {
  const {
    body: { name, email },
    session: {
      user: { _id },
    },
  } = req;
  const updateUser = await User.findByIdAndUpdate(
    _id,
    { name, email },
    { new: true }
  );
  req.session.user = updateUser;
  res.redirect("/users/edit");
};
export const remove = (req, res) => res.send("delete user");
export const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

export const getChangePassword = (req, res) => {
  return res.render("change-password", { pageTitle: "비밀번호 변경" });
};

export const postChangePassword = async (req, res) => {
  const pageTitle = "비밀번호 변경";
  const {
    body: { oldPassword, newPassword, newPassword2 },
    session: {
      user: { _id, password },
    },
  } = req;
  const ok = await bcrypt.compare(oldPassword, password); // 맞지 않으면 false 맞 true
  if (!ok) {
    return res.status(400).render("change-password", {
      pageTitle,
      errorMessage: "현 비밀번호가 다릅니다",
    });
  }
  if (oldPassword === newPassword) {
    return res.status(400).render("change-password", {
      pageTitle,
      errorMessage: "현재 비밀번호와 새 비밀번호가 같습니다",
    });
  }
  if (newPassword !== newPassword2) {
    return res.status(400).render("change-password", {
      pageTitle,
      errorMessage: "새 비밀번호가 다릅니다",
    });
  }
  const user = await User.findById(_id);
  user.password = newPassword;
  await user.save();
  req.session.destroy();
  res.redirect("/login");
};
export const see = (req, res) => res.send("user Seee");
