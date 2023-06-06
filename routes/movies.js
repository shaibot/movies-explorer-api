const movieRouter = require('express').Router();
const { getUserMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validateMovie, validateMovieId } = require('../middlewares/movieValidator');

// Роут для получения всех сохраненных фильмов текущего пользователя
movieRouter.get('/', getUserMovies);

// Роут для создания фильма
movieRouter.post('/', validateMovie, createMovie);

// Роут для удаления фильма по id
movieRouter.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = movieRouter;
