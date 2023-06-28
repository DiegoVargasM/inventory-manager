const multer = require("multer");

// define file storage
const storage = multer.diskStorage({
  // uploads is the folder name where the file will be stored
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    // define a unique name for the file
    //replace / with - to avoid error
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
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

// file size formatter (bytes to KB, MB, etc.)
const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
  );
};

module.exports = { upload, fileSizeFormatter };
