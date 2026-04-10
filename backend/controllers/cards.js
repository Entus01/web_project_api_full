const Card = require("../models/card");
const User = require("../models/user");

const createError = (statusCode, message) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
};

module.exports.getCards = (req, res, next) => {
  const { id } = req.params;
  Card.find(id ? { _id: id } : {})
    .then((cards) => {
      if (!cards || cards.length === 0) {
        throw createError(404, "No se encontraron tarjetas");
      }
      return res.status(200).json(cards);
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  if (!name || !link || !owner) {
    return next(createError(400, "Faltan campos requeridos"));
  }

  User.findById(owner)
    .orFail(() => createError(404, "Usuario no encontrado"))
    .then((user) => {
      if (!user) {
        throw createError(404, "Usuario no encontrado");
      }
      return Card.create({ name, link, owner });
    })
    .then((card) => res.status(201).json(card))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { id } = req.params;
  Card.findById(id)
    .orFail(() => createError(404, "Tarjeta no encontrada"))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw createError(403, "No tienes permiso para eliminar esta tarjeta");
      }
      return Card.findByIdAndDelete(id).then(() =>
        res.status(200).json({ message: "Tarjeta eliminada" }),
      );
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  const { id } = req.params;
  Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => createError(404, "Tarjeta no encontrada"))
    .then((card) => res.status(200).json(card))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  const { id } = req.params;
  Card.findByIdAndUpdate(id, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => createError(404, "Tarjeta no encontrada"))
    .then((card) => res.status(200).json(card))
    .catch(next);
};
