const jwt = require("jsonwebtoken");

const { JWT_SECRET, NODE_ENV } = process.env;
const Unauthorized = require("../Errors/Unauthorized");
const { DEV_SECRET, NODE_PRODUCTION } = require("../config");

module.exports = (req, res, next) => {
  const {authorization} = req.headers;
  let token;

  if (authorization) {
    token = authorization.replace("jwt=", "");
  }

  if (authorization === '') {
    return next(new Unauthorized("Необходимо пройти авторизацию"));
  }
  console.log(token)
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


