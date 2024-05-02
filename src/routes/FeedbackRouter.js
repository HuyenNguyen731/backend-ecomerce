const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/FeedbackController");

router.post("/create", feedbackController.createFeedback);
router.get("/get-all", feedbackController.getAllFeedback);

module.exports = router;
