const express = require("express");
const mongoose = require("mongoose");
const { PORT = 3001 } = process.env;
const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
    const usersRouter = require("./routes/users");
    const itemsRouter = require("./routes/items");
    app.use("/users", usersRouter);
    app.use("/items", itemsRouter);
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error", err));
