const { Router } = require("express");

const uploadMiddleware = require("../../../middlewares/normalizeFileMiddleware");
const slideController = require("../controller/slideController");

const router = Router();

router.get("/slides", slideController.getSlides);

router.get("/active-slides", slideController.getActiveSlides);

router.post("/slide", uploadMiddleware, slideController.createSlide);

router.put("/slide/:id", slideController.updateSlide);

router.delete("/slide/:id", slideController.deleteSlide);

module.exports = router;
