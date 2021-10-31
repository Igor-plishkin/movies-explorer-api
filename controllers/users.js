const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const BadRequestError = require("../errors/bad-request-err");
const NotFoundError = require("../errors/not-found-err");
const RegConflictError = require("../errors/reg-conflict");
const UnauthorizedError = require("../errors/unauthorized-err");
const { JWT_SECRET } = require("../utils/constans");

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError("Нет пользователя по заданному id");
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        throw new BadRequestError("Переданы некорректные данные");
      }
      next(err);
    })
    .catch(next);
};

module.exports.patchUser = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new NotFoundError("Нет пользователя по заданному id");
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        throw new BadRequestError("Переданы некорректные данные при обновлении профиля");
      } else if (err.name === "ValidationError") {
        throw new BadRequestError("Переданы некорректные данные при обновлении профиля");
      }
      next(err);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        throw new BadRequestError("Переданы некорректные данные");
      } else if (err.name === "MongoError" && err.code === 11000) {
        throw new RegConflictError("Пользователь с таким email существует");
      }
      next(err);
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.cookie("jwt", token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.send({ token });
    })
    .catch(() => {
      throw new UnauthorizedError("Не правильные почта или пароль");
    })
    .catch(next);
};

module.exports.signOut = (req, res) => {
  res.clearCookie("jwt");
};
