const jwt = require("jsonwebtoken");
const { UNAUTHORIZED = 401 } = require("../utils/errors.js");

const { JWT_SECRET = "some_super_secret_key" } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(UNAUTHORIZED).send({ message: "Authorization required" });
  }
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(UNAUTHORIZED).send({ message: "Authorization required" });
  }
  req.user = payload;
  return next();
};
