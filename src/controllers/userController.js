import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) =>
  res.render("join", { pageTitle: "회원 가입" });

export const postJoin = async (req, res) => {
  const { id, password, password2, name } = req.body;
  const pageTitle = "회원 가입";
  const idExists = await User.exists({ id });
  const nameExists = await User.exists({ name });
  if (nameExists) {
    return res
      .status(400)
      .render("join", { pageTitle, errorMessage: "Name이 존재합니다" });
  }
  if (idExists) {
    return res
      .status(400)
      .render("join", { pageTitle, errorMessage: "ID가 존재합니다" });
  }
  if (password !== password2) {
    return res
      .status(400)
      .render("join", { pageTitle, errorMessage: "password가 다릅니다" });
  }
  try {
    await User.create({
      id,
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
  const { id, password } = req.body;
  const pageTitle = "Login";
  // * ID 있는지 확인
  // 비번 확인
  const user = await User.findOne({ id }); // 있으면 object 반환 없으면 null
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "ID 존재 하지 않음",
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
    body: { name, id },
    session: {
      user: { _id },
    },
  } = req;
  const nowUser = await User.findById({ _id });
  if (name === nowUser.name && id === nowUser.id) {
    return res.status(400).render("edit-profile", {
      pageTitle,
      errorMessage: "Name 또는 ID를 변경하세요",
    });
  }
  const pageTitle = "Edit Profile";
  const nameExists = await User.exists({ name });
  const idExists = await User.exists({ id });
  if (nameExists) {
    return res.status(400).render("edit-profile", {
      pageTitle,
      errorMessage: "Name이 이미 존재합니다",
    });
  }
  if (idExists) {
    return res.status(400).render("edit-profile", {
      pageTitle,
      errorMessage: "ID가 이미 존재합니다",
    });
  }
  const updateUser = await User.findByIdAndUpdate(
    _id,
    { name, id },
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

export const see = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("posts");
  if (!user) {
    return res
      .status(404)
      .render("404", { pageTitle: "User을 찾을 수 없습니다" });
  }
  return res.render("profile", { pageTitle: user.name, user });
};
