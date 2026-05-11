const diskStorageService = require("./diskStorageService");
const r2StorageService = require("./r2StorageService");

const SAVE_MODE = process.env.SAVE_MODE;

exports.createSlide = async ({ buffer, type }) => {
  if (SAVE_MODE === "disk") {
    return await diskStorageService.createImage({ buffer, type });
  } else {
    return await r2StorageService.upload({ buffer, type });
  }
};

exports.deleteSlide = async ({ existingSlide }) => {
  console.log(existingSlide);
  if (SAVE_MODE === "disk") {
    return await diskStorageService.deleteImage(existingSlide.mediaUrl);
  } else {
    return await r2StorageService.delete(existingSlide.mediaUrl.split("/").pop());
  }
};
