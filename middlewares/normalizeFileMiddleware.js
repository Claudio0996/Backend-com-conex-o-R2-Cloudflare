const multer = require("multer");

const dataStorage = multer.memoryStorage();

const acceptedMimetypes = ["image/jpeg", "image/png", "video/mp4"];

const upload = multer({
  storage: dataStorage,
  limits: {
    fileSize: 40 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (!acceptedMimetypes.includes(file.mimetype)) {
      cb(new Error("Tipo não permitido"), false);
      return;
    }
    cb(null, true);
  },
});

module.exports = upload.single("file");
