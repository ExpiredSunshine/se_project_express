const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { NOT_FOUND } = require("./utils/errors");

const { createUser, login } = require("./controllers/users");
const { getItems } = require("./controllers/items");

const usersRouter = require("./routes/users");
const itemsRouter = require("./routes/items");

const auth = require("./middlewares/auth");

const { PORT = 3001 } = process.env;

const app = express();

app.use(cors());
app.use(express.json());

app.post("/signup", createUser);
app.post("/signin", login);
app.get("/items", getItems);

app.use(auth);

app.use("/users", usersRouter);
app.use("/items", itemsRouter);

app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error", err));
