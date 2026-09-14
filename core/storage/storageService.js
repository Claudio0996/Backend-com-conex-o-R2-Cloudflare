const r2StorageService = require("./r2StorageService");

exports.createSlide = async ({ buffer, type }) => {
    return await r2StorageService.upload({ buffer, type });
};

exports.deleteSlide = async ({ existingSlide }) => {
    return await r2StorageService.delete(existingSlide.mediaUrl.split("/").pop());
};
