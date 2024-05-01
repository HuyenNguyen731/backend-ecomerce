const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/ReviewController");
const {
  authMiddleWare,
  authUserMiddleWare,
} = require("../middleware/authMiddleware");

router.post(
  "/create-review",
  reviewController.createReview
);
router.get("/get-all-review", reviewController.getAllReview);
router.get("/get-review-by-id/:id", reviewController.getReviewByIdProduct);
router.put("/delete/:id", reviewController.deleteReview);

module.exports = router;
