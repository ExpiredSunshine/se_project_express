const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const {
  BadRequestError,
  UnauthorizedError,
  ConflictError,
  NotFoundError,
} = require("../utils/error-classes");

const { JWT_SECRET = "some_super_secret_key" } = process.env;

module.exports.createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        name,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;
      return res.status(201).send(userObj);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError("Email already exists"));
      } else if (err.name === "ValidationError") {
        const messages = Object.values(err.errors)
          .map((e) => e.message)
          .join(", ");
        next(new BadRequestError(messages));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new BadRequestError("The password and email fields are required"));
    return;
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(200).send({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        next(new UnauthorizedError("Incorrect email or password"));
      } else {
        next(err);
      }
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError("User not found"));
        return;
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid user ID"));
      } else {
        next(err);
      }
    });
};

module.exports.updateUserProfile = (req, res, next) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        next(new NotFoundError("User not found"));
        return;
      }
      return res.status(200).send({ data: updatedUser });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        const messages = Object.values(err.errors)
          .map((e) => e.message)
          .join(", ");
        next(new BadRequestError(messages));
      } else if (err.name === "CastError") {
        next(new BadRequestError("Invalid user ID"));
      } else {
        next(err);
      }
    });
};
