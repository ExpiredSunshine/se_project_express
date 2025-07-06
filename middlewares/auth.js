const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../utils/error-classes");

const { JWT_SECRET = "some_super_secret_key" } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    next(new UnauthorizedError("Authorization required"));
    return;
  }
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError("Authorization required"));
    return;
  }
  req.user = payload;
  return next();
};
