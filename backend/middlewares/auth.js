const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../answersServer/customsErrors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  let payload;
  const token = req.cookies.jwt;
  if (!token) {
    next(new UnauthorizedError('Необходимо авторизоваться'));
    return;
  }
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
  } catch (err) {
    next(new UnauthorizedError('Необходимо авторизоваться'));
    return;
  }
  req.user = payload;
  next();
};
module.exports = auth;
