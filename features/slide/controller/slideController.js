const storageService = require("../../../core/storage/storageService");
const slideService = require("../service/slideService");

exports.createSlide = async (req, res, next) => {
  const file = req.file;
  const body = req.body;

  if (!file) {
    const error = new Error("Não foi enviado um arquivo");
    error.status = 400;
    return next(error);
  }

  try {
    const url = await storageService.createSlide({ buffer: file.buffer, type: file.mimetype });

    const slide = await slideService.createSlide({ ...body, mediaUrl: url, isEnabled: true });

    res.status(201).json({
      message: "Slide criado com sucesso",
      data: slide,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

exports.getSlides = async (req, res, next) => {
  try {
    const slides = await slideService.getSlides();

    res.status(200).json({
      success: true,
      message: "Slides retornados com sucesso",
      data: slides,
    });
  } catch (err) {
    next(err);
  }
};

exports.getActiveSlides = async (req, res, next) => {
  const now = new Date();
  try {
    const activeSlides = await slideService.getActiveSlides(now);

    res.status(200).json({
      success: true,
      message: "Slides ativos recuperados com sucesso",
      data: activeSlides,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateSlide = async (req, res, next) => {
  const id = req.params.id;
  const newData = req.body;

  try {
    const newSlide = await slideService.updateSlide({ id, ...newData });

    res.status(201).json({
      success: true,
      message: "Slide atualizado com sucesso",
      data: newSlide,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteSlide = async (req, res, next) => {
  const id = req.params.id;

  try {
    const existingSlide = await slideService.getSlideById(id);

    await storageService.deleteSlide({ existingSlide });

    const deletedSlide = await slideService.deleteSlide(existingSlide._id);

    res.status(201).json({
      success: true,
      message: "Slide excluído",
      data: deletedSlide,
    });
  } catch (err) {
    next(err);
  }
};
