const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .orFail(() => {
      const error = new Error("No se encontraron usuarios");
      error.statusCode = 404;
      throw error;
    })
    .then((users) => res.status(200).json(users))
    .catch((err) =>
      res.status(500).json({ message: "Error al obtener los usuarios" }),
    );
};

module.exports.getUserById = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.status(200).json(user);
    })
    .catch((err) =>
      res.status(500).json({ message: "Error al obtener el usuario" }),
    );
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).json(user))
    .catch((err) =>
      res.status(500).json({ message: "Error al crear el usuario" }),
    );
};

module.exports.updateUser = (req, res) => {
  console.log(req.user._id);
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.status(200).json(user);
    })
    .catch((err) =>
      res.status(500).json({ message: "Error al actualizar el usuario" }),
    );
};

module.exports.updateAvatar = (req, res) => {
  console.log(req.user._id);
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.status(200).json(user);
    })
    .catch((err) =>
      res.status(500).json({ message: "Error al actualizar el avatar" }),
    );
};
