require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");

const { createUser, login } = require("./controllers/users");
const { getItems } = require("./controllers/items");

const usersRouter = require("./routes/users");
const itemsRouter = require("./routes/items");

const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/error-handler");
const { validateUserBody, validateLoginBody } = require("./middlewares/validation");
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001 } = process.env;

const app = express();

app.use(cors());
app.use(express.json());

// Enable request logging before all route handlers
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

app.post("/signup", validateUserBody, createUser);
app.post("/signin", validateLoginBody, login);
app.get("/items", getItems);

app.use(auth);

app.use("/users", usersRouter);
app.use("/items", itemsRouter);

app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

// Enable error logging after routes but before error handlers
app.use(errorLogger);

// celebrate error handler
app.use(errors());

// Add error handling middleware AFTER all other middleware and routes
app.use(errorHandler);

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error", err));
