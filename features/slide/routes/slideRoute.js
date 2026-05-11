const { Router } = require("express");

const uploadMiddleware = require("../../../middlewares/normalizeFileMiddleware");
const { authMiddleware } = require("../../../middlewares/authMiddleware");
const slideController = require("../controller/slideController");

const router = Router();

router.get("/slides", authMiddleware, slideController.getSlides);

router.get("/active-slides", slideController.getActiveSlides);

router.post("/slide", authMiddleware, uploadMiddleware, slideController.createSlide);

router.put("/slide/:id", authMiddleware, slideController.updateSlide);

router.delete("/slide/:id", authMiddleware, slideController.deleteSlide);

module.exports = router;
