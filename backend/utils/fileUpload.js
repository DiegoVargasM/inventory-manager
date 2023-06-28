const multer = require("multer");

// define file storage
const storage = multer.diskStorage({
  // uploads is the folder name where the file will be stored
  destination: function (req, file, cb) {
    cb(null, "/uploads");
  },
  filename: function (req, file, cb) {
    // define a unique name for the file
    //replace / with - to avoid error
    cb(null, Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

// specify the file types (formats) that can be saved
function fileFilter(req, file, cb) {
  //mime type defines the file format
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    // allow
    cb(null, true);
  } else {
    // reject
    cb(null, false);
  }
}

// define the upload constant
const upload = multer({ storage, fileFilter });

module.exports = { upload };
