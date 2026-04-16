require('dotenv').config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const { PORT = 3000 } = process.env;
const app = express();

const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");
const { corsMiddleware } = require("./middlewares/cors");
const { errorHandler } = require("./middlewares/error");
const { validateSignIn, validateSignUp } = require("./utils/validators");
const { requestLogger, errorLogger } = require("./middlewares/logger");

app.use(requestLogger);
app.use(corsMiddleware);

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/aroundb");

app.post('/signin', validateSignIn, login);
app.post('/signup', validateSignUp, createUser);

app.use(auth.auth);

const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use((req, res, next) => {
  const err = new Error("Recurso solicitado no encontrado");
  err.statusCode = 404;
  next(err);
});

app.use(errorLogger);
app.use(errorHandler);

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
