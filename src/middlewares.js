export const localsMiddlewares = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Do You Know";
  res.locals.loggedInUser = req.session.user;
  console.log(res.locals);
  next();
};
