const Slide = require("../model/slideModel");

exports.createSlide = async (slideData) => {
  const newSlide = await Slide.create(slideData);

  return newSlide;
};

exports.getById = async (id) => {
  return await Slide.findById({ _id: id });
};

exports.getSlides = async () => {
  return await Slide.find().sort({ startAt: -1 }).lean();
};

exports.getActiveSlides = async (now) => {
  return await Slide.find({ isEnabled: true, startAt: { $lte: now }, endAt: { $gte: now } }).sort({ startAt: -1 });
};

exports.updateSlide = async ({ id, ...filters }) => {
  return await Slide.findOneAndUpdate({ _id: id }, filters);
};

exports.deleteSlide = async (id) => {
  return await Slide.findOneAndDelete({ _id: id });
};
