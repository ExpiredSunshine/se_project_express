const router = require("express").Router();
const {
  getItems,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  dislikeItem,
} = require("../controllers/items");

router.get("/", getItems);
router.post("/", createClothingItem);
router.delete("/:itemId", deleteClothingItem);
router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", dislikeItem);

module.exports = router;
