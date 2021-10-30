const router = require("express").Router();
const {
  getAllUsers,
  getUserInfo,
  patchUser,
} = require("../controllers/users");

router.get("/users", getAllUsers);
router.get("/users/me", getUserInfo);
router.patch("/users/me", patchUser);

module.exports = router;
