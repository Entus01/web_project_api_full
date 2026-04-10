const { isCelebrateError } = require('celebrate');

module.exports.errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const { statusCode = 500, message } = err;

  if (isCelebrateError(err)) {
    return res.status(400).json({ message: 'Datos de entrada invalidos' });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Datos de entrada invalidos' });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Identificador invalido' });
  }

  return res.status(statusCode).json({
    message: statusCode === 500 ? 'Ocurrio un error en el servidor' : message,
  });
};
