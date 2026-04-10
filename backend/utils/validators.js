const { celebrate, Joi, Segments } = require('celebrate');
const validator = require('validator');

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

const validateUrl = (value, helpers) => {
  if (
    !validator.isURL(value, {
      protocols: ['http', 'https'],
      require_protocol: true,
    })
  ) {
    return helpers.message('URL must be valid and include http or https');
  }

  return value;
};

const validateSignIn = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

const validateSignUp = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

const validateUserId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required().pattern(objectIdPattern),
  }),
});

const validateUpdateUser = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validateUpdateAvatar = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().required().custom(validateUrl),
  }),
});

const validateCreateCard = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateUrl),
  }),
});

const validateCardId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required().pattern(objectIdPattern),
  }),
});

module.exports = {
  validateSignIn,
  validateSignUp,
  validateUserId,
  validateUpdateUser,
  validateUpdateAvatar,
  validateCreateCard,
  validateCardId,
};
