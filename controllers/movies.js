const Movie = require("../models/movie");

module.exports.getSavedMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        // throw new NotFoundError("Карточка с указанным _id не найдена.");
        throw new Error("Карточка с указанным _id не найдена.");
      } else if (JSON.stringify(req.user._id) === JSON.stringify(movie.owner)) {
        Movie.findByIdAndRemove(movieId).then((delMovie) => {
          res.send({ data: delMovie });
        });
      } else {
        // throw new PermissionError("Нельзя удалять чужие карточки");
        throw new Error("Нельзя удалять чужие карточки");
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        // throw new BadRequestError("Переданы некорректные данные при удалении карточки");
        throw new Error("Переданы некорректные данные при удалении карточки");
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
        // throw new BadRequestError("Переданы некорректные данные при создании карточки");
        throw new Error("Переданы некорректные данные при создании карточки");
      }
      next(err);
    })
    .catch(next);
};
