const router = require("express").Router();
const {
  getItems,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  unlikeClothingItem,
} = require("../controllers/items.js");
const { validateCardBody, validateId } = require("../middlewares/validation.js");

router.get("/", getItems);

router.post("/", validateCardBody, createClothingItem);
router.delete("/:itemId", validateId, deleteClothingItem);
router.put("/:itemId/likes", validateId, likeClothingItem);
router.delete("/:itemId/likes", validateId, unlikeClothingItem);

module.exports = router;
