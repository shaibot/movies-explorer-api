const CODE = 200;
const CODE_CREATED = 201;
const ERROR_CODE = 400;
const ERROR_UNAUTHORIZED = 401;
const ERROR_FORBIDDEN = 403;
const ERROR_NOT_FOUND = 404;
const ERROR_CONFLICT = 409;
const ERROR_INTERNAL_SERVER = 500;
const MESSAGE_ERROR_AVTORISATION = 'Необходима авторизация';
const MESSAGE_ERROR_INCORRECT_DATA = 'Переданы некорректные данные при создании фильма';
const MESSAGE_ERROR_INCORRECT_ID = 'Некорректный ID';
const MESSAGE_ERROR_FILM_NOT_FOUND = 'Фильм не найден';
const MESSAGE_DELETED_FILM = 'Фильм успешно удален';
const MESSAGE_SUCCESSFULL_SIGNIN = 'Вход выполнен успешно';
const MESSAGE_SUCCESSFULL_SIGNOUT = 'Вы успешно вышли';
const REGEX_URL = /(https?:\/\/)(www)?([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=%])*#?$/;

module.exports = {
  CODE,
  CODE_CREATED,
  ERROR_CODE,
  ERROR_UNAUTHORIZED,
  ERROR_FORBIDDEN,
  ERROR_NOT_FOUND,
  ERROR_CONFLICT,
  ERROR_INTERNAL_SERVER,
  REGEX_URL,
  MESSAGE_ERROR_AVTORISATION,
  MESSAGE_ERROR_INCORRECT_DATA,
  MESSAGE_ERROR_INCORRECT_ID,
  MESSAGE_DELETED_FILM,
  MESSAGE_ERROR_FILM_NOT_FOUND,
  MESSAGE_SUCCESSFULL_SIGNIN,
  MESSAGE_SUCCESSFULL_SIGNOUT,
};
