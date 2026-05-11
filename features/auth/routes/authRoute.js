const { Router } = require("express");
const authController = require("../controller/authController");

const router = Router();

router.post("/auth/login", authController.loginUser);
router.post("/auth/refresh", authController.refreshSession);

module.exports = router;
