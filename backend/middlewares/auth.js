const jwt = require('jsonwebtoken');
const { getJwtSecret } = require('../utils/jwt');

const createError = (statusCode, message) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
};

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(createError(401, 'Autorización requerida'));
  }

  const token = authorization.replace('Bearer ', '');

  if (!token) {
    return next(createError(401, 'Autorización requerida'));
  }

  let payload;

  try {
    payload = jwt.verify(token, getJwtSecret());
  } catch (err) {
    return next(createError(403, 'Acceso prohibido'));
  }

  if (!payload || !payload._id) {
    return next(createError(403, 'Acceso prohibido'));
  }

  req.user = payload;

  next();
};
