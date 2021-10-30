const router = require("express").Router();

const {
  getSavedMovies,
  deleteMovie,
  createMovie,
} = require("../controllers/movies");

router.get("/movies", getSavedMovies);
router.post("/movies", createMovie);
router.delete("/movies/:movieId", deleteMovie);

module.exports = router;
