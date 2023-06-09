const usersRouter = require('express').Router();
const { getCurrentUser, updateProfile } = require('../controllers/users');
const { validateUpdateProfile } = require('../middlewares/userValidator');

// Роут для получения информации о пользователе
usersRouter.get('/me', getCurrentUser);

// Роут для обновления информации о пользователе
usersRouter.patch('/me', validateUpdateProfile, updateProfile);

module.exports = usersRouter;
