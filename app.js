const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { createUser, login } = require("./controllers/users.js");
const { getItems } = require("./controllers/items.js");

const usersRouter = require("./routes/users.js");
const itemsRouter = require("./routes/items.js");

const auth = require("./middlewares/auth.js");
const errorHandler = require("./middlewares/error-handler.js");

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
  res.status(404).send({ message: "Requested resource not found" });
});

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
