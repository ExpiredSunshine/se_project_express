// app.js
const express = require("express");
const mongoose = require("mongoose");
const { PORT = 3001 } = process.env;

const app = express();
app.use(express.json());

// (Later: import routes here)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
