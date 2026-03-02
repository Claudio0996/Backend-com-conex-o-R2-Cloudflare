const { success } = require("zod");
const uploadService = require("../../upload/uploadService");
const slideService = require("../service/slideService");

exports.createSlide = async (req, res, next) => {
  const file = req.file;
  const body = req.body;

  if (!file) {
    return res.status(400).json({ message: "Não foi enviado um arquivo" });
  }

  try {
    const url = await uploadService.upload({ buffer: file.buffer, type: file.mimetype });

    const slide = await slideService.createSlide({ ...body, mediaUrl: url, isEnabled: !!body.isEnabled });

    res.status(201).json({
      message: "Slide criado com sucesso",
      data: slide,
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json({
      message: err.message || "Erro ao inserir slide",
      success: false,
      data: null,
    });
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
    console.log(err);
    res.status(err.status || 500).json({
      message: err.message || "Erro ao encontrar slides",
      success: false,
      data: null,
    });
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
    console.log(err);
    res.status(err.status || 500).json({
      message: err.message || "Erro ao encontrar slides",
      success: false,
      data: null,
    });
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
    console.log(err);
    res.status(err.status || 500).json({
      message: err.message || "Erro ao encontrar slides",
      success: false,
      data: null,
    });
  }
};

exports.deleteSlide = async (req, res, next) => {
  const id = req.params.id;

  try {
    const existingSlide = await slideService.getSlideById(id);

    await uploadService.delete(existingSlide.mediaUrl.split("/").pop());

    const deletedSlide = await slideService.deleteSlide(id);

    res.status(201).json({
      success: true,
      message: "Slide excluído",
      data: deletedSlide,
    });
  } catch (err) {
    console.log(err);
    res.status(err.status || 500).json({
      message: err.message || "Erro ao encontrar slides",
      success: false,
      data: null,
    });
  }
};
