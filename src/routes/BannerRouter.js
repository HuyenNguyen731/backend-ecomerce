const express = require("express");
const router = express.Router();
const bannerController = require("../controllers/BannerController");

router.post("/create", bannerController.createBanner);
router.delete("/delete/:id", bannerController.deleteBanner);
router.get("/get-all", bannerController.getAllBanner);

module.exports = router;
