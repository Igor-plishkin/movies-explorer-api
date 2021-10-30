const router = require("express").Router();
const { getAllUsers, getUserInfo, patchUser } = require("../controllers/users");
const { userPatchValidation } = require("../middlewares/validation");

router.get("/users", getAllUsers);
router.get("/users/me", getUserInfo);
router.patch("/users/me", userPatchValidation, patchUser);

module.exports = router;
