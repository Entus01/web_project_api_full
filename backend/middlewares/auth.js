const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Autorización requerida' });
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(403).send({ message: 'Acceso prohibido' });
  }

  if (!payload || !payload._id) {
    return res.status(403).send({ message: 'Acceso prohibido' });
  }

  req.user = payload;

  next();
};
