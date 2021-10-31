const Movie = require("../models/movie");
const BadRequestError = require("../errors/bad-request-err");
const NotFoundError = require("../errors/not-found-err");
const PermissionError = require("../errors/permission-err");

module.exports.getSavedMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError("Фильм с указанным _id не найден.");
      } else if (JSON.stringify(req.user._id) === JSON.stringify(movie.owner)) {
        Movie.findByIdAndRemove(movieId).then((delMovie) => {
          res.send({ data: delMovie });
        });
      } else {
        throw new PermissionError("Нельзя удалять чужие фильмы");
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        throw new BadRequestError("Переданы некорректные данные при удалении фильма");
      }
      next(err);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    description,
    year,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    description,
    year,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        throw new BadRequestError(err.message);
      }
      next(err);
    })
    .catch(next);
};
