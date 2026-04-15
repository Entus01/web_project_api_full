const { isCelebrate } = require('celebrate');

module.exports.errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const { statusCode = 500, message } = err;

  if (isCelebrate(err)) {
    return res.status(400).json({ message: 'Datos de entrada invalidos' });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Datos de entrada invalidos' });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Identificador invalido' });
  }

  if (err.code === 11000) {
    return res.status(409).json({ message: 'El correo electronico ya esta registrado' });
  }

  return res.status(statusCode).json({
    message: statusCode === 500 ? 'Ocurrio un error en el servidor' : message,
  });
};
