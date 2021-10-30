const router = require("express").Router();
const NotFoundError = require("../errors/not-found-err");
const userRoute = require("./users");
const movieRoute = require("./movies");
const auth = require("../middlewares/auth");
const { login, createUser, signOut } = require("../controllers/users");
const {
  loginValidation,
  userCreateValidation,
} = require("../middlewares/validation");

router.post("/signin", loginValidation, login);
router.post("/signup", userCreateValidation, createUser);
router.use(auth);
router.use(userRoute);
router.use(movieRoute);
router.delete("/signout", signOut);

router.use("*", () => {
  throw new NotFoundError("Страница не найдена");
});

module.exports = router;
