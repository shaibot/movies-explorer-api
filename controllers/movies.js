const mongoose = require('mongoose');
// const NotFound = require('../Errors/NotFound');
const Movie = require('../models/movie');
// const { CODE_CREATED } = require('../utils/constants');
const Forbidden = require('../Errors/Forbidden');
const BadRequest = require('../Errors/BadRequest');
const NotFound = require('../Errors/NotFound');
const { CODE } = require('../utils/constants');

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
      throw new Forbidden('Необходима авторизация');
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
      throw new BadRequest('Переданы некорректные данные при создании фильма');
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
      throw new BadRequest('Некорректный ID фильма');
    }

    const deletedMovie = await Movie.findByIdAndDelete(movieId);
    if (!deletedMovie) {
      throw new NotFound('Фильм не найден');
    }
    res.status(CODE).send({ message: 'Фильм успешно удален' });
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
