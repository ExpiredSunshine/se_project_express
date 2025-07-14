// routes/index.js
const { createUser, login } = require("../controllers/users");
const { getItems } = require("../controllers/items");

const usersRouter = require("./users");
const itemsRouter = require("./items");

const auth = require("../middlewares/auth");
const { validateUserBody, validateLoginBody } = require("../middlewares/validation");

module.exports = (app) => {
  app.post("/signup", validateUserBody, createUser);
  app.post("/signin", validateLoginBody, login);
  app.get("/items", getItems);
  app.use(auth);
  app.use("/users", usersRouter);
  app.use("/items", itemsRouter);
};