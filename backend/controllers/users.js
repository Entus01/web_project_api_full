const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getJwtSecret } = require("../utils/jwt");

module.exports.getUsers = (req, res) => {
  User.find({})
    .orFail(() => {
      const error = new Error("No se encontraron usuarios");
      error.statusCode = 404;
      throw error;
    })
    .then((users) => res.status(200).json(users))
    .catch((err) =>
      res.status(err.statusCode || 500).json({ message: err.message }),
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
      res.status(err.statusCode || 500).json({ message: err.message }),
    );
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => res.status(201).json(user))
    .catch((err) =>
      res.status(err.statusCode || 500).json({ message: err.message }),
    );
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.status(200).json(user);
    })
    .catch((err) =>
      res.status(err.statusCode || 500).json({ message: err.message }),
    );
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.status(200).json(user);
    })
    .catch((err) =>
      res.status(err.statusCode || 500).json({ message: err.message }),
    );
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  const jwtSecret = getJwtSecret();
  if (!jwtSecret) {
    return res.status(500).json({ message: "Error de configuración del servidor" });
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: "7d" });
      return res.status(200).json({ token });
    })
    .catch((err) => {
      if (err.statusCode === 401) {
        return res.status(401).json({ message: err.message });
      }
      return res.status(500).json({ message: "Error del servidor" });
    });
};

module.exports.getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => res.status(200).json(user))
    .catch((err) =>
      res.status(err.statusCode || 500).json({ message: err.message }),
    );
};