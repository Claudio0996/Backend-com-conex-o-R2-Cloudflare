const slideRepository = require("../repository/slideRepository");
const { SlideSchema } = require("../schema/slideSchema");

exports.createSlide = async (slideData) => {
  const validationStep = SlideSchema.safeParse(slideData);

  if (!validationStep.success) {
    throw {
      type: "VALIDATION_ERROR",
      status: 400,
      message: validationStep.error.issues[0].message,
    };
  }

  const data = validationStep.data;

  const newSlide = await slideRepository.createSlide(data);

  return newSlide;
};

exports.getSlides = async () => {
  const slides = await slideRepository.getSlides();

  const now = new Date();

  const slideStructured = slides.map((item) => {
    let status;

    if (!item.isEnabled) {
      status = "disabled";
    } else if (now < item.startAt) {
      status = "scheduled";
    } else if (now > item.endAt) {
      status = "expired";
    } else {
      status = "active";
    }

    return {
      ...item,
      status,
    };
  });

  return slideStructured;
};

exports.getActiveSlides = async () => {
  const now = new Date();

  const activeSlides = await slideRepository.getActiveSlides(now);

  return activeSlides;
};

exports.getSlideById = async (id) => {
  const slide = await slideRepository.getById(id);

  if (!slide) {
    throw {
      status: 404,
      message: "Slide não encontrado",
    };
  }

  return slide;
};

exports.updateSlide = async (data) => {
  const existingSlide = await slideRepository.getById(data.id);

  if (!existingSlide) {
    throw {
      status: 404,
      message: "Slide não encontrado",
    };
  }

  const updatedSlide = await slideRepository.updateSlide({ ...data });

  return updatedSlide;
};

exports.deleteSlide = async (id) => {
  const deletedSlide = await slideRepository.deleteSlide(id);

  if (!deletedSlide) {
    throw {
      status: 401,
      message: "Slide não encontrado",
    };
  }

  return deletedSlide;
};
