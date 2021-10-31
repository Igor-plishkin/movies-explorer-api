const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/unauthorized-err");
const { JWT_SECRET } = require("../utils/constans");

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new UnauthorizedError("Необходима авторизация 24324234");
  }

  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError("Необходима авторизация");
  }

  req.user = payload;

  return next();
};
