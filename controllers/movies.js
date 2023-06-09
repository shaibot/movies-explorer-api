const mongoose = require('mongoose');
// const NotFound = require('../Errors/NotFound');
const Movie = require('../models/movie');
// const { CODE_CREATED } = require('../utils/constants');
const Forbidden = require('../Errors/Forbidden');
const BadRequest = require('../Errors/BadRequest');
const NotFound = require('../Errors/NotFound');
const { CODE, MESSAGE_ERROR_AVTORISATION, MESSAGE_ERROR_INCORRECT_DATA, MESSAGE_ERROR_INCORRECT_ID, MESSAGE_DELETED_FILM, MESSAGE_ERROR_FILM_NOT_FOUND } = require('../utils/constants');

const getUserMovies = async (req, res, next) => {
  try {
    // Получение всех фильмов текущего пользователя
    const movies = await Movie.find({ owner: req.user._id });

    res.json(movies);
  } catch (err) {
    next(err);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    } = req.body;

    const ownerId = req.user._id;

    if (!ownerId) {
      throw new Forbidden(MESSAGE_ERROR_AVTORISATION);
    }

    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner: ownerId,
      movieId,
      nameRU,
      nameEN,
    });
    if (!movie) {
      throw new BadRequest(MESSAGE_ERROR_INCORRECT_DATA);
    }
    res.send(movie);
  } catch (err) {
    next(err);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;

    // Проверяем корректность ID
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      throw new BadRequest(MESSAGE_ERROR_INCORRECT_ID);
    }

    const deletedMovie = await Movie.findByIdAndDelete(movieId);
    if (!deletedMovie) {
      throw new NotFound(MESSAGE_ERROR_FILM_NOT_FOUND);
    }
    res.status(CODE).send({ message: MESSAGE_DELETED_FILM });
  } catch (err) {
    next(err);
  }
  return null;
};

module.exports = {
  getUserMovies,
  createMovie,
  deleteMovie,
};
