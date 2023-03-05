const express = require("express");
const router = express.Router();
const authRoutes = require("./auth/auth.routes");
const userRoutes = require("./user/user.routes");

router.use("/auth", authRoutes).use("/users", userRoutes);

module.exports = router;
