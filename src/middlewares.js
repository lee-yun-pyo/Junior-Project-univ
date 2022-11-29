import multer from "multer";

export const localsMiddlewares = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Do You Know";
  res.locals.loggedInUser = req.session.user || {};
  console.log("req.session: ", res.locals);
  next();
};

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "로그인 해주세요");
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "권한이 없습니다");
    return res.redirect("/");
  }
};

// multer 미들웨어 : 사용자가 보낸 파일을 uploads 폴더에 저장
export const uploadFiles = multer({ dest: "uploads/" });
