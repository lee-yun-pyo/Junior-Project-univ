import User from "../models/User";
import bcrypt from "bcrypt";
import Post from "../models/Post";

export const getJoin = (req, res) =>
  res.render("join", { pageTitle: "회원 가입" });

export const postJoin = async (req, res) => {
  const { id, password, password2, name } = req.body;
  const pageTitle = "회원 가입";
  const idExists = await User.exists({ id });
  const nameExists = await User.exists({ name });
  if (nameExists) {
    req.flash("error", "✔ Name이 존재합니다");
    return res.status(400).render("join", { pageTitle });
  }
  if (idExists) {
    req.flash("error", "✔ ID가 존재합니다");
    return res.status(400).render("join", { pageTitle });
  }
  if (password !== password2) {
    req.flash("error", "✔ password가 다릅니다");
    return res.status(400).render("join", { pageTitle });
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
  const pageTitle = "로그인";
  // * ID 있는지 확인
  // 비번 확인
  const user = await User.findOne({ id }); // 있으면 object 반환 없으면 null
  if (!user) {
    req.flash("error", "✔ ID가 존재하지 않습니다");
    return res.status(400).render("login", {
      pageTitle,
    });
  }
  const isPassword = await bcrypt.compare(password, user.password); // 맞지 않으면 false 맞 true
  if (!isPassword) {
    req.flash("error", "✔ password가 틀립니다");
    return res.status(400).render("login", { pageTitle });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};
export const getEdit = (req, res) => {
  res.render("edit-profile", { pageTitle: "프로필 수정" });
};
export const postEdit = async (req, res) => {
  const {
    body: { name, id },
    session: {
      user: { _id },
    },
  } = req;
  const pageTitle = "프로필 수정";
  const nowUser = await User.findById({ _id });
  if (name === nowUser.name && id === nowUser.id) {
    req.flash("error", "✔ Name 또는 ID를 변경하세요");
    return res.status(400).render("edit-profile", {
      pageTitle,
    });
  }
  const nameExists = await User.exists({ name });
  const idExists = await User.exists({ id });
  if (nameExists) {
    req.flash("error", "✔ Name이 이미 존재합니다");
    return res.status(400).render("edit-profile", {
      pageTitle,
    });
  }
  if (idExists) {
    req.flash("error", "✔ ID가 이미 존재합니다");
    return res.status(400).render("edit-profile", {
      pageTitle,
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

export const deleteUser = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const user = await User.findById(_id);
  const post = await Post.findOne({ owner: _id });
  if (String(user._id) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  post.owner = null;
  await User.findByIdAndDelete(_id);
  req.session.destroy();
  post.save();
  res.redirect("/");
};

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
    req.flash("error", "✔ 현 비밀번호가 다릅니다");
    return res.status(400).render("change-password", {
      pageTitle,
    });
  }
  if (oldPassword === newPassword) {
    req.flash("error", "✔ 현재 비밀번호와 새 비밀번호가 같습니다");
    return res.status(400).render("change-password", {
      pageTitle,
    });
  }
  if (newPassword !== newPassword2) {
    req.flash("error", "✔ 새 비밀번호가 다릅니다");
    return res.status(400).render("change-password", {
      pageTitle,
    });
  }
  const user = await User.findById(_id);
  user.password = newPassword;
  await user.save();
  req.session.destroy();
  req.flash("error", "✔ 비밀번호가 변경되었습니다.");
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
