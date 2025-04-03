import {
  createPromoCode,
  applyPromoCode,
} from "../controller/promocodeController.js";
import express from "express";
import { loginLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

router.post("/add", loginLimiter, createPromoCode);
router.post("/apply", applyPromoCode);
export default router;
