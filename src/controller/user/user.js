const {
  editName,
  getuser,
  editPhone,
  editUsername,
  editBio,
  editPhoto,
  getFriends,
} = require("../../model/user/user");
const { response } = require("../../helper/common");
const { deleteImage, uploadToCloudinary } = require("../../middleware/upload");
const { extractPublicId } = require("../../helper/extractPublicId");
const crypto = require("crypto");

const userControllers = {
  getUserById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await getuser(id);
      response(res, result.rows, 200, "Get profile success", "success");
    } catch (error) {
      next(error);
    }
  },
  changeName: async (req, res, next) => {
    try {
      const { name, id } = req.body;
      const result = await editName({ id, name });
      response(res, result.rows, 200, "Edit name success", "success");
    } catch (error) {
      next(error);
    }
  },
  changePhone: async (req, res, next) => {
    try {
      const { phone, id } = req.body;
      const result = await editPhone({ id, phone });
      response(res, result.rows, 200, "Edit phone number success", "success");
    } catch (error) {
      next(error);
    }
  },
  changeUsername: async (req, res, next) => {
    try {
      const { username, id } = req.body;
      const result = await editUsername({ id, username });
      response(res, result.rows, 200, "Edit username success", "success");
    } catch (error) {
      next(error);
    }
  },
  changeBio: async (req, res, next) => {
    try {
      const { bio, id } = req.body;
      const result = await editBio({ id, bio });
      response(res, result.rows, 200, "Edit bio success", "success");
    } catch (error) {
      next(error);
    }
  },
  changePhoto: async (req, res, next) => {
    try {
      const { photo, id } = req.body;
      const user = await getuser(id);
      const isPhoto = user.rows[0].photo;
      if (isPhoto) {
        const public_id = extractPublicId(isPhoto);
        deleteImage(public_id);
      }
      const locaFilePath = req.file?.path;
      let originalname = req.file?.originalname;
      originalname = crypto.randomBytes(5).toString("hex");
      let result;
      if (locaFilePath) {
        result = await uploadToCloudinary(locaFilePath, originalname);
      }
      const data = {
        id,
        photo: !result ? isPhoto : `${result.id},${result.url}`,
      };
      const respons = await editPhoto(data);
      response(res, respons.rows, 200, "Edit photo success", "success");
    } catch (error) {
      console.log(error);
    }
  },
  allFriends: async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await getFriends(id);
      response(res, result.rows, 200, "get all friends success", "success");
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userControllers;
