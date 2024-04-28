const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/ReviewController");
const {
  authMiddleWare,
  authUserMiddleWare,
} = require("../middleware/authMiddleware");

router.post("/create-review", authUserMiddleWare, reviewController.createReview);
router.get("/get-all-review", authUserMiddleWare, reviewController.getAllReview);
router.delete("/delete/:id", authMiddleWare, reviewController.deleteReview);

module.exports = router;
