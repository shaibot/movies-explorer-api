const jwt = require("jsonwebtoken");

const { JWT_SECRET, NODE_ENV } = process.env;
const Unauthorized = require("../Errors/Unauthorized");
const { DEV_SECRET, NODE_PRODUCTION } = require("../config");
const { log } = require("winston");

module.exports = (req, res, next) => {
  const { cookie, authorization } = req.headers;
  let token;

  if (cookie) {
    token = cookie.replace("jwt=", "");
  } else if (authorization && authorization.startsWith("Bearer ")) {
    token = authorization.slice(7); // убираем "Bearer "
  }

  if (!token) {
    return next(new Unauthorized("Необходимо пройти авторизацию"));
  }

  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === NODE_PRODUCTION ? JWT_SECRET : DEV_SECRET
    );
  } catch (err) {
    return next(new Unauthorized("Необходимо пройти авторизацию"));
  }

  req.user = payload;
  return next();
};

//   if (!cookie) {
//     return next(new Unauthorized('Необходимо пройти авторизацию'));
//   }
//   const token = cookie.replace('jwt=', '');
//   let payload;
//   try {
//     payload = jwt.verify(token, NODE_ENV === NODE_PRODUCTION ? JWT_SECRET : DEV_SECRET);
//   } catch (err) {
//     return next(new Unauthorized('Необходимо пройти авторизацию'));
//   }
//   req.user = payload;
//   return next();
// };
