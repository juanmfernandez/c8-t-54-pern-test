import { userMe } from "../controllers/authController";
const express = require("express");
const { validateAuth } = require("../middlewares/auth");
const authRouter = express.Router();

authRouter.get("/me", userMe);

module.exports = authRouter;
