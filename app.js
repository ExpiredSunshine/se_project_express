require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");

const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { NotFoundError } = require('./utils/error-classes');

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

// Set up all routes
require('./routes')(app);

app.use((req, res, next) => {
  next(new NotFoundError('Requested resource not found'));
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
