const { celebrate, CelebrateError, Joi } = require("celebrate");
const { isURL, isEmail } = require("validator");

module.exports.loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string.required().custom((value) => {
      if (!isEmail(value)) {
        throw CelebrateError("Не корректный email");
      }
      return value;
    }),
    password: Joi.string().required(),
  }),
});

module.exports.userCreateValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().custom((value) => {
      if (!isEmail(value)) {
        throw CelebrateError("Не корректный email");
      }
      return value;
    }),
    password: Joi.string().min(8).required(),
  }),
});

module.exports.userPatchValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().custom((value) => {
      if (!isEmail(value)) {
        throw CelebrateError("Не корректный email");
      }
      return value;
    }),
  }),
});

module.exports.movieCreateValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((link) => {
      if (!isURL(link)) {
        throw CelebrateError("Не корректная ссылка");
      }
      return link;
    }),
    trailer: Joi.string().required().custom((link) => {
      if (!isURL(link)) {
        throw CelebrateError("Не корректная ссылка");
      }
      return link;
    }),
    thumbnail: Joi.string().required().custom((link) => {
      if (!isURL(link)) {
        throw CelebrateError("Не корректная ссылка");
      }
      return link;
    }),
    movieId: Joi.number().integer().required(),
    nameRu: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.movieIdValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});
