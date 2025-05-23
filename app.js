const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");
const itemsRouter = require("./routes/items");

const { PORT = 3001 } = process.env;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "682fba7118310c4d45ad6d17",
  };
  next();
});

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.error("MongoDB connection error", err));

app.use("/users", usersRouter);
app.use("/items", itemsRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
