const router = require("express").Router();
const {
  getCurrentUser,
  updateUserProfile,
} = require("../controllers/users.js");
const { validateUserUpdateBody } = require("../middlewares/validation.js");

router.get("/me", getCurrentUser);
router.patch("/me", validateUserUpdateBody, updateUserProfile);

module.exports = router;
