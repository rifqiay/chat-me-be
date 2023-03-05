const express = require("express");
const {
  changeName,
  getUserById,
  changePhone,
  changeUsername,
  changeBio,
  changePhoto,
} = require("../../controller/user/user");
const { upload } = require("../../middleware/upload");
const router = express.Router();

router
  .put("/edit-name", changeName)
  .put("/edit-phone", changePhone)
  .put("/edit-username", changeUsername)
  .put("/edit-bio", changeBio)
  .put("/edit-photo", upload.single("photo"), changePhoto)
  .get("/:id", getUserById);

module.exports = router;
