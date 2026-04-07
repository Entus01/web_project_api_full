const express = require("express");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const { PORT = 3000 } = process.env;
const app = express();
const { login, createUser } = require("./controllers/users");

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/aroundb");

app.use((req, res, next) => {
  req.user = {
    _id: "69b739517ef1d1fa611fc7f3"
  };

  next();
});

app.post('/signin', login);
app.post('/signup', createUser);

const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Recurso solicitado no encontrado" });
});

fs.readFile(
  path.join(__dirname, "data", "users.json"),
  "utf-8",
  (err, data) => {
    if (err) {
      console.error("Error al leer el archivo de usuarios:", err);
    } else {
      console.log("Usuarios cargados:", JSON.parse(data));
    }
  },
);

fs.readFile(
  path.join(__dirname, "data", "cards.json"),
  "utf-8",
  (err, data) => {
    if (err) {
      console.error("Error al leer el archivo de tarjetas:", err);
    } else {
      console.log("Tarjetas cargadas:", JSON.parse(data));
    }
  },
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
