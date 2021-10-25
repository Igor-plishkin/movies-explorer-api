const router = require("express").Router();
const {
  getAllUsers,
  getUserInfo,
  patchUser,
} = require("../controllers/users");

const {
  getSavedMovies,
  deleteMovie,
  createMovie,
} = require("../controllers/movies");

router.get("/users", getAllUsers);
router.get("/users/me", getUserInfo);
router.patch("/users/me", patchUser);

router.get("/movies", getSavedMovies);
router.post("/movies", createMovie);
router.delete("/movies/:movieId", deleteMovie);

module.exports = router;
