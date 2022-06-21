const { StatusCodes } = require("http-status-codes");
const multer = require("multer");
const path = require("path");
const { CustomAPIError } = require("../error");

const storage = multer.diskStorage({});

const filefilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(
      new CustomAPIError(
        "File type is not supported",
        StatusCodes.UNPROCESSABLE_ENTITY
      ),
      false
    );
  }
};
var upload = multer({ storage: storage, fileFilter: filefilter }).single("img");

module.exports = { upload };

// destination: (req, file, cb) => {
//   cb(null, "public/images");
// },
// filename: (req, file, cb) => {
//   cb(null, file.originalname + "-" + Date.now().toString());
// },
