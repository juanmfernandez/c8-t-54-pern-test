const express = require("express");
const { validateAuth } = require("../middlewares/auth");
const authRouter = express.Router();

module.exports = authRouter;
