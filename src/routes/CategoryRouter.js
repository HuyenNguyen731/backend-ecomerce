const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/CategoryController");
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post("/create", authMiddleWare, categoryController.createCategory);
router.delete("/delete/:id", authMiddleWare, categoryController.deleteCategory);
router.get("/get-all", categoryController.getAllCategory);

module.exports = router;
