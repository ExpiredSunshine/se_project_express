const router = require("express").Router();
const {
  getCurrentUser,
  updateUserProfile,
} = require("../controllers/users");
const { validateUserUpdateBody } = require("../middlewares/validation");

router.get("/me", getCurrentUser);
router.patch("/me", validateUserUpdateBody, updateUserProfile);

module.exports = router;
