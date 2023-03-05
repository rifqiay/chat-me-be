const express = require("express");
const {
  register,
  verifyEmail,
  login,
  refreshToken,
} = require("../../controller/auth/register/register");
const router = express.Router();

router
  .post("/register", register)
  .get("/verify-email/:token", verifyEmail)
  .post("/login", login)
  .post("/refresh-token", refreshToken);

module.exports = router;
