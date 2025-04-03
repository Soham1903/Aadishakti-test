// routes/authRoutes.js
import express from "express";
import signup from "../controller/signupController.js";
import login from "../controller/LoginController.js";
import { forgotPassword, resetPassword } from "../controller/authController.js";
import { loginLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

router.post("/signup", loginLimiter, signup);
router.post("/login", loginLimiter, login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
