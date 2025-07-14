// middlewares/error-handler.js
const {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
} = require('../utils/error-classes');

const errorHandler = (err, req, res, next) => {
  // Log the error
  console.error(err);

  // Handle custom errors
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ');
    return res.status(400).send({ message: messages });
  }

  // Handle Mongoose cast errors (invalid ID format)
  if (err.name === 'CastError') {
    return res.status(400).send({ message: 'Invalid ID format' });
  }

  // Handle Mongoose duplicate key errors
  if (err.code === 11000) {
    return res.status(409).send({ message: 'Email already exists' });
  }

  // Handle Mongoose document not found errors
  if (err.name === 'DocumentNotFoundError') {
    return res.status(404).send({ message: 'Resource not found' });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).send({ message: 'Invalid token' });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).send({ message: 'Token expired' });
  }

  // Default error (500)
  return res.status(500).send({ message: 'Internal server error' });
};

module.exports = errorHandler;