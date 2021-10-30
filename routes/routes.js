const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const NotFoundError = require("../errors/not-found-err");
const userRoute = require("./users");
const movieRoute = require("./movies");
const auth = require("../middlewares/auth");
const { login, createUser } = require("../controllers/users");

router.post("/signin", celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
router.post("/signup", celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);
router.use(auth);
router.use(userRoute);
router.use(movieRoute);

router.use("*", () => {
  throw new NotFoundError("Страница не найдена");
});

module.exports = router;
