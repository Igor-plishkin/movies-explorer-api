const router = require("express").Router();

const {
  getSavedMovies,
  deleteMovie,
  createMovie,
} = require("../controllers/movies");

const {
  movieCreateValidation,
  movieIdValidation,
} = require("../middlewares/validation");

router.get("/movies", getSavedMovies);
router.post("/movies", movieCreateValidation, createMovie);
router.delete("/movies/:movieId", movieIdValidation, deleteMovie);

module.exports = router;
