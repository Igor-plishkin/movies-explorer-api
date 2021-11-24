const router = require("express").Router();
const { getUserInfo, patchUser } = require("../controllers/users");
const { userPatchValidation } = require("../middlewares/validation");

router.get("/users/me", getUserInfo);
router.patch("/users/me", userPatchValidation, patchUser);

module.exports = router;
