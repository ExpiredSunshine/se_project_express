// app.js
const express = require("express");
const mongoose = require("mongoose");
const { PORT = 3001 } = process.env;

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error", err));

// (Later: import routes here)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
