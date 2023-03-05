const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const maxSize = 1024 * 1024;

if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadToCloudinary = async (locaFilePath, originalname) => {
  // locaFilePath: path of image which was just
  // uploaded to "uploads" folder

  const mainFolderName = "main";
  const filePathOnCloudinary = mainFolderName + "/" + originalname;

  return cloudinary.uploader
    .upload(locaFilePath, { public_id: filePathOnCloudinary })
    .then((result) => {
      // Image has been successfully uploaded on
      // cloudinary So we dont need local image
      // file anymore
      // Remove file from local uploads folder
      fs.unlinkSync(locaFilePath);

      return {
        url: result.url,
        id: result.public_id,
      };
    })
    .catch((error) => {
      // Remove file from local uploads folder
      fs.unlinkSync(locaFilePath);
      return { message: "Fail" };
    });
};

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/webp"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Unsupported Media Type, only jpg, jpeg or png"));
    }
  },
  limits: { fileSize: maxSize },
});

const deleteImage = (public_id) => {
  cloudinary.api.delete_resources(public_id, (error, result) => {
    if (error) {
      return next(
        new createError(500, "Failed to delete image from Cloudinary")
      );
    }
    // console.log("Image deleted from Cloudinary");
  });
};

module.exports = {
  uploadToCloudinary,
  upload,
  deleteImage,
};
