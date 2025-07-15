const router = require("express").Router();
const {
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  unlikeClothingItem,
} = require("../controllers/items");
const { validateCardBody, validateId } = require("../middlewares/validation");

router.post("/", validateCardBody, createClothingItem);
router.delete("/:itemId", validateId, deleteClothingItem);
router.put("/:itemId/likes", validateId, likeClothingItem);
router.delete("/:itemId/likes", validateId, unlikeClothingItem);

module.exports = router;
