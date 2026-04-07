const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .orFail(() => {
      const error = new Error("No se encontraron tarjetas");
      error.statusCode = 404;
      throw error;
    })
    .then((cards) => {
      if (!cards || cards.length === 0) {
        return res.status(404).json({ message: "No se encontraron tarjetas" });
      }
      res.status(200).json(cards);
    })
    .catch((err) =>
      res.status(500).json({ message: "Error al obtener las tarjetas" }),
    );
};

module.exports.createCard = (req, res) => {
  console.log(req.user._id);
  const { name, link, owner } = req.body;

  const User = require("../models/user");
  User.findById(owner)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      } else if (!name || !link || !owner) {
        return res.status(400).json({ message: "Faltan campos requeridos" });
      }
      Card.create({ name, link, owner })
        .then((card) => res.status(201).json(card))
        .catch((err) =>
          res.status(500).json({ message: "Error al crear la tarjeta" }),
        );
    })
    .catch((err) =>
      res.status(500).json({ message: "Error al buscar el usuario" }),
    );
};

module.exports.deleteCard = (req, res) => {
  console.log(req.user._id);
  const { id } = req.params;
  Card.findByIdAndDelete(id)
    .orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      if (!card) {
        return res.status(404).json({ message: "Tarjeta no encontrada" });
      }
      res.status(200).json({ message: "Tarjeta eliminada" });
    })
    .catch((err) =>
      res.status(500).json({ message: "Error al eliminar la tarjeta" }),
    );
};

module.exports.likeCard = (req, res) => {
  console.log(req.user._id);
  const { id } = req.params;
  Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      if (!card) {
        return res.status(404).json({ message: "Tarjeta no encontrada" });
      }
      res.status(200).json(card);
    })
    .catch((err) =>
      res.status(500).json({ message: "Error al dar like a la tarjeta" }),
    );
};

module.exports.dislikeCard = (req, res) => {
  console.log(req.user._id);
  const { id } = req.params;
  Card.findByIdAndUpdate(id, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      if (!card) {
        return res.status(404).json({ message: "Tarjeta no encontrada" });
      }
      res.status(200).json(card);
    })
    .catch((err) =>
      res.status(500).json({ message: "Error al quitar like a la tarjeta" }),
    );
};
