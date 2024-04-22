const express = require("express");
const router = express.Router();
const roleController = require("../controllers/RoleController");
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post("/create", authMiddleWare, roleController.createRole);
router.delete("/delete/:id", authMiddleWare, roleController.deleteRole);
router.get("/get-all", roleController.getAllRole);

module.exports = router;
