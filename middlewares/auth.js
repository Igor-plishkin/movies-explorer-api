const jwt = require("jsonwebtoken");
// const UnauthorizedError = require("../errors/unauthorized-err");

module.exports = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;

  if (!req.cookies.jwt) {
    throw new Error("Необходима авторизация");
  }

  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === "production" ? JWT_SECRET : "secret-key");
  } catch (err) {
    throw new Error("Необходима авторизация");
    // throw new UnauthorizedError("Необходима авторизация");
  }

  req.user = payload;

  return next();
};
